import { Request, Response } from 'express';
import { ListCategoryService } from '../../services/category/ListCategoryService';

export class ListCategoryController {
  async handle(req: Request, res: Response) {
    const listCategoryservice = new ListCategoryService();
    const ownerId = req.params.ownerId;
    const name = req.body.name;
    const category = await listCategoryservice.execute(ownerId, name);

    return res.json(category);
  }
}
