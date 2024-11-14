import express, { Router } from 'express';
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
import { CreateSubscriptionController } from './controllers/Subscription/CreateSubscriptionController';
import { WebhookController } from './controllers/Webhook/WebhookController';

import { CheckoutController } from './controllers/CreateCheckout/CreateCheckout';
import { GetUserController } from './controllers/user/GetUserController';
import { GetOfficesController } from './controllers/Office/GetOfficesController';
import { GetOfficeByNameController } from './controllers/Office/GetOfficeByNameController';
import { ListImoveisByNameController } from './controllers/Imovel/ListImovelByNameController';
import { GetOfficeInactiveController } from './controllers/Office/GetOfficeInactiveController';
import { CouponController } from './controllers/Coupon/CouponController';
import { CreateVisitorSubscriptionController } from './controllers/Visitor/CreateVisitorSubscriptionController';

const router = Router();

const upload = multer(uploadConfig.upload('./tmp'));

const stripe = require('stripe')(
  'sk_test_51OIWpBFkkC3ZoBrE0CdfikwVVdeBAdLEsQNKuv4cwGogWVvqZAtw2f0kp9kIngjf7PAS7VSOkosp9k16Wf5RG0fu00OKveoqD8'
);
// This example sets up an endpoint using the Express framework.
// Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.

router.post(
  '/create-subscription',
  isAuthenticated,
  new CreateSubscriptionController().handle
);

router.use('/webhook', express.raw({ type: 'application/json' }));

router.post('/webhook', new WebhookController().handle);

router.post('/checkout', isAuthenticated, new CheckoutController().handle);

router.post('/coupon/:code', new CouponController().handle);

router.post(
  '/imoveis/favorites/:imovelId/:ip',
  new CreateFavoriteController().handle
);

router.delete(
  '/imoveis/favorites/:id/:ip',
  new RemoveFavoriteController().handle
);

router.post('/images', isAuthenticated, new CreateImageController().handle);

router.get('/images/:id', new ListImagesController().handle);

router.delete(
  '/images/:id',
  isAuthenticated,
  new RemoveImageController().handle
);

router.put('/images/:id', isAuthenticated, new UpdateImageController().handle);

//--ROTAS USER

router.post('/users', new CreateUserController().handle);

router.post('/session', new AuthUserController().handle);

router.get('/me/:email', isAuthenticated, new GetUserController().handle);

//--ROTAS CATEGORY
router.post(
  '/category',
  isAuthenticated,
  new CreateCategoryController().handle
);

// router.delete(
//   '/category',
//   isAuthenticated,
//   new DeleteCategoryController().handle
// );

router.get('/category/:ownerId', new ListCategoryController().handle);

//--ROTAS IMOVEIS
router.post(
  '/imovel',
  isAuthenticated,
  upload.single('image'),
  new CreateImovelController().handle
);

router.get('/imoveis/:ownerId', new ListImoveisController().handle);
router.get('/office/imoveis/:url', new ListImoveisByNameController().handle);

router.get('/imovel/:imovelId', new LoadImovelController().handle);

router.delete(
  '/imovel/:id',
  isAuthenticated,
  new RemoveImovelController().handle
);

router.put(
  '/imovel/:id/:ownerId',
  isAuthenticated,
  new UpdateImovelController().handle
);

router.post('/office', isAuthenticated, new CreateOfficeController().handle);

router.get('/office/:ownerId', new GetOfficeController().handle);
router.get(
  '/office/inactive/:ownerId',
  new GetOfficeInactiveController().handle
);

router.get('/offices/:url', new GetOfficeByNameController().handle);

router.get('/offices', new GetOfficesController().handle);

router.put(
  '/office/:officeId',
  isAuthenticated,
  new UpdateOfficeController().handle
);

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

//visitor
router.post(
  '/visitor/subscription',

  new CreateVisitorSubscriptionController().handle
);

export { router };
