import prismaClient from '../../prisma';

interface CategoryRequest {
  name: string;
  ownerId: string;
}

export class CreateCategoryService {
  async execute({ name, ownerId }: CategoryRequest) {
    if (name === '') throw new Error('name invalid');

    const categoryAlreadyExist = await prismaClient.category.findFirst({
      where: {
        name: name,
      },
    });

    if (categoryAlreadyExist) throw new Error('Category already exists');

    const category = await prismaClient.category.create({
      data: {
        name,
        ownerId,
      },
      select: {
        id: true,
        name: true,
        ownerId: true,
      },
    });
    return category;
  }
}
