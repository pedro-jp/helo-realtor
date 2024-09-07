import prismaClient from '../../prisma';

export class RemoveFavoriteService {
  async execute({ id }: { id: string }) {
    try {
      const fav = await prismaClient.favorites.delete({
        where: {
          id,
        },
      });

      console.log('Desfavoritado');
      return fav;
    } catch (error) {
      console.error('Error deleting favorito:', error.message);

      throw new Error('Failed to delete favorito. Please try again later.');
    }
  }
}
