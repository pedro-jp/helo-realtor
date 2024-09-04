import { Image } from 'react-native';
import { api } from '../../services/api';
import { useEffect, useState } from 'react';

export const Imagem = ({ id, refreshing }) => {
  const [imageUrl, setImageUrl] = useState('');
  const IMAGE_SIZE = 80;
  const SPACING = 10;

  useEffect(() => {
    if (id) {
      loadImages(id);
    }
  }, [id, refreshing]);

  async function loadImages(id: string) {
    try {
      const response = await api.get(`/images/${id}`);
      if (response.data.length > 0) {
        setImageUrl(response.data[0].url);
      } else {
        setImageUrl('https://via.placeholder.com/80');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Image
      source={{
        uri: imageUrl,
      }}
      style={{
        width: IMAGE_SIZE,
        height: IMAGE_SIZE,
        borderRadius: IMAGE_SIZE / 2,
        marginRight: SPACING / 2,
      }}
    />
  );
};
