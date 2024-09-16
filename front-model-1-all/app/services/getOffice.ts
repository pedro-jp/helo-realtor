import { OfficeType } from '../types';
import { api } from './api';

const ownerId = process.env.NEXT_PUBLIC_OWNER_ID;
const url = process.env.NEXT_PUBLIC_URL;

export async function getOfficeByName(name: string) {
  try {
    const response = await fetch(`http://192.168.1.16:3332/offices/${name}`);

    if (!response.ok) {
      throw new Error(`Erro: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    console.log('ofc: ' + data);
    return data;
  } catch (error) {
    console.error('Erro ao buscar escritório:', error);
    return null;
  }
}
