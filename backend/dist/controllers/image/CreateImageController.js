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
const CreateImageService_1 = require("../../services/image/CreateImageService");
class CreateImageController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { imovelId, imageUrl } = req.body;
            const createImageService = new CreateImageService_1.CreateImageService();
            try {
                const image = yield createImageService.execute({
                    imovelId,
                    url: imageUrl,
                });
                return res.json(image);
            }
            catch (error) {
                console.error('Error saving image URL:', error);
                return res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
}
exports.default = CreateImageController;
