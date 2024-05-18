import { StyledView } from '../../pages/components/homeComponents';
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { api } from '../../services/api';

const Home = () => {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    async function teste() {
      const response = await api.get('/imovel', {
        params: {
          ownerId: '15f587eb-67d8-4418-a814-539443462960',
        },
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZmVpam9hIiwiZW1haWwiOiJ0ZXN0ZTJAdGVzdGUuY29tIiwiaWF0IjoxNzE2MDE3NTE1LCJleHAiOjE3MTg2MDk1MTUsInN1YiI6IjEzMDM0ODQ4LWZiMDAtNGEzNS1iOGMyLTA3ZGZmMTZkZDg5OCJ9.BcQxk9EwPnUV5a4E281Yjh8VxEJGo-iY6mENKiWDlxY`, // Substitua `token` pelo seu token de autorização
        },
      });

      setDados(response.data);
    }
    teste();
  }, []);

  return (
    <StyledView>
      {dados.length > 0 && dados.map((item) => <Text>{item.name}</Text>)}
    </StyledView>
  );
};

export default Home;
