import React from 'react';

function Header() {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="logo-container">
          <div className="logo-icon">
            <i className="fas fa-fire"></i>
          </div>
          <div className="logo-text">
            <h1>Simulateur Fonds Social Chauffage</h1>
            <p className="subtitle">Outil d'évaluation pour agents CPAS</p>
          </div>
        </div>
        
        <div className="header-info">
          <div className="info-item">
            <i className="fas fa-shield-alt"></i>
            <span>Outil officiel</span>
          </div>
          <div className="info-item">
            <i className="fas fa-user-tie"></i>
            <span>Pour agents CPAS</span>
          </div>
          <div className="info-item">
            <i className="fas fa-calendar-check"></i>
            <span>Mise à jour 2024</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;