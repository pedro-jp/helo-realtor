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
    transaction?: string
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
          },
        },
      });
      console.log(transaction);

      console.log('Imóveis retornados com filtros dinâmicos:', imoveis);

      return imoveis || [];
    } catch (error) {
      console.error('Erro ao buscar imóveis:', error);
      throw new Error('Erro ao buscar imóveis.');
    }
  }
}
