import prismaClient from '../../prisma';

interface OwnerId {
  ownerId: string;
}
export class ListAllImoveisService {
  async execute({ ownerId }: OwnerId) {
    const imoveis = await prismaClient.imovel.findMany({
      where: {
        ownerId: ownerId,
      },
      orderBy: {
        created_at: 'desc',
      },
      include: {
        images: true,
        office: true,
        realtor: true,
      },
    });
    return imoveis;
  }
}
