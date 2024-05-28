import prismaClient from '../../prisma';

import { ImovelExtended } from '../../interfaces';

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
  }: ImovelExtended) {
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
