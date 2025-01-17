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
  const { signIn, signUp, loadingAuth } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const IMAGE_URL =
    'https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

  const STYLE = StyleSheet.absoluteFillObject;

  async function handleLogin() {
    const isValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    if (email === '' || password === '') return;
    if (!isValid) return alert('Email inválido');

    await signIn({ email, password });
  }

  async function handleSignUp() {
    const isValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    if (email === '' || password === '') return;
    if (confirmPassword !== password)
      return alert('As senhas precisam ser iguais');
    if (!isValid) return alert('Email inválido');

    await signUp({ email, password, name });
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: IMAGE_URL }} style={STYLE} />
      <View style={styles.inputContainer}>
        {isSignUp && (
          <TextInput
            style={styles.input}
            placeholder='Digite seu nome'
            placeholderTextColor='#f0f0f0'
            value={name}
            onChangeText={setName}
          />
        )}
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

        {isSignUp && (
          <TextInput
            style={styles.input}
            placeholder='Confirme sua senha'
            placeholderTextColor='#f0f0f0'
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        )}
        {isSignUp ? (
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            {loadingAuth ? (
              <ActivityIndicator size={25} color='#fff' />
            ) : (
              <Text style={styles.buttonText}>Cadastrar</Text>
            )}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            {loadingAuth ? (
              <ActivityIndicator size={25} color='#fff' />
            ) : (
              <Text style={styles.buttonText}>Acessar</Text>
            )}
          </TouchableOpacity>
        )}

        {isSignUp ? (
          <TouchableOpacity
            onPress={() => setIsSignUp(!isSignUp)}
            style={styles.buttonAccount}
          >
            <Text style={styles.buttonText}>Já possui conta? Acessar</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => setIsSignUp(!isSignUp)}
            style={styles.buttonAccount}
          >
            <Text style={styles.buttonText}>
              Ainda não possui conta? Cadastrar
            </Text>
          </TouchableOpacity>
        )}
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
    backgroundColor: '#4246ff',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  buttonAccount: {
    marginTop: 20,
  },
});
