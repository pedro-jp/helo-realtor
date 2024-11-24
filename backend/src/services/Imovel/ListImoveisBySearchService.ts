import prismaClient from '../../prisma';

export class ListImoveisBySearchService {
  async execute(
    url: string,
    minPrice?: string,
    maxPrice?: string,
    local?: string,
    minDormitorios?: string,
    minVagas?: string,
    category?: string,
    transaction?: string,
    page: number = 1
  ) {
    try {
      const filters: any = {
        active: true,
      };

      // Adicionar filtro de preço mínimo
      if (minPrice) {
        filters.price = { ...filters.price, gte: Number(minPrice) };
      }

      // Adicionar filtro de preço máximo
      if (maxPrice) {
        filters.price = { ...filters.price, lte: Number(maxPrice) };
      }

      // Adicionar filtro de quartos mínimos
      if (minDormitorios) {
        filters.quartos = { gte: Number(minDormitorios) };
      }

      // Adicionar filtro de vagas mínimas
      if (minVagas) {
        filters.garagem = { gte: Number(minVagas) };
      }

      if (category && category !== 'null') {
        filters.categoryId = category;
      }

      if (transaction && transaction !== 'null') {
        filters.transaction = {
          equals: transaction,
          mode: 'insensitive',
        };
      }

      // Adicionar filtro de local (apenas se local for diferente de 'null')
      if (local && local !== 'null') {
        filters.local = {
          contains: local,
          mode: 'insensitive',
        };
      }

      const limit = 30;
      const skip = (page - 1) * limit;

      const imoveis = await prismaClient.office.findUnique({
        where: {
          url,
        },
        select: {
          imoveis: {
            where: filters,
            include: {
              images: true,
              realtor: true,
            },
            take: limit,
            skip,
          },
        },
      });

      const imoveisCount = await prismaClient.office.findUnique({
        where: {
          url,
        },
        select: {
          imoveis: {
            where: filters,
          },
        },
      });

      const res = {
        imoveis: imoveis?.imoveis,
        totalPages: Math.ceil(imoveisCount?.imoveis.length / limit),
        sended: imoveis?.imoveis.length,
      };

      console.log('Imóveis retornados com filtros dinâmicos:', res);

      return res || [];
    } catch (error) {
      console.error('Erro ao buscar imóveis:', error);
      throw new Error('Erro ao buscar imóveis.');
    }
  }
}
