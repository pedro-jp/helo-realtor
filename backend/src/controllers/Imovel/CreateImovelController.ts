import { Request, Response } from 'express';
import { CreateImovelService } from '../../services/Imovel/CreateImovelService';
import fetch from 'node-fetch';

export class CreateImovelController {
  async handle(req: Request, res: Response) {
    const {
      name,
      description,
      price,
      local,
      quartos,
      banheiros,
      area,
      garagem,
      active,
      categoryId,
      ownerId,
      realtorId,
      officeId,
      marker,
      transaction,
    } = req.body;

    // Busca as coordenadas baseadas no local usando a função estática
    const coordinates = await CreateImovelController.getCoordinatesFromLocal(
      local
    );
    if (!coordinates) {
      return res.status(400).json({
        error:
          'Não foi possível encontrar as coordenadas para o local informado',
      });
    }

    const createImovelService = new CreateImovelService();

    const imovel = await createImovelService.execute({
      name,
      description,
      price,
      local,
      quartos,
      banheiros,
      area,
      garagem,
      active,
      categoryId,
      ownerId,
      realtorId,
      officeId,
      latitude: coordinates.lat.toString(),
      longitude: coordinates.lng.toString(),
      marker,
      transaction,
    });

    return res.json(imovel);
  }

  // Torna a função estática para que o 'this' não seja necessário
  static async getCoordinatesFromLocal(
    local: string
  ): Promise<{ lat: number; lng: number } | null> {
    try {
      const apiKey = 'AIzaSyCXUysejG26jQvuyCl6arN8ueQYVR4MLqo';
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          local
        )}&key=${apiKey}`
      );
      const data = await response.json();

      if (data.status === 'OK' && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        return { lat, lng };
      }

      console.error('Erro ao buscar coordenadas:', data);
      return null;
    } catch (error) {
      console.error('Erro na requisição para a API de Geocoding:', error);
      return null;
    }
  }
}
