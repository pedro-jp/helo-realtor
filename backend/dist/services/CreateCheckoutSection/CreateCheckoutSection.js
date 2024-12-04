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
exports.checkoutService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
exports.checkoutService = {
    createCheckoutSession(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, priceId }) {
            try {
                // Verifica se o cliente já existe no banco de dados
                const customer = yield prisma_1.default.user.findFirst({
                    where: {
                        email,
                    },
                });
                if (!customer) {
                    throw new Error('Cliente não encontrado no banco de dados.');
                }
                // Busca o cliente no Stripe usando a lista de clientes
                const customers = yield stripe.customers.list({
                    email: email, // Isso busca todos os clientes, mas filtra pelo email
                });
                const customerStripe = customers.data.find((cust) => cust.email === email);
                if (!customerStripe) {
                    throw new Error('Cliente não encontrado no Stripe.');
                }
                const customerId = customerStripe.id;
                // Cria a sessão de checkout no Stripe
                const session = yield stripe.checkout.sessions.create({
                    payment_method_types: ['card'],
                    line_items: [
                        {
                            price: priceId,
                            quantity: 1,
                        },
                    ],
                    mode: 'subscription',
                    customer: customerId, // Usa o cliente existente
                    allow_promotion_codes: true, // Adiciona o campo para inserir cupom
                    success_url: `${process.env.FRONT_APP_URL}/plans`,
                    cancel_url: `${process.env.FRONT_APP_URL}/plans`,
                });
                return session.url; // Retorna a URL da sessão
            }
            catch (error) {
                console.log(error);
                throw new Error(error.message); // Retorna apenas a mensagem de erro
            }
        });
    },
};
