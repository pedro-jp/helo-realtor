import { Request, Response } from 'express';
import { ListAllImoveisBySearchService } from '../../services/Imovel/ListIAllmoveisBySearchService';

export class ListAllImovelBySearchController {
  async handle(req: Request, res: Response) {
    const listAllImoveisBySearchService = new ListAllImoveisBySearchService();
    const {
      url,
      address,
      minPrice,
      maxPrice,
      minDormitorios,
      minVagas,
      category,
      transaction,
      page
    } = req.params;
    const local = address;
    const pageNumber = Number(page);
    const imoveis = await listAllImoveisBySearchService.execute(
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
