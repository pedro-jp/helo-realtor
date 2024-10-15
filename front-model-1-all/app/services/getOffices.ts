import { OfficeType } from '../types';
import { api } from './api';

const url = process.env.NEXT_PUBLIC_URL;

export async function getOffices(): Promise<OfficeType> {
  const response = await api.get(`${url}/offices`);
  return response.data;
}
