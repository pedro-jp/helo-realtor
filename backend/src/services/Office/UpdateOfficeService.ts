import prismaClient from '../../prisma';

interface OfficeRequest {
  name: string;
  ownerId: string;
  phone: string;
  address: string;
  address_city: string;
  description: string;
  email: string;
  officeId: string;
}

// Tipagem da resposta da API do Google Geocoding
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

export class UpdateOfficeService {
  async execute({
    name,
    ownerId,
    phone,
    description,
    address,
    address_city,
    email,
    officeId,
  }: OfficeRequest) {
    // Obtenha as coordenadas do endereço atualizado
    const coordinates = await this.getCoordinatesFromAddress(
      `${address}, ${address_city}`
    );

    // Atualiza o escritório com as novas informações e coordenadas
    const office = await prismaClient.office.update({
      where: {
        id: officeId,
      },
      data: {
        name,
        phone,
        address,
        address_city,
        description,
        email,
        latitude: coordinates ? coordinates.lat.toString() : null, // Atualiza latitude como string
        longitude: coordinates ? coordinates.lng.toString() : null, // Atualiza longitude como string
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
