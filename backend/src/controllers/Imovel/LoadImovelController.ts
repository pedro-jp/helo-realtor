import { Request, Response } from 'express';
import { LoadImovelService } from '../../services/Imovel/LoadImovelService';

export class LoadImovelController {
  async handle(req: Request, res: Response) {
    const loadImovelController = new LoadImovelService();

    const imovel = await loadImovelController.execute(req.params.imovelId);

    return res.json(imovel);
  }
}
