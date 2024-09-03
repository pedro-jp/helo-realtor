import { Router } from 'express';
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

const router = Router();

const upload = multer(uploadConfig.upload('./tmp'));

router.post('/images', isAuthenticated, new CreateImageController().handle);

router.get('/images', isAuthenticated, new ListImagesController().handle);

//--ROTAS USER

router.post('/users', new CreateUserController().handle);

router.post('/session', new AuthUserController().handle);

router.get('/me', isAuthenticated, new DetailUserController().handle);

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

router.get('/imovel/:imovelId', new LoadImovelController().handle);

router.delete(
  '/imovel/:id',
  isAuthenticated,
  new RemoveImovelController().handle
);

router.put('/imovel/:id', isAuthenticated, new UpdateImovelController().handle);

router.post('/office', isAuthenticated, new CreateOfficeController().handle);

router.get('/office/:ownerId', new GetOfficeController().handle);

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

export { router };
