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
  const route = useRoute();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const { imovelId } = route.params as { imovelId: string };
  const date = new Date().getTime();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    const formData = new FormData();

    const imageContent = {
      uri: image as string,
      name: `${date}.jpg`,
      type: 'image/jpg',
    };
    formData.append(
      'file',
      JSON.parse(
        JSON.stringify({
          name: imageContent.name,
          uri: imageContent.uri,
          type: imageContent.type,
        })
      )
    );
    formData.append('imovelId', imovelId);
    try {
      await api.postForm('/images', formData);
      console.log('deu certo');
      navigation.navigate('Home');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title='Pick an image from camera roll' onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      {image && <Button title='Upload Image' onPress={uploadImage} />}
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
