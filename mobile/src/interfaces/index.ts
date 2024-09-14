import { ReactNode } from 'react';

export interface SignInProps {
  email: string;
  password: string;
}

export interface SignUpProps {
  email: string;
  name: string;
  password: string;
}

export type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: ({ email, password }: SignInProps) => Promise<void>;
  signUp: ({ name, email, password }: SignUpProps) => Promise<void>;
  loadingAuth: boolean;
  loading: boolean;
  signOut: () => Promise<void>;
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
};

export type AuthProviderProps = {
  children: ReactNode;
};
