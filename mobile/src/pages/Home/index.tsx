import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { api } from '../../services/api';
import { AuthContext } from '../../contexts/AuthContext';

import { StyledContainerView } from './styles';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

type OfficeType = {
  id: string;
  name: string;
  phones: string;
  location: string;
  description: string;
};

const Home = () => {
  const [office, setOffice] = useState<OfficeType>({} as OfficeType);
  const { user, signOut } = useContext(AuthContext);
  const [name, setName] = useState('');

  const ownerId = user.id;

  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const IMAGE_URL =
    'https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

  useEffect(() => {
    getOffice();
  }, []);

  const getOffice = async () => {
    console.log(ownerId);
    try {
      const response = await api.get('/office', {
        params: {
          ownerId: String(ownerId) as string,
        },
      });
      setOffice(response.data);
    } catch (error) {
      console.log(error.response.data ?? error.message);
    }
  };

  const handleCategory = () => {
    navigation.navigate('Category');
  };

  const handleAtualizar = async () => {
    try {
      const response = await api.put('/office', {
        name,
        ownerId,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StyledContainerView>
      <Image
        source={{ uri: IMAGE_URL }}
        style={StyleSheet.absoluteFillObject}
        blurRadius={10}
      />

      <Text style={{ fontSize: 36, color: '#000' }}>{office?.name}</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder='Nome'
        style={{ backgroundColor: 'red', color: '#000' }}
      />

      <Button title='Atualizar' onPress={handleAtualizar} />

      <TouchableOpacity onPress={signOut}>
        <Text>Sair</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleCategory}>
        <Text>Categorias</Text>
      </TouchableOpacity>
    </StyledContainerView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  stretch: {
    width: 50,
    height: 200,
    resizeMode: 'stretch',
  },
});
