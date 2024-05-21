import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { ImovelType } from '../../pages/ListImoveis';
import { StatusBar } from 'expo-status-bar';
import Carousel from '../../components/Carousel';
import { Feather } from '@expo/vector-icons';
import * as S from './styles';

export default function Imovel() {
  const Routes = useRoute();
  const { index } = Routes.params as { index: number };
  const [imovel, setImovel] = useState<ImovelType[]>([]);

  useEffect(() => {
    loadImovel();
  }, [index]);

  async function loadImovel() {
    try {
      const response = await api.get('/imoveis');
      setImovel(response?.data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <S.StyledContainerView>
      <StatusBar style='light' backgroundColor='transparent' />
      <Carousel images={imovel[index]?.images} />
      <ScrollView>
        {imovel && (
          <S.StyledContentView>
            <S.StyledRowView>
              <S.StyledText>Imóvel: {imovel[index]?.name}</S.StyledText>
              <TouchableOpacity>
                <TouchableOpacity>
                  <Feather name='edit-2' size={20} color='white' />
                </TouchableOpacity>
              </TouchableOpacity>
            </S.StyledRowView>
            <S.StyledRowView>
              <S.StyledText>
                Descrição: {'\n'} {imovel[index]?.description}
              </S.StyledText>
              <TouchableOpacity>
                <Feather name='edit-2' size={20} color='white' />
              </TouchableOpacity>
            </S.StyledRowView>
            <S.StyledRowView>
              <S.StyledText>
                Valor:{' '}
                {Number(imovel[index]?.price).toLocaleString('pt-br', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </S.StyledText>
              <TouchableOpacity>
                <Feather name='edit-2' size={20} color='white' />
              </TouchableOpacity>
            </S.StyledRowView>
            <S.StyledRowView>
              <S.StyledText>Local: {imovel[index]?.local}</S.StyledText>
              <TouchableOpacity>
                <Feather name='edit-2' size={20} color='white' />
              </TouchableOpacity>
            </S.StyledRowView>

            <S.StyledRowView></S.StyledRowView>

            {imovel[index]?.quartos === '' ? null : (
              <S.StyledRowView>
                <S.StyledText>Quartos: {imovel[index]?.quartos}</S.StyledText>
                <TouchableOpacity>
                  <Feather name='edit-2' size={20} color='white' />
                </TouchableOpacity>
              </S.StyledRowView>
            )}
            {imovel[index]?.banheiros === '' ? null : (
              <S.StyledRowView>
                <S.StyledText>
                  Banheiros: {imovel[index]?.banheiros}
                </S.StyledText>
                <TouchableOpacity>
                  <Feather name='edit-2' size={20} color='white' />
                </TouchableOpacity>
              </S.StyledRowView>
            )}
            {imovel[index]?.area === '' ? null : (
              <S.StyledRowView>
                <S.StyledText>Area: {imovel[index]?.area} m²</S.StyledText>
                <TouchableOpacity>
                  <Feather name='edit-2' size={20} color='white' />
                </TouchableOpacity>
              </S.StyledRowView>
            )}
            {imovel[index]?.garagem === '' ? null : (
              <S.StyledRowView>
                <S.StyledText>Garagem: {imovel[index]?.garagem}</S.StyledText>
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
