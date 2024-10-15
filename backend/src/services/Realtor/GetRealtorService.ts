import prismaClient from '../../prisma';

type RealtorType = {
  realtorId: string;
};

export class GetRealtorService {
  async execute({ realtorId }: RealtorType) {
    const realtor = await prismaClient.realtor.findUnique({
      where: {
        id: realtorId,
      },
      include: {
        office: true, // Incluir o escritório associado, se necessário
        imoveis: true, // Incluir imóveis associados a este corretor
      },
    });

    if (!realtor) {
      throw new Error('Realtor not found');
    }

    return realtor;
  }
}
