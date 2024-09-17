import prismaClient from '../../prisma';

interface OfficeId {
  office: string;
}
export class ListImoveisByNameService {
  async execute({ office }: OfficeId) {
    console.log('id:', office);
    const imoveis = await prismaClient.imovel.findMany({
      where: {
        active: true,
        officeId: office,
      },

      include: {
        images: true,
        office: true,
        realtor: true,
      },
    });
    console.table(imoveis);
    return imoveis;
  }
}
