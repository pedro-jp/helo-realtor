import prismaClient from '../../prisma';

export class RemoveImageService {
  async execute({ id }: { id: string }) {
    try {
      const image = await prismaClient.images.delete({
        where: {
          id,
        },
      });

      return image.url;
    } catch (error) {
      console.error('Error deleting image:', error.message);

      throw new Error('Failed to delete image. Please try again later.');
    }
  }
}
