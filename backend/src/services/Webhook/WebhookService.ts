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
        if (session.amount_total === 0 && email) {
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

              // Cancel old subscriptions except the new one
              for (const subscription of subscriptions.data) {
                if (subscription.id !== newSubscriptionId) {
                  await stripe.subscriptions.update(subscription.id, {
                    pause_collection: {
                      behavior: 'void', // Pausa a cobrança e impede futuras
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
                'Nova assinatura criada e usuário atualizado:',
                updatedUser
              );
            }
          } catch (error) {
            console.error('Erro ao processar a assinatura:', error.message);
            return res
              .status(500)
              .json({ error: 'Erro ao processar a assinatura' });
          }
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

            const usuario = await prismaClient.user.findFirst({
              where: {
                email: invoice.customer_email,
              },
            });

            const invoicePdfUrl = invoice.invoice_pdf;

            // Função para cancelar assinaturas antigas, exceto a nova
            async function cancelOldSubscriptions(usuario, newSubscriptionId) {
              if (usuario.email) {
                try {
                  // Buscar todas as assinaturas ativas do usuário
                  const subscriptions = await stripe.subscriptions.list({
                    customer: usuario.stripeCustomerId,
                    status: 'active',
                  });

                  // Cancelar apenas as assinaturas que não são a nova
                  for (const subscription of subscriptions.data) {
                    if (subscription.id !== newSubscriptionId) {
                      await stripe.subscriptions.update(subscription.id, {
                        pause_collection: {
                          behavior: 'void', // Pausa a cobrança e impede futuras
                        },
                      });
                      console.log(`Assinatura ${subscription.id} pausada`);
                    }
                  }

                  // Criar nova assinatura
                  const newSubscription = await stripe.subscriptions.create({
                    customer: usuario.stripeCustomerId,
                    items: [
                      {
                        price: priceID,
                      },
                    ],
                  });

                  // Atualizar no banco de dados
                  await prismaClient.user.update({
                    where: {
                      email: invoice.customer_email,
                    },
                    data: {
                      subscriptionId: newSubscription.id,
                      planIsActive: true,
                      priceId: priceID,
                    },
                  });

                  console.log(
                    'Assinaturas antigas foram canceladas, nova mantida'
                  );
                } catch (error) {
                  console.error(
                    'Erro ao cancelar assinaturas antigas:',
                    error.message
                  );
                  throw new Error('Erro ao cancelar assinaturas antigas');
                }
              } else {
                console.log('Cliente Stripe não encontrado');
              }
            }

            // Função para atualizar a assinatura do usuário no banco de dados
            async function updateSubscription(email, invoice, priceID) {
              try {
                return await prismaClient.user.update({
                  where: {
                    email,
                  },
                  data: {
                    paymentStatus: 'succeeded',
                    subscriptionId: invoice.subscription,
                    priceId: priceID,
                    planIsActive: true,
                  },
                });
              } catch (error) {
                console.error('Erro ao atualizar a assinatura:', error);
                throw new Error('Erro ao atualizar a assinatura');
              }
            }

            try {
              const newSubscriptionId = invoice.subscription;

              // Cancelar assinaturas antigas
              await cancelOldSubscriptions(usuario, newSubscriptionId);

              // Atualizar a assinatura do usuário
              const updatedUser = await updateSubscription(
                invoice.customer_email,
                invoice,
                priceID
              );

              console.log(updatedUser);

              return res.json({ received: true, updatedUser, priceID });
            } catch (error) {
              console.error('Erro ao processar o pagamento:', error.message);
              return res
                .status(500)
                .json({ error: 'Erro ao processar o pagamento' });
            }
          } catch (error) {
            console.error('Erro ao processar o pagamento:', error.message);
            return res
              .status(500)
              .json({ error: 'Erro ao processar o pagamento' });
          }
        } else {
          console.log('Nenhuma fatura associada encontrada.');
          return res.status(400).json({ error: 'Nenhuma fatura associada' });
        }

      case 'customer.subscription.delete':
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

            if (usuario.subscriptionId === subscriptionDeleted.id) {
              await prismaClient.user.update({
                where: {
                  email: usuario.email,
                },
                data: {
                  paymentStatus: 'canceled',
                  subscriptionId: '',
                  priceId: '',
                  planIsActive: false,
                },
              });
            }

            return res.json({ received: true, priceID });
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
