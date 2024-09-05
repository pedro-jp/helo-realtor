import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { api } from '../../services/api';
import { AuthContext } from '../../contexts/AuthContext';
import { StyledContainerView } from './styles';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

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

  const ownerId = user.id;
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const IMAGE_URL =
    'https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

  useEffect(() => {
    getOffice();
  }, []);

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
    navigation.navigate('Category');
  };

  return (
    <StyledContainerView>
      <Image
        source={{ uri: IMAGE_URL }}
        style={StyleSheet.absoluteFillObject}
        blurRadius={10}
      />
      <ScrollView>
        {office ? (
          <>
            <Text style={{ fontSize: 36, color: '#000' }}>{office.name}</Text>
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

            <Button title='Atualizar Escritório' onPress={handleUpdateOffice} />
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

            <Button title='Criar Escritório' onPress={handleCreateOffice} />
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

        <Button title='Criar Realtor' onPress={handleCreateRealtor} />

        {office?.realtors?.map((realtor) => (
          <View key={realtor.id} style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 24, color: '#000' }}>{realtor.name}</Text>
            <TextInput
              value={realtorName}
              onChangeText={setRealtorName}
              placeholder='Nome do Realtor'
              style={styles.input}
            />
            <TextInput
              value={realtorEmail}
              onChangeText={setRealtorEmail}
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
              keyboardType='numeric'
              placeholder='Telefone do Realtor'
              style={styles.input}
            />

            <TextInput
              value={realtorMessage}
              onChangeText={setRealtorMessage}
              keyboardType='default'
              placeholder='Mensagem do whatsapp'
              style={styles.input}
            />

            <Button
              title='Atualizar Realtor'
              onPress={() => handleUpdateRealtor(realtor.id)}
            />
          </View>
        ))}

        <TouchableOpacity onPress={signOut}>
          <Text>Sair</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleCategory}>
          <Text>Categorias</Text>
        </TouchableOpacity>
      </ScrollView>
    </StyledContainerView>
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
});
