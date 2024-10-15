import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Modal,
  Image,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import * as S from './styles';
import * as ImagePicker from 'expo-image-picker';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { api } from '../../services/api';
import Toast from 'react-native-toast-message';
import {
  useNavigation,
  NavigationProp,
  ParamListBase,
} from '@react-navigation/native';
import { TextInputMask } from 'react-native-masked-text';
import { uploadImage } from '../../utils/uploadImage';

export default function AddImovel() {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const { user } = useContext(AuthContext);
  const ownerId = user.id;

  // Estados para os inputs e configuração
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [local, setLocal] = useState('');
  const [area, setArea] = useState('');
  const [quartos, setQuartos] = useState('');
  const [banheiros, setBanheiros] = useState('');
  const [garagem, setGaragem] = useState('');
  const [marker, setMarker] = useState(false); // Estado para o booleano marker
  const [marker2, setMarker2] = useState(false);
  const [transaction, setTransaction] = useState('venda');

  const [categoryList, setCategoryList] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [categorySelected, setCategorySelected] = useState('');

  const [office, setOffice] = useState(null);
  const [realtorList, setRealtorList] = useState([]);
  const [realtorId, setRealtorId] = useState('');
  const [realtorName, setRealtorName] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [realtorModalVisible, setRealtorModalVisible] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const [imovelId, setImovelId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imovelCreated, setImovelCreated] = useState(false);

  useEffect(() => {
    listCategories();
    getOffice();
  }, []);

  async function getOffice() {
    setLoading(true);
    try {
      const response = await api.get(`/office/${ownerId}`);
      setOffice(response.data);
      setRealtorList(response.data.realtors);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function listCategories() {
    try {
      const response = await api.get(`/category/${ownerId}`);
      setCategoryList(response.data);
    } catch (error) {
      console.error(error);
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
      await uploadImage(uri, imovelId);
      setImageUri(null);
      setLoading(false);
      Toast.show({
        type: 'success',
        text1: 'Imagem enviada com sucesso!',
      });
    }
  };

  async function createImovel() {
    Alert.alert(
      'Confirmação',
      'Você confirma a criação do imóvel com os dados preenchidos?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: async () => {
            setLoading(true);
            try {
              const numericPrice = parseFloat(
                price.replace('R$ ', '').replace('.', '').replace(',', '.')
              );

              const response = await api.post('/imovel', {
                name,
                description,
                price: numericPrice.toFixed(2),
                categoryId,
                local,
                quartos: parseInt(quartos),
                banheiros: parseInt(banheiros),
                area: parseInt(area),
                garagem: parseInt(garagem),
                active: true,
                ownerId,
                officeId: office.id,
                realtorId,
                marker,
                transaction,
              });

              setImovelId(response.data.id);
              setImovelCreated(true);

              Toast.show({
                type: 'success',
                text1: 'Imóvel criado com sucesso!',
              });

              pickImage(); // Abre o picker automaticamente após a criação do imóvel
            } catch (error) {
              console.error(error);
              Toast.show({
                type: 'error',
                text1: 'Erro ao criar imóvel',
                text2: error.message,
              });
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  }

  const isFormComplete = () => {
    return (
      name !== '' &&
      description !== '' &&
      price !== '' &&
      local !== '' &&
      area !== '' &&
      categoryId !== '' &&
      realtorId !== ''
    );
  };

  const handleCategory = (id) => {
    setCategoryId(id);
    setModalVisible(!modalVisible);
    filterCategory(id);
  };

  const filterCategory = (id) => {
    const category = categoryList.filter((item) => item.id === id);
    setCategorySelected(category[0].name);
  };

  const handleRealtorSelection = (id, name) => {
    setRealtorId(id);
    setRealtorName(name);
    setRealtorModalVisible(false);
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setPrice('');
    setLocal('');
    setArea('');
    setQuartos('');
    setBanheiros('');
    setGaragem('');
    setCategoryId('');
    setCategorySelected('');
    setRealtorId('');
    setRealtorName('');
    setImageUri(null);
    setImovelId(null);
    setImovelCreated(false);
  };

  const handleViewImovel = () => {
    resetForm();
    navigation.navigate('Imovel', { imovelId });
  };

  const IMAGE_URL =
    'https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

  return (
    <>
      <Image
        style={StyleSheet.absoluteFillObject}
        blurRadius={10}
        source={{ uri: IMAGE_URL }}
      />
      {loading && (
        <View style={stylesAdd.loadingContainer}>
          <ActivityIndicator size='large' color='#343438ca' />
        </View>
      )}
      <S.StyledContainerView>
        <View style={{ zIndex: 10 }}>
          <Toast />
        </View>
        <S.StyledText style={{ marginTop: 20 }}>Adicionar Imóvel</S.StyledText>
        <S.StyledContentView>
          <S.StyledTextInput
            placeholder='Nome'
            value={name}
            onChangeText={setName}
            placeholderTextColor='#fff'
          />
          <S.StyledTextInput
            placeholder='Área m2'
            value={area}
            onChangeText={setArea}
            inputMode='numeric'
            placeholderTextColor='#fff'
          />
          <S.StyledTextInput
            multiline={true}
            placeholder='Descrição'
            value={description}
            onChangeText={setDescription}
            placeholderTextColor='#fff'
          />
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
            placeholder='Preço'
            placeholderTextColor='#fff'
            style={{
              height: 50,
              width: '90%',
              borderRadius: 4,
              paddingLeft: 10,
              backgroundColor: '#022859',
              color: '#fff',
              fontSize: 16,
              fontWeight: '500',
            }}
          />
          <S.StyledTextInput
            placeholder='Local'
            value={local}
            onChangeText={setLocal}
            placeholderTextColor='#fff'
          />

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

          <Text>Venda ou locação?</Text>
          <View style={stylesAdd.radioContainer}>
            <TouchableOpacity
              style={stylesAdd.radioButton}
              onPress={() => {
                setTransaction('venda');
                setMarker2(true);
              }}
            >
              <View style={stylesAdd.outerCircle}>
                {marker2 && <View style={stylesAdd.innerCircle} />}
              </View>
              <Text style={stylesAdd.radioText}>Venda</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={stylesAdd.radioButton}
              onPress={() => {
                setTransaction('locação');
                setMarker2(false);
              }}
            >
              <View style={stylesAdd.outerCircle}>
                {!marker2 && <View style={stylesAdd.innerCircle} />}
              </View>
              <Text style={stylesAdd.radioText}>Locação</Text>
            </TouchableOpacity>
          </View>

          <S.StyledTextInput
            placeholder='Quartos'
            value={quartos}
            onChangeText={setQuartos}
            inputMode='numeric'
            placeholderTextColor='#fff'
          />
          <S.StyledTextInput
            placeholder='Banheiros'
            value={banheiros}
            onChangeText={setBanheiros}
            inputMode='numeric'
            placeholderTextColor='#fff'
          />
          <S.StyledTextInput
            placeholder='Vagas na garagem'
            value={garagem}
            onChangeText={setGaragem}
            inputMode='numeric'
            placeholderTextColor='#fff'
          />

          {isFormComplete() && !imovelCreated && (
            <S.StyledButton onPress={createImovel}>
              <S.StyledText>Adicionar Imóvel</S.StyledText>
            </S.StyledButton>
          )}

          {imovelCreated && !loading && !imageUri && (
            <S.StyledButton onPress={pickImage}>
              <S.StyledText>Adicionar Imagem</S.StyledText>
            </S.StyledButton>
          )}

          {imovelCreated && !loading && imageUri && (
            <S.StyledButton onPress={() => handleAddImage(imageUri)}>
              <S.StyledText>Adicionar Imagem</S.StyledText>
            </S.StyledButton>
          )}

          {imovelCreated && !loading && !imageUri && (
            <S.StyledButton onPress={handleViewImovel}>
              <S.StyledText>Ver Imóvel</S.StyledText>
            </S.StyledButton>
          )}

          {!imovelCreated && (
            <>
              <S.StyledButton onPress={() => setModalVisible(!modalVisible)}>
                <S.StyledText>
                  {categorySelected === '' ? 'Categorias' : categorySelected}
                </S.StyledText>
              </S.StyledButton>

              <S.StyledModal
                animationType='slide'
                visible={modalVisible}
                onRequestClose={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <FlatList
                  style={{ backgroundColor: '#1d1d1d' }}
                  data={categoryList}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <S.StyledListView onPress={() => handleCategory(item.id)}>
                      <S.StyledText>{item.name}</S.StyledText>
                    </S.StyledListView>
                  )}
                />
              </S.StyledModal>

              <S.StyledButton
                onPress={() => setRealtorModalVisible(!realtorModalVisible)}
              >
                <S.StyledText>
                  {realtorName === '' ? 'Selecione o Corretor' : realtorName}
                </S.StyledText>
              </S.StyledButton>

              <S.StyledModal
                animationType='slide'
                visible={realtorModalVisible}
                onRequestClose={() => {
                  setRealtorModalVisible(!realtorModalVisible);
                }}
              >
                <FlatList
                  style={{ backgroundColor: '#1d1d1d' }}
                  data={realtorList}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <S.StyledListView
                      onPress={() => handleRealtorSelection(item.id, item.name)}
                    >
                      <S.StyledText>{item.name}</S.StyledText>
                    </S.StyledListView>
                  )}
                />
              </S.StyledModal>
            </>
          )}
        </S.StyledContentView>
      </S.StyledContainerView>
    </>
  );
}

export const stylesAdd = StyleSheet.create({
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
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  outerCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  innerCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  radioText: {
    color: '#fff',
    fontSize: 16,
  },
});
