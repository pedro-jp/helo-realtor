import { setupAPIClient } from '@/services/api';
import { NextRouter, useRouter } from 'next/router';
import { destroyCookie, setCookie, parseCookies } from 'nookies';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: (router: NextRouter) => void;
  signUp: (credentials: SignUpProps) => Promise<void>;
};

type UserProps = {
  id: string;
  name: string;
  email: string;
};

type SignInProps = {
  email: string;
  password: string;
};

type SignUpProps = {
  name: string;
  email: string;
  password: string;
};

interface AuthProviderProps {
  children: ReactNode;
}

export async function signOut(router: NextRouter) {
  try {
    destroyCookie(undefined, '@nextauth.token');
    router.push('/');
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
  }
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const api = setupAPIClient(router);

  const [user, setUser] = useState<UserProps>({
    id: '',
    name: '',
    email: '',
  });

  const isAuthenticated = !!user;

  useEffect(() => {
    const { '@nextauth.token': token } = parseCookies();

    if (token) {
      // Recupera o usuário usando o token
      const payloadBase64 = token.split('.')[1];

      // Decodificar o payload de base64
      const decodedPayload = atob(payloadBase64);

      // Converter o JSON decodificado em um objeto
      const payload = JSON.parse(decodedPayload);
      api
        .get(`/me/${payload.email}`)
        .then((response) => {
          const { id, name, email } = response.data;
          setUser({ id, name, email });
          api.defaults.headers['authorization'] = `Bearer ${token}`;
        })
        .catch(() => {
          // Se o token for inválido, desloga o usuário
          signOut(router);
        });
    }
  }, [router]);

  async function signIn({ email, password }: SignInProps) {
    try {
      const response = await api.post('/session', {
        email,
        password,
      });
      const { id, name, token } = response.data;

      // Define o token no cookie
      setCookie(undefined, '@nextauth.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 dias
        path: '/',
      });

      setUser({
        id,
        name,
        email,
      });

      api.defaults.headers['authorization'] = `Bearer ${token}`;
      toast.success('Logado com sucesso');
      router.push('/dashboard');
    } catch (error) {
      console.error('Erro ao acessar:', error);
      toast.error('Erro ao acessar');
    }
  }

  async function signUp({ name, email, password }: SignUpProps) {
    try {
      await api.post('/users', { name, email, password });
      toast.success('Cadastrado com sucesso');
      router.push('/');
    } catch (err) {
      toast.error('Erro ao cadastrar');
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, signOut, signUp }}
    >
      {children}
    </AuthContext.Provider>
  );
}
