import { PrismaClient } from '@prisma/client';

interface ImovelProps {
  name: string;
  description: string;
  price: string;
  local: string;
  active: boolean;
  categoryId: string;
  ownerId: string;
}

export class CreateImovelService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async execute({
    name,
    description,
    price,
    local,
    active,
    categoryId,
    ownerId,
  }: ImovelProps) {
    const imovel = await this.prisma.imovel.create({
      data: {
        name,
        description,
        price,
        local,
        active,
        categoryId,
        ownerId,
      },
    });

    return imovel;
  }
}
