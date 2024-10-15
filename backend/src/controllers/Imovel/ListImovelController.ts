import { Request, Response } from 'express';
import { ListImoveisService } from '../../services/Imovel/ListImoveisService';

export class ListImoveisController {
  async handle(req: Request, res: Response) {
    const listImoveisService = new ListImoveisService();
    const ownerId = req.params.ownerId;

    const imoveis = await listImoveisService.execute({ ownerId });

    return res.json(imoveis);
  }
}
