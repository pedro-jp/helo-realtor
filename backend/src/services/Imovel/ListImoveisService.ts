import prismaClient from '../../prisma';

export class ListImoveisService {
  async execute(ownerId: string) {
    const imoveis = await prismaClient.imovel.findMany({
      where: {
        active: true,
        ownerId: ownerId,
      },
      orderBy: {
        created_at: 'desc',
      },
      include: {
        images: true,
      },
    });
    return imoveis;
  }
}
