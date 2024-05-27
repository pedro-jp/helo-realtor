import { Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { StatusBar } from 'expo-status-bar';
import Carousel from '../../components/Carousel';
import { Feather } from '@expo/vector-icons';
import * as S from './styles';

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

export default function Imovel() {
  const Routes = useRoute();
  const { imovelId } = Routes.params as { imovelId: string };
  const [imovel, setImovel] = useState<ImovelType>({} as ImovelType);

  useEffect(() => {
    loadImovel();
  }, [imovelId]);

  async function loadImovel() {
    try {
      const response = await api.get(`/imovel/${imovelId}`);
      setImovel(response?.data);
    } catch (error) {
      console.log(error);
    }
  }

  const IMAGE_URL =
    'https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

  return (
    <S.StyledContainerView>
      <Image
        style={StyleSheet.absoluteFillObject}
        blurRadius={10}
        source={{ uri: IMAGE_URL }}
      />
      <StatusBar style='light' backgroundColor='transparent' />
      <Carousel images={imovel?.images} />
      <ScrollView>
        {imovel && (
          <S.StyledContentView>
            <S.StyledRowView>
              <S.StyledText>Imóvel: {imovel?.name}</S.StyledText>
              <TouchableOpacity>
                <TouchableOpacity>
                  <Feather name='edit-2' size={20} color='white' />
                </TouchableOpacity>
              </TouchableOpacity>
            </S.StyledRowView>
            <S.StyledRowView>
              <S.StyledText>
                Descrição: {'\n'} {imovel?.description}
              </S.StyledText>
              <TouchableOpacity>
                <Feather name='edit-2' size={20} color='white' />
              </TouchableOpacity>
            </S.StyledRowView>
            <S.StyledRowView>
              <S.StyledText>
                Valor:{' '}
                {Number(imovel?.price).toLocaleString('pt-br', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </S.StyledText>
              <TouchableOpacity>
                <Feather name='edit-2' size={20} color='white' />
              </TouchableOpacity>
            </S.StyledRowView>
            <S.StyledRowView>
              <S.StyledText>Local: {imovel?.local}</S.StyledText>
              <TouchableOpacity>
                <Feather name='edit-2' size={20} color='white' />
              </TouchableOpacity>
            </S.StyledRowView>

            <S.StyledRowView></S.StyledRowView>

            {imovel?.quartos === '' ? null : (
              <S.StyledRowView>
                <S.StyledText>Quartos: {imovel?.quartos}</S.StyledText>
                <TouchableOpacity>
                  <Feather name='edit-2' size={20} color='white' />
                </TouchableOpacity>
              </S.StyledRowView>
            )}
            {imovel?.banheiros === '' ? null : (
              <S.StyledRowView>
                <S.StyledText>Banheiros: {imovel?.banheiros}</S.StyledText>
                <TouchableOpacity>
                  <Feather name='edit-2' size={20} color='white' />
                </TouchableOpacity>
              </S.StyledRowView>
            )}
            {imovel?.area === '' ? null : (
              <S.StyledRowView>
                <S.StyledText>Area: {imovel?.area} m²</S.StyledText>
                <TouchableOpacity>
                  <Feather name='edit-2' size={20} color='white' />
                </TouchableOpacity>
              </S.StyledRowView>
            )}
            {imovel?.garagem === '' ? null : (
              <S.StyledRowView>
                <S.StyledText>Garagem: {imovel?.garagem}</S.StyledText>
                <TouchableOpacity>
                  <Feather name='edit-2' size={20} color='white' />
                </TouchableOpacity>
              </S.StyledRowView>
            )}
          </S.StyledContentView>
        )}
      </ScrollView>
    </S.StyledContainerView>
  );
}
