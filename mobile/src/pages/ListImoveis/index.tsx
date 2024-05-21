import { useContext, useEffect, useState } from 'react';
import { api } from '../../services/api';
import * as S from './styles';
import { Text, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../contexts/AuthContext';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

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

  const [imoveis, setImoveis] = useState<ImovelType[]>([]);
  const { user } = useContext(AuthContext);
  const ownerId = user.id;

  useEffect(() => {
    loadImoveis();
  }, []);

  async function loadImoveis() {
    try {
      const response = await api.get('/imoveis', {
        params: {
          ownerId,
        },
      });
      console.log(response.data);
      setImoveis(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleOpenImovel(index: number) {
    navigation.navigate('Imovel', { index: index });
  }

  return (
    <S.StyledContainerView>
      <StatusBar style='auto' backgroundColor='transparent' />

      <TouchableOpacity style={{ marginTop: 20 }} onPress={loadImoveis}>
        <S.StyledText>Carregar</S.StyledText>
      </TouchableOpacity>
      <S.StyledScrollView>
        {imoveis.map((imovel, index) => (
          <S.StyledTouchableOpacity
            key={imovel.id}
            onPress={() => handleOpenImovel(index)}
          >
            <S.StyledListView>
              <S.StyledDescView>
                <S.StyledText>Titulo: {imovel.name}</S.StyledText>
                <S.StyledText>Local: {imovel.local}</S.StyledText>
                <S.StyledText>Preço: {imovel.price}</S.StyledText>
              </S.StyledDescView>
              {imovel?.images && (
                <S.StyledImage
                  source={{
                    uri: `http://192.168.1.6:3332/files/${imovel?.images[0]?.url}`,
                  }}
                />
              )}
            </S.StyledListView>
          </S.StyledTouchableOpacity>
        ))}
      </S.StyledScrollView>
    </S.StyledContainerView>
  );
}
