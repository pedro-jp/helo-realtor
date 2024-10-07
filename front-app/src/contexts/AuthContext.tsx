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
  } catch (error) {}
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const api = setupAPIClient(router);

  const [user, setUser] = useState<UserProps>({
    id: 'example',
    name: 'example',
    email: 'example',
  });
  const isAuthenticated = !!user;

  useEffect(() => {
    const { '@nextauth.token': token } = parseCookies();

    if (token) {
      api
        .get(`/me`)
        .then((response) => {
          console.log(response.data);
          const { id, name, email } = response.data;

          setUser({
            id,
            name,
            email,
          });
        })
        .catch((e) => {
          console.log(e);
          signOut(router);
        });
    }
  });

  async function signIn({ email, password }: SignInProps) {
    try {
      const response = await api.post('/session', {
        email,
        password,
      });
      console.log('toooi' + response.data);
      const { id, name, token } = response.data;

      setCookie(undefined, '@nextauth.token', token, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
      });

      setUser({
        id,
        name,
        email,
      });

      api.defaults.headers['authorization'] = `Bearer ${token}`;
      toast.success('Logado com sucesso');
      console.log(api.defaults.headers);
      console.log(response.data);
      router.push('/dashboard');
    } catch (error) {
      console.log(error);
      toast.error('Erro ao acessar');
    }
  }

  async function signUp({ name, email, password }: SignUpProps) {
    try {
      const response = await api.post('/users', {
        name,
        email,
        password,
      });

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
