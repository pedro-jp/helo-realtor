"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importStar(require("express"));
const multer_1 = __importDefault(require("multer"));
const CreateUserController_1 = require("./controllers/user/CreateUserController");
const AuthUserController_1 = require("./controllers/user/AuthUserController");
const isAuthenticated_1 = require("./middlewares/isAuthenticated");
const CreateCategoryController_1 = require("./controllers/category/CreateCategoryController");
const ListCategoryController_1 = require("./controllers/category/ListCategoryController");
const multer_2 = __importDefault(require("./config/multer"));
const CreateImovelController_1 = require("./controllers/Imovel/CreateImovelController");
const RemoveImovelController_1 = require("./controllers/Imovel/RemoveImovelController");
const ListImovelController_1 = require("./controllers/Imovel/ListImovelController");
const CreateImageController_1 = __importDefault(require("./controllers/image/CreateImageController"));
const ListImagesController_1 = require("./controllers/image/ListImagesController");
const LoadImovelController_1 = require("./controllers/Imovel/LoadImovelController");
const CreateOfficeController_1 = require("./controllers/Office/CreateOfficeController");
const UpdateOfficeController_1 = require("./controllers/Office/UpdateOfficeController");
const GetOfficeController_1 = require("./controllers/Office/GetOfficeController");
const UpdateImovelController_1 = require("./controllers/Imovel/UpdateImovelController");
const CreateRealtorController_1 = require("./controllers/Realtor/CreateRealtorController");
const UpdateRealtorController_1 = require("./controllers/Realtor/UpdateRealtorController");
const GetRealtorController_1 = require("./controllers/Realtor/GetRealtorController");
const RemoveImageController_1 = require("./controllers/image/RemoveImageController");
const UpdateImageController_1 = require("./controllers/image/UpdateImageController");
const CreateFavoriteController_1 = require("./controllers/Favorite/CreateFavoriteController");
const RemoveFavoriteController_1 = require("./controllers/Favorite/RemoveFavoriteController");
const CreateSubscriptionController_1 = require("./controllers/Subscription/CreateSubscriptionController");
const WebhookController_1 = require("./controllers/Webhook/WebhookController");
const CreateCheckout_1 = require("./controllers/CreateCheckout/CreateCheckout");
const GetUserController_1 = require("./controllers/user/GetUserController");
const GetOfficesController_1 = require("./controllers/Office/GetOfficesController");
const GetOfficeByNameController_1 = require("./controllers/Office/GetOfficeByNameController");
const ListImovelByNameController_1 = require("./controllers/Imovel/ListImovelByNameController");
const GetOfficeInactiveController_1 = require("./controllers/Office/GetOfficeInactiveController");
const CouponController_1 = require("./controllers/Coupon/CouponController");
const CreateVisitorSubscriptionController_1 = require("./controllers/Visitor/CreateVisitorSubscriptionController");
const ListAllImovelController_1 = require("./controllers/Imovel/ListAllImovelController");
const CreateLogoOfficeController_1 = __importDefault(require("./controllers/image/CreateLogoOfficeController"));
const CreateBannerOfficeController_1 = __importDefault(require("./controllers/image/CreateBannerOfficeController"));
const ListImovelBySearchController_1 = require("./controllers/Imovel/ListImovelBySearchController");
const CreateIndicationController_1 = require("./controllers/Indication/CreateIndicationController");
const router = (0, express_1.Router)();
exports.router = router;
const upload = (0, multer_1.default)(multer_2.default.upload('./tmp'));
const stripe = require('stripe')('sk_test_51OIWpBFkkC3ZoBrE0CdfikwVVdeBAdLEsQNKuv4cwGogWVvqZAtw2f0kp9kIngjf7PAS7VSOkosp9k16Wf5RG0fu00OKveoqD8');
// This example sets up an endpoint using the Express framework.
// Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.
router.post('/create-subscription', isAuthenticated_1.isAuthenticated, new CreateSubscriptionController_1.CreateSubscriptionController().handle);
router.use('/webhook', express_1.default.raw({ type: 'application/json' }));
router.post('/webhook', new WebhookController_1.WebhookController().handle);
router.post('/checkout', isAuthenticated_1.isAuthenticated, new CreateCheckout_1.CheckoutController().handle);
router.post('/coupon/:code', new CouponController_1.CouponController().handle);
router.post('/imoveis/favorites/:imovelId/:ip', new CreateFavoriteController_1.CreateFavoriteController().handle);
router.delete('/imoveis/favorites/:id/:ip', new RemoveFavoriteController_1.RemoveFavoriteController().handle);
router.post('/images', isAuthenticated_1.isAuthenticated, new CreateImageController_1.default().handle);
router.post('/logo', isAuthenticated_1.isAuthenticated, new CreateLogoOfficeController_1.default().handle);
router.post('/banner', isAuthenticated_1.isAuthenticated, new CreateBannerOfficeController_1.default().handle);
router.get('/images/:id', new ListImagesController_1.ListImagesController().handle);
router.delete('/images/:id', isAuthenticated_1.isAuthenticated, new RemoveImageController_1.RemoveImageController().handle);
router.put('/images/:id', isAuthenticated_1.isAuthenticated, new UpdateImageController_1.UpdateImageController().handle);
//--ROTAS USER
router.post('/users', new CreateUserController_1.CreateUserController().handle);
router.post('/session', new AuthUserController_1.AuthUserController().handle);
router.get('/me/:email', isAuthenticated_1.isAuthenticated, new GetUserController_1.GetUserController().handle);
//--ROTAS CATEGORY
router.post('/category', isAuthenticated_1.isAuthenticated, new CreateCategoryController_1.CreateCategoryController().handle);
// router.delete(
//   '/category',
//   isAuthenticated,
//   new DeleteCategoryController().handle
// );
router.get('/category/:ownerId', new ListCategoryController_1.ListCategoryController().handle);
router.get('/office/categories/:officeId', new ListCategoryController_1.ListCategoryController().handle);
//--ROTAS IMOVEIS
router.post('/imovel', isAuthenticated_1.isAuthenticated, upload.single('image'), new CreateImovelController_1.CreateImovelController().handle);
router.get('/imoveis/:ownerId', new ListImovelController_1.ListImoveisController().handle);
router.get('/imoveis/all/:ownerId', new ListAllImovelController_1.ListAllImoveisController().handle);
router.get('/imoveis/search/:url/:address/:minPrice/:maxPrice/:minDormitorios/:minVagas/:category/:transaction/:page', new ListImovelBySearchController_1.ListImovelBySearchController().handle);
router.get('/office/imoveis/:url', new ListImovelByNameController_1.ListImoveisByNameController().handle);
router.get('/imovel/:imovelId', new LoadImovelController_1.LoadImovelController().handle);
router.delete('/imovel/:id', isAuthenticated_1.isAuthenticated, new RemoveImovelController_1.RemoveImovelController().handle);
router.put('/imovel/:id/:ownerId', isAuthenticated_1.isAuthenticated, new UpdateImovelController_1.UpdateImovelController().handle);
router.post('/office', isAuthenticated_1.isAuthenticated, new CreateOfficeController_1.CreateOfficeController().handle);
router.get('/office/:ownerId', new GetOfficeController_1.GetOfficeController().handle);
router.get('/office/inactive/:ownerId', new GetOfficeInactiveController_1.GetOfficeInactiveController().handle);
router.get('/offices/:url', new GetOfficeByNameController_1.GetOfficeByNameController().handle);
router.get('/offices', new GetOfficesController_1.GetOfficesController().handle);
router.put('/office/:officeId', isAuthenticated_1.isAuthenticated, new UpdateOfficeController_1.UpdateOfficeController().handle);
router.post('/office/:officeId/realtors', isAuthenticated_1.isAuthenticated, new CreateRealtorController_1.CreateRealtorController().handle);
router.put('/office/:officeId/realtors/:realtorId', isAuthenticated_1.isAuthenticated, new UpdateRealtorController_1.UpdateRealtorController().handle);
router.get('/office/:officeId/realtors/:realtorId', isAuthenticated_1.isAuthenticated, new GetRealtorController_1.GetRealtorController().handle);
//visitor
router.post('/visitor/subscription', new CreateVisitorSubscriptionController_1.CreateVisitorSubscriptionController().handle);
router.post('/indication/:email/:indicatedToId', isAuthenticated_1.isAuthenticated, new CreateIndicationController_1.CreateIndicationController().handle);
