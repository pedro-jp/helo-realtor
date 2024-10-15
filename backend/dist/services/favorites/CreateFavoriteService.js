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
exports.CreateFavoriteService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class CreateFavoriteService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ imovelId, ip }) {
            // Verificar se o IP já favoritou o imóvel
            const existingFavorite = yield prisma_1.default.favorites.findFirst({
                where: {
                    imovelId,
                    ip,
                },
            });
            if (existingFavorite) {
                throw new Error('Este imóvel já foi favoritado por este IP.');
            }
            // Criar o favorito com o IP
            const fav = yield prisma_1.default.favorites.create({
                data: {
                    imovelId,
                    ip,
                },
            });
            // Calcular o total de favoritos do imóvel
            const totalFavorites = yield prisma_1.default.favorites.count({
                where: {
                    imovelId,
                },
            });
            return { fav, totalFavorites };
        });
    }
}
exports.CreateFavoriteService = CreateFavoriteService;
