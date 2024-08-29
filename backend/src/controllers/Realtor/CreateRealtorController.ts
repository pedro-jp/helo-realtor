import { Request, Response } from 'express';
import { CreateRealtorService } from '../../services/Realtor/CreateRealtorService';

export class CreateRealtorController {
  async handle(req: Request, res: Response) {
    const { name, email, phone, creci, whatsapp_message } = req.body;
    const { officeId } = req.params;

    const createRealtorService = new CreateRealtorService();

    try {
      const realtor = await createRealtorService.execute({
        name,
        email,
        phone,
        creci,
        whatsapp_message,
        officeId,
      });
      return res.json(realtor);
    } catch (error) {
      return res
        .status(500)
        .json({ error: error.message || 'Erro ao criar o corretor' });
    }
  }
}
