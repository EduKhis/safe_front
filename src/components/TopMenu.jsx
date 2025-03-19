import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/TopMenu.css';

const TopMenu = ({ onToggleSidebar }) => {
  const navigate = useNavigate();

  // Функция для выхода из учетной записи
  const handleLogout = () => {
    localStorage.removeItem('token'); // Удаляем токен
    navigate('/login'); // Перенаправляем на страницу входа
  };

  return (
    <div className="top-menu">
      <div className="left-section">
        <button className="hide-sidebar-button" onClick={onToggleSidebar}>
          ☰
        </button>
        <span className="safety-label">Safety</span>
      </div>
      <div className="center-section">
        <input type="text" placeholder="Поиск..." className="search-input" />
      </div>
      <div className="right-section">
        {/* Кнопка выхода */}
        <button className="logout-button" onClick={handleLogout}>
          Выйти
        </button>
      </div>
    </div>
  );
};

export default TopMenu;