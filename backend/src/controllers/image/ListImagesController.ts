import { Request, Response } from 'express';
import { ListImagesService } from '../../services/image/ListImagesService';

export class ListImagesController {
  async handle(req: Request, res: Response) {
    const listImagesService = new ListImagesService();

    const images = await listImagesService.execute(req.body.imovelId);

    return res.json(images);
  }
}
