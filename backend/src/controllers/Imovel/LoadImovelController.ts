import { Request, Response } from 'express';
import { LoadImovelService } from '../../services/Imovel/LoadImovelService';

export class LoadImovelController {
  async handle(req: Request, res: Response) {
    const loadImovelController = new LoadImovelService();

    console.log(req.body.imovelId);

    const imovel = await loadImovelController.execute(req.body.imovelId);

    return res.json(imovel);
  }
}
