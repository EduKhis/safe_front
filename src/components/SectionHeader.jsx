import React from 'react';
import '../styles/SectionHeader.css';

const SectionHeader = ({ selectedSection, onShowRiskForm }) => {
  return (
    <div className="section-header">
      <h2>
        {selectedSection === 'risks-ideas' && 'Риски и идеи'}
        {selectedSection === 'tasks' && 'Задачи'}
        {selectedSection === 'my-tasks' && 'Мои задачи'}
        {selectedSection === 'profile' && 'Мой профиль'}
        {selectedSection === 'stats' && 'Статистика'}
        {selectedSection === 'places' && 'Места'}
        {selectedSection === 'map' && 'Карта'}
      </h2>

      {selectedSection === 'map' && (
        <button className="refresh-button">Обновить</button>
      )}
    </div>
  );
};

export default SectionHeader;
