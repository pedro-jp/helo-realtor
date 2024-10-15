import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Importar suas páginas e rotas
import Home from '../pages/Home';
import Category from '../pages/Category';
import AddImovel from '../pages/AddImovel';
import Images from '../pages/Images';
import ListImoveis from '../pages/ListImoveis';
import Imovel from '../pages/Imovel';

export type StackParamsList = {
  Imovel: undefined;
};

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function AppRoutes() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name='Home' component={Home} />
      <Drawer.Screen name='Category' component={Category} />
      <Drawer.Screen name='Adicionar Imóvel' component={AddImovel} />
      <Drawer.Screen name='Imóveis' component={ListImoveis} />
      <Drawer.Screen
        name='Imovel'
        component={Imovel}
        options={{ headerShown: true }}
      />
    </Drawer.Navigator>
  );
}
