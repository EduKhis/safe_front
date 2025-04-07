// FloatingAddButton.js
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/FloatingAddButton.css';

const FloatingAddButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const showButton =
    location.pathname === '/' || location.pathname === '/risks-ideas';

  if (!showButton) return null;

  return (
    <button
      className="floating-add-button"
      onClick={() => navigate('/add-risk')}
      aria-label="Добавить риск"
    >
      +
    </button>
  );
};

export default FloatingAddButton;
