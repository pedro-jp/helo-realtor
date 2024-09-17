import prismaClient from '../../prisma';

type OfficeRequest = {
  url: string;
};

export class GetOfficeByNameService {
  async execute({ url }: OfficeRequest) {
    console.log('Url: ' + url);
    const office = await prismaClient.office.findFirst({
      where: {
        url,
      },
      include: {
        banner_image: true,
        realtors: true,
        imoveis: {
          include: {
            images: true,
          },
        },
      },
    });

    console.log(office);
    return office;
  }
}
