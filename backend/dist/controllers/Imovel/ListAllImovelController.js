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
exports.ListAllImoveisController = void 0;
const ListAllImoveisService_1 = require("../../services/Imovel/ListAllImoveisService");
class ListAllImoveisController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const listImoveisService = new ListAllImoveisService_1.ListAllImoveisService();
            const ownerId = req.params.ownerId;
            const imoveis = yield listImoveisService.execute({ ownerId });
            return res.json(imoveis);
        });
    }
}
exports.ListAllImoveisController = ListAllImoveisController;
