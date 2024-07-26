import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import React, { useEffect } from 'react';
import * as S from './styles';
import { Feather } from '@expo/vector-icons';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';

async function hasAndroidPermission() {
  const getCheckPermissionPromise = () => {
    if (parseInt(Platform.Version as string) >= 33) {
      return Promise.all([
        PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
        ),
        PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO
        ),
      ]).then(
        ([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
          hasReadMediaImagesPermission && hasReadMediaVideoPermission
      );
    } else {
      return PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
      );
    }
  };

  const hasPermission = await getCheckPermissionPromise();
  if (hasPermission) {
    return true;
  }
  const getRequestPermissionPromise = () => {
    if (parseInt(Platform.Version as string) >= 33) {
      return PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
      ]).then(
        (statuses) =>
          statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
            PermissionsAndroid.RESULTS.GRANTED
      );
    } else {
      return PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
      ).then((status) => status === PermissionsAndroid.RESULTS.GRANTED);
    }
  };

  return await getRequestPermissionPromise();
}

async function savePicture() {
  if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
    return;
  }

  let params = {
    first: 20,
  };

  CameraRoll.getPhotos(params).then((images) => {
    console.log(images);
  });
}

useEffect(() => {
  savePicture();
}, []);

export default function Gallery() {
  return (
    <S.Container style={styles.container}>
      <S.HeaderWrapper>
        <S.HeaderLeftWrapper>
          <View>
            <Feather name='x' size={25} color='black' />
          </View>
          <S.HeaderTitleWrapper>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <S.HeaderTitle>Galeria</S.HeaderTitle>
              <Feather name='chevron-down' size={12} color='black' />
            </View>
          </S.HeaderTitleWrapper>
        </S.HeaderLeftWrapper>
        <View>
          <View>
            <S.HeaderSubtitle>Próximo</S.HeaderSubtitle>
          </View>
        </View>
      </S.HeaderWrapper>
      <View>
        <Text>Imagens selecionadas</Text>
      </View>
      <ScrollView>
        <Text>Imagens da galeria</Text>
      </ScrollView>
      <S.Footer>
        <S.PickedFooterSection>
          <S.PickedFooterTitle>Galeria</S.PickedFooterTitle>
        </S.PickedFooterSection>
        <S.FooterSection>
          <S.FooterText>Foto</S.FooterText>
        </S.FooterSection>
        <S.FooterSection>
          <S.FooterText>Video</S.FooterText>
        </S.FooterSection>
      </S.Footer>
    </S.Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
  },
});
