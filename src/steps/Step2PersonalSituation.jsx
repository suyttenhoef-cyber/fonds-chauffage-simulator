import React, { useState } from 'react';
import { 
  SITUATION_TYPES, 
  INCOME_LEVELS, 
  HOUSEHOLD_TYPES,
  validateSituation 
} from '../engine/calculateHeatingAllowance';

function Step2PersonalSituation({ onComplete, onBack }) {
  const [situation, setSituation] = useState({
    category: '',
    incomeLevel: '',
    householdType: '',
    householdSize: 1,
    hasChildren: false,
    isBIM: false,
    isCPAS: false,
    hasDebtMediation: false
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setSituation(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validateSituation(situation);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    onComplete(situation);
  };

  const handleHouseholdTypeChange = (type) => {
    const baseSize = type === 'single' ? 1 : 2;
    setSituation(prev => ({
      ...prev,
      householdType: type,
      householdSize: baseSize
    }));
  };

  return (
    <div className="step-card">
      <div className="step-header">
        <div className="step-icon">
          <i className="fas fa-user"></i>
        </div>
        <div>
          <h2>Étape 2 : Situation du ménage</h2>
          <p className="step-description">
            Renseignez la situation personnelle et financière du demandeur
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h3><i className="fas fa-id-card"></i> Statut administratif</h3>
          
          <div className="form-group">
            <label className="form-label">
              Situation principale *
            </label>
            <div className="options-grid">
              {SITUATION_TYPES.map((type) => (
                <div
                  key={type.id}
                  className={`option-card ${situation.category === type.id ? 'selected' : ''}`}
                  onClick={() => handleInputChange('category', type.id)}
                >
                  <div className="option-icon">
                    <i className={type.icon}></i>
                  </div>
                  <div className="option-content">
                    <h4>{type.label}</h4>
                    <p>{type.description}</p>
                    {type.priority && (
                      <span className="priority-badge">Priorité {type.priority}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {errors.category && (
              <div className="field-error">
                <i className="fas fa-exclamation-circle"></i> {errors.category}
              </div>
            )}
          </div>

          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={situation.isBIM}
                onChange={(e) => handleInputChange('isBIM', e.target.checked)}
              />
              <span className="checkbox-custom"></span>
              <span className="checkbox-text">
                <i className="fas fa-heartbeat"></i> Bénéficiaire BIM/OMNIO
              </span>
            </label>
            
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={situation.isCPAS}
                onChange={(e) => handleInputChange('isCPAS', e.target.checked)}
              />
              <span className="checkbox-custom"></span>
              <span className="checkbox-text">
                <i className="fas fa-hands-helping"></i> Client CPAS
              </span>
            </label>
            
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={situation.hasDebtMediation}
                onChange={(e) => handleInputChange('hasDebtMediation', e.target.checked)}
              />
              <span className="checkbox-custom"></span>
              <span className="checkbox-text">
                <i className="fas fa-balance-scale"></i> En médiation de dettes
              </span>
            </label>
          </div>
        </div>

        <div className="form-section">
          <h3><i className="fas fa-home"></i> Composition du ménage</h3>
          
          <div className="form-group">
            <label className="form-label">Type de ménage *</label>
            <div className="radio-group horizontal">
              {HOUSEHOLD_TYPES.map((type) => (
                <label
                  key={type.id}
                  className={`radio-label ${situation.householdType === type.id ? 'selected' : ''}`}
                >
                  <input
                    type="radio"
                    name="householdType"
                    value={type.id}
                    checked={situation.householdType === type.id}
                    onChange={() => handleHouseholdTypeChange(type.id)}
                  />
                  <span className="radio-custom"></span>
                  <span className="radio-text">
                    <i className={type.icon}></i> {type.label}
                  </span>
                </label>
              ))}
            </div>
            {errors.householdType && (
              <div className="field-error">
                <i className="fas fa-exclamation-circle"></i> {errors.householdType}
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">
              Nombre total de personnes dans le ménage *
            </label>
            <div className="number-input-group">
              <button
                type="button"
                className="number-btn"
                onClick={() => handleInputChange('householdSize', Math.max(1, situation.householdSize - 1))}
              >
                <i className="fas fa-minus"></i>
              </button>
              <input
                type="number"
                min="1"
                max="20"
                value={situation.householdSize}
                onChange={(e) => handleInputChange('householdSize', parseInt(e.target.value) || 1)}
                className="number-input"
              />
              <button
                type="button"
                className="number-btn"
                onClick={() => handleInputChange('householdSize', Math.min(20, situation.householdSize + 1))}
              >
                <i className="fas fa-plus"></i>
              </button>
              <span className="input-suffix">personne(s)</span>
            </div>
            {errors.householdSize && (
              <div className="field-error">
                <i className="fas fa-exclamation-circle"></i> {errors.householdSize}
              </div>
            )}
          </div>

          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={situation.hasChildren}
              onChange={(e) => handleInputChange('hasChildren', e.target.checked)}
            />
            <span className="checkbox-custom"></span>
            <span className="checkbox-text">
              <i className="fas fa-child"></i> Présence d'enfant(s) à charge
            </span>
          </label>
        </div>

        <div className="form-section">
          <h3><i className="fas fa-euro-sign"></i> Situation financière</h3>
          
          <div className="form-group">
            <label className="form-label">Niveau de revenus *</label>
            <div className="income-levels">
              {INCOME_LEVELS.map((level) => (
                <div
                  key={level.id}
                  className={`income-level ${situation.incomeLevel === level.id ? 'selected' : ''}`}
                  onClick={() => handleInputChange('incomeLevel', level.id)}
                >
                  <div className="level-icon">
                    <i className={level.icon}></i>
                  </div>
                  <div className="level-content">
                    <h4>{level.label}</h4>
                    <p>{level.description}</p>
                    {level.threshold && (
                      <small className="threshold">({level.threshold})</small>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {errors.incomeLevel && (
              <div className="field-error">
                <i className="fas fa-exclamation-circle"></i> {errors.incomeLevel}
              </div>
            )}
          </div>
        </div>

        {Object.keys(errors).length > 0 && (
          <div className="error-summary">
            <h4><i className="fas fa-exclamation-triangle"></i> Corrections nécessaires</h4>
            <ul>
              {Object.values(errors).map((error, index) => (
                error && <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="step-actions">
          <button type="button" onClick={onBack} className="btn btn-secondary">
            <i className="fas fa-arrow-left"></i> Retour
          </button>
          <button type="submit" className="btn btn-primary">
            <i className="fas fa-calculator"></i> Calculer l'allocation
          </button>
        </div>
      </form>
    </div>
  );
}

export default Step2PersonalSituation;