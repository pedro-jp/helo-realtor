import axios from 'axios';

const ap = axios.create({
  baseURL: 'https://api.helotechbr.com/',
});

const api = axios.create({
  baseURL: 'http://172.20.10.4:3332/',
});

export { api };
