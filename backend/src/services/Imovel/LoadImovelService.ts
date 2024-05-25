import prismaClient from '../../prisma';

export class LoadImovelService {
  async execute(imovelId: string) {
    const imovel = await prismaClient.imovel.findFirst({
      where: {
        active: true,
        id: imovelId,
      },
      include: {
        images: true,
      },
    });
    return imovel;
  }
}
