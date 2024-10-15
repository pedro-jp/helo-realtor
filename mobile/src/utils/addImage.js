import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../services/firebaseConfig';
import { api } from '../services/api';
import Toast from 'react-native-toast-message';

export const addImage = async (imageUri, imovelId) => {
  if (!imageUri) return;

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
          Toast.show({
            type: 'error',
            text1: 'Erro no upload',
            text2: error.message,
          });
          reject(error);
        },
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          await api.post('/images', {
            imovelId,
            imageUrl: url,
          });
          Toast.show({
            type: 'success',
            text1: 'Imagem enviada com sucesso!',
          });
          resolve(url);
        }
      );
    });
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Erro no upload',
      text2: error.message,
    });
    throw error;
  }
};
