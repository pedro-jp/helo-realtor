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
exports.UpdateImageController = void 0;
const UpdateImageService_1 = require("../../services/image/UpdateImageService");
class UpdateImageController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { url } = req.body;
            const { id } = req.params;
            const updateImageService = new UpdateImageService_1.UpdateImageService();
            const image = yield updateImageService.execute({
                id,
                url,
            });
            return res.json(image);
        });
    }
}
exports.UpdateImageController = UpdateImageController;
