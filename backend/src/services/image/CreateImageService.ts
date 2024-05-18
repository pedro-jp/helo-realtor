import prismaClient from '../../prisma';

interface ProductRequest {
  imovelId: string;
  url: string;
}

export class CreateImageService {
  async execute({ imovelId, url }: ProductRequest) {
    const product = await prismaClient.images.create({
      data: {
        imovelId,
        url,
      },
      select: {
        imovelId: true,
        url: true,
      },
    });
    return product;
  }
}
