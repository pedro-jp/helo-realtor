import { WebhookService } from '../../services/Webhook/WebhookService';

class WebhookController {
  async handle(req, res) {
    const webhookService = new WebhookService();
    const event = await webhookService.execute({ req, res });

    return console.log(event);
  }
}

export { WebhookController };
