import {
  Button,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Animated,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState, useRef, useEffect } from 'react';
import { storage } from '../../services/firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { api } from '../../services/api';
import {
  useNavigation,
  useRoute,
  NavigationProp,
  ParamListBase,
} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

export default function Images() {
  const [imageUri, setImageUri] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState('');

  const route = useRoute();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const { imovelId } = route.params as { imovelId: string };

  const animation = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 100 - progress,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!imageUri) return;

    setUploading(true);

    const response = await fetch(imageUri);
    const blob = await response.blob();
    const fileName = imageUri.substring(imageUri.lastIndexOf('/') + 1);
    const storageRef = ref(storage, `images/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, blob);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        setUploading(false);
        Toast.show({
          type: 'error',
          text1: 'Erro no upload',
          text2: error.message,
        });
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        await sendImageUrlToApi(url);
        setUploading(false);
        Toast.show({
          type: 'success',
          text1: 'Imagem enviada com sucesso!',
        });
        setUrl(url);
        setImageUri(null);
        setProgress(0);
      }
    );
  };

  const sendImageUrlToApi = async (url) => {
    try {
      await api.post('/images', {
        imovelId,
        imageUrl: url,
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao enviar URL',
        text2: error.message,
      });
    }
  };

  return (
    <>
      <View style={{ zIndex: 10, top: 0 }}>
        <Toast />
      </View>
      <View style={styles.container}>
        {imageUri && (
          <View style={styles.imageContainer}>
            <ImageBackground source={{ uri: imageUri }} style={styles.image}>
              <Animated.View
                style={[
                  styles.overlay,
                  {
                    height: animation.interpolate({
                      inputRange: [0, 100],
                      outputRange: ['0%', '100%'],
                    }),
                  },
                ]}
              />
            </ImageBackground>
          </View>
        )}
        <Button title='Selecione uma imagem' onPress={pickImage} />
        {imageUri && !uploading && (
          <Button title='Upload Image' onPress={uploadImage} />
        )}
        {uploading && (
          <>
            <Text>Enviando imagem... {Math.round(progress)}%</Text>
          </>
        )}
        <Button
          title='Finalizar'
          onPress={() => {
            navigation.navigate('Imovel', { imovelId: imovelId });
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: 200,
    height: 200,
    marginVertical: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
});
