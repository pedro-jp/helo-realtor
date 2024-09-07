import { Request, Response } from 'express';
import { RemoveFavoriteService } from '../../services/favorites/RemoveFavoriteService';

export class RemoveFavoriteController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'ID is required' });
    }

    const removeImage = new RemoveFavoriteService();

    try {
      const image = await removeImage.execute({ id });

      if (!image) {
        return res.status(404).json({ error: 'Image not found' });
      }

      return res.json(image);
    } catch (error) {
      console.error('Error deleting image:', error.message);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
