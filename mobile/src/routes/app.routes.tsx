import React, { useContext, useEffect, useRef } from 'react';
import { View, Animated, Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
import Home from '../pages/Home';
import AddImovel from '../pages/AddImovel';
import Images from '../pages/Images';
import ListImoveis from '../pages/ListImoveis';
import Imovel from '../pages/Imovel';
import Category from '../pages/Category';
import { BlurView } from 'expo-blur';
import { AuthContext } from '../contexts/AuthContext';

const screenWidth = Dimensions.get('window').width;

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
      <ListImoveisStack.Screen name='Images' component={Images} />
    </ListImoveisStack.Navigator>
  );
}

const AddImovelStack = createNativeStackNavigator();

function AddImovelStackScreen() {
  return (
    <AddImovelStack.Navigator screenOptions={{ headerShown: false }}>
      <AddImovelStack.Screen name='Add Imovel' component={AddImovel} />
      <AddImovelStack.Screen name='HomeAdd' component={Home} />
      <AddImovelStack.Screen name='Imovel' component={Imovel} />
      <AddImovelStack.Screen name='Images' component={Images} />
    </AddImovelStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  const { user } = useContext(AuthContext);
  const tabPosition = useRef(new Animated.Value(0)).current;

  const moveIndicator = (index) => {
    Animated.spring(tabPosition, {
      toValue: index,
      useNativeDriver: false,
    }).start();
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarBackground: () => <MenuBlur tabPosition={tabPosition} />,
        tabBarStyle: {
          display: 'flex',
          width: '100%',
          height: 80,
          borderTopWidth: 0,
          position: 'absolute',
          elevation: 0,
          marginBottom: 0,
          borderRadius: 20,
        },
        tabBarIconStyle: {},
        tabBarIcon: ({ focused }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Add') {
            iconName = 'plus';
          } else if (route.name === 'Imóveis') {
            iconName = 'list';
          }
          return (
            <Feather
              name={iconName}
              size={28}
              color={focused ? '#fff' : 'gray'}
            />
          );
        },
      })}
      screenListeners={({ navigation, route }) => ({
        state: (e) => {
          const index = e.data.state.index;
          moveIndicator(index);
        },
      })}
    >
      {!user.planIsActive ? (
        <Tab.Screen name='Home' component={HomeStackScreen} />
      ) : (
        <>
          <Tab.Screen name='Home' component={HomeStackScreen} />
          <Tab.Screen name='Add' component={AddImovelStackScreen} />
          <Tab.Screen name='Imóveis' component={ListImoveisStackScreen} />
        </>
      )}
    </Tab.Navigator>
  );
}

const MenuBlur = ({ tabPosition }) => {
  const { user } = useContext(AuthContext);

  const circleSize = 80;
  const indicatorPosition = tabPosition.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, screenWidth / 3, (screenWidth / 3) * 2],
  });

  const position = Animated.add(indicatorPosition, 30);

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
            backgroundColor: 'rgba(66, 100, 255, 0.3)',
          }}
        />
        <Animated.View
          style={{
            position: 'absolute',
            left: user.planIsActive
              ? position
              : screenWidth / 2 - screenWidth * 0.1,
            width: circleSize,
            height: circleSize,
            borderBottomWidth: 2,
            borderColor: '#fff',
          }}
        />
      </View>
    </View>
  );
};
