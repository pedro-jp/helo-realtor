import prismaClient from '../../prisma';

export class ListCategory2Service {
  async execute(officeId: string) {
    const office = await prismaClient.office.findFirst({
      where: {
        id: officeId,
      },
    });

    const ownerId = office.ownerId;

    const category = await prismaClient.category.findMany({
      where: {
        ownerId,
      },
    });
    return category;
  }
}
