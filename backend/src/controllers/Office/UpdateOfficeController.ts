import { Request, Response } from 'express';
import { UpdateOfficeService } from '../../services/Office/UpdateOfficeService';

export class UpdateOfficeController {
  async handle(req: Request, res: Response) {
    const { name, phone, location, description, email } = req.body;

    const updateOfficeService = new UpdateOfficeService();

    try {
      const office = await updateOfficeService.execute({
        name,
        ownerId: req.user_id,
        officeId: req.params.officeId,
        phone,
        location,
        description,
        email,
      });
      return res.json(office);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar o escritório' });
    }
  }
}
