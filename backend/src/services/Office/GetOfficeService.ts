import prismaClient from '../../prisma';

type OwnerType = {
  ownerId: string;
};

export class GetOfficeService {
  async execute({ ownerId }: OwnerType) {
    const office = await prismaClient.office.findFirst({
      where: {
        ownerId,
      },
      include: {
        banner_image: true,
        realtors: true,
        imoveis: true,
      },
    });
    console.log(office);
    return office;
  }
}
