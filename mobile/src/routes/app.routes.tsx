import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
import Home from '../pages/Home';
import AddImovel from '../pages/AddImovel';
import Images from '../pages/Images';
import ListImoveis from '../pages/ListImoveis';
import Imovel from '../pages/Imovel';
import { View } from 'react-native';

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name='Home' component={Home} />
      <HomeStack.Screen name='Add Imovel' component={AddImovel} />
      <HomeStack.Screen name='Imóveis' component={ListImoveis} />
    </HomeStack.Navigator>
  );
}

const ListImoveisStack = createNativeStackNavigator();

function ListImoveisStackScreen() {
  return (
    <ListImoveisStack.Navigator screenOptions={{ headerShown: false }}>
      <ListImoveisStack.Screen name='Imoveis' component={ListImoveis} />
      <ListImoveisStack.Screen name='Imovel' component={Imovel} />
      <ListImoveisStack.Screen name='AddImovel' component={AddImovel} />
      <ListImoveisStack.Screen name='Home' component={Home} />
    </ListImoveisStack.Navigator>
  );
}

const addImovelStack = createNativeStackNavigator();

function AddImovelStackScreen() {
  return (
    <addImovelStack.Navigator screenOptions={{ headerShown: false }}>
      <addImovelStack.Screen name='Add Imovel' component={AddImovel} />
      <addImovelStack.Screen name='Home' component={Home} />
      <addImovelStack.Screen name='Imovel' component={Imovel} />
      <addImovelStack.Screen name='Images' component={Images} />
    </addImovelStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#111111', borderTopWidth: 0 },
        tabBarInactiveTintColor: '#fff',
      }}
    >
      <Tab.Screen
        name='Home'
        options={{
          title: 'Editar dados',
          tabBarLabel: 'Editar dados',
          tabBarIcon: () => <Feather name='edit' color={'#fff'} size={28} />,
        }}
        component={HomeStackScreen}
      />
      <Tab.Screen
        name='Add'
        options={{
          title: 'Adicionar imóveis',
          tabBarLabel: 'Adicionar Imóveis',
          tabBarIcon: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Feather name='plus' color={'#fff'} size={22} />
              <Feather name='home' color={'#fff'} size={28} />
            </View>
          ),
        }}
        component={AddImovelStackScreen}
      />
      <Tab.Screen
        name='Imóveis'
        options={{
          title: 'Listar imóveis',
          tabBarLabel: 'Imóveis',
          tabBarIcon: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Feather name='home' color={'#fff'} size={28} />
            </View>
          ),
        }}
        component={ListImoveisStackScreen}
      />
    </Tab.Navigator>
  );
}
