import prismaClient from '../../prisma';

type OwnerType = {
  ownerId: string;
};

export class GetOfficeInactiveService {
  async execute({ ownerId }: OwnerType) {
    const office = await prismaClient.office.findFirst({
      where: {
        ownerId,
      },
      include: {
        Office_Logo: true,
        banner_image: true,
        realtors: true,
        imoveis: true,
      },
    });

    if (!office) {
      console.log('Office inactive not found');
      return null;
    }

    if (office) {
      return office;
    }
  }
}
