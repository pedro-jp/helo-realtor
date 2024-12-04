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
exports.CheckoutController = void 0;
const CreateCheckoutSection_1 = require("../../services/CreateCheckoutSection/CreateCheckoutSection");
class CheckoutController {
    // Método handle para processar a requisição
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, priceId } = req.body;
            try {
                // Chama o serviço para criar a sessão de checkout
                const checkoutUrl = yield CreateCheckoutSection_1.checkoutService.createCheckoutSession({
                    email,
                    priceId,
                });
                // Retorna a URL da sessão de checkout
                return res.json({ checkoutUrl });
            }
            catch (error) {
                console.error('Erro no controlador de checkout:', error);
                return res.status(500).json({ error: error.message });
            }
        });
    }
}
exports.CheckoutController = CheckoutController;
