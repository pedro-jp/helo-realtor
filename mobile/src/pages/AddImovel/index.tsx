import {
  Text,
  TouchableOpacity,
  View,
  Modal,
  Image,
  StyleSheet,
  FlatList,
} from 'react-native';
import * as S from './styles';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { api } from '../../services/api';
import Toast from 'react-native-toast-message';
import {
  useNavigation,
  NavigationProp,
  ParamListBase,
} from '@react-navigation/native';

export default function AddImovel() {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useContext(AuthContext);
  const ownerId = user.id;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [categoryList, setCategoryList] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [local, setLocal] = useState('');
  const [quartos, setQuartos] = useState('');
  const [banheiros, setBanheiros] = useState('');
  const [area, setArea] = useState('');
  const [garagem, setGaragem] = useState('');
  const [categorySelected, setCategorySelected] = useState('');
  const active = true;
  const [modalVisible, setModalVisible] = useState(false);
  const [refresh, setRefresh] = useState(false);

  async function listCategories() {
    try {
      const response = await api.get(`/category/${ownerId}`);
      setCategoryList(response.data);
    } catch (error) {}
  }

  useEffect(() => {
    listCategories();
  }, []);

  async function createImovel() {
    if (
      name === '' ||
      description === '' ||
      price === '' ||
      categoryId === '' ||
      local === '' ||
      categorySelected === ''
    ) {
      Toast.show({
        type: 'error',
        text1: 'Preencha todos os campos',
      });
      return;
    }

    try {
      const response = await api.post('/imovel', {
        name,
        description,
        price,
        categoryId,
        local,
        quartos,
        banheiros,
        area,
        garagem,
        active: true,
        ownerId,
      });

      setName('');
      setDescription('');
      setPrice('');
      setCategoryId('');
      setLocal('');
      setQuartos('');
      setBanheiros('');
      setArea('');
      setGaragem('');
      setCategorySelected('');

      navigation.navigate('Images', { imovelId: response.data.id });
    } catch (error) {}
  }

  const handleCategory = (id) => {
    setCategoryId(id);
    setModalVisible(!modalVisible);
    filterCategory(id);
  };

  const filterCategory = (id) => {
    const category = categoryList.filter((item) => item.id === id);
    setCategorySelected(category[0].name);
  };

  const IMAGE_URL =
    'https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

  return (
    <S.StyledContainerView
      refresh={refresh}
      onRefresh={() => {
        setRefresh(true);
        listCategories();
        setRefresh(false);
      }}
    >
      <Image
        style={StyleSheet.absoluteFillObject}
        blurRadius={10}
        source={{ uri: IMAGE_URL }}
      />
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
          placeholder='Área m2'
          value={area}
          onChangeText={setArea}
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
        <S.StyledTextInput
          multiline={true}
          placeholder='Descrição'
          value={description}
          onChangeText={setDescription}
          placeholderTextColor='#fff'
        />
        <S.StyledTextInput
          placeholder='Preço'
          value={price}
          onChangeText={setPrice}
          inputMode='numeric'
          placeholderTextColor='#fff'
        />
        <S.StyledTextInput
          placeholder='Local'
          value={local}
          onChangeText={setLocal}
          placeholderTextColor='#fff'
        />

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
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              listCategories();
              setRefreshing(false);
            }}
          />
        </S.StyledModal>

        <S.StyledButton onPress={createImovel}>
          <S.StyledText>Adicionar Imóvel</S.StyledText>
        </S.StyledButton>
      </S.StyledContentView>
    </S.StyledContainerView>
  );
}
