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
exports.UpdateImovelController = void 0;
const UpdateImovelService_1 = require("../../services/Imovel/UpdateImovelService");
class UpdateImovelController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, description, price, local, quartos, banheiros, area, garagem, active, ownerId, categoryId, marker, transaction, } = req.body; // Usar Partial para aceitar campos opcionais
            const id = req.params.id;
            const updateImovelService = new UpdateImovelService_1.UpdateImovelService();
            // Apenas os campos que são enviados no corpo serão atualizados
            const imovel = yield updateImovelService.execute({
                id,
                name,
                description,
                price,
                local,
                quartos,
                banheiros,
                area,
                garagem,
                active,
                ownerId,
                categoryId,
                marker,
                transaction,
            });
            return res.json(imovel);
        });
    }
}
exports.UpdateImovelController = UpdateImovelController;
