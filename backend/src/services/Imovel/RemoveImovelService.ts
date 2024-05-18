import prismaClient from '../../prisma';

interface ImovelRequest {
  imovel_id: string;
}

export class RemoveImovelService {
  async execute({ imovel_id }: ImovelRequest) {
    const imovel = await prismaClient.imovel.delete({
      where: {
        id: imovel_id,
      },
    });

    return imovel;
  }
}
