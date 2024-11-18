import { Request, Response } from 'express';
import { CreateBannerOfficeService } from '../../services/image/CreateBannerOfficeService';

export default class CreateLogoOfficeController {
  async handle(req: Request, res: Response) {
    const { officeId, imageUrl } = req.body;

    const createBannerOfficeService = new CreateBannerOfficeService();

    try {
      const image = await createBannerOfficeService.execute({
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
