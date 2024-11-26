import prismaClient from '../../prisma';
import { sendEmail } from '../../utils/SendGrid';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

class WebhookService {
  async execute({ req, res }) {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
      // Use the raw body stored in req.rawBody
      event = stripe.webhooks.constructEvent(
        req.rawBody, // This should be the raw body as a string
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error(`Webhook Error: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        console.log('Checkout session completed', event.data.object);
        const session = event.data.object;
        const email = session.customer_details.email;
        const usuario = await prismaClient.user.findFirst({
          where: {
            email: email,
          },
        });

        if (!session.customer) {
          console.error('Stripe customer ID is missing in the session');
          return res.status(400).json({ error: 'Missing customer ID' });
        }

        try {
          // Fetch the customer directly from Stripe
          const customer = await stripe.customers.retrieve(session.customer);

          // Retrieve invoice and line items
          const invoice = await stripe.invoices.retrieve(session.invoice);
          const lineItems = invoice.lines.data;
          const priceID = lineItems.length > 0 ? lineItems[0].price.id : null;

          const newSubscriptionId = session.subscription;

          if (usuario) {
            // List active subscriptions
            const subscriptions = await stripe.subscriptions.list({
              customer: customer.id,
              status: 'active',
            });

            console.log(usuario);

            // Pause old subscriptions except the new one
            for (const subscription of subscriptions.data) {
              if (subscription.id !== newSubscriptionId) {
                await stripe.subscriptions.update(subscription.id, {
                  pause_collection: {
                    behavior: 'void', // Pausa a cobranÃ§a e impede futuras
                  },
                });
                console.log(`Assinatura ${subscription.id} pausada`);
              }
            }

            // for (const subscription of subscriptions.data) {
            //   if (subscription.id !== newSubscriptionId) {
            //     await stripe.subscriptions.remove(subscription.id);
            //     console.log(`Assinatura ${subscription.id} removida`);
            //   }
            // }

            // Update the user in the database
            const updatedUser = await prismaClient.user.update({
              where: {
                email: email,
              },
              data: {
                subscriptionId: session.subscription.id,
                planIsActive: true,
                priceId: priceID,
              },
            });

            console.log(
              'Nova assinatura criada e usuÃ¡rio atualizado:',
              updatedUser
            );
          }
        } catch (error) {
          console.error('Erro ao processar a assinatura:', error.message);
          return res
            .status(500)
            .json({ error: 'Erro ao processar a assinatura' });
        }
        break;
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;

        if (paymentIntent.invoice) {
          try {
            const invoice = await stripe.invoices.retrieve(
              paymentIntent.invoice
            );
            const lineItems = invoice.lines.data;
            const priceID = lineItems.length > 0 ? lineItems[0].price.id : null;

            // FunÃ§Ã£o para atualizar a assinatura do usuÃ¡rio no banco de dados
            async function updateSubscription(email, invoice, priceID) {
              try {
                return await prismaClient.user.update({
                  where: {
                    email,
                  },
                  data: {
                    paymentStatus: 'succeeded', // Marcar o pagamento como bem-sucedido
                    subscriptionId: invoice.subscription, // Atualizar com o novo ID de assinatura
                    priceId: priceID, // Armazenar o priceID
                    planIsActive: true, // Marcar o plano como ativo
                  },
                });
              } catch (error) {
                console.log('Erro ao atualizar a assinatura:', error);
                throw new Error('Erro ao atualizar a assinatura');
              }
            }

            try {
              // Atualizar a assinatura do usuÃ¡rio
              const updatedUser = await updateSubscription(
                invoice.customer_email,
                invoice,
                priceID
              );

              console.log(updatedUser);
              const ico = invoice.customer;
              return res.json({ received: true, updatedUser, priceID, ico });
            } catch (error) {
              console.error('Erro ao processar o pagamento:', error.message);
              return res
                .status(500)
                .json({ error: 'Erro interno ao processar o pagamento' });
            }
          } catch (error) {
            console.error('Erro ao processar o pagamento:', error.message);
            return res
              .status(500)
              .json({ error: 'Erro interno ao processar o pagamento' });
          }
        } else {
          console.log('Nenhuma fatura associada encontrada.');
          return res.status(400).json({ error: 'Nenhuma fatura associada' });
        }
      case 'payment_intent.payment_failed':
        const paymentIntentFailed = event.data.object;

        if (paymentIntentFailed.invoice) {
          try {
            const invoice = await stripe.invoices.retrieve(
              paymentIntentFailed.invoice
            );
            const lineItems = invoice.lines.data;
            const priceID = lineItems.length > 0 ? lineItems[0].price.id : null;

            // List active subscriptions
            const subscriptions = await stripe.subscriptions.list({
              customer: invoice.customer,
              status: 'active',
            });

            for (const subscription of subscriptions.data) {
              await stripe.subscriptions.update(subscription.id, {
                pause_collection: {
                  behavior: 'void', // Pausa a cobranÃ§a e impede futuras
                },
              });
              console.log(`Assinatura ${subscription.id} pausada`);
            }

            // FunÃ§Ã£o para atualizar a assinatura do usuÃ¡rio no banco de dados
            async function updateSubscription(email, invoice, priceID) {
              try {
                return await prismaClient.user.update({
                  where: {
                    email,
                  },
                  data: {
                    paymentStatus: 'canceled', // Marcar o pagamento como bem-sucedido
                    subscriptionId: '', // Atualizar com o novo ID de assinatura
                    priceId: '', // Armazenar o priceID
                    planIsActive: false, // Marcar o plano como ativo
                  },
                });
              } catch (error) {
                console.log('Erro ao atualizar a assinatura:', error);
                throw new Error('Erro ao atualizar a assinatura');
              }
            }

            try {
              // Atualizar a assinatura do usuÃ¡rio
              const updatedUser = await updateSubscription(
                invoice.customer_email,
                invoice,
                priceID
              );

              console.log(updatedUser);
              const ico = invoice.customer;
              return res.json({
                received: true,
                updatedUser,
                priceID,
                ico,
                msg: 'Assinatura cancelada',
              });
            } catch (error) {
              console.error('Erro ao processar o pagamento:', error.message);
              return res
                .status(500)
                .json({ error: 'Erro interno ao processar o pagamento' });
            }
          } catch (error) {
            console.error('Erro ao processar o pagamento:', error.message);
            return res
              .status(500)
              .json({ error: 'Erro interno ao processar o pagamento' });
          }
        } else {
          console.log('Nenhuma fatura associada encontrada.');
          return res.status(400).json({ error: 'Nenhuma fatura associada' });
        }
      case 'customer.subscription.deleted':
        const subscriptionDeleted = event.data.object;

        try {
          if (subscriptionDeleted.latest_invoice) {
            const invoice = await stripe.invoices.retrieve(
              subscriptionDeleted.latest_invoice
            );

            const lineItems = invoice.lines.data;
            const priceID = lineItems.length > 0 ? lineItems[0].price.id : null;

            const usuario = await prismaClient.user.findFirst({
              where: {
                email: invoice.customer_email,
              },
            });

            const updatedUser = await prismaClient.user.update({
              where: {
                email: invoice.customer_email,
              },
              data: {
                paymentStatus: 'canceled', // Altera o status do pagamento para cancelado
                subscriptionId: '', // Remove o subscriptionId pois foi cancelada
                priceId: '', // Atualiza o priceID, se necessÃ¡rio
                planIsActive: false, // Define o plano como inativo
              },
            });
            console.log('222222222222222222');
            return res.json({ received: true, updatedUser, priceID });
          } else {
            console.log('Nenhum invoice associado foi encontrado.');
          }
        } catch (error) {
          console.error(
            `Erro no processamento do cancelamento da assinatura: ${error.message}`
          );
          return res.status(500).json({ error: 'Erro interno no servidor' });
        }
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  }
}

export { WebhookService };
