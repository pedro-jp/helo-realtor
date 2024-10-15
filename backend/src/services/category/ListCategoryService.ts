import prismaClient from '../../prisma';

export class ListCategoryService {
  async execute(ownerId: string, name: string) {
    const category = await prismaClient.category.findMany({
      where: {
        ownerId,
      },
    });
    return category;
  }
}
