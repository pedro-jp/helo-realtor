import prismaClient from '../../prisma';

export class ListImoveisByNameService {
  async execute(url: string) {
    try {
      const imoveis = await prismaClient.office.findUnique({
        where: {
          url,
        },
        select: {
          imoveis: {
            include: {
              images: true,
              realtor: true,
            },
          },
        },
      });

      return imoveis.imoveis;
    } catch (error) {
      console.log(error);
    }
  }
}
