import prismaClient from '../../prisma';
import { ImovelExtended } from '../../interfaces';

export class UpdateImovelService {
  async execute({
    id,
    name,
    description,
    price,
    local,
    quartos,
    banheiros,
    area,
    garagem,
    active,
    ownerId,
    categoryId,
    marker,
  }: Partial<ImovelExtended> & { id: string }) {
    // Primeiro, buscamos o imóvel atual para manter os campos não enviados
    const existingImovel = await prismaClient.imovel.findUnique({
      where: { id }, // Certifique-se de usar a tipagem correta para o ID
    });

    if (!existingImovel) {
      throw new Error('Imóvel não encontrado');
    }

    // Variáveis para armazenar as coordenadas
    let latitude = existingImovel.latitude;
    let longitude = existingImovel.longitude;

    // Se o local foi alterado, buscar as novas coordenadas
    if (local && local !== existingImovel.local) {
      const coordinates = await this.getCoordinatesFromLocal(local);
      if (coordinates) {
        latitude = coordinates.lat;
        longitude = coordinates.lng;
      }
    }

    // Atualizar apenas os campos que foram enviados no corpo da requisição
    const imovelAtualizado = await prismaClient.imovel.update({
      where: { id },
      data: {
        name: name ?? existingImovel.name, // Se o valor não foi passado, mantém o original
        description: description ?? existingImovel.description,
        price: price ?? existingImovel.price,
        local: local ?? existingImovel.local,
        quartos: quartos ?? existingImovel.quartos,
        banheiros: banheiros ?? existingImovel.banheiros,
        area: area ?? existingImovel.area,
        garagem: garagem ?? existingImovel.garagem,
        active: active ?? existingImovel.active,
        ownerId: ownerId ?? existingImovel.ownerId,
        categoryId: categoryId ?? existingImovel.categoryId,
        latitude, // Atualiza com as novas coordenadas ou mantém as existentes
        longitude, // Atualiza com as novas coordenadas ou mantém as existentes
        officeId: existingImovel.officeId, // Mantém o valor existente
        realtorId: existingImovel.realtorId, // Mantém o valor existente
        marker,
      },
    });

    return imovelAtualizado;
  }

  // Função para obter as coordenadas a partir de um endereço usando a API de Geocodificação do Google
  private async getCoordinatesFromLocal(
    local: string
  ): Promise<{ lat: string; lng: string } | null> {
    try {
      const apiKey = process.env.GOOGLE_MAPS_API_KEY; // Certifique-se de ter a chave API no .env
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          local
        )}&key=${apiKey}`
      );
      const data = await response.json();

      if (data.status === 'OK' && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        return { lat: lat.toString(), lng: lng.toString() };
      } else {
        console.error('Erro ao buscar coordenadas:', data);
        return null;
      }
    } catch (error) {
      console.error('Erro ao buscar coordenadas:', error);
      return null;
    }
  }
}
