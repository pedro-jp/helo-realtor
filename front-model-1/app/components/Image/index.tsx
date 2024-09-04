import Image from 'next/image';
import { api } from '../../services/api';

export const Imagem = async ({ id }: { id: string }) => {
  let imageUrl = '';

  if (id) {
    try {
      const response = await api.get(
        `${process.env.NEXT_PUBLIC_URL}/images/${id}`
      );
      if (response.data.length > 0) {
        imageUrl = response.data[0]?.url || imageUrl;
      }
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  }

  return (
    <Image
      src={imageUrl}
      alt='House Image'
      layout='responsive'
      width={500}
      height={300}
    />
  );
};
