// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyArlUwNTLvzccrT6qDAwqEVH-kUzrkD6ks',
  authDomain: 'helo-realtor.firebaseapp.com',
  projectId: 'helo-realtor',
  storageBucket: 'helo-realtor.appspot.com',
  messagingSenderId: '137166820223',
  appId: '1:137166820223:web:015660da5d5a11060bc04a',
  measurementId: 'G-CBDVMWLFHT',
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
