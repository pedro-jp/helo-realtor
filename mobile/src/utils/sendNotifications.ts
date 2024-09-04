import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export const sendNotification = async (title, body, imageUrl) => {
  const { status } = await Notifications.getPermissionsAsync();

  if (status !== 'granted') {
    const { status: newStatus } = await Notifications.requestPermissionsAsync();
    if (newStatus !== 'granted') {
      alert('Permissão para enviar notificações não foi concedida.');
      return;
    }
  }

  if (Platform.OS === 'android' || Platform.OS === 'ios') {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
        sound: true,
      },
      trigger: null,
    });
  }
};
