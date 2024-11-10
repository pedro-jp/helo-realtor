import { ImovelType } from '../types';
import { api } from '../services/api';

const ownerId = process.env.NEXT_PUBLIC_OWNER_ID;
const url = process.env.NEXT_PUBLIC_URL;

// Função para buscar os dados dos imóveis
export async function getImoveis(url: string): Promise<ImovelType[]> {
  try {
    const response = await api.get(
      `${process.env.NEXT_PUBLIC_URL}/office/imoveis/${url}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return []; // or return null, or throw an error
  }
}

export async function getImovelData(id: string): Promise<ImovelType> {
  try {
    const response = await api.get(
      `${process.env.NEXT_PUBLIC_URL}/imovel/${id}`
    );
    return response.data;
  } catch (err) {
    console.log('Erro ao buscar o imóvel:', err);
    throw new Error('Failed to fetch data');
  }
}
