import prismaClient from '../../prisma';

interface ImovelProps {
  name: string;
  description: string;
  price: string;
  local: string;
  banner: string;
  active: boolean;
  categoryId: string;
  ownerId: string;
}

export class CreateImovelService {
  async execute({
    name,
    description,
    price,
    local,
    banner,
    active,
    categoryId,
    ownerId,
  }: ImovelProps) {
    const imovel = await prismaClient.imovel.create({
      data: {
        name,
        description,
        price,
        local,
        banner,
        active,
        categoryId,
        ownerId,
      },
    });

    return CreateImovelService;
  }
}
