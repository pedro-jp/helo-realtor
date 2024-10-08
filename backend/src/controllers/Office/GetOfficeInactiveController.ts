import { Request, Response } from 'express';
import { GetOfficeInactiveService } from '../../services/Office/GetOfficeInactiveService';

export class GetOfficeInactiveController {
  async handle(req: Request, res: Response) {
    const { ownerId } = req.params;
    const getOfficeInactiveController = new GetOfficeInactiveService();
    const office = await getOfficeInactiveController.execute({ ownerId });

    return res.json(office);
  }
}
