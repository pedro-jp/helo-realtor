import prismaClient from '../../prisma';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export type Subscription = {
  email: string;
  priceId: string;
};
class CreateSubscriptionService {
  async execute({ email, priceId }: Subscription) {
    let resposta = '';
    console.log('Email: ', priceId);
    try {
      // List customers with the provided email
      const customers = await stripe.customers.list({
        email: email,
        limit: 1,
      });

      console.log(customers.data[0].email); // Check if any customer was found

      if (customers.data.length === 0) {
        return console.log({ error: { message: 'Customer not found' } });
      }

      const customer = customers.data[0];
      console.log(customer.id); // Create the subscription

      const usuario = await prismaClient.user.findFirst({
        where: {
          email,
        },
      });

      if (usuario && usuario.priceId === priceId) {
        return { resposta: 'Plano já contratado' };
      }

      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [
          {
            price: priceId,
          },
        ],
        payment_behavior: 'default_incomplete',
        payment_settings: { save_default_payment_method: 'on_subscription' },
        expand: ['latest_invoice.payment_intent'],
      });

      console.log(resposta);
      return {
        resposta,
        subscriptionId: subscription.id,
        clientSecret: subscription.latest_invoice.payment_intent.client_secret,
      };
    } catch (error) {
      return console.log({ error: { message: error.message } });
    }
  }
}

export { CreateSubscriptionService };
