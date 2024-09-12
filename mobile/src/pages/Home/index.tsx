import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { Animated } from 'react-native';
import { useRef } from 'react';
import { api } from '../../services/api';
import { AuthContext } from '../../contexts/AuthContext';
import { StyledContainerView } from './styles';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { StyledModal } from '../AddImovel/styles';
import { StyledInputsView } from '../Category/styles';
import { StyledTextInput } from '../Category/styles';
import { StyledButton } from '../Category/styles';
import { StyledText } from '../Category/styles';
import { StyledScrollView } from '../Category/styles';
import { StyledListView } from '../Category/styles';
import {
  initPaymentSheet,
  presentPaymentSheet,
  StripeProvider,
} from '@stripe/stripe-react-native';

type OfficeType = {
  id: string;
  name: string;
  phone: string;
  address: string;
  address_city: string;
  address_state: string;
  description: string;
  email: string;
  realtors: RealtorType[];
};

type RealtorType = {
  id: string;
  name: string;
  email: string;
  phone: string;
  whatsapp_message: string;
  officeId: string;
};

const Home = () => {
  const [office, setOffice] = useState<OfficeType | null>(null);
  const [realtorName, setRealtorName] = useState('');
  const [realtorEmail, setRealtorEmail] = useState('');
  const [realtorPhone, setRealtorPhone] = useState('');
  const [realtorMessage, setRealtorMessage] = useState('');
  const [realtorCreci, setRealtorCreci] = useState('');

  const { user, signOut } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [address_city, setAddressCity] = useState('');
  const [address_state, setAddressState] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [category, setCategory] = useState('');
  const [state, setState] = useState(false);
  const [top, setTop] = useState('30%');

  const [publishableKey, setPublishableKey] = useState('');

  const [categoryList, setCategoryList] = useState([]);

  const ownerId = user.id;
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const IMAGE_URL =
    'https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

  useEffect(() => {
    getOffice();
    initializePaymentSheet();
    listCategories();
  }, [state]);

  const getHeightMinus30Percent = () => {
    const screenHeight = Dimensions.get('window').height;
    return screenHeight * 0.5; // Subtrai 30% da altura
  };

  const translateY = useRef(new Animated.Value(0)).current;

  const handleGesture = Animated.event(
    [{ nativeEvent: { translationY: translateY } }],
    { useNativeDriver: true }
  );

  const handleGestureEnd = (event) => {
    if (event.nativeEvent.translationY > 150) {
      Animated.timing(translateY, {
        toValue: 1000, // valor alto para fazer o modal sumir
        duration: 300, // duração em milissegundos
        useNativeDriver: true,
      }).start(() => setModalVisible(false)); // Fecha o modal após a animação
    } else {
      Animated.timing(translateY, {
        toValue: 0, // Volta o modal para sua posição original
        duration: 300, // Personaliza o tempo de transição aqui
        useNativeDriver: true,
      }).start();
    }
  };

  const getOffice = async () => {
    try {
      const response = await api.get(`/office/${ownerId}`);
      setOffice(response.data);
      setName(response.data.name);
      setPhone(response.data.phone);
      setAddress(response.data.address);
      setAddressCity(response.data.address_city);
      setDescription(response.data.description);
      setEmail(response.data.email);
    } catch (error) {
      console.log(error.response?.data ?? error.message);
      setOffice(null);
    }
  };

  const handleCreateOffice = async () => {
    try {
      const response = await api.post(`/office`, {
        name,
        ownerId,
        phone,
        address,
        address_city,
        address_state,
        description,
        email,
      });
      setOffice(response.data);
    } catch (error) {
      console.log(error.response?.data ?? error.message);
    }
  };

  const handleUpdateOffice = async () => {
    try {
      const response = await api.put(`/office/${office.id}`, {
        name,
        phone,
        address,
        address_city,
        address_state,
        description,
        email,
      });
      setOffice(response.data);
    } catch (error) {
      console.log(error.response?.data ?? error.message);
    }
  };

  const handleCreateRealtor = async () => {
    if (!office) return;
    try {
      const response = await api.post(`/office/${office.id}/realtors`, {
        name: realtorName,
        email: realtorEmail,
        phone: realtorPhone,
        creci: realtorCreci,
        whatsapp_message: realtorMessage,
      });
      setOffice({
        ...office,
        realtors: [...office.realtors, response.data],
      });
      setRealtorName('');
      setRealtorEmail('');
      setRealtorPhone('');
      setRealtorMessage('');
    } catch (error) {
      console.log(error.response?.data ?? error.message);
    }
  };

  const handleUpdateRealtor = async (realtorId: string) => {
    if (!office) return;
    try {
      const response = await api.put(
        `/office/${office.id}/realtors/${realtorId}`,
        {
          name: realtorName,
          email: realtorEmail,
          phone: realtorPhone,
          creci: realtorCreci,
          whatsapp_message: realtorMessage,
        }
      );
      setOffice({
        ...office,
        realtors: office.realtors.map((r) =>
          r.id === realtorId ? response.data : r
        ),
      });
    } catch (error) {
      console.log(error.response?.data ?? error.message);
    }
  };

  const handleCategory = () => {
    setModalVisible(!modalVisible);
  };

  async function createCategory() {
    try {
      const response = await api.post('/category', {
        ownerId: user.id,
        name: category,
      });

      setCategory('');
      setState(!state);
    } catch (error) {}
  }

  async function listCategories() {
    try {
      const response = await api.get(`/category/${ownerId}`);
      setCategoryList(response.data);
    } catch (error) {}
  }

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`http://192.168.1.21:3332/payment-sheet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { paymentIntent, ephemeralKey, customer, publishableKey } =
      await response.json();

    return {
      paymentIntent,
      ephemeralKey,
      customer,
      publishableKey,
    };
  };

  const initializePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer, publishableKey } =
      await fetchPaymentSheetParams();

    setPublishableKey(publishableKey);

    const { error } = await initPaymentSheet({
      merchantDisplayName: 'Example, Inc.',
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: 'Jane Doe',
      },
      returnURL: 'helo-realtor://stripe-redirect', // Definido com o esquema do app
    });

    if (!error) {
      console.log('Payment Sheet initialized');
      return true; // Payment sheet initialized successfully
    } else {
      console.log(`Payment sheet initialization failed: ${error.message}`);
      return false; // Initialization failed
    }
  };

  // Função para abrir o PaymentSheet
  const openPaymentSheet = async () => {
    const isInitialized = await initializePaymentSheet();
    if (!isInitialized) {
      console.log('Payment sheet was not initialized properly.');
      return;
    }

    const { error } = await presentPaymentSheet();

    if (error) {
      console.log(`Error code: ${error.code}`, error.message);
    } else {
      console.log('Success', 'Your order is confirmed!');
    }
  };
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StripeProvider
        publishableKey={publishableKey}
        merchantIdentifier='merchant.identifier' // required for Apple Pay
        urlScheme='your-url-scheme' // required for 3D Secure and bank redirects
      >
        <StyledContainerView>
          <Image
            source={{ uri: IMAGE_URL }}
            style={StyleSheet.absoluteFillObject}
            blurRadius={10}
          />
          <ScrollView>
            {office ? (
              <>
                <Text style={{ fontSize: 36, color: '#000', marginTop: 30 }}>
                  {office.name}
                </Text>
                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder='Nome'
                  style={styles.input}
                />
                <TextInput
                  value={phone}
                  onChangeText={setPhone}
                  placeholder='Telefone'
                  style={styles.input}
                />
                <TextInput
                  value={address}
                  onChangeText={setAddress}
                  placeholder='Rua demontrativa, 29'
                  style={styles.input}
                />

                <TextInput
                  value={address_city}
                  onChangeText={setAddressCity}
                  placeholder='Taboão da Serra - SP'
                  style={styles.input}
                />
                <TextInput
                  value={description}
                  onChangeText={setDescription}
                  placeholder='Descrição'
                  style={styles.input}
                />
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder='E-mail'
                  style={styles.input}
                />

                <TouchableOpacity
                  style={styles.handleBtn}
                  onPress={handleUpdateOffice}
                >
                  <Text style={{ color: '#fff' }}>Atualizar escritório</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={{ fontSize: 36, color: '#000' }}>
                  Criar Escritório
                </Text>
                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder='Nome'
                  style={styles.input}
                />
                <TextInput
                  value={phone}
                  onChangeText={setPhone}
                  placeholder='Telefone'
                  style={styles.input}
                />
                <TextInput
                  value={address}
                  onChangeText={setAddress}
                  placeholder='Rua demontrativa, 29'
                  style={styles.input}
                />

                <TextInput
                  value={address_city}
                  onChangeText={setAddressCity}
                  placeholder='Taboão da Serra - SP'
                  style={styles.input}
                />
                <TextInput
                  value={description}
                  onChangeText={setDescription}
                  placeholder='Descrição'
                  style={styles.input}
                />
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder='E-mail'
                  style={styles.input}
                />

                <TouchableOpacity
                  style={styles.handleBtn}
                  onPress={handleCreateOffice}
                >
                  <Text style={{ color: '#fff' }}>Criar escritório</Text>
                </TouchableOpacity>
              </>
            )}

            <Text style={{ fontSize: 36, color: '#000', marginTop: 20 }}>
              Realtor
            </Text>

            <TextInput
              value={realtorName}
              onChangeText={setRealtorName}
              placeholder='Nome do Realtor'
              style={styles.input}
            />
            <TextInput
              value={realtorEmail}
              onChangeText={setRealtorEmail}
              keyboardType='email-address'
              placeholder='Email do Realtor'
              style={styles.input}
            />
            <TextInput
              value={realtorCreci}
              onChangeText={setRealtorCreci}
              placeholder='Creci do Realtor'
              style={styles.input}
            />
            <TextInput
              value={realtorPhone}
              onChangeText={setRealtorPhone}
              keyboardType='number-pad'
              placeholder='Telefone do Realtor'
              style={styles.input}
            />
            <TextInput
              value={realtorMessage}
              onChangeText={setRealtorMessage}
              keyboardType='default'
              multiline
              placeholder='Mensagem do whatsapp'
              style={styles.input}
            />

            <TouchableOpacity
              style={styles.handleBtn}
              onPress={handleCreateRealtor}
            >
              <Text style={{ color: '#fff' }}>Criar Realtor</Text>
            </TouchableOpacity>

            {office?.realtors?.map((realtor) => (
              <View key={realtor.id} style={{ marginTop: 20 }}>
                <Text style={{ fontSize: 24, color: '#000' }}>
                  {realtor.name}
                </Text>
                <TextInput
                  onChangeText={setRealtorName}
                  placeholder='Nome do Realtor'
                  style={styles.input}
                />
                <TextInput
                  onChangeText={setRealtorEmail}
                  placeholder='Email do Realtor'
                  style={styles.input}
                />

                <TextInput
                  onChangeText={setRealtorCreci}
                  placeholder='Creci do Realtor'
                  style={styles.input}
                />

                <TextInput
                  onChangeText={setRealtorPhone}
                  keyboardType='numeric'
                  placeholder='Telefone do Realtor'
                  style={styles.input}
                />

                <TextInput
                  onChangeText={setRealtorMessage}
                  keyboardType='default'
                  placeholder='Mensagem do whatsapp'
                  style={styles.input}
                />

                <TouchableOpacity
                  style={styles.handleBtn}
                  onPress={() => handleUpdateRealtor(realtor.id)}
                >
                  <Text style={{ color: '#fff' }}>Atualizar Realtor</Text>
                </TouchableOpacity>
              </View>
            ))}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
              }}
            >
              <TouchableOpacity style={styles.btn} onPress={signOut}>
                <Feather name='log-out' size={24} color='black' />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.addCategory}
                onPress={handleCategory}
              >
                <Text style={{ color: '#fff' }}>Adicionar categoria</Text>
              </TouchableOpacity>
              <StyledModal
                animationType='slide'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <PanGestureHandler
                  onGestureEvent={handleGesture}
                  onEnded={handleGestureEnd}
                >
                  <Animated.View
                    style={{
                      top: '30%',
                      // transform: [{ translateY: translateY }],
                      height: '70%',
                      borderTopLeftRadius: 20,
                      borderTopRightRadius: 20,
                      overflow: 'hidden',
                    }}
                  >
                    <StyledContainerView>
                      <StyledInputsView>
                        <StyledTextInput
                          onChangeText={setCategory}
                          placeholder='Nome da categoria'
                          placeholderTextColor='#f0f0f0'
                          value={category}
                        />
                        <StyledButton onPress={createCategory}>
                          <StyledText>Criar categoria</StyledText>
                        </StyledButton>
                      </StyledInputsView>

                      <StyledScrollView>
                        <StyledText>Categorias criadas</StyledText>
                        {categoryList.map((item) => (
                          <StyledListView key={item.id}>
                            <StyledText>{item.name}</StyledText>
                          </StyledListView>
                        ))}
                      </StyledScrollView>
                    </StyledContainerView>
                  </Animated.View>
                </PanGestureHandler>
              </StyledModal>
            </View>
            <TouchableOpacity style={styles.btn} onPress={openPaymentSheet}>
              <Feather name='credit-card' size={24} color='black' />
            </TouchableOpacity>
          </ScrollView>
        </StyledContainerView>
      </StripeProvider>
    </GestureHandlerRootView>
  );
};

export default Home;

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
    color: '#000',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  btn: {
    backgroundColor: '#FFDC42',
    color: '#fff',
    padding: 10,
    marginBottom: 100,
    borderRadius: 5,
    width: 45,
  },

  addCategory: {
    backgroundColor: '#4246FF',
    color: '#000',
    padding: 10,
    borderRadius: 5,
    width: '80%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },

  handleBtn: {
    width: '100%',
    height: 45,
    backgroundColor: '#4246ff',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
});
