import { ReactNode } from 'react';

export interface SignInProps {
  email: string;
  password: string;
}

export type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: ({ email, password }: SignInProps) => Promise<void>;
  loadingAuth: boolean;
  loading: boolean;
  signOut: () => Promise<void>;
};

export type UserProps = {
  id: string;
  name: string;
  email: string;
  token: string;
};

export type AuthProviderProps = {
  children: ReactNode;
};
