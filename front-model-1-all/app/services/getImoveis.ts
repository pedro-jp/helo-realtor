import { ImovelType } from '../types';
import { api } from '../services/api';

const ownerId = process.env.NEXT_PUBLIC_OWNER_ID;
const url = process.env.NEXT_PUBLIC_URL;

// Função para buscar os dados dos imóveis
export async function getImoveis(name: string): Promise<ImovelType[]> {
  console.log(name);
  const response = await fetch(
    `http://192.168.1.21:3332/office/imoveis/${name}`,
    {
      // next: { revalidate: 1 }, // Revalida a cada 1 segundo
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return await response.json();
}

export async function getImovelData(id: string): Promise<ImovelType> {
  try {
    const response = await api.get(`http://192.168.1.21:3332/imovel/${id}`);
    return response.data;
  } catch (err) {
    console.log('Erro ao buscar o imóvel:', err);
    throw new Error('Failed to fetch data');
  }
}
