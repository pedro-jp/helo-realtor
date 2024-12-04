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
exports.ListImoveisBySearchService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class ListImoveisBySearchService {
    execute(url_1, minPrice_1, maxPrice_1, local_1, minDormitorios_1, minVagas_1, category_1, transaction_1) {
        return __awaiter(this, arguments, void 0, function* (url, minPrice, maxPrice, local, minDormitorios, minVagas, category, transaction, page = 1) {
            try {
                const filters = {
                    active: true,
                };
                // Adicionar filtro de preço mínimo
                if (minPrice) {
                    filters.price = Object.assign(Object.assign({}, filters.price), { gte: Number(minPrice) });
                }
                // Adicionar filtro de preço máximo
                if (maxPrice) {
                    filters.price = Object.assign(Object.assign({}, filters.price), { lte: Number(maxPrice) });
                }
                // Adicionar filtro de quartos mínimos
                if (minDormitorios) {
                    filters.quartos = { gte: Number(minDormitorios) };
                }
                // Adicionar filtro de vagas mínimas
                if (minVagas) {
                    filters.garagem = { gte: Number(minVagas) };
                }
                if (category && category !== 'null') {
                    filters.categoryId = category;
                }
                if (transaction && transaction !== 'null') {
                    filters.transaction = {
                        equals: transaction,
                        mode: 'insensitive',
                    };
                }
                // Adicionar filtro de local (apenas se local for diferente de 'null')
                if (local && local !== 'null') {
                    filters.local = {
                        contains: local,
                        mode: 'insensitive',
                    };
                }
                const limit = 30;
                const skip = (page - 1) * limit;
                const imoveis = yield prisma_1.default.office.findUnique({
                    where: {
                        url,
                    },
                    select: {
                        imoveis: {
                            where: filters,
                            include: {
                                images: true,
                                realtor: true,
                            },
                            take: limit,
                            skip,
                        },
                    },
                });
                const imoveisCount = yield prisma_1.default.office.findUnique({
                    where: {
                        url,
                    },
                    select: {
                        imoveis: {
                            where: filters,
                        },
                    },
                });
                const res = {
                    imoveis: imoveis === null || imoveis === void 0 ? void 0 : imoveis.imoveis,
                    totalPages: Math.ceil((imoveisCount === null || imoveisCount === void 0 ? void 0 : imoveisCount.imoveis.length) / limit),
                    sended: imoveis === null || imoveis === void 0 ? void 0 : imoveis.imoveis.length,
                };
                console.log('Imóveis retornados com filtros dinâmicos:', res);
                return res || [];
            }
            catch (error) {
                console.error('Erro ao buscar imóveis:', error);
                throw new Error('Erro ao buscar imóveis.');
            }
        });
    }
}
exports.ListImoveisBySearchService = ListImoveisBySearchService;
