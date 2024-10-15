"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFavoriteController = void 0;
const CreateFavoriteService_1 = require("../../services/favorites/CreateFavoriteService");
class CreateFavoriteController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { imovelId, ip } = req.params;
            const createFavoriteService = new CreateFavoriteService_1.CreateFavoriteService();
            try {
                const result = yield createFavoriteService.execute({
                    imovelId,
                    ip,
                });
                return res.json(result);
            }
            catch (error) {
                console.error('Error favoriting property:', error);
                return res.status(400).json({ error: error.message });
            }
        });
    }
}
exports.CreateFavoriteController = CreateFavoriteController;
