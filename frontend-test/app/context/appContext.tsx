'use client';
import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from 'react';
import { api } from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
}

interface Imovel {
  id: string;
  name: string;
  images: { url: string }[];
}

interface AppContextType {
  user: User | null;
  imoveis: Imovel[] | null;
  title: string;
  setUser: (user: User | null) => void;
  setImoveis: (imoveis: Imovel[] | null) => void;
  setTitle: (title: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [imoveis, setImoveis] = useState<Imovel[] | null>(null);
  const [title, setTitle] = useState('Título padrão');
  const ownerId = process.env.NEXT_PUBLIC_OWNER_ID;

  useEffect(() => {
    loadImoveis();
  }, []);

  async function loadImoveis() {
    try {
      const response = await api.get<Imovel[]>(`imoveis/${ownerId}`);
      setImoveis(response.data);
    } catch (error) {
      console.error('Erro ao carregar os imóveis:', error);
    }
  }

  return (
    <AppContext.Provider
      value={{ user, imoveis, title, setUser, setImoveis, setTitle }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
