"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.UpdateOfficeService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class UpdateOfficeService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, ownerId, phone, description, address, address_city, email, officeId, logo_index, banner_index, }) {
            // Obtenha as coordenadas do endereço atualizado
            const coordinates = yield this.getCoordinatesFromAddress(`${address}, ${address_city}`);
            const url = name
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/\s+/g, '')
                .replace(/[^\w-]+/g, '');
            // Atualiza o escritório com as novas informações e coordenadas
            const office = yield prisma_1.default.office.update({
                where: {
                    id: officeId,
                },
                data: {
                    name,
                    phone,
                    address,
                    address_city,
                    description,
                    email,
                    url,
                    latitude: coordinates ? coordinates.lat.toString() : null, // Atualiza latitude como string
                    longitude: coordinates ? coordinates.lng.toString() : null, // Atualiza longitude como string
                    logo_index,
                    banner_index,
                },
            });
            return office;
        });
    }
    // Função para obter coordenadas a partir do endereço usando a API de Geocodificação do Google
    getCoordinatesFromAddress(address) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const apiKey = process.env.GOOGLE_MAPS_API_KEY;
                // Importa o node-fetch dinamicamente
                const fetch = (yield Promise.resolve().then(() => __importStar(require('node-fetch')))).default;
                const response = yield fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`);
                const data = (yield response.json());
                // Verifica se a resposta contém resultados válidos
                if (data.status === 'OK' && data.results.length > 0) {
                    const { lat, lng } = data.results[0].geometry.location;
                    return { lat, lng };
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
exports.UpdateOfficeService = UpdateOfficeService;
