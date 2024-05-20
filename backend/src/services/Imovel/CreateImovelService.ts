import { PrismaClient } from '@prisma/client';

type ImovelProps = {
  name: string;
  description: string;
  price: string;
  local: string;
  quartos: string;
  banheiros: string;
  area: string;
  garagem: string;
  active: boolean;
  categoryId: string;
  ownerId: string;
};

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
    quartos,
    banheiros,
    area,
    garagem,
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
        quartos,
        banheiros,
        area,
        garagem,
        active,
        categoryId,
        ownerId,
      },
    });

    return imovel;
  }
}
