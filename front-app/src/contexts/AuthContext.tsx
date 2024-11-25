import Loading from '@/components/Loading';
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
  handleReloadUser: () => Promise<void>;
};

export type UserProps = {
  id: string;
  name: string;
  email: string;
  token: string;
  subscriptionId: string;
  priceId: string;
  planIsActive: boolean;
  office: OfficeType[] | null;
  indicationsReceived?: IndicationsType[];
  indicationsMade?: IndicationsType[];
};

type IndicationsType = {
  id: string;
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
    console.log('signout');
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
    office: null,
    indicationsReceived: [],
    indicationsMade: [],
  });

  const isAuthenticated = !!user;

  useEffect(() => {
    setLoading(true);
    const { '@nextauth.token': token } = parseCookies();

    if (token) {
      try {
        const payloadBase64 = token.split('.')[1];

        // Replace URL-safe characters and add padding if necessary
        const base64 = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');
        const paddedBase64 = base64.padEnd(
          base64.length + ((4 - (base64.length % 4)) % 4),
          '='
        );

        // Decode the payload
        const decodedPayload = atob(paddedBase64);

        // Parse the decoded payload into a JSON object
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
              office,
              indicationsReceived,
              indicationsMade,
            } = response.data;

            setUser({
              id,
              name,
              email,
              token,
              subscriptionId,
              priceId,
              planIsActive,
              office,
              indicationsReceived,
              indicationsMade,
            });

            api.defaults.headers['authorization'] = `Bearer ${token}`;
            setLoading(false);
          })
          .catch(() => {
            signOut(router);
            setLoading(false);
          });
        console.log(user);
      } catch (error) {
        console.error('Error decoding token:', error);
        signOut(router);
        setLoading(false);
      }
    } else {
      signOut(router);
      setLoading(false);
    }
  }, []);

  const handleReloadUser = async () => {
    try {
      const response = await api.get(`/me/${user.email}`);
      const {
        id,
        name,
        email,
        subscriptionId,
        token,
        priceId,
        planIsActive,
        office,
        indicationsReceived,
        indicationsMade,
      } = response.data;

      setUser({
        id,
        name,
        email,
        token,
        subscriptionId,
        priceId,
        planIsActive,
        office,
        indicationsReceived,
        indicationsMade,
      });
    } catch (error) {
      console.error('Error decoding token:', error);
      signOut(router);
    }
  };

  async function signIn({ email, password }: SignInProps) {
    try {
      const response = await api.post('/session', {
        email,
        password,
      });
      const {
        id,
        name,
        token,
        subscriptionId,
        priceId,
        planIsActive,
        office,
        indicationsReceived,
        indicationsMade,
      } = response.data;

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
        subscriptionId,
        priceId,
        planIsActive,
        office,
        indicationsReceived,
        indicationsMade,
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
        handleReloadUser,
      }}
    >
      {loading && <Loading />}
      {children}
    </AuthContext.Provider>
  );
}
