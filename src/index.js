import React from 'react';
import { createRoot } from 'react-dom/client'; // Импортируем createRoot
import App from './App';

// Находим корневой элемент
const container = document.getElementById('root');

// Создаем корневой элемент с помощью createRoot
const root = createRoot(container);

// Рендерим приложение
root.render(<App />);