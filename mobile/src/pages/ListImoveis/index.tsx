import { useContext, useEffect, useRef, useState } from 'react';
import { api } from '../../services/api';
import * as S from './styles';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { AuthContext } from '../../contexts/AuthContext';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import { Imagem } from '../../components/Image';

export type ImovelType = {
  name: string;
  description: string;
  images: {
    url: string;
  }[];
  id: string;
  price: number;
  local: number;
  quartos: number;
  banheiros: number;
  area: number;
  garagem: string;
};

export default function ListImoveis() {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [refreshing, setRefreshing] = useState(false);
  const [refreshImages, setRefreshImages] = useState(false);
  const [imoveis, setImoveis] = useState<ImovelType[]>([]);
  const { user } = useContext(AuthContext);
  const ownerId = user.id;

  useEffect(() => {
    loadImoveis();
  }, []);

  async function loadImoveis() {
    try {
      const response = await api.get(`imoveis/${ownerId}`);
      setImoveis(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const image = async function loadImages(id: string) {
    try {
      const response = await api.get(`/images/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  function handleOpenImovel(item: ImovelType) {
    navigation.navigate('Imovel', { imovelId: item.id });
  }

  const { width, height } = Dimensions.get('screen');

  const SPACING = 20;
  const IMAGE = 70;
  const IMAGE_URL =
    'https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
  const scrollY = useRef(new Animated.Value(0)).current;
  const ITEM_SIZE = IMAGE + SPACING * 3;

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <Image
        style={StyleSheet.absoluteFillObject}
        blurRadius={10}
        source={{ uri: IMAGE_URL }}
      />

      <Animated.FlatList
        data={imoveis}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          padding: SPACING,
          paddingTop: StatusBar.currentHeight || 42,
        }}
        renderItem={({ item, index }) => {
          const inputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 2),
          ];

          const opacityInputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 1),
          ];

          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0],
          });

          const opacity = scrollY.interpolate({
            inputRange: opacityInputRange,
            outputRange: [1, 1, 1, 0],
          });

          const price = parseInt(item.price.toString());

          return (
            <TouchableOpacity onPress={() => handleOpenImovel(item)}>
              <Animated.View
                style={{
                  flexDirection: 'row',
                  padding: SPACING,
                  marginBottom: SPACING,
                  backgroundColor: 'rgba(255,255,255,0.8)',
                  borderRadius: 12,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 20,
                  },
                  shadowOpacity: 0.4,
                  shadowRadius: 20,
                  elevation: 65,
                  opacity,
                  transform: [{ scale }],
                }}
              >
                <Imagem id={item.id} refreshing={refreshImages} />
                <View>
                  <View style={{ width: 220 }}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: '700',
                        flexWrap: 'wrap',
                      }}
                    >
                      {item.name}
                    </Text>
                  </View>
                  <Text style={{ fontSize: 14, opacity: 0.7, width: 220 }}>
                    {item.local}
                  </Text>
                  <Text style={{ fontSize: 14, opacity: 0.8, color: 'green' }}>
                    {price.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </Text>
                </View>
              </Animated.View>
            </TouchableOpacity>
          );
        }}
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true);
          loadImoveis();
          setRefreshing(false);
          setRefreshImages(!refreshImages);
        }}
      />
    </View>
  );
}
