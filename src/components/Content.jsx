import React from 'react';
import '../styles/Content.css';

const Content = ({ risks, onShowRiskForm }) => {
  return (
    <div className="content-grid"> {/* Изменили класс для грида */}
      {risks.map((risk, index) => (
        <div key={index} className="card-grid"> {/* Изменили класс для карточки */}
          <div className="card-header-grid"> {/* Верхняя часть карточки */}
            <img src={risk.photo} alt="risk" className="risk-photo" />
            <div className="risk-info">
              <span className="card-critical">{risk.critical}</span>
              <span className="card-date">{risk.date}</span>
              <span className="card-number">Риск {risk.number}</span>
            </div>
          </div>
          <div className="card-middle-grid"> {/* Средняя часть карточки */}
            <span className="card-category">{risk.category}</span>
            <span className="card-sector">{risk.sector}</span>
            <span className="card-section">{risk.section}</span>
          </div>
          <div className="card-description-grid"> {/* Нижняя часть карточки */}
            <p>{risk.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Content;
