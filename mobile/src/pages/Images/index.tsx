import { Button, Image, StyleSheet, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { api } from '../../services/api'; // Importe o serviço de API
import {
  useNavigation,
  useRoute,
  NavigationProp,
  ParamListBase,
} from '@react-navigation/native';
import Toast, { InfoToast, SuccessToast } from 'react-native-toast-message';

export default function Images() {
  const [image, setImage] = useState(null);
  const [imageUri, setImageUri] = useState(null);

  const [imageName, setImageName] = useState(null);
  const [imageType, setImageType] = useState(null);

  const route = useRoute();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const { imovelId } = route.params as { imovelId: string };

  const IMAGE_URL =
    'https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setImageUri(result.assets[0].uri);
      setImageName(
        result.assets[0].uri.substring(
          result.assets[0].uri.lastIndexOf('/') + 1,
          result.assets[0].uri.length
        )
      );
      setImageType(imageName.split('.')[1]);
    }
  };

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Hello',
      text2: 'This is some something 👋',
    });
  };

  const uploadImage = async () => {
    const formData = new FormData();

    formData.append(
      'file',
      JSON.parse(
        JSON.stringify({
          name: imageName,
          uri: image,
          type: `image/${imageType}`,
        })
      )
    );
    formData.append('imovelId', imovelId);
    try {
      await api.postForm('/images', formData);
      Toast.show({
        type: 'success',
        text1: 'Imagem enviada',
      });
    } catch (error) {
      Toast.show({
        type: 'info',
        text1: 'Envie novamente',
      });
    }
  };

  return (
    <>
      <View style={{ zIndex: 10, top: 0 }}>
        <Toast />
      </View>
      <View style={styles.container}>
        <Image
          source={{ uri: IMAGE_URL }}
          style={StyleSheet.absoluteFillObject}
          blurRadius={10}
        />
        <Button title='Selecione uma imagem' onPress={pickImage} />
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
        {imageUri && <Button title='Upload Image' onPress={uploadImage} />}

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
  image: {
    width: 200,
    height: 200,
    marginVertical: 10,
  },
});
