import Image from 'next/image';
import { api } from '../../services/api';

export const Imagem = async ({ id }: { id: string }) => {
  let imageUrl = '';

  if (id) {
    try {
      const response = await api.get(`http://192.168.1.21:3332/images/${id}`);
      imageUrl = response.data[0]?.url;
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  }

  return <Image src={imageUrl} alt='House Image' width={500} height={300} />;
};
