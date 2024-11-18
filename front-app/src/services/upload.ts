import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../services/firebaseConfig';
import { toast } from 'react-toastify';
import { NextRouter } from 'next/router';
import { setupAPIClient } from './api';

export const uploadImage = async (
  imageUri: string,
  id: string,
  router: NextRouter,
  type: string
) => {
  if (!imageUri) return;
  const api = setupAPIClient(router);

  let route = '';
  let payload: { [key: string]: any } = {}; // Objeto para montar o payload dinamicamente

  switch (type) {
    case 'imovel_image':
      route = 'images';
      payload.imovelId = id; // Adiciona imovelId ao payload
      break;
    case 'logo':
      route = 'logo';
      payload.officeId = id; // Adiciona officeId ao payload
    case 'banner':
      route = 'banner';
      payload.officeId = id; // Adiciona officeId ao payload
      break;
    default:
      throw new Error('Tipo inválido para upload de imagem');
  }

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
        },
        (error) => {
          console.error('Upload error: ', error);
          toast.error('Erro no upload');
          reject(error);
        },
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);

          // Adiciona o URL ao payload
          payload.imageUrl = url;

          // Faz a requisição para a API com o payload dinâmico
          await api.post(`/${route}`, payload);

          resolve(url);
        }
      );
    });
  } catch (error) {
    toast.error('Erro no upload');
    throw error;
  }
};
