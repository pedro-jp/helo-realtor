import prismaClient from '../../prisma';

export class ListImoveisByNameService {
  async execute(ownerId: string) {
    const imoveis = await prismaClient.imovel.findMany({
      where: {
        active: true,
        ownerId,
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
    console.log('oi');
    return imoveis;
  }
}
