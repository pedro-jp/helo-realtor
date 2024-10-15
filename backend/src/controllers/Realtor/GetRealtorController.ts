import { Request, Response } from 'express';
import { GetRealtorService } from '../../services/Realtor/GetRealtorService';

export class GetRealtorController {
  async handle(req: Request, res: Response) {
    const { realtorId } = req.params;

    const getRealtorService = new GetRealtorService();

    try {
      const realtor = await getRealtorService.execute({ realtorId });
      return res.json(realtor);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }
}
