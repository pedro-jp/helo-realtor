import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useContext, useEffect, useRef, useState } from 'react';
import { api } from '../../services/api';
import { StatusBar } from 'expo-status-bar';
import Carousel from '../../components/Carousel';
import { Feather } from '@expo/vector-icons';
import * as S from './styles';
import { UserProps } from '../../interfaces';
import { AuthContext } from '../../contexts/AuthContext';

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
  categoryId: string;
  active: boolean;
};

export default function Imovel() {
  const Routes = useRoute();
  const { imovelId } = Routes.params as { imovelId: string };
  const [imovel, setImovel] = useState<ImovelType>({} as ImovelType);
  const { user } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [local, setLocal] = useState('');
  const [quartos, setQuartos] = useState('');
  const [banheiros, setBanheiros] = useState('');
  const [area, setArea] = useState('');
  const [garagem, setGaragem] = useState('');
  const [active, setActive] = useState(false);

  useEffect(() => {
    loadImovel();
  }, [imovelId]);

  async function loadImovel() {
    try {
      const response = await api.get(`/imovel/${imovelId}`);
      setName(response?.data.name);
      setDescription(response?.data.description);
      setPrice(response?.data.price);
      setLocal(response?.data.local);
      setQuartos(response?.data.quartos);
      setBanheiros(response?.data.banheiros);
      setArea(response?.data.area);
      setGaragem(response?.data.garagem);
      setActive(response?.data.active);
      setImovel(response?.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUpdate(categoryId: string) {
    try {
      const response = await api.put(`/imovel/${imovelId}`, {
        name,
        description,
        price,
        local,
        quartos,
        banheiros,
        area,
        garagem,
        active,
        ownerId: user.id,
        categoryId,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data ?? error.message);
    }
  }

  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

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
              <S.StyledTitle>Nome:</S.StyledTitle>
              <S.StyledInput value={name} onChangeText={setName} />
              <TouchableOpacity onPress={handleFocus}>
                <Feather name='edit-2' size={20} color='white' />
              </TouchableOpacity>
            </S.StyledRowView>
            <S.StyledRowView>
              <S.StyledInput onChangeText={setDescription} ref={inputRef}>
                Descrição: {'\n'} {imovel?.description}
              </S.StyledInput>
              <TouchableOpacity onPress={handleFocus}>
                <Feather name='edit-2' size={20} color='white' />
              </TouchableOpacity>
            </S.StyledRowView>
            <S.StyledRowView>
              <S.StyledInput onChangeText={setPrice} ref={inputRef}>
                Valor:{' '}
                {Number(imovel?.price).toLocaleString('pt-br', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </S.StyledInput>
              <TouchableOpacity>
                <Feather name='edit-2' size={20} color='white' />
              </TouchableOpacity>
            </S.StyledRowView>
            <S.StyledRowView>
              <S.StyledInput onChangeText={setLocal} ref={inputRef}>
                Local: {imovel?.local}
              </S.StyledInput>
              <TouchableOpacity>
                <Feather name='edit-2' size={20} color='white' />
              </TouchableOpacity>
            </S.StyledRowView>

            <S.StyledRowView></S.StyledRowView>

            {imovel?.quartos === '' ? null : (
              <S.StyledRowView>
                <S.StyledInput onChangeText={setQuartos}>
                  Quartos: {imovel?.quartos}
                </S.StyledInput>
                <TouchableOpacity>
                  <Feather name='edit-2' size={20} color='white' />
                </TouchableOpacity>
              </S.StyledRowView>
            )}
            {imovel?.banheiros === '' ? null : (
              <S.StyledRowView>
                <S.StyledInput onChangeText={setBanheiros}>
                  Banheiros: {imovel?.banheiros}
                </S.StyledInput>
                <TouchableOpacity>
                  <Feather name='edit-2' size={20} color='white' />
                </TouchableOpacity>
              </S.StyledRowView>
            )}
            {imovel?.area === '' ? null : (
              <S.StyledRowView>
                <S.StyledInput onChangeText={setArea}>
                  Area: {imovel?.area} m²
                </S.StyledInput>
                <TouchableOpacity>
                  <Feather name='edit-2' size={20} color='white' />
                </TouchableOpacity>
              </S.StyledRowView>
            )}
            {imovel?.garagem === '' ? null : (
              <S.StyledRowView>
                <S.StyledInput onChangeText={setGaragem}>
                  Garagem: {imovel?.garagem}
                </S.StyledInput>
                <TouchableOpacity>
                  <Feather name='edit-2' size={20} color='white' />
                </TouchableOpacity>
              </S.StyledRowView>
            )}
          </S.StyledContentView>
        )}
      </ScrollView>
      <Button
        onPress={() => handleUpdate(imovel?.categoryId)}
        title='Atualizar'
      />
    </S.StyledContainerView>
  );
}
