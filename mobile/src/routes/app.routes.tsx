import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '../pages/Home';
import Category from '../pages/Category';

export type StackParamsList = {
  Home: undefined;
  Category: undefined;
};

const Drawer = createDrawerNavigator();

export default function AppRoutes() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name='Home' component={Home} />
      <Drawer.Screen name='Categorias' component={Category} />
    </Drawer.Navigator>
  );
}
