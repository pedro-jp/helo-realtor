import { OfficeType } from '../types';
import { api } from './api';

const url = process.env.NEXT_PUBLIC_URL;

export async function getOffices(): Promise<OfficeType[] | null> {
  try {
    const response = await api.get(`${url}/offices`);

    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
