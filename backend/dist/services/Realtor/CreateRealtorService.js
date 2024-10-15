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
exports.CreateRealtorService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class CreateRealtorService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, email, phone, creci, officeId, whatsapp_message, }) {
            // Verifica se o escritório existe antes de criar o Realtor
            const officeExists = yield prisma_1.default.office.findUnique({
                where: { id: officeId },
            });
            if (!officeExists) {
                throw new Error('Office not found');
            }
            const realtor = yield prisma_1.default.realtor.create({
                data: {
                    name,
                    email,
                    phone,
                    creci,
                    whatsapp_message,
                    officeId,
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phone: true,
                    creci: true,
                    whatsapp_message: true,
                    officeId: true,
                },
            });
            return realtor;
        });
    }
}
exports.CreateRealtorService = CreateRealtorService;
