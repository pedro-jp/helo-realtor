import { PrismaClient } from '@prisma/client';

interface ImovelProps {
  name: string;
  description: string;
  price: string;
  local: string;
  images: imagesProps[] | any;
  active: boolean;
  categoryId: string;
  ownerId: string;
}

interface imagesProps {
  id: string;
  imovelId: string;
  url: string;
  created_at: string;
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
    images,
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
        images,
        active,
        categoryId,
        ownerId,
      },
    });

    return imovel;
  }
}
