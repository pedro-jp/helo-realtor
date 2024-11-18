import { Request, Response } from 'express';
import { UpdateOfficeService } from '../../services/Office/UpdateOfficeService';

export class UpdateOfficeController {
  async handle(req: Request, res: Response) {
    const {
      name,
      phone,
      address,
      address_city,
      description,
      email,
      logo_index,
      banner_index,
    } = req.body;

    const updateOfficeService = new UpdateOfficeService();

    try {
      const office = await updateOfficeService.execute({
        name,
        ownerId: req.user_id,
        officeId: req.params.officeId,
        phone,
        description,
        address,
        address_city,
        email,
        logo_index,
        banner_index,
      });
      return res.json(office);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar o escritório' });
    }
  }
}
