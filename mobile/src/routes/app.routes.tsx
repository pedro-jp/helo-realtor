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
import Gallery from '../pages/Gallery';

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name='Home' component={Home} />
      <HomeStack.Screen name='Add Imovel' component={AddImovel} />
      <HomeStack.Screen name='Imóveis' component={ListImoveis} />
      <HomeStack.Screen name='Category' component={Category} />
    </HomeStack.Navigator>
  );
}

const GalleryStack = createNativeStackNavigator();

function GalleryStackScreen() {
  return (
    <GalleryStack.Navigator screenOptions={{ headerShown: false }}>
      <GalleryStack.Screen name='Gallery' component={Gallery} />
    </GalleryStack.Navigator>
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

        tabBarBackground: () => <MenuBlur />,
        tabBarStyle: {
          width: '70%',
          height: 50,
          position: 'absolute',
          borderTopWidth: 0,
          bottom: 30,
          left: '38%',
          transform: [{ translateX: -100 }],
          alignItems: 'center',
          elevation: 0,
          overflow: 'visible',
        },

        tabBarIconStyle: {
          marginTop: 10,
          zIndex: 10,
        },
      }}
    >
      <Tab.Screen
        name='Home'
        options={{
          tabBarLabel: '',
          tabBarIcon: () => <Feather name='edit' color={'#fff'} size={28} />,
        }}
        component={HomeStackScreen}
      />
      <Tab.Screen
        name='Add'
        options={{
          title: 'Adicionar imóveis',
          tabBarLabel: '',
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
          tabBarLabel: '',
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

      <Tab.Screen
        name='Gallery'
        options={{
          tabBarLabel: '',
          tabBarIcon: () => <Feather name='image' color={'#fff'} size={28} />,
        }}
        component={GalleryStackScreen}
      />
    </Tab.Navigator>
  );
}

const MenuBlur = () => {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          width: '100%',
          height: 50,
          borderRadius: 90,
          borderTopColor: 'white',
          borderBottomColor: 'white',
          overflow: 'hidden',
        }}
      >
        <BlurView
          intensity={50}
          style={{ flex: 1, backgroundColor: ' rgba(61, 53, 105, 0.4)' }}
        />
      </View>
    </View>
  );
};
