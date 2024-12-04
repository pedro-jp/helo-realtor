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
const SendGrid_1 = require("../../utils/SendGrid");
class CreateImovelService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, description, price, local, quartos, banheiros, area, garagem, active, categoryId, ownerId, officeId, realtorId, latitude, longitude, marker, transaction, }) {
            // Passo 1: Criar o imóvel
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
            // Passo 2: Buscar os visitantes e os dados adicionais do escritório e do imóvel
            // Passo 3: Agendar envio de e-mails após 2 minutos
            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                const [visitors, office, imovelWithImages] = yield Promise.all([
                    this.prisma.visitor_Subscription.findMany({
                        where: {
                            officeId: officeId,
                        },
                    }),
                    this.prisma.office.findUnique({
                        where: {
                            id: officeId,
                        },
                        include: {
                            Office_Logo: true,
                        },
                    }),
                    this.prisma.imovel.findUnique({
                        where: {
                            id: imovel.id,
                        },
                        include: {
                            images: true,
                        },
                    }),
                ]);
                try {
                    yield Promise.all(visitors.map((visitor) => __awaiter(this, void 0, void 0, function* () {
                        var _b, _c;
                        try {
                            yield (0, SendGrid_1.sendEmail)({
                                to: visitor.email,
                                from: 'contato@intg.com.br',
                                subject: 'Novo Imóvel Cadastrado.',
                                text: `Um novo imóvel foi cadastrado na Imobiliária ${office === null || office === void 0 ? void 0 : office.name}. Entre em contato com a imobiliária para mais detalhes.`,
                                html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 10px; overflow: hidden;">
                  <div style="background: linear-gradient(90deg, #f43b47, #453a94); padding: 20px; text-align: center;">
                    <img src="${(_b = office === null || office === void 0 ? void 0 : office.Office_Logo[office.logo_index]) === null || _b === void 0 ? void 0 : _b.url}" alt="Logo da Imobiliária" style="width: 50px; margin-bottom: 10px;">
                    <h1 style="color: white; font-size: 24px; margin: 0;">${office === null || office === void 0 ? void 0 : office.name}</h1>
                  </div>
                  <div style="padding: 20px; text-align: center;">
                    <h2 style="font-size: 20px; color: #333;">Novo imóvel cadastrado!</h2>
                    <p style="font-size: 16px; color: #555;">Confira os detalhes abaixo:</p>
                    <div style="border: 1px solid #ddd; border-radius: 10px; padding: 10px; text-align: left; margin: 20px auto; max-width: 300px;">
                      <p><strong>Imóvel:</strong> ${imovel.name}</p>
                      <p><strong>Local:</strong> ${imovel.local}</p>
                      <p><strong>Quartos:</strong> ${imovel.quartos}</p>
                      <p><strong>Banheiros:</strong> ${imovel.banheiros}</p>
                      <p><strong>Área:</strong> ${imovel.area}</p>
                    </div>
                    <img src="${(_c = imovelWithImages === null || imovelWithImages === void 0 ? void 0 : imovelWithImages.images[0]) === null || _c === void 0 ? void 0 : _c.url}" alt="Imagem do imóvel" style="width: 100%; max-width: 300px; border-radius: 10px; object-fit: cover; margin: 10px 0;">
                    <a href="https://imoveis.intg.com.br/${office === null || office === void 0 ? void 0 : office.url}/${imovel.id}" style="display: inline-block; background-color: #f43b47; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: bold;">Ver Imóvel</a>
                  </div>
                </div>
                `,
                            });
                            console.log(`E-mail enviado para ${visitor.email}`);
                        }
                        catch (error) {
                            console.error(`Erro ao enviar email para ${visitor.email}:`, error);
                        }
                    })));
                }
                catch (error) {
                    console.error('Erro ao enviar e-mails para os visitantes:', error);
                }
            }), 0.5 * 60 * 1000); // 2 minutos em milissegundos
            return imovel;
        });
    }
}
exports.CreateImovelService = CreateImovelService;
