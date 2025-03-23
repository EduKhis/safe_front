import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaUserEdit } from 'react-icons/fa';
import '../styles/TopMenu.css';

const TopMenu = ({ onToggleSidebar }) => {
  const navigate = useNavigate();

  // Функция для выхода из учетной записи
  const handleLogout = () => {
    localStorage.removeItem('token'); // Удаляем токен
    navigate('/login'); // Перенаправляем на страницу входа
  };

  // Функция для перехода на страницу пользователя
  const handleUserProfile = () => {
    navigate('/profile'); // Перенаправляем на страницу профиля
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
        {/* Иконка для перехода на страницу пользователя */}
        <button className="icon-button" onClick={handleUserProfile}>
          <FaUserEdit size={24} color="white" />
        </button>
        {/* Иконка для выхода */}
        <button className="icon-button" onClick={handleLogout}>
          <FaSignOutAlt size={24} color="white" />
        </button>
      </div>
    </div>
  );
};

export default TopMenu;
