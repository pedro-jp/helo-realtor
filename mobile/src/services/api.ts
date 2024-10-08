import axios from 'axios';

const ap = axios.create({
  baseURL: 'https://helo-realtor.onrender.com',
});

const api = axios.create({
  baseURL: 'http://192.168.1.21:3332',
});

export { api };
