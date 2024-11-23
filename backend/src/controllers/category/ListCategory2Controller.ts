import { Request, Response } from 'express';
import { ListCategory2Service } from '../../services/category/ListCategory2Service';

export class ListCategory2Controller {
  async handle(req: Request, res: Response) {
    const listCategory2service = new ListCategory2Service();
    const { officeId } = req.params;
    const category = await listCategory2service.execute(officeId);

    return res.json(category);
  }
}
