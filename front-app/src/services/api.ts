import axios, { AxiosError } from 'axios';
import { parseCookies } from 'nookies';
import { AuthTokenError } from './errors/AuthTokenError';

// Modifique a função para aceitar signOut como argumento
export function setupAPIClient(signOut: any, ctx = undefined) {
  const cookies = parseCookies(ctx);

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
      // Verifique se o erro é 401 (não autorizado)
      if (error.response?.status === 401) {
        if (typeof window !== undefined) {
          // Chame a função signOut quando houver um erro 401
          signOut();
        } else {
          // Em ambientes de servidor, rejeite a promessa com um erro de token
          return Promise.reject(new AuthTokenError());
        }
      }
      return Promise.reject(error);
    }
  );

  return api;
}
