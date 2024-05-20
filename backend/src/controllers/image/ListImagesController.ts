import { Request, Response } from 'express';
import { ListImagesService } from '../../services/image/ListImagesService';

export class ListImagesController {
  async handle(req: Request, res: Response) {
    const { imovelId } = req.body;
    const listImagesService = new ListImagesService();

    const images = await listImagesService.execute(imovelId);

    return res.json(images);
  }
}
