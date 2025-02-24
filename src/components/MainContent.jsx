import React from 'react';
import Content from './Content';
import MapComponent from './MapComponent';
import RiskForm from './RiskForm';
import '../styles/MainContent.css';


const MainContent = ({ selectedSection, risks, showRiskForm, setShowRiskForm }) => {
  return (
    <div className="main-content-area">
      {selectedSection === 'risks-ideas' && (
        showRiskForm ? (
          <RiskForm onClose={() => setShowRiskForm(false)} />
        ) : (
          <Content risks={risks} />
        )
      )}
      {selectedSection === 'map' && <MapComponent />}
      {selectedSection === 'tasks' && <div>Раздел "Задачи"</div>}
      {selectedSection === 'my-tasks' && <div>Раздел "Мои задачи"</div>}
      {selectedSection === 'profile' && <div>Раздел "Мой профиль"</div>}
      {selectedSection === 'stats' && <div>Раздел "Статистика"</div>}
      {selectedSection === 'places' && <div>Раздел "Места"</div>}
    </div>
  );
};

export default MainContent;
