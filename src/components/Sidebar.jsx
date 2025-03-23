import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LightbulbOutlined as RisksIcon,
  TaskOutlined as TasksIcon,
  PersonOutline as MyProfileIcon,
  MapOutlined as MapIcon,
  BarChartOutlined as StatsIcon,
  PlaceOutlined as PlacesIcon,
} from '@mui/icons-material';
import '../styles/Sidebar.css';

const Sidebar = ({ onSelect, collapsed, isMobile }) => {
  const navigate = useNavigate();

  const handleSelect = (section) => {
    onSelect(section);
    navigate(`/${section}`);
  };

  return (
    <div
      className={`sidebar ${collapsed ? 'collapsed' : ''} ${
        isMobile ? 'mobile' : ''
      }`}
    >
      <div className="sidebar-section">
        <div
          className="sidebar-header"
          onClick={() => handleSelect('risks-ideas')}
        >
          <RisksIcon className="sidebar-icon" />
          {!collapsed && <span>Риски/Идеи</span>}
        </div>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-header" onClick={() => handleSelect('tasks')}>
          <TasksIcon className="sidebar-icon" />
          {!collapsed && <span>Задачи</span>}
        </div>
      </div>

      <div className="sidebar-section">
        <div
          className="sidebar-header"
          onClick={() => handleSelect('my-tasks')}
        >
          <TasksIcon className="sidebar-icon" />
          {!collapsed && <span>Мои</span>}
        </div>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-header" onClick={() => handleSelect('profile')}>
          <MyProfileIcon className="sidebar-icon" />
          {!collapsed && <span>Мой профиль</span>}
        </div>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-header" onClick={() => handleSelect('map')}>
          <MapIcon className="sidebar-icon" />
          {!collapsed && <span>Риски на карте</span>}
        </div>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-header" onClick={() => handleSelect('stats')}>
          <StatsIcon className="sidebar-icon" />
          {!collapsed && <span>Статистика</span>}
        </div>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-header" onClick={() => handleSelect('places')}>
          <PlacesIcon className="sidebar-icon" />
          {!collapsed && <span>Места</span>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
