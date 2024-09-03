import { Request, Response } from 'express';
import { RemoveImovelService } from '../../services/Imovel/RemoveImovelService';

export class RemoveImovelController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const removeImovel = new RemoveImovelService();

    try {
      const imovel = await removeImovel.execute({ id });

      return res.json(imovel);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
