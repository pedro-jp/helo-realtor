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
exports.UpdateImovelService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class UpdateImovelService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, name, description, price, local, quartos, banheiros, area, garagem, active, ownerId, categoryId, marker, transaction, }) {
            // Primeiro, buscamos o imóvel atual para manter os campos não enviados
            const existingImovel = yield prisma_1.default.imovel.findUnique({
                where: { id }, // Certifique-se de usar a tipagem correta para o ID
            });
            if (!existingImovel) {
                throw new Error('Imóvel não encontrado');
            }
            // Variáveis para armazenar as coordenadas
            let latitude = existingImovel.latitude;
            let longitude = existingImovel.longitude;
            // Se o local foi alterado, buscar as novas coordenadas
            if (local && local !== existingImovel.local) {
                const coordinates = yield this.getCoordinatesFromLocal(local);
                if (coordinates) {
                    latitude = coordinates.lat;
                    longitude = coordinates.lng;
                }
            }
            // Atualizar apenas os campos que foram enviados no corpo da requisição
            const imovelAtualizado = yield prisma_1.default.imovel.update({
                where: { id },
                data: {
                    name: name !== null && name !== void 0 ? name : existingImovel.name, // Se o valor não foi passado, mantém o original
                    description: description !== null && description !== void 0 ? description : existingImovel.description,
                    price: price !== null && price !== void 0 ? price : existingImovel.price,
                    local: local !== null && local !== void 0 ? local : existingImovel.local,
                    quartos: quartos !== null && quartos !== void 0 ? quartos : existingImovel.quartos,
                    banheiros: banheiros !== null && banheiros !== void 0 ? banheiros : existingImovel.banheiros,
                    area: area !== null && area !== void 0 ? area : existingImovel.area,
                    garagem: garagem !== null && garagem !== void 0 ? garagem : existingImovel.garagem,
                    active: active !== null && active !== void 0 ? active : existingImovel.active,
                    ownerId: ownerId !== null && ownerId !== void 0 ? ownerId : existingImovel.ownerId,
                    categoryId: categoryId !== null && categoryId !== void 0 ? categoryId : existingImovel.categoryId,
                    latitude, // Atualiza com as novas coordenadas ou mantém as existentes
                    longitude, // Atualiza com as novas coordenadas ou mantém as existentes
                    officeId: existingImovel.officeId, // Mantém o valor existente
                    realtorId: existingImovel.realtorId, // Mantém o valor existente
                    marker,
                    transaction,
                },
            });
            return imovelAtualizado;
        });
    }
    // Função para obter as coordenadas a partir de um endereço usando a API de Geocodificação do Google
    getCoordinatesFromLocal(local) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const apiKey = process.env.GOOGLE_MAPS_API_KEY; // Certifique-se de ter a chave API no .env
                const response = yield fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(local)}&key=${apiKey}`);
                const data = yield response.json();
                if (data.status === 'OK' && data.results.length > 0) {
                    const { lat, lng } = data.results[0].geometry.location;
                    return { lat: lat.toString(), lng: lng.toString() };
                }
                else {
                    console.error('Erro ao buscar coordenadas:', data);
                    return null;
                }
            }
            catch (error) {
                console.error('Erro ao buscar coordenadas:', error);
                return null;
            }
        });
    }
}
exports.UpdateImovelService = UpdateImovelService;
