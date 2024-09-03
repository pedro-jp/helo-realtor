import { Request, Response } from 'express';
import { ListImagesService } from '../../services/image/ListImagesService';

export class ListImagesController {
  async handle(req: Request, res: Response) {
    const id = req.params.id;
    const listImagesService = new ListImagesService();

    const images = await listImagesService.execute(id);
    return res.json(images);
  }
}
