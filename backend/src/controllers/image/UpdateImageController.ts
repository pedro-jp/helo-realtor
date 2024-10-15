import { Request, Response } from 'express';
import { UpdateImageService } from '../../services/image/UpdateImageService';

interface ImageUpdate {
  id: string;
  url: string;
}

export class UpdateImageController {
  async handle(req: Request, res: Response) {
    const { url } = req.body as { url: string };
    const { id } = req.params as { id: string };

    const updateImageService = new UpdateImageService();
    const image = await updateImageService.execute({
      id,
      url,
    });

    return res.json(image);
  }
}
