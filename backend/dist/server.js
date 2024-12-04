"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const routes_1 = require("./routes");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const stripe = require('stripe')('sk_test_51OIWpBFkkC3ZoBrE0CdfikwVVdeBAdLEsQNKuv4cwGogWVvqZAtw2f0kp9kIngjf7PAS7VSOkosp9k16Wf5RG0fu00OKveoqD8');
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
// Use express.json() apenas para rotas que não sejam o webhook
app.use(express_1.default.json({
    verify: (req, res, buf) => {
        if (req.originalUrl === '/webhook') {
            req.rawBody = buf.toString(); // Armazena o corpo bruto como Buffer
        }
    },
}));
const swaggerDefinition = require('../swagger.json'); // Ajuste o caminho conforme necessário
const swaggerOptions = {
    swaggerDefinition,
    apis: ['./routes/*.js'],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(swaggerOptions);
app.use('/docs/pedro-jp', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
app.use(routes_1.router);
app.use('/files', express_1.default.static(path_1.default.resolve(__dirname, '..', 'tmp')));
app.use((err, req, res, next) => {
    console.log(err.message);
    if (err instanceof Error) {
        return res.status(400).json({
            error: err.message,
        });
    }
    return res.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
});
const endpointSecret = 'whsec_7dd7a5068b1369072225e294aaa103f75a124df7002c3f7f71f6e7c3b38a4bb0';
// Use express.raw() para a rota do webhook
app.post('/webhook', express_1.default.raw({ type: 'application/json' }), (request, response) => {
    const sig = request.headers['stripe-signature'];
    let event;
    try {
        // Use o corpo bruto para verificar a assinatura
        event = stripe.webhooks.constructEvent(request.rawBody, sig, endpointSecret);
    }
    catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }
    // Handle the event
    switch (event.type) {
        case 'payment_intent.payment_failed':
            const paymentIntentPaymentFailed = event.data.object;
            // Lida com o evento payment_intent.payment_failed
            break;
        case 'payment_intent.processing':
            const paymentIntentProcessing = event.data.object;
            // Lida com o evento payment_intent.processing
            break;
        case 'payment_intent.succeeded':
            const paymentIntentSucceeded = event.data.object;
            // Lida com o evento payment_intent.succeeded
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }
    // Retorna 200 para reconhecer o recebimento do evento
    response.send();
});
app.get('/', (req, res) => {
    return res.send('Stripe on');
});
app.listen(3332, () => {
    console.log('Servidor online');
});
