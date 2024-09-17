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

interface Office {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  banner_image?: { url: string };
  realtors?: { name: string }[];
  imoveis?: Imovel[];
}

interface AppContextType {
  user: User | null;
  imoveis: Imovel[] | null;
  office: Office | null;
  title: string;
  setUser: (user: User | null) => void;
  setImoveis: (imoveis: Imovel[] | null) => void;
  setOffice: (office: Office | null) => void;
  setTitle: (title: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export async function loadImoveis(name: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}offices/imoveis/${name}`
    );

    if (!response.ok) {
      throw new Error(`Erro ao buscar os imóveis: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Erro ao carregar os imóveis:', error);
  }
}
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [imoveis, setImoveis] = useState<Imovel[] | null>(null);
  const [office, setOffice] = useState<Office | null>(null); // Novo estado para o office
  const [title, setTitle] = useState('Título padrão');
  const ownerId = process.env.NEXT_PUBLIC_OWNER_ID;

  useEffect(() => {}, []);

  // Função para carregar os detalhes do office, por exemplo
  async function loadOffice() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/office/${ownerId}`
      );

      if (!response.ok) {
        throw new Error(`Erro ao buscar o escritório: ${response.statusText}`);
      }

      const data = await response.json();
      setOffice(data);
    } catch (error) {
      console.error('Erro ao carregar o escritório:', error);
    }
  }

  // Carregar o escritório, se necessário
  useEffect(() => {}, []);

  return (
    <AppContext.Provider
      value={{
        user,
        imoveis,
        office,
        title,
        setUser,
        setImoveis,
        setOffice,
        setTitle,
      }}
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
