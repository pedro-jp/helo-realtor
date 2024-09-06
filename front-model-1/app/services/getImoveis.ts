import { ImovelType } from '../types';
import { api } from '../services/api';

const ownerId = process.env.NEXT_PUBLIC_OWNER_ID;

// Função para buscar os dados dos imóveis
export async function getImoveis(): Promise<ImovelType[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/imoveis/${process.env.NEXT_PUBLIC_OWNER_ID}`,
    {
      next: { revalidate: 1 }, // Revalida a cada 1 segundo
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return await response.json();
}

export async function getImovelData(id: string): Promise<ImovelType> {
  try {
    const response = await api.get(`/imovel/${id}`);
    console.log('Dados do imóvel:', response.data); // Verifique se latitude e longitude estão aqui
    return response.data;
  } catch (err) {
    console.log('Erro ao buscar o imóvel:', err);
    throw new Error('Failed to fetch data');
  }
}
