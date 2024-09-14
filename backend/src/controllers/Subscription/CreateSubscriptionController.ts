import { CreateSubscriptionService } from '../../services/Subscription/CreateSubscriptionService';

class CreateSubscriptionController {
  async handle(req, res) {
    const { email, priceId } = req.body;
    const service = new CreateSubscriptionService();
    const result = await service.execute({ email, priceId });
    return res.json(result);
  }
}

export { CreateSubscriptionController };
