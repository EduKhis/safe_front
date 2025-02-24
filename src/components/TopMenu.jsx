import React from 'react';
import '../styles/TopMenu.css'; // Правильный путь к файлу стилей



const TopMenu = ({ onToggleSidebar }) => {
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
        {/* Здесь можно добавить другие элементы, например, иконки или кнопки */}
      </div>
    </div>
  );
};

export default TopMenu;