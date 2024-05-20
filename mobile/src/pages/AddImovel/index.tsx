import { Text, TouchableOpacity, View, Modal } from 'react-native';
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

  async function listCategories() {
    try {
      const response = await api.get('/category', {
        params: {
          ownerId: user.id,
        },
      });
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
      categorySelected === '' ||
      quartos === '' ||
      banheiros === '' ||
      area === '' ||
      garagem === ''
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
    } catch (error) {
      const data = {
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
      };
      console.log(error + JSON.stringify(data));
    }
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

  return (
    <S.StyledContainerView>
      <View style={{ zIndex: 10 }}>
        <Toast />
      </View>
      <S.StyledText>Adicionar Imóvel</S.StyledText>
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
          <S.StyledScrollView>
            {categoryList.map((item) => (
              <S.StyledListView
                key={item.id}
                onPress={() => handleCategory(item.id)}
              >
                <S.StyledText>{item.name}</S.StyledText>
              </S.StyledListView>
            ))}
          </S.StyledScrollView>
        </S.StyledModal>

        <S.StyledButton onPress={createImovel}>
          <S.StyledText>Adicionar Imóvel</S.StyledText>
        </S.StyledButton>
      </S.StyledContentView>
    </S.StyledContainerView>
  );
}
