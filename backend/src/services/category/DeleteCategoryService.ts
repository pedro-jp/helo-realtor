import prismaClient from '../../prisma';

export class DeleteCategoryService {
  async execute(id: string) {
    const deletedCategory = await prismaClient.category.delete({
      where: {
        id: id,
      },
    });

    return deletedCategory;
  }
}
