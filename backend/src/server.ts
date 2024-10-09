import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import path from 'path';
import { router } from './routes';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { isAuthenticated } from './middlewares/isAuthenticated';

const stripe = require('stripe')(
  'sk_test_51OIWpBFkkC3ZoBrE0CdfikwVVdeBAdLEsQNKuv4cwGogWVvqZAtw2f0kp9kIngjf7PAS7VSOkosp9k16Wf5RG0fu00OKveoqD8'
);

const app = express();
app.use(cors());

// Use express.json() apenas para rotas que não sejam o webhook
app.use(
  express.json({
    verify: (req: Request, res: Response, buf: Buffer) => {
      if (req.originalUrl === '/webhook') {
        req.rawBody = buf.toString(); // Armazena o corpo bruto como Buffer
      }
    },
  })
);
const swaggerDefinition = require('./swagger.json'); // Ajuste o caminho conforme necessário
const swaggerOptions = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use(
  '/docs',

  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.use(router);
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err.message);
  if (err instanceof Error) {
    return res.status(400).json({
      error: err.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

const endpointSecret =
  'whsec_7dd7a5068b1369072225e294aaa103f75a124df7002c3f7f71f6e7c3b38a4bb0';

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
  console.log('Servidor online stripe');
});
