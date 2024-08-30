import { Request, Response } from 'express';
import { CreateOfficeService } from '../../services/Office/CreateOfficeService';

export class CreateOfficeController {
  async handle(req: Request, res: Response) {
    const {
      name,
      phone,
      address,
      address_city,
      description,
      email,
    } = req.body;

    const createOfficeService = new CreateOfficeService();

    try {
      const office = await createOfficeService.execute({
        name,
        ownerId: req.user_id,
        phone,
        description,
        address,
        address_city,
        email,
      });
      return res.json(office);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar o escritório' });
    }
  }
}
