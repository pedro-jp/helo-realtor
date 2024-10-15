import prismaClient from '../../prisma';

export class RemoveImovelService {
  async execute({ id }: { id: string }) {
    console.log(id);
    const imovel = await prismaClient.imovel.delete({
      where: {
        id,
      },
    });

    return imovel;
  }
}
