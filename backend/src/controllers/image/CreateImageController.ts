import { Request, Response } from 'express';
import { CreateImageService } from '../../services/image/CreateImageService';

export default class CreateImageController {
  async handle(req: Request, res: Response) {
    const { imovelId } = req.body;

    const createImageServices = new CreateImageService();

    if (!req.file) {
      throw new Error('error upload file');
    } else {
      const { originalname, filename: url } = req.file;

      console.log(originalname, url);

      const image = await createImageServices.execute({
        imovelId,
        url,
      });
      return res.json(image);
    }
  }
}
