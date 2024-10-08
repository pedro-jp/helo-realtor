import prismaClient from '../../prisma';

// Define a tipagem do request
interface OfficeRequest {
  name: string;
  ownerId: string;
  phone: string;
  address: string;
  address_city: string;
  description: string;
  email: string;
}

// Define a tipagem da resposta da API do Google Geocoding
interface GoogleGeocodeResponse {
  status: string;
  results: Array<{
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
  }>;
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

    // Gerar a URL baseada no nome do escritório
    const url = name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '')
      .replace(/[^\w-]+/g, '');

    // Verifica se o escritório já existe
    const officeExists = await prismaClient.office.findFirst({
      where: {
        name,
        ownerId,
        email,
      },
    });

    if (officeExists) {
      throw new Error('Office already exists');
    }

    try {
      // Cria o escritório no banco de dados
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
    } catch (error) {
      console.log(error);
      throw new Error('Error creating office');
    }
  }

  // Função para obter coordenadas a partir do endereço usando a API de Geocodificação do Google
  private async getCoordinatesFromAddress(
    address: string
  ): Promise<{ lat: number; lng: number } | null> {
    try {
      const apiKey = process.env.GOOGLE_MAPS_API_KEY;
      // Importa o node-fetch dinamicamente
      const fetch = (await import('node-fetch')).default;

      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=${apiKey}`
      );
      const data = (await response.json()) as GoogleGeocodeResponse;

      // Verifica se a resposta contém resultados válidos
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
