import { Request, Response } from 'express';
import { UpdateImovelService } from '../../services/Imovel/UpdateImovelService';

import { Imovel } from '../../interfaces';

export class UpdateImovelController {
  async handle(req: Request, res: Response) {
    const {
      name,
      description,
      price,
      local,
      quartos,
      banheiros,
      area,
      garagem,
      active,
      ownerId,
      categoryId,
    } = req.body as Imovel;

    const id = req.params.id;
    const updateImovelService = new UpdateImovelService();
    const imovel = await updateImovelService.execute({
      name,
      description,
      price,
      local,
      quartos,
      banheiros,
      area,
      garagem,
      active,
      ownerId,
      categoryId,
      id,
    });
    return res.json(imovel);
  }
}
