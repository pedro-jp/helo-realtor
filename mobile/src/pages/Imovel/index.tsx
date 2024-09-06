import React, { useState, useEffect, useContext } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { api } from '../../services/api';
import { StatusBar } from 'expo-status-bar';
import Carousel from '../../components/Carousel';
import * as S from './styles';
import { AuthContext } from '../../contexts/AuthContext';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';
import { addImage } from '../../utils/addImage';
import { sendNotification } from '../../utils/sendNotifications';
import { stylesAdd } from '../../pages/AddImovel';

type ImovelType = {
  name: string;
  description: string;
  images: {
    url: string;
  }[];
  id: string;
  price: number;
  local: string;
  quartos: number;
  banheiros: number;
  area: number;
  garagem: number;
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
  const [local, setLocal] = useState('');
  const [price, setPrice] = useState<string>('0');
  const [quartos, setQuartos] = useState(0);
  const [banheiros, setBanheiros] = useState(0);
  const [area, setArea] = useState(0);
  const [garagem, setGaragem] = useState(0);
  const [active, setActive] = useState(false);
  const [refreshing, setRefreshing] = useState(false); // Estado de refreshing
  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(false); // Estado de loading
  const [carouselKey, setCarouselKey] = useState(Math.random());
  const [marker, setMarker] = useState(false);

  useEffect(() => {
    loadImovel();
  }, [imovelId]);

  const convertNumber = (num: number): string => {
    return num.toString().replace('.', ',');
  };

  async function loadImovel() {
    setLoading(true);
    try {
      const response = await api.get(`/imovel/${imovelId}`);
      setName(response?.data.name);
      setDescription(response?.data.description);
      setPrice(convertNumber(response?.data.price));
      setLocal(response?.data.local);
      setQuartos(response?.data.quartos);
      setBanheiros(response?.data.banheiros);
      setArea(response?.data.area);
      setGaragem(response?.data.garagem);
      setActive(response?.data.active);
      setImovel(response?.data);
      setMarker(response?.data.marker);
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false); // Finaliza o refreshing
      setLoading(false);
    }
  }

  async function handleUpdate(categoryId: string) {
    setLoading(true);
    try {
      const numericPrice = parseFloat(
        price.replace('R$', '').replace('.', '').replace(',', '.').trim()
      );

      const response = await api.put(`/imovel/${imovelId}`, {
        name,
        description,
        price: numericPrice,
        local,
        quartos,
        banheiros,
        area,
        garagem,
        active,
        ownerId: user.id,
        categoryId,
        marker,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data ?? error.message);
    } finally {
      setLoading(false);
    }
  }

  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  async function handleDelete(id: string) {
    setLoading(true);
    try {
      const response = await api.delete(`/imovel/${id}`);
      console.log(response.data);
      navigation.navigate('Imoveis');
    } catch (error) {
      console.log(error.response.data ?? error.message);
    } finally {
      setLoading(false);
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      handleAddImage(result.assets[0].uri);
    }
  };

  const handleAddImage = async (uri) => {
    if (uri && imovelId) {
      setLoading(true);
      await addImage(uri, imovelId);
      Toast.show({
        type: 'success',
        text1: 'Imagem enviada com sucesso!',
      });
      setImageUri(null);
      setCarouselKey(Math.random());
      setLoading(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadImovel();
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

      {/* Mostra o indicador de carregamento se loading estiver verdadeiro */}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size='large' color='#343438ca' />
        </View>
      )}

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <StatusBar style='light' backgroundColor='transparent' />
        <Carousel images={imovelId} key={carouselKey} />

        <TouchableOpacity
          style={{
            width: '90%',
            paddingVertical: 10,
            borderRadius: 10,
            marginHorizontal: 'auto',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            paddingRight: 20,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
          onPress={() => pickImage()}
        >
          <Feather name='plus' color={'#fff'} size={28} />
          <Text
            style={{
              color: '#fff',
              fontWeight: 'bold',
              fontSize: 20,
            }}
          >
            {' '}
            imagem
          </Text>
        </TouchableOpacity>

        {imovel && (
          <S.StyledContentView>
            <View style={{ marginBottom: 10 }}>
              <Text style={{ color: '#fff', marginBottom: 5 }}>Nome:</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder='Nome'
                placeholderTextColor='#999'
                style={styles.input}
              />
            </View>
            <View style={{ marginBottom: 10 }}>
              <Text style={{ color: '#fff', marginBottom: 5 }}>Descrição:</Text>
              <TextInput
                value={description}
                onChangeText={setDescription}
                placeholder='Descrição'
                placeholderTextColor='#999'
                style={styles.input}
                multiline
              />
            </View>
            <View style={{ marginBottom: 10 }}>
              <Text style={{ color: '#fff', marginBottom: 5 }}>Valor:</Text>
              <TextInputMask
                type={'money'}
                options={{
                  precision: 2,
                  separator: ',',
                  delimiter: '.',
                  unit: 'R$ ',
                  suffixUnit: '',
                }}
                value={price}
                onChangeText={setPrice}
                placeholder='Preço'
                placeholderTextColor='#fff'
                style={styles.input}
              />
            </View>
            <View style={{ marginBottom: 10 }}>
              <Text style={{ color: '#fff', marginBottom: 5 }}>Local:</Text>
              <TextInput
                value={local}
                onChangeText={setLocal}
                placeholder='Local'
                placeholderTextColor='#999'
                style={styles.input}
              />
            </View>

            {/* Input Radio para o marcador */}
            <Text>Deseja adicionar um marcador?</Text>
            <View style={stylesAdd.radioContainer}>
              <TouchableOpacity
                style={stylesAdd.radioButton}
                onPress={() => setMarker(true)}
              >
                <View style={stylesAdd.outerCircle}>
                  {marker === true && <View style={stylesAdd.innerCircle} />}
                </View>
                <Text style={stylesAdd.radioText}>Sim</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={stylesAdd.radioButton}
                onPress={() => setMarker(false)}
              >
                <View style={stylesAdd.outerCircle}>
                  {marker === false && <View style={stylesAdd.innerCircle} />}
                </View>
                <Text style={stylesAdd.radioText}>Não</Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginBottom: 10 }}>
              <Text style={{ color: '#fff', marginBottom: 5 }}>Quartos:</Text>
              <TextInput
                value={quartos.toString()}
                onChangeText={(text) => setQuartos(Number(text))}
                placeholder='Quartos'
                placeholderTextColor='#999'
                keyboardType='numeric'
                style={styles.input}
              />
            </View>
            <View style={{ marginBottom: 10 }}>
              <Text style={{ color: '#fff', marginBottom: 5 }}>Banheiros:</Text>
              <TextInput
                value={banheiros.toString()}
                onChangeText={(text) => setBanheiros(Number(text))}
                placeholder='Banheiros'
                placeholderTextColor='#999'
                keyboardType='numeric'
                style={styles.input}
              />
            </View>
            <View style={{ marginBottom: 10 }}>
              <Text style={{ color: '#fff', marginBottom: 5 }}>Área:</Text>
              <TextInput
                value={area.toString()}
                onChangeText={(text) => setArea(Number(text))}
                placeholder='Área em m²'
                placeholderTextColor='#999'
                keyboardType='numeric'
                style={styles.input}
              />
            </View>
            <View style={{ marginBottom: 10 }}>
              <Text style={{ color: '#fff', marginBottom: 5 }}>
                Vagas de garagem:
              </Text>
              <TextInput
                value={garagem.toString()}
                onChangeText={(text) => setGaragem(Number(text))}
                placeholder='Vagas de garagem'
                placeholderTextColor='#999'
                keyboardType='numeric'
                style={styles.input}
              />
            </View>
          </S.StyledContentView>
        )}
      </ScrollView>
      <S.StyledUpdate
        onPress={() => handleUpdate(imovel?.categoryId)}
        title='Atualizar'
      />
      <S.StyledDelete onPress={() => handleDelete(imovel.id)} title='Deletar' />
    </S.StyledContainerView>
  );
}

export const styles = StyleSheet.create({
  input: {
    height: 50,
    width: '100%',
    borderRadius: 4,
    paddingLeft: 10,
    backgroundColor: '#222',
    color: '#fff',
    padding: 10,
  },
  loadingContainer: {
    position: 'absolute',
    zIndex: 10,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
