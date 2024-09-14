import prismaClient from '../../prisma';

const stripe = require('stripe')(
  'sk_test_51OIWpBFkkC3ZoBrE0CdfikwVVdeBAdLEsQNKuv4cwGogWVvqZAtw2f0kp9kIngjf7PAS7VSOkosp9k16Wf5RG0fu00OKveoqD8'
);

class CreateSubscriptionService {
  async execute({ email }) {
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

      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [
          {
            price: 'price_1PyPKbFkkC3ZoBrEhihlBkHZ',
          },
        ],
        payment_behavior: 'default_incomplete',
        payment_settings: { save_default_payment_method: 'on_subscription' },
        expand: ['latest_invoice.payment_intent'],
      });
      console.log(subscription.latest_invoice.payment_intent.client_secret);

      const user = await prismaClient.user.update({
        where: {
          email,
        },
        data: {
          subscriptionId: subscription.id,
        },
      });

      return {
        user,
        subscriptionId: subscription.id,
        clientSecret: subscription.latest_invoice.payment_intent.client_secret,
      };
    } catch (error) {
      return console.log({ error: { message: error.message } });
    }
  }
}

export { CreateSubscriptionService };
