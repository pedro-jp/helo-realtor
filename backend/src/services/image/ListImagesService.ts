import prismaClient from '../../prisma';

class ListImagesService {
  async execute(imovelId: string) {
    const images = await prismaClient.images.findMany({
      where: {
        imovelId: imovelId,
      },

      orderBy: {
        created_at: 'asc',
      },
    });

    return images;
  }
}

export { ListImagesService };
