import axios from 'axios';

const API_HOST = process.env.REACT_APP_API_HOST;

// Создаем экземпляр axios
const api = axios.create({
  baseURL: API_HOST,
});

// Добавляем перехватчик для запросов
api.interceptors.request.use((config) => {
  console.log('api ' + localStorage);

  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-access-token'] = `Bearer ${token}`;
  }
  return config;
});

export default api;
