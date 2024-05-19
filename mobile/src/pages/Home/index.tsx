import React, { useContext, useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { api } from '../../services/api';
import { AuthContext } from '../../contexts/AuthContext';

import { StyledContainerView } from './styles';

const Home = () => {
  const [dados, setDados] = useState([]);
  const { user, signOut } = useContext(AuthContext);

  useEffect(() => {
    async function teste() {
      const response = await api.get('/images', {
        params: {
          imovelId: '110a47b6-0397-4a20-a34a-995ce407e937',
        },
        headers: {
          Authorization: `Bearer ${user.token}`, // Substitua `token` pelo seu token de autorização
        },
      });
      console.log(response.data);
      setDados(response.data);
    }
    teste();
  }, []);

  return (
    <StyledContainerView>
      <TouchableOpacity onPress={signOut}>
        <Text>Sair</Text>
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
