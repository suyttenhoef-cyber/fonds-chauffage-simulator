import React, { useState } from 'react';
import Step1HeatingType from './steps/Step1HeatingType';
import Step2PersonalSituation from './steps/Step2PersonalSituation';
import Step3AllocationCalculation from './steps/Step3AllocationCalculation';
import Step4Summary from './steps/Step4Summary';
import ProgressBar from './components/ProgressBar';
import './styles/App.css';

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    heatingType: null,
    situation: null,
    consumption: null,
    calculation: null
  });
  const [isEligible, setIsEligible] = useState(null);

  const handleNextStep = (step, data) => {
    setFormData(prev => ({
      ...prev,
      ...data
    }));
    setCurrentStep(step);
  };

  const handleStep1Complete = (eligible, heatingType) => {
    setIsEligible(eligible);
    if (eligible) {
      handleNextStep(2, { heatingType });
    } else {
      handleNextStep(0, { heatingType });
    }
  };

  const handleStep2Complete = (situation) => {
    handleNextStep(3, { situation });
  };

  const handleStep3Complete = (calculation, consumption) => {
    handleNextStep(4, { calculation, consumption });
  };

  const handleRestart = () => {
    setCurrentStep(1);
    setFormData({
      heatingType: null,
      situation: null,
      consumption: null,
      calculation: null
    });
    setIsEligible(null);
  };

  const getHeatingTypeLabel = (type) => {
    const types = {
      mazout: 'Mazout',
      propane: 'Gaz propane',
      petrole: 'Pétrole lampant',
      gaz_naturel: 'Gaz naturel',
      electricite: 'Électricité',
      autre: 'Autre'
    };
    return types[type] || type;
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="card ineligible-card">
            <div className="ineligible-icon">
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <h2>Non éligible</h2>
            <p>
              Le type de combustible sélectionné ({getHeatingTypeLabel(formData.heatingType)}) 
              n'est pas éligible au Fonds Social Chauffage.
            </p>
            <p>
              Seuls les combustibles suivants sont éligibles :
            </p>
            <ul className="eligible-list">
              <li><i className="fas fa-check-circle"></i> Mazout (fioul domestique)</li>
              <li><i className="fas fa-check-circle"></i> Gaz propane en vrac</li>
              <li><i className="fas fa-check-circle"></i> Pétrole lampant (type C)</li>
            </ul>
            <div className="button-container">
              <button onClick={handleRestart} className="btn btn-primary">
                <i className="fas fa-redo"></i> Recommencer
              </button>
            </div>
          </div>
        );

      case 1:
        return <Step1HeatingType onComplete={handleStep1Complete} />;

      case 2:
        return (
          <Step2PersonalSituation
            onComplete={handleStep2Complete}
            onBack={() => setCurrentStep(1)}
          />
        );

      case 3:
        return (
          <Step3AllocationCalculation
            heatingType={formData.heatingType}
            situation={formData.situation}
            onComplete={handleStep3Complete}
            onBack={() => setCurrentStep(2)}
          />
        );

      case 4:
        return (
          <Step4Summary
            formData={formData}
            onRestart={handleRestart}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      {/* En-tête simplifié sans composant Header séparé */}
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
      
      <main className="main-content">
        {currentStep > 0 && currentStep <= 4 && (
          <ProgressBar currentStep={currentStep} />
        )}
        
        <div className="step-container">
          {renderStep()}
        </div>
      </main>
      
      <footer className="app-footer">
        <div className="footer-content">
          <p>
            <i className="fas fa-info-circle"></i> Ce simulateur est basé sur les règles officielles du 
            <a href="https://www.fondschauffage.be" target="_blank" rel="noopener noreferrer">
              Fonds Social Chauffage
            </a>
          </p>
          <p className="disclaimer">
            Les résultats sont fournis à titre indicatif. La décision finale revient au CPAS compétent.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;