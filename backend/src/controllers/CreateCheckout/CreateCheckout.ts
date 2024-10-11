import { Request, Response } from 'express';
import { checkoutService } from '../../services/CreateCheckoutSection/CreateCheckoutSection';

export class CheckoutController {
  // Método handle para processar a requisição
  async handle(req: Request, res: Response) {
    const { email, priceId } = req.body;

    try {
      // Chama o serviço para criar a sessão de checkout
      const checkoutUrl = await checkoutService.createCheckoutSession({
        email,
        priceId,
      });

      // Retorna a URL da sessão de checkout
      return res.json({ checkoutUrl });
    } catch (error) {
      console.error('Erro no controlador de checkout:', error);
      return res.status(500).json({ error: error.message });
    }
  }
}
