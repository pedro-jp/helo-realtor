import React, { useContext } from 'react';
import { ActivityIndicator, View } from 'react-native';
import 'react-native-gesture-handler';
import AuthRoutes from './auth.routes';
import { AuthContext } from '../contexts/AuthContext';
import App from './app.routes';

export default function Routes() {
  const { isAuthenticated, loading } = useContext(AuthContext);

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

  return isAuthenticated ? <App /> : <AuthRoutes />;
}
