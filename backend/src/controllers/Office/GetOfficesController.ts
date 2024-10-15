import { Request, Response } from 'express';
import { GetOfficesService } from '../../services/Office/GetOfficesService';

export class GetOfficesController {
  async handle(req: Request, res: Response) {
    const getOfficeController = new GetOfficesService();
    const offices = await getOfficeController.execute();

    return res.json(offices);
  }
}
