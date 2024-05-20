import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import * as S from './styles';
import { Text } from 'react-native';

type ImageType = {
  id: string;
  url: string;
};

export default function ListImoveis() {
  const [images, setImages] = useState<ImageType[]>([]);

  const loadImages = async () => {
    const response = await api.get('/images', {
      params: {
        imovelId: '9c133100-79b5-41a2-b889-e3dc029e1e92',
      },
    });
    setImages(response.data);
  };

  return (
    <S.StyledContainerView>
      <S.StyledButton onPress={loadImages}>
        <Text>Carregar</Text>
      </S.StyledButton>
      <S.StyledScrollView>
        {images.map((imagem) => (
          <S.StyledImage
            key={imagem.id}
            source={{
              uri: `http://192.168.1.6:3332/files/${imagem.url}`,
            }}
          />
        ))}
      </S.StyledScrollView>
    </S.StyledContainerView>
  );
}
