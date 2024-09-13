// src/controllers/StripeController.ts
import { Request, Response } from 'express';
import StripeService from '../../services/stripe/StripeService';

class StripeController {
  async handle(req: Request, res: Response) {
    try {
      const response = await StripeService.createPaymentIntent();
      res.json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async handleWebhook(req: Request, res: Response) {
    const sig = req.headers['stripe-signature'] as string;
    const endpointSecret =
      'sk_test_51OIWpBFkkC3ZoBrE0CdfikwVVdeBAdLEsQNKuv4cwGogWVvqZAtw2f0kp9kIngjf7PAS7VSOkosp9k16Wf5RG0fu00OKveoqD8'; // Seu endpoint secret do Stripe

    let event;

    try {
      event = StripeService.verifyWebhook(req.body, sig, endpointSecret);
    } catch (err) {
      console.error('Webhook Error:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Lógica para lidar com o evento do Stripe
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log('PaymentIntent was successful!', paymentIntent);
        // Implemente a lógica específica para o sucesso do PaymentIntent
        break;

      case 'payment_intent.payment_failed':
        const paymentIntentFailed = event.data.object;
        console.log('PaymentIntent failed:', paymentIntentFailed);
        // Implemente a lógica específica para falhas de PaymentIntent
        break;

      case 'payment.intent_succeeded':
        const invoice = event.data.object;
        console.log('Invoice payment succeeded!', invoice);
        // Implemente a lógica específica para o sucesso do pagamento da fatura
        break;

      // Adicione outros casos conforme necessário

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  }
}

export { StripeController };
