import prismaClient from '../../prisma';

type OfficeRequest = {
  url: string;
};

export class GetOfficeByNameService {
  async execute({ url }: OfficeRequest) {
    // Faz a consulta ao Office e ao Owner associado
    const office = await prismaClient.office.findFirst({
      where: {
        url,
        owner: {
          planIsActive: true,
        },
      },
      include: {
        banner_image: true,
        realtors: true,
        Office_Logo: true,
        owner: {
          select: {
            categories: true,
          },
        },
        imoveis: {
          where: {
            active: true, // Filtra apenas imóveis ativos
          },
          include: {
            images: true,
          },
        },
      },
    });
    // Verifica se o office foi encontrado
    if (office) {
      return office;
    }

    // Verifica se o plano do proprietário (owner) está ativo
  }
}
