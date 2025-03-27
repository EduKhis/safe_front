import axios from 'axios';

const API_HOST = process.env.REACT_APP_API_HOST;
const IDLE_TIMEOUT = 60 * 60 * 1000; // 5 минут в миллисекундах

// Создаем экземпляр axios
const api = axios.create({
  baseURL: API_HOST,
});

let idleTimer;

const resetIdleTimer = () => {
  clearTimeout(idleTimer);
  idleTimer = setTimeout(logout, IDLE_TIMEOUT);
};

const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/login';
};

// Добавляем перехватчик для запросов
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-access-token'] = `Bearer ${token}`;
    resetIdleTimer(); // Сбрасываем таймер при каждом запросе
  }
  return config;
});

// Добавляем перехватчик для ответов
api.interceptors.response.use(
  (response) => {
    resetIdleTimer(); // Сбрасываем таймер при получении ответа
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      logout(); // Выход при 401 ошибке
    }
    return Promise.reject(error);
  }
);

// Инициализируем таймер при загрузке модуля
resetIdleTimer();

// Экспортируем функцию для ручного сброса таймера (можно вызывать из компонентов)
export const resetInactivityTimer = () => {
  resetIdleTimer();
};

export default api;
