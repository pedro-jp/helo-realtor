import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import path from 'path';
import { router } from './routes';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(
  cors({
    origin: ['https://teste.com']
  })
);

// Use express.json() apenas para rotas que não sejam o webhook
app.use(
  express.json({
    verify: (req: Request, res: Response, buf: Buffer) => {
      if (req.originalUrl === '/webhook') {
        req.rawBody = buf.toString(); // Armazena o corpo bruto como Buffer
      }
    }
  })
);
const swaggerDefinition = require('../swagger.json'); // Ajuste o caminho conforme necessário
const swaggerOptions = {
  swaggerDefinition,
  apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use(
  '/docs/pedro-jp',

  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.use(router);
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err.message);
  if (err instanceof Error) {
    return res.status(400).json({
      error: err.message
    });
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

// Use express.raw() para a rota do webhook
app.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  (request: Request, response: Response) => {
    const sig = request.headers['stripe-signature'];

    let event;

    try {
      // Use o corpo bruto para verificar a assinatura
      event = stripe.webhooks.constructEvent(
        request.rawBody,
        sig,
        endpointSecret
      );
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle the event
    switch (event.type) {
      case 'payment_intent.payment_failed':
        const paymentIntentPaymentFailed = event.data.object;
        // Lida com o evento payment_intent.payment_failed
        break;
      case 'payment_intent.processing':
        const paymentIntentProcessing = event.data.object;
        // Lida com o evento payment_intent.processing
        break;
      case 'payment_intent.succeeded':
        const paymentIntentSucceeded = event.data.object;
        // Lida com o evento payment_intent.succeeded
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Retorna 200 para reconhecer o recebimento do evento
    response.send();
  }
);

app.get('/', (req: Request, res: Response) => {
  return res.send('Stripe on');
});

app.listen(3332, () => {
  console.log('Servidor online');
});
