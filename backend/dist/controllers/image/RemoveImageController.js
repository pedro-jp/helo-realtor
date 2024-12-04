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
exports.RemoveImageController = void 0;
const RemoveImageService_1 = require("../../services/image/RemoveImageService");
class RemoveImageController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ error: 'ID is required' });
            }
            const removeImage = new RemoveImageService_1.RemoveImageService();
            try {
                const image = yield removeImage.execute({ id });
                if (!image) {
                    return res.status(404).json({ error: 'Image not found' });
                }
                return res.json(image);
            }
            catch (error) {
                console.error('Error deleting image:', error.message);
                return res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
}
exports.RemoveImageController = RemoveImageController;
