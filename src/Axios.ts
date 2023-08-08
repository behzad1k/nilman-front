import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.31.12:9001/',
});

export default api;
