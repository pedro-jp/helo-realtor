import { Request, Response } from 'express';
import UpdateRealtorService from '../../services/Realtor/UpdateRealtorService';

export class UpdateRealtorController {
  async handle(req: Request, res: Response) {
    const { name, email, phone, creci, whatsapp_message, officeId } = req.body;
    const { realtorId } = req.params; // Recebe realtorId como parâmetro da rota

    const updateRealtorService = new UpdateRealtorService();

    try {
      const realtor = await updateRealtorService.execute({
        name,
        email,
        phone,
        creci,
        whatsapp_message,
        realtorId,
        officeId,
      });
      return res.json(realtor);
    } catch (error) {
      return res
        .status(500)
        .json({ error: error.message || 'Erro ao atualizar o corretor' });
    }
  }
}
