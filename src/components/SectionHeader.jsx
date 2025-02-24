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

      {selectedSection === 'risks-ideas' && (
        <button className="add-button" onClick={onShowRiskForm}>Добавить</button>
      )}
      
      {selectedSection === 'map' && (
        <button className="refresh-button" onClick={() => window.location.reload()}>Обновить карту</button>
      )}
    </div>
  );
};

export default SectionHeader;
