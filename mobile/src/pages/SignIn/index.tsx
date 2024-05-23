import { AuthContext } from '../../contexts/AuthContext';
import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

export default function SignIn() {
  const { signIn, loadingAuth } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const IMAGE_URL =
    'https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

  const STYLE = StyleSheet.absoluteFillObject;

  async function handleLogin() {
    const isValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    if (email === '' || password === '') return;
    if (!isValid) return alert('Email inválido');

    await signIn({ email, password });
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: IMAGE_URL }} style={STYLE} />
      <View style={styles.inputContainer}>
        <TextInput
          keyboardType='email-address'
          style={styles.input}
          placeholder='Digite seu email'
          placeholderTextColor='#f0f0f0'
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder='Digite sua senha'
          placeholderTextColor='#f0f0f0'
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          {loadingAuth ? (
            <ActivityIndicator size={25} color='#fff' />
          ) : (
            <Text style={styles.buttonText}>Acessar</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1d1d2e',
  },
  logo: {
    marginBottom: 18,
  },
  inputContainer: {
    width: '95%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 34,
    paddingHorizontal: 14,
  },
  input: {
    width: '95%',
    height: 50,
    backgroundColor: '#10102690',
    marginBottom: 12,
    borderRadius: 4,
    paddingHorizontal: 8,
    color: '#fff',
  },
  button: {
    width: '95%',
    height: 50,
    backgroundColor: '#3fffa2ef',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#101026',
  },
});
