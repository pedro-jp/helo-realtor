import prismaClient from '../../prisma';

interface OwnerId {
  ownerId: string;
}
export class ListImoveisService {
  async execute({ ownerId }: OwnerId) {
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
