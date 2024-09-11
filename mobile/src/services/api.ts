import axios from 'axios';

const api = axios.create({
  baseURL: 'https://helo-realtor.onrender.com',
});

export { api };
