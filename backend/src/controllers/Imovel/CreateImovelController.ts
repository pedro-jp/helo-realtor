import { Request, Response } from 'express';
import { CreateImovelService } from '../../services/Imovel/CreateImovelService';

export class CreateImovelController {
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
      categoryId,
      ownerId,
    } = req.body;

    const createImovelService = new CreateImovelService();

    const imovel = await createImovelService.execute({
      name,
      description,
      price,
      local,
      quartos,
      banheiros,
      area,
      garagem,
      active,
      categoryId,
      ownerId,
    });
    return res.json(imovel);
  }
}
