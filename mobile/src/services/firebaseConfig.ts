// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAS0KpDjFsfAL7PKnajuDoblTnD3i8g0vc',
  authDomain: 'upload-imoveis.firebaseapp.com',
  projectId: 'upload-imoveis',
  storageBucket: 'upload-imoveis.appspot.com',
  messagingSenderId: '604299138792',
  appId: '1:604299138792:web:2053fbc8541c70dbea1b5d',
  measurementId: 'G-1V88WJPX1X',
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
