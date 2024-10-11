import { Request, Response } from 'express';
import { ListImoveisByNameService } from '../../services/Imovel/ListImoveisByNameService';
import prismaClient from '../../prisma';

export class ListImoveisByNameController {
  async handle(req: Request, res: Response) {
    const listImoveisByNameService = new ListImoveisByNameService();
    const { url } = req.params;

    const imoveis = await listImoveisByNameService.execute(url);
    console.log(imoveis);
    return res.json(imoveis);
  }
}
