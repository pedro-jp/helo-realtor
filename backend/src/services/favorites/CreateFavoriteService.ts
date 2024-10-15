import prismaClient from '../../prisma';

interface FavoriteRequest {
  imovelId: string;
  ip: string;
}

export class CreateFavoriteService {
  async execute({ imovelId, ip }: FavoriteRequest) {
    // Verificar se o IP já favoritou o imóvel
    const existingFavorite = await prismaClient.favorites.findFirst({
      where: {
        imovelId,
        ip,
      },
    });

    if (existingFavorite) {
      throw new Error('Este imóvel já foi favoritado por este IP.');
    }

    // Criar o favorito com o IP
    const fav = await prismaClient.favorites.create({
      data: {
        imovelId,
        ip,
      },
    });

    // Calcular o total de favoritos do imóvel
    const totalFavorites = await prismaClient.favorites.count({
      where: {
        imovelId,
      },
    });

    return { fav, totalFavorites };
  }
}
