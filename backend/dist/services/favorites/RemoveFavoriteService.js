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
exports.RemoveFavoriteService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class RemoveFavoriteService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id }) {
            try {
                const fav = yield prisma_1.default.favorites.delete({
                    where: {
                        id,
                    },
                });
                console.log('Desfavoritado');
                return fav;
            }
            catch (error) {
                console.error('Error deleting favorito:', error.message);
                throw new Error('Failed to delete favorito. Please try again later.');
            }
        });
    }
}
exports.RemoveFavoriteService = RemoveFavoriteService;
