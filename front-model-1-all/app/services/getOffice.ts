import { OfficeType } from '../types';
import { api } from './api';

const ownerId = process.env.NEXT_PUBLIC_OWNER_ID;
const url = process.env.NEXT_PUBLIC_URL;

export async function getOfficeByName(name: string) {
  try {
    console.log(url);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/offices/${name}`
    );
    console.log(name);

    if (!response.ok) {
      throw new Error(`Erro: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar escritório:', error);
    return null;
  }
}
