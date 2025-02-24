import React, { useState } from 'react';
import axios from 'axios';
import TopMenu from './components/TopMenu';
import Sidebar from './components/Sidebar';
import SectionHeader from './components/SectionHeader';
import MainContent from './components/MainContent';
import './styles/App.css';

const API_HOST = process.env.REACT_APP_API_HOST; // Вынесенный хост

function App() {
  const [risks, setRisks] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);
  const [showRiskForm, setShowRiskForm] = useState(false);
  const [collapsed, setCollapsed] = useState(false); // Только collapsed

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
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed); // Переключаем только collapsed
  };

  const handleShowRiskForm = () => {
    setShowRiskForm(true);
  };

  return (
    <div className="app">
      <TopMenu onToggleSidebar={toggleSidebar} />
      <div className="main-container">
        <Sidebar onSelect={handleSidebarSelect} collapsed={collapsed} />
        <div className="main-content">
          <SectionHeader selectedSection={selectedSection} onShowRiskForm={handleShowRiskForm} />
          <MainContent selectedSection={selectedSection} risks={risks} showRiskForm={showRiskForm} setShowRiskForm={setShowRiskForm} />
        </div>
      </div>
    </div>
  );
}

export default App;
