import { Request, Response } from 'express';
import { ListImoveisByNameService } from '../../services/Imovel/ListImoveisByNameService';
import prismaClient from '../../prisma';

export class ListImoveisByNameController {
  async handle(req: Request, res: Response) {
    const listImoveisByNameService = new ListImoveisByNameService();
    const { name } = req.params;

    const ownerId = await prismaClient.office.findFirst({
      where: {
        name,
      },
      select: {
        id: true,
      },
    });
    console.log('ownerid');
    const imoveis = await listImoveisByNameService.execute(ownerId.toString());

    return res.json(imoveis);
  }
}
