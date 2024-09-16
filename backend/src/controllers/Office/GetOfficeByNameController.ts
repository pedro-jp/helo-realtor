import { Request, Response } from 'express';
import { GetOfficeByNameService } from '../../services/Office/GetOfficeByNameService';

export class GetOfficeByNameController {
  async handle(req: Request, res: Response) {
    const { url } = req.params;
    console.log(url);
    const getOfficeByNameController = new GetOfficeByNameService();
    const office = await getOfficeByNameController.execute(url);

    return res.json(office);
  }
}
