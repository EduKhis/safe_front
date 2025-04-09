// components/BottomPanel.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/BottomPanel.css';
import { FaLightbulb, FaTasks, FaUser } from 'react-icons/fa';

const BottomPanel = () => {
  const navigate = useNavigate();

  return (
    <div className="bottom-panel">
      <div className="bottom-panel-content">
        <button
          className="panel-button"
          onClick={() => navigate('/risks-ideas')}
          aria-label="Риски и идеи"
        >
          <FaLightbulb className="panel-icon" />
          <span className="panel-button-text">Риски/Идеи</span>
        </button>

        <button
          className="panel-button"
          onClick={() => navigate('/tasks')}
          aria-label="Задачи"
        >
          <FaTasks className="panel-icon" />
          <span className="panel-button-text">Задачи</span>
        </button>

        <button
          className="panel-button"
          onClick={() => navigate('/my-tasks')}
          aria-label="Мои задачи"
        >
          <FaUser className="panel-icon" />
          <span className="panel-button-text">Мои</span>
        </button>
      </div>
    </div>
  );
};

export default BottomPanel;
