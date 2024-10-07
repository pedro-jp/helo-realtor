import React, { useState, createContext, useEffect, ReactNode } from 'react';
import { api } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  AuthContextData,
  AuthProviderProps,
  SignInProps,
  SignUpProps,
  UserProps,
} from '../interfaces';

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({
    id: '',
    name: '',
    email: '',
    token: '',
    priceId: '',
    planIsActive: false,
    subscriptionId: '',
  });

  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user.name;

  useEffect(() => {
    async function loadUser() {
      const userInfo = await AsyncStorage.getItem('@helotech');
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
          priceId: hasUser.priceId,
          planIsActive: hasUser.planIsActive,
          subscriptionId: hasUser.subscriptionId,
        });

        // Atualizar informações do usuário
        updateUser();
      }
      setLoading(false);
    }
    loadUser();
  }, []);

  async function updateUser() {
    try {
      const response = await api.get(`/me${user.id}`);
      const userData = response.data;
      console.log(userData);

      setUser((prevUser) => ({
        ...prevUser,
        priceId: userData.priceId,
        planIsActive: userData.planIsActive,
        subscriptionId: userData.subscriptionId,
      }));

      await AsyncStorage.setItem(
        '@helotech',
        JSON.stringify({
          ...user,
          priceId: userData.priceId,
          planIsActive: userData.planIsActive,
          subscriptionId: userData.subscriptionId,
        })
      );
    } catch (error) {
      console.log('Erro ao atualizar dados do usuário:', error);
    }
  }

  async function signUp({ name, email, password }: SignUpProps) {
    setLoadingAuth(true);
    try {
      const response = await api.post('/users', { name, email, password });
      console.log('register', response.data);
      await signIn({ email, password });
    } catch (error) {
      console.log(error.response.data);
      if (error.response.data.error === 'User already exists')
        alert('Email já cadastrado! Faça o login');
      setLoadingAuth(false);
    }
  }

  async function signIn({ email, password }: SignInProps) {
    setLoadingAuth(true);

    try {
      const response = await api.post('/session', { email, password });
      const { id, name, token, subscriptionId, planIsActive, priceId } =
        response.data;
      const data = { ...response.data, email };

      await AsyncStorage.setItem('@helotech', JSON.stringify(data));
      api.defaults.headers.common['authorization'] = `Bearer ${token}`;

      setUser({
        id,
        name,
        email,
        token,
        subscriptionId,
        planIsActive,
        priceId,
      });
      setLoading(false);
      setLoadingAuth(false);
    } catch (error) {
      console.log('Erro ao acessar', error);
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
        subscriptionId: '',
        planIsActive: false,
        priceId: '',
      });
    });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        signIn,
        signUp,
        loadingAuth,
        loading,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
