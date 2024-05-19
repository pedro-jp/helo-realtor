import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Importar suas páginas e rotas
import Home from '../pages/Home';
import Category from '../pages/Category';
import Imovel from '../pages/Imovel';
import Images from '../pages/Images';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function AppRoutes() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name='Home' component={Home} />
      <Drawer.Screen name='Category' component={Category} />
      <Drawer.Screen name='Adicionar Imóvel' component={Imovel} />
      <Drawer.Screen
        name='Images'
        component={Images}
        options={{ drawerLabel: () => null }}
      />
    </Drawer.Navigator>
  );
}

function DrawerRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTintColor: '#fff',
          headerTitleStyle: {
            color: 'transparent',
          },
        }}
        name='Home'
        component={Home}
      />
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTintColor: '#fff',
          headerTitleStyle: {
            color: 'transparent',
          },
        }}
        name='Categorias'
        component={Category}
      />
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTintColor: '#fff',
          headerTitleStyle: {
            color: 'transparent',
          },
        }}
        name='Adicionar Imóvel'
        component={Imovel}
      />
    </Stack.Navigator>
  );
}
