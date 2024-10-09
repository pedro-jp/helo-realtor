import { setupAPIClient } from '@/services/api';
import { OfficeType } from '@/Types';
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
  router: NextRouter;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setUser: (user: UserProps) => void;
};

export type UserProps = {
  id: string;
  name: string;
  email: string;
  token: string;
  subscriptionId: string;
  priceId: string;
  planIsActive: boolean;
  offices: OfficeType[] | null;
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

  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState<UserProps>({
    id: '',
    name: '',
    email: '',
    token: '',
    subscriptionId: '',
    priceId: '',
    planIsActive: false,
    offices: null,
  });

  const isAuthenticated = !!user;

  useEffect(() => {
    setLoading(true);
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
          const {
            id,
            name,
            email,
            subscriptionId,
            token,
            priceId,
            planIsActive,
            offices,
          } = response.data;

          setUser({
            id,
            name,
            email,
            token,
            subscriptionId,
            priceId,
            planIsActive,
            offices,
          });

          api.defaults.headers['authorization'] = `Bearer ${token}`;
          setLoading(false);
        })
        .catch(() => {
          // Se o token for inválido, desloga o usuário
          signOut(router);
          setLoading(false);
        });
    } else {
      // Se o token for inválido, desloga o usuário
      signOut(router);
      setLoading(false);
    }
  }, []);

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
        token,
        subscriptionId: '',
        priceId: '',
        planIsActive: false,
        offices: null,
      });

      api.defaults.headers['authorization'] = `Bearer ${token}`;
      toast.success('Logado com sucesso');
      router.push('/propertys');
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

  if (loading) {
    return <p>carregando</p>;
  }

  return (
    <AuthContext.Provider
      value={{
        setUser,
        loading,
        setLoading,
        router,
        user,
        isAuthenticated,
        signIn,
        signOut,
        signUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
