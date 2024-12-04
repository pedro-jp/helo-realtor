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
exports.GetOfficeByNameService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class GetOfficeByNameService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ url }) {
            // Faz a consulta ao Office e ao Owner associado
            const office = yield prisma_1.default.office.findFirst({
                where: {
                    url,
                    owner: {
                        planIsActive: true,
                    },
                },
                include: {
                    banner_image: true,
                    realtors: true,
                    Office_Logo: true,
                    owner: {
                        select: {
                            categories: true,
                        },
                    },
                    imoveis: {
                        where: {
                            active: true, // Filtra apenas imóveis ativos
                        },
                        include: {
                            images: true,
                        },
                    },
                },
            });
            // Verifica se o office foi encontrado
            if (office) {
                return office;
            }
            // Verifica se o plano do proprietário (owner) está ativo
        });
    }
}
exports.GetOfficeByNameService = GetOfficeByNameService;
