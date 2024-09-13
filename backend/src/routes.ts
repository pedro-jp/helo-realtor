import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';
import { isAuthenticated } from './middlewares/isAuthenticated';
import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController';
import uploadConfig from './config/multer';
import { CreateImovelController } from './controllers/Imovel/CreateImovelController';
import { RemoveImovelController } from './controllers/Imovel/RemoveImovelController';
import { ListImoveisController } from './controllers/Imovel/ListImovelController';
import CreateImageController from './controllers/image/CreateImageController';
import { ListImagesController } from './controllers/image/ListImagesController';
import { LoadImovelController } from './controllers/Imovel/LoadImovelController';
import { CreateOfficeController } from './controllers/Office/CreateOfficeController';
import { UpdateOfficeController } from './controllers/Office/UpdateOfficeController';
import { GetOfficeController } from './controllers/Office/GetOfficeController';
import { UpdateImovelController } from './controllers/Imovel/UpdateImovelController';
import { CreateRealtorController } from './controllers/Realtor/CreateRealtorController';
import { UpdateRealtorController } from './controllers/Realtor/UpdateRealtorController';
import { GetRealtorController } from './controllers/Realtor/GetRealtorController';
import { RemoveImageController } from './controllers/image/RemoveImageController';
import { UpdateImageController } from './controllers/image/UpdateImageController';
import { CreateFavoriteController } from './controllers/Favorite/CreateFavoriteController';
import { RemoveFavoriteController } from './controllers/Favorite/RemoveFavoriteController';

const router = express.Router();
const upload = multer(uploadConfig.upload('./tmp'));
const stripe = require('stripe')(
  'sk_test_51OIWpBFkkC3ZoBrE0CdfikwVVdeBAdLEsQNKuv4cwGogWVvqZAtw2f0kp9kIngjf7PAS7VSOkosp9k16Wf5RG0fu00OKveoqD8'
);
const app = express();

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = 'whsec_iKPC3yK5tjcnVVXfDtisjow612T9fC0d';

router.post('/payment-sheet', async (req, res) => {
  // Use an existing Customer ID if this is a returning customer.
  const customer = await stripe.customers.create();
  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: '2023-10-16' }
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 500,
    currency: 'brl',
    customer: customer.id,
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter
    // is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
    publishableKey:
      'pk_test_51OIWpBFkkC3ZoBrEMdWdJncsxGrKKa9ywredrgU85KWrsz59OfByanFTbqeZLtEZBLnwJwjP7sADdNKzFyGa9rBy00RiCi52tW',
  });
});

router.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  (request, response) => {
    const sig = request.headers['stripe-signature'];

    let event;

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle the event
    switch (event.type) {
      case 'payment_intent.canceled':
        const paymentIntentCanceled = event.data.object;
        // Then define and call a function to handle the event payment_intent.canceled
        break;
      case 'payment_intent.payment_failed':
        const paymentIntentPaymentFailed = event.data.object;
        // Then define and call a function to handle the event payment_intent.payment_failed
        break;
      case 'payment_intent.succeeded':
        const paymentIntentSucceeded = event.data.object;
        console.log('PaymentIntent was successful!', paymentIntentSucceeded);
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);

// Endpoints para favoritos
router.post(
  '/imoveis/favorites/:imovelId/:ip',
  new CreateFavoriteController().handle
);
router.delete(
  '/imoveis/favorites/:id/:ip',
  new RemoveFavoriteController().handle
);

// Endpoints para imagens
router.post('/images', isAuthenticated, new CreateImageController().handle);
router.get('/images/:id', new ListImagesController().handle);
router.delete(
  '/images/:id',
  isAuthenticated,
  new RemoveImageController().handle
);
router.put('/images/:id', isAuthenticated, new UpdateImageController().handle);

// Endpoints para usuários
router.post('/users', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/me', isAuthenticated, new DetailUserController().handle);

// Endpoints para categorias
router.post(
  '/category',
  isAuthenticated,
  new CreateCategoryController().handle
);
router.get('/category/:ownerId', new ListCategoryController().handle);

// Endpoints para imóveis
router.post(
  '/imovel',
  isAuthenticated,
  upload.single('image'),
  new CreateImovelController().handle
);
router.get('/imoveis/:ownerId', new ListImoveisController().handle);
router.get('/imovel/:imovelId', new LoadImovelController().handle);
router.delete(
  '/imovel/:id',
  isAuthenticated,
  new RemoveImovelController().handle
);
router.put('/imovel/:id', isAuthenticated, new UpdateImovelController().handle);

// Endpoints para escritórios
router.post('/office', isAuthenticated, new CreateOfficeController().handle);
router.get('/office/:ownerId', new GetOfficeController().handle);
router.put(
  '/office/:officeId',
  isAuthenticated,
  new UpdateOfficeController().handle
);

// Endpoints para corretores
router.post(
  '/office/:officeId/realtors',
  isAuthenticated,
  new CreateRealtorController().handle
);
router.put(
  '/office/:officeId/realtors/:realtorId',
  isAuthenticated,
  new UpdateRealtorController().handle
);
router.get(
  '/office/:officeId/realtors/:realtorId',
  isAuthenticated,
  new GetRealtorController().handle
);

export { router };
