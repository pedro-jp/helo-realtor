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
        'whsec_wGTgYSsoHmL4KGkfMeSHggCXr4rO3oOV'
      );
    } catch (err) {
      console.error(`Webhook Error: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
      case 'invoice.payment_succeeded':
        const invoice = event.data.object;
        // Handle successful payment
        console.log(`Payment for invoice ${invoice.id} succeeded`);
        break;
      case 'invoice.payment_failed':
        const failedInvoice = event.data.object;
        // Handle failed payment
        console.log(`Payment for invoice ${failedInvoice.id} failed`);
        break;
      // Add other event types as needed
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    res.json({ received: true });
  }
}

export { WebhookService };
