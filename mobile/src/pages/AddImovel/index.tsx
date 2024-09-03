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
import { TextInputMask } from 'react-native-masked-text';

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
  const [office, setOffice] = useState(null);
  const [realtorList, setRealtorList] = useState([]);
  const [realtorId, setRealtorId] = useState('');
  const [realtorName, setRealtorName] = useState('');
  const [realtorModalVisible, setRealtorModalVisible] = useState(false);

  async function getOffice() {
    try {
      const response = await api.get(`/office/${ownerId}`);
      setOffice(response.data);
      setRealtorList(response.data.realtors);
    } catch (error) {
      console.error(error);
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

  useEffect(() => {
    listCategories();
    getOffice();
  }, []);

  async function createImovel() {
    if (
      name === '' ||
      description === '' ||
      price === '' ||
      categoryId === '' ||
      local === '' ||
      categorySelected === '' ||
      realtorId === ''
    ) {
      Toast.show({
        type: 'error',
        text1: 'Preencha todos os campos',
      });
      return;
    }

    try {
      // Converte a string formatada em um valor numérico correto com centavos
      const numericPrice = parseFloat(
        price
          .replace('R$ ', '') // Remove o símbolo da moeda
          .replace('.', '') // Remove o delimitador de milhar
          .replace(',', '.') // Substitui a vírgula pelo ponto decimal
      );

      const response = await api.post('/imovel', {
        name,
        description,
        price: numericPrice.toFixed(2), // Garante que o preço seja enviado com duas casas decimais
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
      });

      // Reseta o formulário após a criação bem-sucedida
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
      setRealtorId('');
      setRealtorName('');

      navigation.navigate('Images', { imovelId: response.data.id });
    } catch (error) {
      console.error(error);
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

  const handleRealtorSelection = (id, name) => {
    setRealtorId(id);
    setRealtorName(name);
    setRealtorModalVisible(false);
  };

  const IMAGE_URL =
    'https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

  return (
    <S.StyledContainerView
      refresh={refresh}
      onRefresh={() => {
        setRefresh(true);
        listCategories();
        getOffice();
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

        <S.StyledText style={{ marginTop: 20 }}>
          Selecione o Corretor
        </S.StyledText>
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
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              getOffice();
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
