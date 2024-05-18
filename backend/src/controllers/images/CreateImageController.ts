import { Request, Response } from 'express';
import CreateImageService from '../../services/image/CreateImageService';

class CreateImageController {
  async handle(req: Request, res: Response) {
    const { images } = req.files;
    const createImageService = new CreateImageService();
    try {
      const imageDatas = await createImageService.execute({ images });
      res.json(imageDatas);
    } catch (error) {
      res.status(500).json({ error: 'Failed to upload images' });
    }
  }
}

export default CreateImageController;