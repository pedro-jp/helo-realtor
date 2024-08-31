import { Request, Response } from 'express';
import { CreateImageService } from '../../services/image/CreateImageService';

export default class CreateImageController {
  async handle(req: Request, res: Response) {
    const { imovelId, imageUrl } = req.body;

    const createImageService = new CreateImageService();

    try {
      const image = await createImageService.execute({
        imovelId,
        url: imageUrl,
      });
      return res.json(image);
    } catch (error) {
      console.error('Error saving image URL:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
