import React, {
  useState,
  createContext,
  Children,
  ReactNode,
  useEffect,
} from 'react';
import { api } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface SignInProps {
  email: string;
  password: string;
}

type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: ({ email, password }: SignInProps) => Promise<void>;
  loadingAuth: boolean;
  loading: boolean;
  signOut: () => Promise<void>;
};
type UserProps = {
  id: string;
  name: string;
  email: string;
  token: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({
    id: '',
    name: '',
    email: '',
    token: '',
  });

  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user.name;

  useEffect(() => {
    async function getUser() {
      const userInfo = await AsyncStorage.getItem('@pizzaria');

      let hasUser: UserProps = JSON.parse(userInfo || '{}');

      if (Object.keys(hasUser).length > 0) {
        api.defaults.headers.common[
          'authorization'
        ] = `Bearer ${hasUser.token}`;

        setUser({
          id: hasUser.id,
          name: hasUser.name,
          email: hasUser.email,
          token: hasUser.token,
        });
        setLoading(false);
      }
    }
    getUser();
  }, []);

  async function signIn({ email, password }: SignInProps) {
    setLoadingAuth(true);

    try {
      const response = await api.post('/session', {
        email,
        password,
      });
      const { id, name, token } = response.data;
      const data = {
        ...response.data,
        email,
      };

      await AsyncStorage.setItem('@pizzaria', JSON.stringify(data));

      api.defaults.headers.common['authorization'] = `Bearer ${token}`;

      setUser({ id, name, email, token });
      setLoading(false);
      setLoadingAuth(false);
    } catch (error) {
      console.log('erro ao acessar');
      setLoading(false);
      setLoadingAuth(false);
    }
  }

  async function signOut() {
    await AsyncStorage.clear().then(() => {
      setUser({
        id: '',
        name: '',
        email: '',
        token: '',
      });
    });
  }
  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, loadingAuth, loading, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
