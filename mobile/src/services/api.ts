import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.helotechbr.com/',
});

const ap = axios.create({
  baseURL: 'http://192.168.15.106:3332/',
});

export { api };
