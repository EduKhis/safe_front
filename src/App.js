import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';

import TopMenu from './components/TopMenu';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import RiskDetail from './components/RiskDetail';
import Login from './components/Login';
import Register from './components/Register';
import api from './api'; // Импортируем настроенный axios
import './styles/App.css';

const API_HOST = process.env.REACT_APP_API_HOST;

// Компонент для защиты маршрутов
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  const [risks, setRisks] = useState([]);
  const [selectedSection, setSelectedSection] = useState('risks-ideas');
  const [showRiskForm, setShowRiskForm] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (selectedSection === 'risks-ideas') {
      api
        .get(`${API_HOST}/api/risks`)
        .then((response) => setRisks(response.data))
        .catch((error) => console.error(error));
    }
  }, [selectedSection]);

  useEffect(() => {
    if (location.pathname.startsWith('/risks/')) {
      setSelectedSection('risk-detail');
    }
  }, [location.pathname]);

  const handleSidebarSelect = (selectedItem) => {
    setSelectedSection(selectedItem);
    setShowRiskForm(false);

    if (selectedItem === 'risks-ideas') {
      api
        .get(`${API_HOST}/api/risks`)
        .then((response) => setRisks(response.data))
        .catch((error) => console.error(error));
    } else {
      setRisks([]);
    }
    setCollapsed(true);
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="app">
      <TopMenu onToggleSidebar={toggleSidebar} />
      <div className="main-container">
        <Sidebar
          onSelect={handleSidebarSelect}
          collapsed={collapsed}
          isMobile={isMobile}
        />
        <div className={`main-content ${collapsed ? '' : 'shifted'}`}>
          <Routes>
            {/* Маршруты для авторизации и регистрации */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Защищенные маршруты */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <MainContent
                    selectedSection={selectedSection}
                    risks={risks}
                    showRiskForm={showRiskForm}
                    setShowRiskForm={setShowRiskForm}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/risks/:riskId"
              element={
                <ProtectedRoute>
                  <RiskDetail />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
