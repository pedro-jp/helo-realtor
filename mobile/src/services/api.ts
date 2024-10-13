import axios from 'axios';

const ap = axios.create({
  baseURL: 'https://api.helotechbr.com/',
});

const api = axios.create({
  baseURL: 'http://localhost:3332/',
});

export { api };
