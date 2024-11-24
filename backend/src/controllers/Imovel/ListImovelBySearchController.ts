import { Request, Response } from 'express';
import { ListImoveisBySearchService } from '../../services/Imovel/ListImoveisBySearchService';

export class ListImovelBySearchController {
  async handle(req: Request, res: Response) {
    const listImoveisBySearchService = new ListImoveisBySearchService();
    const {
      url,
      address,
      minPrice,
      maxPrice,
      minDormitorios,
      minVagas,
      category,
      transaction,
      page,
    } = req.params;
    const local = address;
    const pageNumber = Number(page);
    const imoveis = await listImoveisBySearchService.execute(
      url,
      minPrice,
      maxPrice,
      local,
      minDormitorios,
      minVagas,
      category,
      transaction,
      pageNumber
    );
    return res.json(imoveis);
  }
}
