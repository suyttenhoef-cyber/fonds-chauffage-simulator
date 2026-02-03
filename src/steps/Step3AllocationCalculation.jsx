import React, { useState } from 'react';
import { 
  calculateAllowance, 
  ALLOCATION_TYPES, 
  MAX_LITERS, 
  RATE_PER_LITER, 
  FLAT_RATE,
  validateConsumption 
} from '../engine/calculateHeatingAllowance';

function Step3AllocationCalculation({ heatingType, situation, onComplete, onBack }) {
  const [allocationType, setAllocationType] = useState('volume');
  const [consumption, setConsumption] = useState({
    liters: '',
    pricePerLiter: '',
    deliveryDate: new Date().toISOString().split('T')[0],
    invoiceNumber: ''
  });
  const [calculation, setCalculation] = useState(null);
  const [errors, setErrors] = useState({});

  const handleConsumptionChange = (field, value) => {
    setConsumption(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (calculation) {
      setCalculation(null);
    }
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    
    const consumptionErrors = validateConsumption(consumption, allocationType);
    
    if (Object.keys(consumptionErrors).length > 0) {
      setErrors(consumptionErrors);
      return;
    }
    
    const result = calculateAllowance(
      heatingType,
      situation,
      consumption,
      allocationType
    );
    
    setCalculation(result);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-BE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-BE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const handleContinue = () => {
    onComplete(calculation, consumption);
  };

  return (
    <div className="step-card">
      <div className="step-header">
        <div className="step-icon">
          <i className="fas fa-calculator"></i>
        </div>
        <div>
          <h2>Étape 3 : Calcul de l'allocation</h2>
          <p className="step-description">
            Choisissez le type d'allocation et renseignez les informations de consommation
          </p>
        </div>
      </div>

      <form onSubmit={handleCalculate}>
        <div className="form-section">
          <h3><i className="fas fa-money-bill-wave"></i> Type d'allocation</h3>
          
          <div className="allocation-type-selector">
            {ALLOCATION_TYPES.map((type) => (
              <div
                key={type.id}
                className={`allocation-type-card ${allocationType === type.id ? 'selected' : ''}`}
                onClick={() => {
                  setAllocationType(type.id);
                  setCalculation(null);
                }}
              >
                <div className="allocation-icon">
                  <i className={type.icon}></i>
                </div>
                <div className="allocation-content">
                  <h4>{type.label}</h4>
                  <p className="allocation-description">{type.description}</p>
                  <div className="allocation-details">
                    {type.details.map((detail, index) => (
                      <div key={index} className="detail-item">
                        <i className="fas fa-check-circle"></i>
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                  <div className="allocation-rate">
                    {type.id === 'volume' ? (
                      <span><strong>{formatCurrency(RATE_PER_LITER)}</strong> par litre</span>
                    ) : (
                      <span><strong>{formatCurrency(FLAT_RATE)}</strong> forfait annuel</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {allocationType === 'volume' && (
          <div className="form-section">
            <h3><i className="fas fa-gas-pump"></i> Informations de consommation</h3>
            
            <div className="consumption-form">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    <i className="fas fa-oil-can"></i> Nombre de litres achetés *
                  </label>
                  <div className="input-with-hint">
                    <input
                      type="number"
                      min="1"
                      max="5000"
                      step="1"
                      value={consumption.liters}
                      onChange={(e) => handleConsumptionChange('liters', e.target.value)}
                      className="form-input"
                      placeholder="Ex: 1000"
                    />
                    <span className="input-hint">
                      Maximum pris en compte : {MAX_LITERS.toLocaleString('fr-BE')} litres
                    </span>
                  </div>
                  {errors.liters && (
                    <div className="field-error">
                      <i className="fas fa-exclamation-circle"></i> {errors.liters}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <i className="fas fa-tag"></i> Prix par litre (TVA incl.) *
                  </label>
                  <div className="input-with-hint">
                    <input
                      type="number"
                      min="0.01"
                      max="10"
                      step="0.01"
                      value={consumption.pricePerLiter}
                      onChange={(e) => handleConsumptionChange('pricePerLiter', e.target.value)}
                      className="form-input"
                      placeholder="Ex: 0.85"
                    />
                    <span className="input-hint">
                      Prix indiqué sur votre facture
                    </span>
                  </div>
                  {errors.pricePerLiter && (
                    <div className="field-error">
                      <i className="fas fa-exclamation-circle"></i> {errors.pricePerLiter}
                    </div>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    <i className="fas fa-calendar-alt"></i> Date de livraison *
                  </label>
                  <input
                    type="date"
                    value={consumption.deliveryDate}
                    onChange={(e) => handleConsumptionChange('deliveryDate', e.target.value)}
                    className="form-input"
                    max={new Date().toISOString().split('T')[0]}
                  />
                  {errors.deliveryDate && (
                    <div className="field-error">
                      <i className="fas fa-exclamation-circle"></i> {errors.deliveryDate}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <i className="fas fa-file-invoice"></i> Numéro de facture
                  </label>
                  <input
                    type="text"
                    value={consumption.invoiceNumber}
                    onChange={(e) => handleConsumptionChange('invoiceNumber', e.target.value)}
                    className="form-input"
                    placeholder="Optionnel"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {errors.general && (
          <div className="error-message">
            <i className="fas fa-exclamation-circle"></i> {errors.general}
          </div>
        )}

        <div className="step-actions">
          <button type="button" onClick={onBack} className="btn btn-secondary">
            <i className="fas fa-arrow-left"></i> Retour
          </button>
          <button type="submit" className="btn btn-primary">
            <i className="fas fa-calculator"></i> {calculation ? 'Recalculer' : 'Calculer'}
          </button>
        </div>
      </form>

      {calculation && (
        <div className="calculation-results">
          <div className="result-card success">
            <div className="result-header">
              <div className="result-icon">
                <i className="fas fa-check-circle"></i>
              </div>
              <div>
                <h3>Résultat de la simulation</h3>
                <p className="result-subtitle">
                  {calculation.eligible ? 'Éligible au Fonds Social Chauffage' : 'Non éligible'}
                </p>
              </div>
            </div>
            
            <div className="result-content">
              <div className="result-main">
                <div className="allocation-amount">
                  <span className="amount-label">Allocation estimée</span>
                  <span className="amount-value">{formatCurrency(calculation.amount)}</span>
                </div>
                
                {allocationType === 'volume' && calculation.details && (
                  <div className="result-details">
                    <div className="detail-grid">
                      <div className="detail-item">
                        <span className="detail-label">Coût total de l'achat :</span>
                        <span className="detail-value">{formatCurrency(calculation.details.totalCost)}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Litres pris en compte :</span>
                        <span className="detail-value">
                          {calculation.details.eligibleLiters.toLocaleString('fr-BE')} L
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Taux d'allocation :</span>
                        <span className="detail-value">{formatCurrency(RATE_PER_LITER)}/L</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Pourcentage d'aide :</span>
                        <span className="detail-value highlight">
                          {calculation.details.percentage.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="result-info">
                <div className="info-box">
                  <h4><i className="fas fa-info-circle"></i> Informations importantes</h4>
                  <ul>
                    <li>
                      <i className="fas fa-clock"></i> Délai de demande : 60 jours après la livraison
                    </li>
                    <li>
                      <i className="fas fa-file-alt"></i> Documents requis : facture originale, composition de ménage, preuves de revenus
                    </li>
                    <li>
                      <i className="fas fa-exclamation-triangle"></i> Ce montant est indicatif, le CPAS décidera du montant final
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="result-actions">
              <button onClick={handleContinue} className="btn btn-primary btn-large">
                <i className="fas fa-file-alt"></i> Voir le résumé complet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Step3AllocationCalculation;