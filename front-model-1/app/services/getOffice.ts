import { OfficeType } from '../types';
import { api } from './api';

const ownerId = process.env.NEXT_PUBLIC_OWNER_ID;
const url = process.env.NEXT_PUBLIC_URL;

export async function getOffice(): Promise<OfficeType> {
  const response = await api.get(`${url}/office/${ownerId}`);
  return response.data;
}
