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

export type ImovelType = {
  name: string;
  description: string;
  images: {
    url: string;
  }[];
  id: string;
  price: string;
  local: string;
  quartos: string;
  banheiros: string;
  area: string;
  garagem: string;
};

export default function ListImoveis() {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [refreshing, setRefreshing] = useState(false);
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
                <Image
                  source={{
                    uri: `${item?.images[0]?.url}`,
                  }}
                  style={{
                    width: IMAGE,
                    height: IMAGE,
                    borderRadius: IMAGE,
                    marginRight: SPACING / 2,
                  }}
                />

                <View>
                  <Text style={{ fontSize: 22, fontWeight: 700 }}>
                    {item.name}
                  </Text>
                  <Text style={{ fontSize: 18, opacity: 0.7 }}>
                    {item.local}
                  </Text>
                  <Text style={{ fontSize: 14, opacity: 0.8, color: 'green' }}>
                    {Number(item.price).toLocaleString('pt-br', {
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
        }}
      />
    </View>
  );
}

//   <S.StyledContainerView>
//     <StatusBar style='auto' backgroundColor='transparent' />

//     <TouchableOpacity style={{ marginTop: 20 }} onPress={loadImoveis}>
//       <S.StyledText>Carregar</S.StyledText>
//     </TouchableOpacity>
//     <S.StyledScrollView>
//       {imoveis.map((imovel, index) => (
//         <S.StyledTouchableOpacity
//           key={imovel.id}
//           onPress={() => handleOpenImovel(index)}
//         >
//           <S.StyledListView>
//             <S.StyledDescView>
//               <S.StyledText>Titulo: {imovel.name}</S.StyledText>
//               <S.StyledText>Local: {imovel.local}</S.StyledText>
//               <S.StyledText>Preço: {imovel.price}</S.StyledText>
//             </S.StyledDescView>
//             {imovel?.images && (
//               <S.StyledImage
//                 source={{
//                   uri: `http://192.168.1.6:3332/files/${imovel?.images[0]?.url}`,
//                 }}
//               />
//             )}
//           </S.StyledListView>
//         </S.StyledTouchableOpacity>
//       ))}
//     </S.StyledScrollView>
//   </S.StyledContainerView>
//
