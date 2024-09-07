import { Request, Response } from 'express';
import { CreateFavoriteService } from '../../services/favorites/CreateFavoriteService';

export class CreateFavoriteController {
  async handle(req: Request, res: Response) {
    const { imovelId, ip } = req.params;

    const createFavoriteService = new CreateFavoriteService();

    try {
      const result = await createFavoriteService.execute({
        imovelId,
        ip,
      });
      return res.json(result);
    } catch (error) {
      console.error('Error favoriting property:', error);
      return res.status(400).json({ error: error.message });
    }
  }
}
