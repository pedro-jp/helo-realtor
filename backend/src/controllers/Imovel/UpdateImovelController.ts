import { Request, Response } from 'express';
import { UpdateImovelService } from '../../services/Imovel/UpdateImovelService';
import { Imovel } from '../../interfaces';
import fetch from 'node-fetch';

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
      categoryId,
      marker,
      transaction,
    } = req.body as Partial<Imovel>; // Usar Partial para aceitar campos opcionais

    const { id, ownerId } = req.params;

    const updateImovelService = new UpdateImovelService();

    // Apenas os campos que são enviados no corpo serão atualizados
    const imovel = await updateImovelService.execute({
      id,
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
      marker,
      transaction,
    });

    return res.json(imovel);
  }
}
