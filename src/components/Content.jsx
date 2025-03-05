import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Content.css';

const Content = ({ risks }) => {
  const navigate = useNavigate();

  if (!risks || !Array.isArray(risks)) {
    return <div>Нет данных</div>;
  }

  return (
    <div className="content-grid">
      {risks.map((risk, index) => (
        <div
          key={index}
          className="card-grid"
          onClick={() => navigate(`/risks/${risk.id}`)} // Переход на страницу риска
        >
          <div className="card-header-grid">
            <img src={risk.photo} alt="risk" className="risk-photo" />
            <div className="risk-info">
              <span className="card-critical-wrapper">
                <span className={`card-critical ${risk.criticaly?.toLowerCase() || 'gray'}`}></span>
                <span className="card-number">{risk.type} {risk.id}</span>
              </span>
              <span className="card-date">{risk.dateTimeFix}</span>
            </div>
          </div>

          <div className="card-middle-grid">
            <span className="card-category">{risk.category}</span>
            <span className="card-sector-section">{risk.sector}. {risk.section}</span>
          </div>
          <div className="card-description-grid">
            <p>{risk.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Content;