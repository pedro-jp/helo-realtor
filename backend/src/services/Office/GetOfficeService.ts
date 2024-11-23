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
        Office_Logo: true,
        realtors: true,
        imoveis: true,
        owner: {
          select: {
            categories: true,
          },
        },
      },
    });
    if (!office) {
      console.log('Office not found');
      return null;
    }

    if (office) {
      return office;
    }
  }
}
