import { Request, Response } from 'express';
import { RemoveImovelService } from '../../services/Imovel/RemoveImovelService';

export class RemoveImovelController {
  async handle(req: Request, res: Response) {
    const imovel_id = req.query.Imovel_id as string;

    const removeImovel = new RemoveImovelService();

    const imovel = await removeImovel.execute({
      imovel_id,
    });

    return res.json(imovel);
  }
}
