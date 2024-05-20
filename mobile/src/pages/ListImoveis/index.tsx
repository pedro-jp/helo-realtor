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

type ImovelType = {
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
      const response = await api.get('/imovel', {
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

  function handleOpenImovel(imovel: string) {
    navigation.navigate('Imovel', { imovelId: imovel });
  }

  return (
    <S.StyledContainerView>
      <TouchableOpacity onPress={loadImoveis}>
        <S.StyledText>Carregar</S.StyledText>
      </TouchableOpacity>
      <S.StyledScrollView>
        {imoveis.map((imovel) => (
          <S.StyledTouchableOpacity
            key={imovel.id}
            onPress={() => handleOpenImovel(imovel.id)}
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
