import { Request, Response } from 'express';
import { UpdateOfficeService } from '../../services/Office/UpdateOfficeService';

export class UpdateOfficeController {
  async handle(req: Request, res: Response) {
    const { name, phones, location, description } = req.body;
    const updateOfficeService = new UpdateOfficeService();
    const office = await updateOfficeService.execute({
      name,
      ownerId: req.user_id,
      phones,
      location,
      description,
    });
    return res.json(office);
  }
}
