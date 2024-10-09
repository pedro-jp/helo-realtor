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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRealtorController = void 0;
const UpdateRealtorService_1 = __importDefault(require("../../services/Realtor/UpdateRealtorService"));
class UpdateRealtorController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, phone, creci, whatsapp_message, officeId } = req.body;
            const { realtorId } = req.params; // Recebe realtorId como parâmetro da rota
            const updateRealtorService = new UpdateRealtorService_1.default();
            try {
                const realtor = yield updateRealtorService.execute({
                    name,
                    email,
                    phone,
                    creci,
                    whatsapp_message,
                    realtorId,
                    officeId,
                });
                return res.json(realtor);
            }
            catch (error) {
                return res
                    .status(500)
                    .json({ error: error.message || 'Erro ao atualizar o corretor' });
            }
        });
    }
}
exports.UpdateRealtorController = UpdateRealtorController;
