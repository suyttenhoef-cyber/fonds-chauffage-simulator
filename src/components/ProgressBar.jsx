import React from 'react';

function ProgressBar({ currentStep }) {
  const steps = [
    { number: 1, label: 'Combustible', icon: 'fas fa-gas-pump' },
    { number: 2, label: 'Situation', icon: 'fas fa-user' },
    { number: 3, label: 'Calcul', icon: 'fas fa-calculator' },
    { number: 4, label: 'Résumé', icon: 'fas fa-file-alt' }
  ];

  return (
    <div className="progress-bar-container">
      <div className="progress-steps">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className={`step ${currentStep >= step.number ? 'active' : ''} ${currentStep > step.number ? 'completed' : ''}`}>
              <div className="step-number">
                {currentStep > step.number ? (
                  <i className="fas fa-check"></i>
                ) : (
                  step.number
                )}
              </div>
              <div className="step-content">
                <i className={step.icon}></i>
                <span className="step-label">{step.label}</span>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className={`step-connector ${currentStep > step.number ? 'active' : ''}`}></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default ProgressBar;