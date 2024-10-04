import prismaClient from '../../prisma';
const stripe = require('stripe')(
  'sk_test_51OIWpBFkkC3ZoBrE0CdfikwVVdeBAdLEsQNKuv4cwGogWVvqZAtw2f0kp9kIngjf7PAS7VSOkosp9k16Wf5RG0fu00OKveoqD8'
);

class WebhookService {
  async execute({ req, res }) {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
      // Use the raw body stored in req.rawBody
      event = stripe.webhooks.constructEvent(
        req.rawBody, // This should be the raw body as a string
        sig,
        'whsec_iKPC3yK5tjcnVVXfDtisjow612T9fC0d'
      );
    } catch (err) {
      console.error(`Webhook Error: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;

        // Process the payment intent success
        console.log(`PaymentIntent for ${paymentIntent.amount} succeeded.`);

        // Retrieve the associated invoice
        if (paymentIntent.invoice) {
          const invoice = await stripe.invoices.retrieve(paymentIntent.invoice);

          // Extract the priceID from the invoice
          const lineItems = invoice.lines.data;
          const priceID = lineItems.length > 0 ? lineItems[0].price.id : null;

          const usuario = await prismaClient.user.findFirst({
            where: {
              email: invoice.customer_email,
            },
          });

          async function cancelSubscription() {
            if (usuario.subscriptionId !== '') {
              try {
                await stripe.subscriptions.cancel(usuario.subscriptionId);
                console.log('Assinatura cancelada');
              } catch (error) {
                console.log(error);
              }
            }
          }

          usuario.subscriptionId !== ''
            ? cancelSubscription()
            : console.log('Não existe assinatura no stripe');

          // Atualiza o status do pagamento no banco de dados
          const user = await prismaClient.user.update({
            where: {
              email: invoice.customer_email,
            },
            data: {
              paymentStatus: 'succeeded',
              subscriptionId: invoice.subscription,
              priceId: priceID, // Salva o priceID, se necessário
              planIsActive: true,
            },
          });

          return res.json({ received: true, user, priceID });
        } else {
          console.log('No associated invoice found.');
        }
        break;

      case 'customer.subscription.deleted':
        const subscriptionDeleted = event.data.object;

        try {
          // Verifica se a assinatura tem um invoice associado
          if (subscriptionDeleted.latest_invoice) {
            const invoice = await stripe.invoices.retrieve(
              subscriptionDeleted.latest_invoice
            );

            // Extrai o priceID do invoice
            const lineItems = invoice.lines.data;
            const priceID = lineItems.length > 0 ? lineItems[0].price.id : null;

            // Busca o usuário pelo email do invoice
            const usuario = await prismaClient.user.findFirst({
              where: {
                email: invoice.customer_email,
              },
            });

            // Cancela a assinatura se houver um subscriptionId associado ao usuário
            if (usuario && usuario.subscriptionId !== '') {
              try {
                await stripe.subscriptions.del(subscriptionDeleted.id);
                console.log('Assinatura cancelada no Stripe');
              } catch (error) {
                console.log(
                  `Erro ao cancelar assinatura no Stripe: ${error.message}`
                );
              }
            } else {
              console.log(
                'Usuário não encontrado ou sem subscriptionId no banco.'
              );
            }

            // Atualiza o status do pagamento e assinatura no banco de dados
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

        // Process the payment intent failure
        console.log(`PaymentIntent for ${failedPaymentIntent.amount} failed.`);

        if (failedPaymentIntent.invoice) {
          const invoice = await stripe.invoices.retrieve(
            failedPaymentIntent.invoice
          );
          // Similar processing as above if needed
        }

        // Atualiza o status do pagamento no banco de dados
        const failedUser = await prismaClient.user.update({
          where: {
            email: failedPaymentIntent.charges.data[0].billing_details.email,
          },
          data: {
            paymentStatus: 'failed',
          },
        });

        return res.json({ received: true, failedUser, failedPaymentIntent });

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    res.json({ received: true });
  }
}

export { WebhookService };
