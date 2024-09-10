import { PrismaClient } from '@prisma/client';
import { Imovel } from '../../interfaces';

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
    officeId,
    realtorId,
    latitude,
    longitude,
    marker,
    transaction,
  }: Imovel) {
    const imovel = await this.prisma.imovel.create({
      data: {
        name,
        description,
        local,
        price,
        quartos,
        banheiros,
        area,
        garagem,
        active,
        categoryId,
        ownerId,
        officeId,
        realtorId,
        latitude,
        longitude,
        marker,
        transaction,
      },
    });

    return imovel;
  }
}
