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
exports.CreateImovelController = void 0;
const CreateImovelService_1 = require("../../services/Imovel/CreateImovelService");
const node_fetch_1 = __importDefault(require("node-fetch"));
class CreateImovelController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, description, price, local, quartos, banheiros, area, garagem, active, categoryId, ownerId, realtorId, officeId, marker, transaction, } = req.body;
            // Busca as coordenadas baseadas no local usando a função estática
            const coordinates = yield CreateImovelController.getCoordinatesFromLocal(local);
            if (!coordinates) {
                return res.status(400).json({
                    error: 'Não foi possível encontrar as coordenadas para o local informado',
                });
            }
            const createImovelService = new CreateImovelService_1.CreateImovelService();
            const imovel = yield createImovelService.execute({
                name,
                description,
                price,
                local,
                quartos,
                banheiros,
                area,
                garagem,
                active,
                categoryId,
                ownerId,
                realtorId,
                officeId,
                latitude: coordinates.lat.toString(),
                longitude: coordinates.lng.toString(),
                marker,
                transaction,
            });
            return res.json(imovel);
        });
    }
    // Torna a função estática para que o 'this' não seja necessário
    static getCoordinatesFromLocal(local) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const apiKey = 'AIzaSyCXUysejG26jQvuyCl6arN8ueQYVR4MLqo';
                const response = yield (0, node_fetch_1.default)(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(local)}&key=${apiKey}`);
                const data = yield response.json();
                if (data.status === 'OK' && data.results.length > 0) {
                    const { lat, lng } = data.results[0].geometry.location;
                    return { lat, lng };
                }
                console.error('Erro ao buscar coordenadas:', data);
                return null;
            }
            catch (error) {
                console.error('Erro na requisição para a API de Geocoding:', error);
                return null;
            }
        });
    }
}
exports.CreateImovelController = CreateImovelController;
