import { Request, Response } from 'express';
import { ListAllImoveisService } from '../../services/Imovel/ListAllImoveisService';

export class ListAllImoveisController {
  async handle(req: Request, res: Response) {
    const listImoveisService = new ListAllImoveisService();
    const ownerId = req.params.ownerId;

    const imoveis = await listImoveisService.execute({ ownerId });

    return res.json(imoveis);
  }
}
