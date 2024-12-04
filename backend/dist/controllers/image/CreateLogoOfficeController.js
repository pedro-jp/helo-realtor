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
const CreateLogoOfficeService_1 = require("../../services/image/CreateLogoOfficeService");
class CreateLogoOfficeController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { officeId, imageUrl } = req.body;
            const createLogoOfficeService = new CreateLogoOfficeService_1.CreateLogoOfficeService();
            try {
                const image = yield createLogoOfficeService.execute({
                    officeId,
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
exports.default = CreateLogoOfficeController;
