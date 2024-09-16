import prismaClient from '../../prisma';

type OwnerType = {
  name: string;
};

export class GetOfficeByNameService {
  async execute(url: string) {
    const office = await prismaClient.office.findFirst({
      where: {
        url,
      },
      include: {
        banner_image: true,
        realtors: true,
        imoveis: true,
      },
    });
    return office;
  }
}
