import React from 'react';
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
  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''} ${isMobile ? 'mobile' : ''}`}>
      <div className="sidebar-section">
        <div className="sidebar-header" onClick={() => onSelect('risks-ideas')}>
          <RisksIcon className="sidebar-icon" />
          {!collapsed && <span>Риски/Идеи</span>}
        </div>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-header" onClick={() => onSelect('tasks')}>
          <TasksIcon className="sidebar-icon" />
          {!collapsed && <span>Задачи</span>}
        </div>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-header" onClick={() => onSelect('my-tasks')}>
          <TasksIcon className="sidebar-icon" />
          {!collapsed && <span>Мои</span>}
        </div>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-header" onClick={() => onSelect('profile')}>
          <MyProfileIcon className="sidebar-icon" />
          {!collapsed && <span>Мой профиль</span>}
        </div>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-header" onClick={() => onSelect('map')}>
          <MapIcon className="sidebar-icon" />
          {!collapsed && <span>Риски на карте</span>}
        </div>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-header" onClick={() => onSelect('stats')}>
          <StatsIcon className="sidebar-icon" />
          {!collapsed && <span>Статистика</span>}
        </div>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-header" onClick={() => onSelect('places')}>
          <PlacesIcon className="sidebar-icon" />
          {!collapsed && <span>Места</span>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;