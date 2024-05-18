import { StyledView } from '../../pages/components/homeComponents';
import React, { useContext, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { api } from '../../services/api';
import { AuthContext } from '../../contexts/AuthContext';

const Home = () => {
  const [dados, setDados] = useState([]);
  const { user, signOut } = useContext(AuthContext);

  useEffect(() => {
    async function teste() {
      const response = await api.get('/imovel', {
        params: {
          ownerId: user.id,
        },
        headers: {
          Authorization: `Bearer ${user.token}`, // Substitua `token` pelo seu token de autorização
        },
      });

      setDados(response.data);
    }
    teste();
  }, []);

  return (
    <View>
      <StyledView>
        {dados.length > 0 && dados.map((item) => <Text>{item.name}</Text>)}
      </StyledView>

      <TouchableOpacity onPress={signOut}>
        <Text>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
