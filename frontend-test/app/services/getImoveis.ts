import { ImovelType } from '../types';
import { api } from '../services/api';

const ownerId = process.env.NEXT_PUBLIC_OWNER_ID;

// Função para buscar os dados dos imóveis
export async function getImoveis(): Promise<ImovelType[]> {
  const response = await api.get(`/imoveis/${ownerId}`);
  return response.data;
}
