import { Request, Response } from 'express';
import { ListImoveisService } from '../../services/Imovel/ListImoveisService';

export class ListImoveisController {
  async handle(req: Request, res: Response) {
    const listImoveisService = new ListImoveisService();

    const imoveis = await listImoveisService.execute(req.user_id);

    return res.json(imoveis);
  }
}
