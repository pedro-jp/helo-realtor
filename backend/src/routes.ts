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

import { DeleteCategoryController } from './controllers/category/DeleteCategoryController';

const router = Router();

const upload = multer(uploadConfig.upload('./tmp'));

router.post(
  '/images',
  isAuthenticated,
  upload.single('file'),
  new CreateImageController().handle
);

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

router.get('/category', isAuthenticated, new ListCategoryController().handle);

//--ROTAS IMOVEIS
router.post(
  '/imovel',
  isAuthenticated,
  upload.single('image'),
  new CreateImovelController().handle
);

router.get('/imovel', isAuthenticated, new ListImoveisController().handle);

router.delete('/imovel', isAuthenticated, new RemoveImovelController().handle);

export { router };
