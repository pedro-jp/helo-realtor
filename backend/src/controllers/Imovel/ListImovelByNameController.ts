import { Request, Response } from 'express';
import { ListImoveisByNameService } from '../../services/Imovel/ListImoveisByNameService';
import prismaClient from '../../prisma';

export class ListImoveisByNameController {
  async handle(req: Request, res: Response) {
    const listImoveisByNameService = new ListImoveisByNameService();
    const { url } = req.params;

    const owner = await prismaClient.office.findUnique({
      where: {
        url,
      },
      select: {
        id: true,
        name: true,
      },
    });

    const office = owner.id;

    const imoveis = await listImoveisByNameService.execute({ office });
    console.log('url', url);
    console.log('owner', owner.name);
    return res.json(imoveis);
  }
}
