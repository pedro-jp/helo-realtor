import axios, { AxiosError } from 'axios';

import { parseCookies } from 'nookies';
import { AuthTokenError } from './errors/AuthTokenError';
import { AuthContext } from '@/contexts/AuthContext';
import { useContext } from 'react';

export function setupAPIClient(ctx = undefined) {
  const { signOut } = useContext(AuthContext); //eslint-disable-line
  let cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: 'http://localhost:3333',
    headers: {
      Authorization: `Bearer ${cookies['@nextauth.token']}`,
    },
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        if (typeof window !== undefined) {
          signOut();
        } else {
          return Promise.reject(new AuthTokenError());
        }
      }
      return Promise.reject(error);
    }
  );

  return api;
}
