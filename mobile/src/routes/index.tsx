import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import 'react-native-gesture-handler';
import AuthRoutes from './auth.routes';
import { AuthContext } from '../contexts/AuthContext';
import App from './app.routes';
import Toast from 'react-native-toast-message';

export default function Routes() {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (1 + 1 === 4) {
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

  return (
    <>
      {isAuthenticated ? (
        <>
          <Toast />
          <App />
        </>
      ) : (
        <>
          <Toast />
          <AuthRoutes />
        </>
      )}
    </>
  );
}
