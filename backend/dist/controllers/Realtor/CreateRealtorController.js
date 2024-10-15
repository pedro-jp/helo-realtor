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
exports.CreateRealtorController = void 0;
const CreateRealtorService_1 = require("../../services/Realtor/CreateRealtorService");
class CreateRealtorController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, phone, creci, whatsapp_message } = req.body;
            const { officeId } = req.params;
            const createRealtorService = new CreateRealtorService_1.CreateRealtorService();
            try {
                const realtor = yield createRealtorService.execute({
                    name,
                    email,
                    phone,
                    creci,
                    whatsapp_message,
                    officeId,
                });
                return res.json(realtor);
            }
            catch (error) {
                return res
                    .status(500)
                    .json({ error: error.message || 'Erro ao criar o corretor' });
            }
        });
    }
}
exports.CreateRealtorController = CreateRealtorController;
