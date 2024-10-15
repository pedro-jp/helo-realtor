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
exports.CreateImovelService = void 0;
const client_1 = require("@prisma/client");
class CreateImovelService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, description, price, local, quartos, banheiros, area, garagem, active, categoryId, ownerId, officeId, realtorId, latitude, longitude, marker, transaction, }) {
            const imovel = yield this.prisma.imovel.create({
                data: {
                    name,
                    description,
                    local,
                    price,
                    quartos,
                    banheiros,
                    area,
                    garagem,
                    active,
                    categoryId,
                    ownerId,
                    officeId,
                    realtorId,
                    latitude,
                    longitude,
                    marker,
                    transaction,
                },
            });
            return imovel;
        });
    }
}
exports.CreateImovelService = CreateImovelService;
