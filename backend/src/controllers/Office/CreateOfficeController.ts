import { Request, Response } from 'express';
import { CreateOfficeService } from '../../services/Office/CreateOfficeService';

export class CreateOfficeController {
  async handle(req: Request, res: Response) {
    const { name, phone, location, description } = req.body;
    const createOfficeService = new CreateOfficeService();
    const office = await createOfficeService.execute({
      name,
      ownerId: req.user_id,
      phone,
      location,
      description,
    });
    return res.json(office);
  }
}
