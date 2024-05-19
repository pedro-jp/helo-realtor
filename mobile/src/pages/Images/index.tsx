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

export default function Images() {
  const [image, setImage] = useState(null);
  const [imageUri, setImageUri] = useState(null);

  const [imageName, setImageName] = useState(null);
  const [imageType, setImageType] = useState(null);

  const route = useRoute();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const { imovelId } = route.params as { imovelId: string };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
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
      console.log('deu certo');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title='Pick an image from camera roll' onPress={pickImage} />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      {imageUri && <Button title='Upload Image' onPress={uploadImage} />}
      <Text>ImovelId: {imovelId}</Text>
    </View>
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
