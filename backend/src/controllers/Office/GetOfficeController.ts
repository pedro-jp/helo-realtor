import { Request, Response } from 'express';
import { GetOfficeService } from '../../services/Office/GetOfficeService';

export class GetOfficeController {
  async handle(req: Request, res: Response) {
    const { ownerId } = req.params;
    const getOfficeController = new GetOfficeService();
    const office = await getOfficeController.execute({ ownerId });

    return res.json(office);
  }
}
