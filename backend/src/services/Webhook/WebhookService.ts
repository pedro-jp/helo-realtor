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
                    customer: usuario.stripeCustomerId, // Presumindo que você armazena o ID do cliente do Stripe no banco
                    status: 'active', // Somente assinaturas ativas
                  });

                  // Cancelar apenas as assinaturas que não são a nova
                  for (const subscription of subscriptions.data) {
                    if (subscription.id !== newSubscriptionId) {
                      await stripe.subscriptions.cancel(subscription.id);
                      console.log(`Assinatura ${subscription.id} cancelada`);
                    }
                  }

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
              const newSubscriptionId = invoice.subscription;

              // Cancelar todas as assinaturas antigas, exceto a nova
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

            const updatedUser = await prismaClient.user.update({
              where: {
                email: invoice.customer_email,
              },
              data: {
                paymentStatus: 'canceled', // Altera o status do pagamento para cancelado
                subscriptionId: '', // Remove o subscriptionId pois foi cancelada
                priceId: '', // Atualiza o priceID, se necessário
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

      case 'payment_intent.payment_failed':
        const failedPaymentIntent = event.data.object;

        console.log(`PaymentIntent for ${failedPaymentIntent.amount} failed.`);

        if (failedPaymentIntent.invoice) {
          const invoice = await stripe.invoices.retrieve(
            failedPaymentIntent.invoice
          );
        }

        try {
          const failedUser = await prismaClient.user.update({
            where: {
              email: failedPaymentIntent.charges.data[0].billing_details.email,
            },
            data: {
              paymentStatus: 'failed',
            },
          });

          return res.json({ received: true, failedUser, failedPaymentIntent });
        } catch (error) {
          console.error(
            'Erro ao atualizar o pagamento falhado:',
            error.message
          );
          return res
            .status(500)
            .json({ error: 'Erro ao atualizar o pagamento falhado' });
        }

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  }
}

export { WebhookService };
