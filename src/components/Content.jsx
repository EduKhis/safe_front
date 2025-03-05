import React from 'react';
import '../styles/Content.css';

const Content = ({ risks, onShowRiskForm }) => {
  console.log(risks);
  return (
    <div className="content-grid">
      {risks.map((risk, index) => (
        <div key={index} className="card-grid" onClick={() => onShowRiskForm(risk)}>
          <div className="card-header-grid">
            <img src={risk.photo} alt="risk" className="risk-photo" />
            <div className="risk-info">
              <span className={`card-critical ${risk.criticaly.toLowerCase()}`}></span>
              <span className="card-number"><strong>{risk.type} {risk.id}</strong> - {risk.status}</span>
              <span className="card-date">{risk.dateTimeFix}</span>
            </div>
          </div>
          <div className="card-middle-grid">
            <span className="card-category">{risk.category}</span>
            <span className="card-sector">{risk.sector}</span>
            <span className="card-section">{risk.section}</span>
          </div>
          <div className="card-description-grid">
            <p className="description-text">{risk.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Content;
