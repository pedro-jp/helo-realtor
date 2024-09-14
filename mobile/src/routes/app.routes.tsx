import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
import Home from '../pages/Home';
import AddImovel from '../pages/AddImovel';
import Images from '../pages/Images';
import ListImoveis from '../pages/ListImoveis';
import Imovel from '../pages/Imovel';
import Category from '../pages/Category';
import { View } from 'react-native';
import { BlurView } from 'expo-blur';
import { AuthContext } from '../contexts/AuthContext';
import { useContext } from 'react';

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name='HomeMain' component={Home} />
      <HomeStack.Screen name='Add Imovel' component={AddImovel} />
      <HomeStack.Screen name='Imóveis' component={ListImoveis} />
      <HomeStack.Screen name='Category' component={Category} />
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
      <ListImoveisStack.Screen name='HomeList' component={Home} />
      <addImovelStack.Screen name='Images' component={Images} />
    </ListImoveisStack.Navigator>
  );
}

const addImovelStack = createNativeStackNavigator();

function AddImovelStackScreen() {
  return (
    <addImovelStack.Navigator screenOptions={{ headerShown: false }}>
      <addImovelStack.Screen name='Add Imovel' component={AddImovel} />
      <addImovelStack.Screen name='HomeAdd' component={Home} />
      <addImovelStack.Screen name='Imovel' component={Imovel} />
      <addImovelStack.Screen name='Images' component={Images} />
    </addImovelStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  const { user } = useContext(AuthContext);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,

        tabBarBackground: () => <MenuBlur />,
        tabBarStyle: {
          width: '100%',
          height: 100,
          borderTopWidth: 0,
          position: 'absolute',
          alignItems: 'center',
          elevation: 0,
          overflow: 'visible',
          marginTop: 100,
          marginHorizontal: 'auto',
          marginBottom: -10,
        },

        tabBarIconStyle: {
          marginTop: 10,
          zIndex: 10,
        },
      }}
    >
      {!user.planIsActive ? (
        <Tab.Screen
          name='Home'
          options={{
            tabBarLabel: 'Home',
            tabBarLabelStyle: { color: '#fff' },
            tabBarIcon: () => <Feather name='edit' color={'#fff'} size={28} />,
          }}
          component={HomeStackScreen}
        />
      ) : (
        <>
          <Tab.Screen
            name='Home'
            options={{
              tabBarLabel: 'Home',
              tabBarLabelStyle: { color: '#fff' },
              tabBarIcon: () => (
                <Feather name='edit' color={'#fff'} size={28} />
              ),
            }}
            component={HomeStackScreen}
          />
          <Tab.Screen
            name='Add'
            options={{
              title: 'Adicionar imóveis',
              tabBarLabel: 'Add imóvel',
              tabBarLabelStyle: { color: '#fff' },
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
              tabBarLabel: 'Lista',
              tabBarLabelStyle: { color: '#fff' },
              tabBarIcon: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Feather name='home' color={'#fff'} size={28} />
                  <Feather
                    name='edit-2'
                    color={'#fff'}
                    size={10}
                    style={{ marginTop: -20 }}
                  />
                </View>
              ),
            }}
            component={ListImoveisStackScreen}
          />
        </>
      )}
    </Tab.Navigator>
  );
}

const MenuBlur = () => {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          width: '100%',
          height: '100%',
          borderTopColor: 'white',
          borderBottomColor: 'white',
          overflow: 'hidden',
          borderRadius: 20,
        }}
      >
        <BlurView
          intensity={50}
          style={{
            flex: 1,
            backgroundColor: ' rgba(66, 100, 255, 0.3)',
          }}
        />
      </View>
    </View>
  );
};
