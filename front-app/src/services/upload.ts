import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../services/firebaseConfig';
import { toast } from 'react-toastify';
import { NextRouter } from 'next/router';
import { setupAPIClient } from './api';

export const uploadImage = async (
  imageUri: string,
  imovelId: string,
  router: NextRouter
) => {
  if (!imageUri) return;
  const api = setupAPIClient(router);
  try {
    const response = await fetch(imageUri);
    const blob = await response.blob();
    const fileName = imageUri.substring(imageUri.lastIndexOf('/') + 1);
    const storageRef = ref(storage, `images/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, blob);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.error('Upload error: ', error); // Adicione um log detalhado
          toast.error('Erro no upload');
          reject(error);
        },
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          await api.post('/images', {
            imovelId,
            imageUrl: url,
          });
          toast.success(
            'Upload concluído com sucesso. Imagem adicionada ao imóvel'
          );
          resolve(url);
        }
      );
    });
  } catch (error) {
    toast.error('Erro no upload');
    throw error;
  }
};
