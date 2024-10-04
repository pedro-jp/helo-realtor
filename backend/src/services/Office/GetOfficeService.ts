import prismaClient from '../../prisma';

type OwnerType = {
  ownerId: string;
};

export class GetOfficeService {
  async execute({ ownerId }: OwnerType) {
    const office = await prismaClient.office.findFirst({
      where: {
        ownerId,
        owner: {
          planIsActive: true,
        },
      },
      include: {
        banner_image: true,
        realtors: true,
        imoveis: true,
      },
    });

    if (!office) {
      return null;
    }

    if (office) {
      return office;
    }
  }
}
