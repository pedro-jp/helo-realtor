import prismaClient from '../../prisma';

interface OfficeRequest {
  name: string;
  ownerId: string;
  phone: string;
  address: string;
  address_city: string;
  description: string;
  email: string;
}

export class CreateOfficeService {
  async execute({
    name,
    ownerId,
    phone,
    description,
    address,
    address_city,
    email,
  }: OfficeRequest) {
    // Obtenha as coordenadas do endereço
    const coordinates = await this.getCoordinatesFromAddress(
      `${address}, ${address_city}`
    );

    const url = name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '')
      .replace(/[^\w-]+/g, '');

    const office = await prismaClient.office.create({
      data: {
        name,
        ownerId,
        phone,
        description,
        address,
        address_city,
        email,
        url,
        latitude: coordinates ? coordinates.lat.toString() : null, // Converte latitude para string
        longitude: coordinates ? coordinates.lng.toString() : null, // Converte longitude para string
      },
      select: {
        id: true,
        ownerId: true,
        banner_image: true,
      },
    });
    return office;
  }

  // Função para obter coordenadas a partir do endereço usando a API de Geocodificação do Google
  private async getCoordinatesFromAddress(
    address: string
  ): Promise<{ lat: number; lng: number } | null> {
    try {
      const apiKey = process.env.GOOGLE_MAPS_API_KEY;
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=${apiKey}`
      );
      const data = await response.json();

      if (data.status === 'OK' && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        return { lat, lng };
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
