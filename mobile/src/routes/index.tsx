import React, { useContext } from 'react';
import { ActivityIndicator, View } from 'react-native';
import 'react-native-gesture-handler';
import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';
import { AuthContext } from '../contexts/AuthContext';

export default function Routes() {
  const { isAuthenticated } = useContext(AuthContext);

  const { loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#111111',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator size={60} color='#fff' />
      </View>
    );
  }

  return isAuthenticated ? <AppRoutes /> : <AuthRoutes />;
}
