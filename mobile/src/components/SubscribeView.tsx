import React, { useRef, useState, useContext } from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Animated,
  Modal,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { useStripe, PaymentSheetError } from '@stripe/stripe-react-native';
import { api } from '../services/api';
import { AuthContext } from '../contexts/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const SubscribeView = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  const { user, setUser } = useContext(AuthContext);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const [clientSecret, setClientSecret] = useState('');
  const [publishableKey, setPublishableKey] = useState('');
  const [token, setToken] = useState('');
  const [resposta, setResposta] = useState('');

  const openModal = () => {
    setModalVisible(true);
    Animated.timing(translateY, {
      toValue: 0, // Modal aparece vindo de baixo
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(translateY, {
      toValue: SCREEN_HEIGHT, // Modal some para baixo
      duration: 300,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };

  const handleGesture = Animated.event(
    [{ nativeEvent: { translationY: translateY } }],
    { useNativeDriver: true }
  );

  const handleGestureEnd = (event) => {
    if (event.nativeEvent.translationY > 150) {
      closeModal(); // Fecha o modal se arrastar mais de 150 pixels
    } else {
      Animated.timing(translateY, {
        toValue: 0, // Volta o modal para o topo
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const createSubscription = async (priceId) => {
    const interval = setInterval(() => {
      closeModal();
    }, 1100);

    setTimeout(() => {
      clearInterval(interval);
    }, 1200);

    try {
      const response = await api.post('/create-subscription', {
        email: user.email,
        priceId: priceId,
      });
      setClientSecret(response.data.clientSecret);
      setPublishableKey(response.data.publishableKey);
      setToken(response.data.token);
      setResposta(response.data.resposta);

      await initializePaymentSheet(response.data.clientSecret);
    } catch (error) {
      console.error('Error creating subscription:', error);
    }
  };

  const initializePaymentSheet = async (clientSecret) => {
    const { error } = await initPaymentSheet({
      paymentIntentClientSecret: clientSecret,
      returnURL: 'helo-realtor://payment-sheet',
      allowsDelayedPaymentMethods: false,
      merchantDisplayName: 'Helo Realtor',
    });
    if (error) {
      console.log('Error initializing payment sheet:', error);
    } else {
      console.log('Payment sheet initialized successfully');
      presentPayment();
    }
  };

  const presentPayment = async () => {
    const { error } = await presentPaymentSheet();
    if (error) {
      console.log('Error presenting payment sheet:', error);
      if (error.code === PaymentSheetError.Failed) {
        Alert.alert('Realize o pagamento');
      } else if (error.code === PaymentSheetError.Canceled) {
        Alert.alert('Pagamento cancelado');
      } else {
        Alert.alert('Error', 'An unexpected error occurred.');
      }
    } else {
      console.log('Payment sheet presented successfully');
      Alert.alert('Assinatura realizada');
      updateUser(); // Atualiza o usuário após o pagamento
    }
  };

  async function updateUser() {
    try {
      const response = await api.get(`/me${user.id}`);
      const userData = response.data;

      if (!user) {
        console.log('Usuário não está definido');
        return;
      }

      console.log(user);
      console.log('data: ' + userData.planIsActive);

      setUser({
        ...user,
        priceId: userData.priceId,
        planIsActive: userData.planIsActive,
        subscriptionId: userData.subscriptionId,
      });

      console.log(userData.planIsActive);

      await AsyncStorage.setItem(
        '@helotech',
        JSON.stringify({
          ...user,
          priceId: userData.priceId,
          planIsActive: userData.planIsActive,
          subscriptionId: userData.subscriptionId,
        })
      );
    } catch (error) {
      console.log('Erro ao atualizar dados do usuário:', error);
    }
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn} onPress={openModal}>
        <Text>{user.planIsActive ? 'Trocar assinatura' : 'Assine já'}</Text>
        <Feather name='chevron-up' size={20} />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType='none'
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <PanGestureHandler
            onGestureEvent={handleGesture}
            onEnded={handleGestureEnd}
          >
            <Animated.View
              style={[
                styles.modalContent,
                {
                  transform: [
                    {
                      translateY: translateY.interpolate({
                        inputRange: [0, SCREEN_HEIGHT],
                        outputRange: [0, SCREEN_HEIGHT],
                        extrapolate: 'clamp',
                      }),
                    },
                  ],
                },
              ]}
            >
              <View style={styles.handle} />
              <Text style={styles.modalText}>Escolha seu plano</Text>

              <Button
                title='Corretor iniciante'
                onPress={() => {
                  createSubscription('price_1PyPKbFkkC3ZoBrEhihlBkHZ'); // Substitua pelo seu priceId do plano básico
                }}
              />

              <Button
                title='Corretor premium'
                onPress={() => {
                  createSubscription('price_1Pyn0JFkkC3ZoBrEjoJzUDfu'); // Substitua pelo seu priceId do plano premium
                }}
              />
            </Animated.View>
          </PanGestureHandler>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 100,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  modalContent: {
    height: '60%',
    backgroundColor: '#00000090',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  handle: {
    width: 50,
    height: 5,
    backgroundColor: '#4246ff',
    borderRadius: 5,
    marginVertical: 10,
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f00',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  btn: {
    backgroundColor: '#FFDC42',
    color: '#fff',
    padding: 10,
    marginBottom: 100,
    borderRadius: 5,
    height: 45,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default SubscribeView;
