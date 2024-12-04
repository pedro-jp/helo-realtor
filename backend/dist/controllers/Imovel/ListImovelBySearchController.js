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
exports.ListImovelBySearchController = void 0;
const ListImoveisBySearchService_1 = require("../../services/Imovel/ListImoveisBySearchService");
class ListImovelBySearchController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const listImoveisBySearchService = new ListImoveisBySearchService_1.ListImoveisBySearchService();
            const { url, address, minPrice, maxPrice, minDormitorios, minVagas, category, transaction, page, } = req.params;
            const local = address;
            const pageNumber = Number(page);
            const imoveis = yield listImoveisBySearchService.execute(url, minPrice, maxPrice, local, minDormitorios, minVagas, category, transaction, pageNumber);
            return res.json(imoveis);
        });
    }
}
exports.ListImovelBySearchController = ListImovelBySearchController;
