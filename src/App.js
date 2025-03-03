import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TopMenu from './components/TopMenu';
import Sidebar from './components/Sidebar';
import SectionHeader from './components/SectionHeader';
import MainContent from './components/MainContent';
import './styles/App.css';

const API_HOST = process.env.REACT_APP_API_HOST;

function App() {
  const [risks, setRisks] = useState([]);
  const [selectedSection, setSelectedSection] = useState('risks-ideas');
  const [showRiskForm, setShowRiskForm] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Определяем, мобильное ли устройство

  // Определяем, мобильное ли устройство, при изменении размера окна
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Загрузка данных при монтировании компонента
  useEffect(() => {
    if (selectedSection === 'risks-ideas') {
      axios.get(`${API_HOST}/api/risks`)
        .then(response => setRisks(response.data))
        .catch(error => console.error(error));
    }
  }, [selectedSection]);

  const handleSidebarSelect = (selectedItem) => {
    console.log(`Выбран раздел: ${selectedItem}`);
    setSelectedSection(selectedItem);
    setShowRiskForm(false);

    if (selectedItem === 'risks-ideas') {
      axios.get(`${API_HOST}/api/risks`)
        .then(response => setRisks(response.data))
        .catch(error => console.error(error));
    } else {
      setRisks([]);
    }

    // Закрываем Sidebar на мобильных устройствах после выбора раздела
   // if (isMobile) {
      setCollapsed(true);
   // }
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleShowRiskForm = () => {
    setShowRiskForm(true);
  };

  return (
    <div className="app">
      <TopMenu onToggleSidebar={toggleSidebar} />
      <div className="main-container">
        <Sidebar onSelect={handleSidebarSelect} collapsed={collapsed} isMobile={isMobile} />
        <div className={`main-content ${collapsed ? '' : 'shifted'}`}>
          <SectionHeader selectedSection={selectedSection} onShowRiskForm={handleShowRiskForm} />
          <MainContent selectedSection={selectedSection} risks={risks} showRiskForm={showRiskForm} setShowRiskForm={setShowRiskForm} />
        </div>
      </div>
    </div>
  );
}

export default App;