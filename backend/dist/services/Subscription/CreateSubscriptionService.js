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
exports.CreateSubscriptionService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
class CreateSubscriptionService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, priceId }) {
            let resposta = '';
            console.log('Email: ', priceId);
            try {
                // List customers with the provided email
                const customers = yield stripe.customers.list({
                    email: email,
                    limit: 1,
                });
                console.log(customers.data[0].email); // Check if any customer was found
                if (customers.data.length === 0) {
                    return console.log({ error: { message: 'Customer not found' } });
                }
                const customer = customers.data[0];
                console.log(customer.id); // Create the subscription
                const usuario = yield prisma_1.default.user.findFirst({
                    where: {
                        email,
                    },
                });
                if (usuario && usuario.priceId === priceId) {
                    return { resposta: 'Plano já contratado' };
                }
                const subscription = yield stripe.subscriptions.create({
                    customer: customer.id,
                    items: [
                        {
                            price: priceId,
                        },
                    ],
                    payment_behavior: 'default_incomplete',
                    payment_settings: { save_default_payment_method: 'on_subscription' },
                    expand: ['latest_invoice.payment_intent'],
                });
                console.log(resposta);
                return {
                    resposta,
                    subscriptionId: subscription.id,
                    clientSecret: subscription.latest_invoice.payment_intent.client_secret,
                };
            }
            catch (error) {
                return console.log({ error: { message: error.message } });
            }
        });
    }
}
exports.CreateSubscriptionService = CreateSubscriptionService;
