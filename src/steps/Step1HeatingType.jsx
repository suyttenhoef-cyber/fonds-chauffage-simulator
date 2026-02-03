import React, { useState } from 'react';
import { HEATING_TYPES, isHeatingEligible } from '../engine/calculateHeatingAllowance';

function Step1HeatingType({ onComplete }) {
  const [selectedType, setSelectedType] = useState(null);
  const [error, setError] = useState('');

  const handleSelect = (type) => {
    setSelectedType(type);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!selectedType) {
      setError('Veuillez sélectionner un type de combustible');
      return;
    }

    const eligible = isHeatingEligible(selectedType);
    onComplete(eligible, selectedType);
  };

  return (
    <div className="step-card">
      <div className="step-header">
        <div className="step-icon">
          <i className="fas fa-gas-pump"></i>
        </div>
        <div>
          <h2>Étape 1 : Type de combustible</h2>
          <p className="step-description">
            Sélectionnez le combustible utilisé pour chauffer le logement
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="heating-options">
          {HEATING_TYPES.map((type) => (
            <div
              key={type.id}
              className={`heating-option ${selectedType === type.id ? 'selected' : ''} ${type.eligible ? 'eligible' : 'ineligible'}`}
              onClick={() => handleSelect(type.id)}
            >
              <div className="option-header">
                <div className="option-icon">
                  <i className={type.icon}></i>
                </div>
                <div className="option-title">
                  <h3>{type.label}</h3>
                  <span className="option-description">{type.description}</span>
                </div>
                <div className="option-badge">
                  {type.eligible ? (
                    <span className="badge badge-success">
                      <i className="fas fa-check"></i> Éligible
                    </span>
                  ) : (
                    <span className="badge badge-secondary">
                      Non éligible
                    </span>
                  )}
                </div>
              </div>
              
              {type.details && (
                <div className="option-details">
                  <p><i className="fas fa-info-circle"></i> {type.details}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {error && (
          <div className="error-message">
            <i className="fas fa-exclamation-circle"></i> {error}
          </div>
        )}

        <div className="step-actions single">
          <button type="submit" className="btn btn-primary btn-large">
            <i className="fas fa-arrow-right"></i> Continuer
          </button>
        </div>
      </form>

      <div className="step-info">
        <div className="info-box">
          <h4><i className="fas fa-lightbulb"></i> Information importante</h4>
          <p>
            Le Fonds Social Chauffage ne concerne que les combustibles livrés en vrac : 
            mazout, gaz propane en vrac et pétrole lampant. Les bouteilles de gaz, 
            le gaz naturel et l'électricité ne sont pas éligibles.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Step1HeatingType;