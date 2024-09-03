import prismaClient from '../../prisma';

import { Imovel } from '../../interfaces';

export class UpdateImovelService {
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
    id,
  }: Imovel) {
    const imovel = await prismaClient.imovel.update({
      where: {
        id: id,
      },
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
      },
    });
    return imovel;
  }
}
