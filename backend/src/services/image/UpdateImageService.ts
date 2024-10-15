import prismaClient from '../../prisma';

interface ImageUpdate {
  id: string;
  url: string;
}

export class UpdateImageService {
  async execute({ id, url }: ImageUpdate) {
    const image = await prismaClient.images.update({
      where: {
        id: id,
      },
      data: {
        url,
      },
    });
    return image;
  }
}
