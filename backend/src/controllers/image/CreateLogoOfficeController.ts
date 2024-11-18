import { Request, Response } from 'express';
import { CreateLogoOfficeService } from '../../services/image/CreateLogoOfficeService';

export default class CreateLogoOfficeController {
  async handle(req: Request, res: Response) {
    const { officeId, imageUrl } = req.body;

    const createLogoOfficeService = new CreateLogoOfficeService();

    try {
      const image = await createLogoOfficeService.execute({
        officeId,
        url: imageUrl,
      });
      return res.json(image);
    } catch (error) {
      console.error('Error saving image URL:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
