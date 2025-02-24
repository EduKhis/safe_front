import React from 'react';
import '../styles/Content.css';

const Content = ({ risks, onShowRiskForm }) => {
  return (
    <div className="content">
      {risks.map((risk, index) => (
        <div key={index} className="card">
          <div className="card-header">
            <span className="card-date">{risk.description}</span>
            <span className="card-status">{risk.status}</span>
          </div>
          <h3>{risk.type}</h3>
          <p>{risk.type}</p>
          {/* <button onClick={onShowRiskForm}>Перейти</button> */}
        </div>
      ))}
    </div>
  );
};

export default Content;