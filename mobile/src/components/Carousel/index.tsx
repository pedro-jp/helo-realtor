import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import {
  ref,
  deleteObject,
  getDownloadURL,
  uploadBytesResumable,
} from 'firebase/storage';
import { storage } from '../../services/firebaseConfig';
import { api } from '../../services/api';
import * as ImagePicker from 'expo-image-picker';

const { width, height } = Dimensions.get('screen');
const ITEM_WIDTH = width * 0.9;
const ITEM_HEIGHT = height / 1.9;

export default function Carousel(imovel, key) {
  const [images, setImages] = useState([]);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  async function loadImages() {
    try {
      const response = await api.get(`/images/${imovel.images}`);
      setImages(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadImages();
  }, [key]);

  const handleDeleteImage = async (image) => {
    setIsDeleting(true);
    try {
      const imagePath = image.url;
      const imageRef = ref(storage, imagePath);

      await api.delete(`/images/${image.id}`);
      await deleteObject(imageRef);

      console.log('Imagem deletada com sucesso');
      loadImages();
    } catch (error) {
      console.error('Erro ao deletar a imagem:', error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdateImage = async (image) => {
    setIsUpdating(true);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 0.1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const newImageUri = result.assets[0].uri;
        const imagePath = image.url;
        const imageRef = ref(storage, imagePath);

        const response = await fetch(newImageUri);
        const blob = await response.blob();
        await uploadBytesResumable(imageRef, blob);

        const newImageUrl = await getDownloadURL(imageRef);

        await api.put(`/images/${image.id}`, {
          url: newImageUrl,
        });

        console.log('Imagem atualizada com sucesso');
        loadImages();
      }
    } catch (error) {
      console.error('Erro ao atualizar a imagem:', error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <View>
      {isUpdating && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size='large' color='#343438ca' />
        </View>
      )}

      {isDeleting && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size='large' color='#343438ca' />
        </View>
      )}

      <Animated.FlatList
        data={images}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];
          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [-width * 0.7, 0, width * 0.7],
          });

          return (
            <View
              style={{
                marginTop: 40,
                width,
                height: height / 1.8,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  borderRadius: 18,
                  shadowColor: '#969292',
                  shadowOffset: {
                    width: 0,
                    height: 12,
                  },
                  shadowOpacity: 0.58,
                  shadowRadius: 1.0,
                  elevation: 5,
                  padding: 3,
                  backgroundColor: '#ffffff52',
                }}
              >
                <View
                  style={{
                    width: ITEM_WIDTH,
                    height: ITEM_HEIGHT,
                    overflow: 'hidden',
                    alignItems: 'center',
                    borderRadius: 14,
                    position: 'relative',
                  }}
                >
                  <TouchableOpacity
                    onPress={() => handleUpdateImage(item)}
                    style={{
                      position: 'absolute',
                      top: 10,
                      left: 10,
                      zIndex: 1,
                    }}
                  >
                    <Feather name='edit' size={30} color='blue' />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleDeleteImage(item)}
                    style={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      zIndex: 1,
                    }}
                  >
                    <Feather name='trash-2' size={30} color='red' />
                  </TouchableOpacity>
                  <Animated.Image
                    style={{
                      width: ITEM_WIDTH,
                      height: ITEM_HEIGHT,
                      resizeMode: 'cover',
                      transform: [{ translateX }],
                    }}
                    source={{
                      uri: item.url,
                    }}
                  />
                  <View></View>
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}
export const styles = StyleSheet.create({
  input: {
    height: 50,
    width: '100%',
    borderRadius: 4,
    paddingLeft: 10,
    backgroundColor: '#222',
    color: '#fff',
    padding: 10,
  },
  loadingContainer: {
    position: 'absolute',
    zIndex: 10,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
