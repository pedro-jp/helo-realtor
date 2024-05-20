import { useContext, useEffect, useState } from 'react';
import { api } from '../../services/api';
import * as S from './styles';
import { Text } from 'react-native';
import { AuthContext } from '../../contexts/AuthContext';

type ImageType = {
  id: string;
  url: string;
};

export default function ListImoveis() {
  const [imoveis, setImoveis] = useState([]);
  const { user } = useContext(AuthContext);
  const ownerId = user.id;

  useEffect(() => {
    loadImoveis();
  }, []);

  async function loadImoveis() {
    try {
      const response = await api.get('/imovel', {
        params: {
          ownerId,
        },
      });
      console.log(response.data);
      setImoveis(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <S.StyledContainerView>
      <S.StyledScrollView>
        {imoveis.map((imovel) => (
          <S.StyledListView key={imovel.id}>
            <S.StyledText>{imovel.name}</S.StyledText>
            {imovel?.images && (
              <S.StyledImage
                source={{
                  uri: `http://192.168.1.6:3332/files/${imovel?.images[0]?.url}`,
                }}
              />
            )}
          </S.StyledListView>
        ))}
      </S.StyledScrollView>
    </S.StyledContainerView>
  );
}
