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
exports.WebhookService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
class WebhookService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ req, res }) {
            const sig = req.headers['stripe-signature'];
            let event;
            try {
                // Use the raw body stored in req.rawBody
                event = stripe.webhooks.constructEvent(req.rawBody, // This should be the raw body as a string
                sig, process.env.STRIPE_WEBHOOK_SECRET);
            }
            catch (err) {
                console.error(`Webhook Error: ${err.message}`);
                return res.status(400).send(`Webhook Error: ${err.message}`);
            }
            // Handle the event
            switch (event.type) {
                case 'checkout.session.completed':
                    console.log('Checkout session completed', event.data.object);
                    const session = event.data.object;
                    const email = session.customer_details.email;
                    const usuario = yield prisma_1.default.user.findFirst({
                        where: {
                            email: email,
                        },
                    });
                    if (!session.customer) {
                        console.error('Stripe customer ID is missing in the session');
                        return res.status(400).json({ error: 'Missing customer ID' });
                    }
                    try {
                        // Fetch the customer directly from Stripe
                        const customer = yield stripe.customers.retrieve(session.customer);
                        // Retrieve invoice and line items
                        const invoice = yield stripe.invoices.retrieve(session.invoice);
                        const lineItems = invoice.lines.data;
                        const priceID = lineItems.length > 0 ? lineItems[0].price.id : null;
                        const newSubscriptionId = session.subscription;
                        if (usuario) {
                            // List active subscriptions
                            const subscriptions = yield stripe.subscriptions.list({
                                customer: customer.id,
                                status: 'active',
                            });
                            console.log(usuario);
                            // Pause old subscriptions except the new one
                            for (const subscription of subscriptions.data) {
                                if (subscription.id !== newSubscriptionId) {
                                    yield stripe.subscriptions.update(subscription.id, {
                                        pause_collection: {
                                            behavior: 'void', // Pausa a cobranÃ§a e impede futuras
                                        },
                                    });
                                    console.log(`Assinatura ${subscription.id} pausada`);
                                }
                            }
                            // for (const subscription of subscriptions.data) {
                            //   if (subscription.id !== newSubscriptionId) {
                            //     await stripe.subscriptions.remove(subscription.id);
                            //     console.log(`Assinatura ${subscription.id} removida`);
                            //   }
                            // }
                            // Update the user in the database
                            const updatedUser = yield prisma_1.default.user.update({
                                where: {
                                    email: email,
                                },
                                data: {
                                    subscriptionId: session.subscription.id,
                                    planIsActive: true,
                                    priceId: priceID,
                                },
                            });
                            console.log('Nova assinatura criada e usuÃ¡rio atualizado:', updatedUser);
                        }
                    }
                    catch (error) {
                        console.error('Erro ao processar a assinatura:', error.message);
                        return res
                            .status(500)
                            .json({ error: 'Erro ao processar a assinatura' });
                    }
                    break;
                case 'payment_intent.succeeded':
                    const paymentIntent = event.data.object;
                    if (paymentIntent.invoice) {
                        try {
                            const invoice = yield stripe.invoices.retrieve(paymentIntent.invoice);
                            const lineItems = invoice.lines.data;
                            const priceID = lineItems.length > 0 ? lineItems[0].price.id : null;
                            // FunÃ§Ã£o para atualizar a assinatura do usuÃ¡rio no banco de dados
                            function updateSubscription(email, invoice, priceID) {
                                return __awaiter(this, void 0, void 0, function* () {
                                    try {
                                        return yield prisma_1.default.user.update({
                                            where: {
                                                email,
                                            },
                                            data: {
                                                paymentStatus: 'succeeded', // Marcar o pagamento como bem-sucedido
                                                subscriptionId: invoice.subscription, // Atualizar com o novo ID de assinatura
                                                priceId: priceID, // Armazenar o priceID
                                                planIsActive: true, // Marcar o plano como ativo
                                            },
                                        });
                                    }
                                    catch (error) {
                                        console.log('Erro ao atualizar a assinatura:', error);
                                        throw new Error('Erro ao atualizar a assinatura');
                                    }
                                });
                            }
                            try {
                                // Atualizar a assinatura do usuÃ¡rio
                                const updatedUser = yield updateSubscription(invoice.customer_email, invoice, priceID);
                                console.log(updatedUser);
                                const ico = invoice.customer;
                                return res.json({ received: true, updatedUser, priceID, ico });
                            }
                            catch (error) {
                                console.error('Erro ao processar o pagamento:', error.message);
                                return res
                                    .status(500)
                                    .json({ error: 'Erro interno ao processar o pagamento' });
                            }
                        }
                        catch (error) {
                            console.error('Erro ao processar o pagamento:', error.message);
                            return res
                                .status(500)
                                .json({ error: 'Erro interno ao processar o pagamento' });
                        }
                    }
                    else {
                        console.log('Nenhuma fatura associada encontrada.');
                        return res.status(400).json({ error: 'Nenhuma fatura associada' });
                    }
                case 'customer.subscription.deleted':
                    const subscriptionDeleted = event.data.object;
                    try {
                        if (subscriptionDeleted.latest_invoice) {
                            const invoice = yield stripe.invoices.retrieve(subscriptionDeleted.latest_invoice);
                            const lineItems = invoice.lines.data;
                            const priceID = lineItems.length > 0 ? lineItems[0].price.id : null;
                            const usuario = yield prisma_1.default.user.findFirst({
                                where: {
                                    email: invoice.customer_email,
                                },
                            });
                            const updatedUser = yield prisma_1.default.user.update({
                                where: {
                                    email: invoice.customer_email,
                                },
                                data: {
                                    paymentStatus: 'canceled', // Altera o status do pagamento para cancelado
                                    subscriptionId: '', // Remove o subscriptionId pois foi cancelada
                                    priceId: '', // Atualiza o priceID, se necessÃ¡rio
                                    planIsActive: false, // Define o plano como inativo
                                },
                            });
                            console.log('222222222222222222');
                            return res.json({ received: true, updatedUser, priceID });
                        }
                        else {
                            console.log('Nenhum invoice associado foi encontrado.');
                        }
                    }
                    catch (error) {
                        console.error(`Erro no processamento do cancelamento da assinatura: ${error.message}`);
                        return res.status(500).json({ error: 'Erro interno no servidor' });
                    }
                    break;
                default:
                    console.log(`Unhandled event type ${event.type}`);
            }
            res.json({ received: true });
        });
    }
}
exports.WebhookService = WebhookService;