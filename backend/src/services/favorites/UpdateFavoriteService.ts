import prismaClient from '../../prisma';

interface Favorite {
  id: string;
  ip: string;
}

export class UpdateFavoriteService {
  async execute({ id, ip }: Favorite) {
    const fav = await prismaClient.favorite.update({
      where: {
        id: id,
      },
      data: {
        ip,
      },
    });
    return fav;
  }
}
