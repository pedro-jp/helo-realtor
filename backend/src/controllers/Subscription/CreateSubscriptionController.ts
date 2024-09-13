import { CreateSubscriptionService } from '../../services/Subscription/CreateSubscriptionService';

class CreateSubscriptionController {
  async handle(req, res) {
    const { email } = req.body;
    const service = new CreateSubscriptionService();
    const result = await service.execute({ email });
    return res.json(result);
  }
}

export { CreateSubscriptionController };
