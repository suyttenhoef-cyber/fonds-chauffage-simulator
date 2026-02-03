import React from 'react';
import { 
  getHeatingTypeLabel, 
  getSituationLabel,
  calculateDeadline,
  getDocumentsList
} from '../engine/calculateHeatingAllowance';

function Step4Summary({ formData, onRestart }) {
  const { heatingType, situation, consumption, calculation } = formData;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-BE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Non spécifié';
    return new Date(dateString).toLocaleDateString('fr-BE', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const getDeadlineDate = () => {
    if (!consumption?.deliveryDate) return 'Non spécifié';
    const deadline = calculateDeadline(consumption.deliveryDate);
    return formatDate(deadline);
  };

  const documents = getDocumentsList(situation);

  return (
    <div className="summary-card">
      <div className="summary-header">
        <div className="header-icon">
          <i className="fas fa-file-contract"></i>
        </div>
        <div className="header-content">
          <h2>Résumé de la simulation</h2>
          <p className="subtitle">Synthèse pour le dossier CPAS</p>
          <div className="summary-meta">
            <span className="meta-item">
              <i className="fas fa-calendar"></i> Généré le {formatDate(new Date().toISOString())}
            </span>
            <span className="meta-item">
              <i className="fas fa-user-tie"></i> Pour agent CPAS
            </span>
          </div>
        </div>
      </div>

      <div className="summary-content">
        <div className="section">
          <h3><i className="fas fa-user-circle"></i> Informations du demandeur</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Type de combustible :</span>
              <span className="info-value">{getHeatingTypeLabel(heatingType)}</span>
            </div>
            
            <div className="info-item">
              <span className="info-label">Situation :</span>
              <span className="info-value">{getSituationLabel(situation?.category)}</span>
            </div>
            
            {situation && (
              <>
                <div className="info-item">
                  <span className="info-label">Taille du ménage :</span>
                  <span className="info-value">{situation.householdSize} personne(s)</span>
                </div>
                
                <div className="info-item">
                  <span className="info-label">Bénéficiaire BIM :</span>
                  <span className="info-value">{situation.isBIM ? 'Oui' : 'Non'}</span>
                </div>
                
                <div className="info-item">
                  <span className="info-label">Client CPAS :</span>
                  <span className="info-value">{situation.isCPAS ? 'Oui' : 'Non'}</span>
                </div>
                
                <div className="info-item">
                  <span className="info-label">Enfants à charge :</span>
                  <span className="info-value">{situation.hasChildren ? 'Oui' : 'Non'}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {consumption && calculation && (
          <>
            <div className="section highlight">
              <h3><i className="fas fa-euro-sign"></i> Résultat du calcul</h3>
              
              <div className="allocation-summary">
                <div className="allocation-amount-large">
                  {formatCurrency(calculation.amount)}
                </div>
                
                <div className="allocation-details">
                  <div className="detail-row">
                    <span>Type d'allocation :</span>
                    <span className="detail-value">{calculation.type === 'volume' ? 'Par litre' : 'Forfaitaire'}</span>
                  </div>
                  
                  {consumption.liters && (
                    <div className="detail-row">
                      <span>Litres achetés :</span>
                      <span className="detail-value">{parseInt(consumption.liters).toLocaleString('fr-BE')} L</span>
                    </div>
                  )}
                  
                  {consumption.pricePerLiter && (
                    <div className="detail-row">
                      <span>Prix par litre :</span>
                      <span className="detail-value">{formatCurrency(parseFloat(consumption.pricePerLiter))}</span>
                    </div>
                  )}
                  
                  {consumption.deliveryDate && (
                    <div className="detail-row">
                      <span>Date de livraison :</span>
                      <span className="detail-value">{formatDate(consumption.deliveryDate)}</span>
                    </div>
                  )}
                  
                  {calculation.details?.percentage && (
                    <div className="detail-row">
                      <span>Pourcentage d'aide :</span>
                      <span className="detail-value highlight">{calculation.details.percentage.toFixed(1)}%</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="section">
              <h3><i className="fas fa-clock"></i> Délais importants</h3>
              
              <div className="timeline">
                <div className="timeline-item">
                  <div className="timeline-icon warning">
                    <i className="fas fa-exclamation-triangle"></i>
                  </div>
                  <div className="timeline-content">
                    <h4>Délai de dépôt de la demande</h4>
                    <p className="deadline">
                      <strong>{getDeadlineDate()}</strong>
                    </p>
                    <p className="timeline-description">
                      La demande doit être introduite auprès du CPAS dans les 60 jours suivant la date de livraison.
                    </p>
                    <div className="timeline-note warning">
                      <i className="fas fa-exclamation-circle"></i>
                      <span>Attention : passé ce délai, la demande ne pourra plus être prise en compte.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="section">
          <h3><i className="fas fa-file-alt"></i> Documents à fournir</h3>
          
          <div className="documents-list">
            {documents.map((doc, index) => (
              <div key={index} className="document-item">
                <div className="document-icon">
                  <i className={doc.icon}></i>
                </div>
                <div className="document-content">
                  <h4>{doc.title}</h4>
                  <p>{doc.description}</p>
                  {doc.important && (
                    <span className="document-note important">
                      <i className="fas fa-star"></i> {doc.important}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="section">
          <h3><i className="fas fa-map-marker-alt"></i> Procédure à suivre</h3>
          
          <div className="procedure-steps">
            <div className="procedure-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>Rassemblez les documents</h4>
                <p>Collectez tous les documents listés ci-dessus.</p>
              </div>
            </div>
            
            <div className="procedure-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>Contactez votre CPAS</h4>
                <p>
                  Prenez rendez-vous avec l'agent social de votre CPAS et apportez tous les documents.
                </p>
              </div>
            </div>
            
            <div className="procedure-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>Déposez votre demande</h4>
                <p>
                  Complétez le formulaire de demande et déposez-le avec les documents.
                  <strong> N'oubliez pas le délai des 60 jours !</strong>
                </p>
              </div>
            </div>
            
            <div className="procedure-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h4>Suivi et décision</h4>
                <p>
                  Le CPAS étudiera votre dossier sous environ 30 jours.
                  La décision vous sera notifiée par courrier.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="section warning">
          <div className="warning-header">
            <i className="fas fa-exclamation-triangle"></i>
            <h3>Avertissement légal</h3>
          </div>
          <div className="warning-content">
            <p>
              Cette simulation est fournie à titre <strong>purement informatif</strong>. 
              Elle ne constitue en aucun cas une garantie d'obtention de l'allocation 
              ni une décision du CPAS.
            </p>
            <p>
              Seul le CPAS compétent peut statuer sur l'éligibilité définitive et 
              le montant exact de l'allocation accordée, sur base de l'examen complet 
              du dossier et des règles en vigueur au moment de la demande.
            </p>
          </div>
        </div>

        <div className="section">
          <h3><i className="fas fa-link"></i> Ressources utiles</h3>
          
          <div className="resources">
            <a 
              href="https://www.fondschauffage.be" 
              target="_blank" 
              rel="noopener noreferrer"
              className="resource-link"
            >
              <div className="resource-icon">
                <i className="fas fa-globe"></i>
              </div>
              <div className="resource-content">
                <h4>Site officiel du Fonds Social Chauffage</h4>
                <p>Informations complètes et actualisées</p>
              </div>
            </a>
            
            <a 
              href="https://www.fondschauffage.be/comment-demander" 
              target="_blank" 
              rel="noopener noreferrer"
              className="resource-link"
            >
              <div className="resource-icon">
                <i className="fas fa-question-circle"></i>
              </div>
              <div className="resource-content">
                <h4>Comment introduire une demande</h4>
                <p>Guide détaillé de la procédure</p>
              </div>
            </a>
            
            <a 
              href="https://www.mi-is.be/fr/cpas" 
              target="_blank" 
              rel="noopener noreferrer"
              className="resource-link"
            >
              <div className="resource-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <div className="resource-content">
                <h4>Annuaire des CPAS</h4>
                <p>Coordonnées de tous les CPAS de Belgique</p>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div className="summary-actions">
        <button onClick={() => window.print()} className="btn btn-secondary">
          <i className="fas fa-print"></i> Imprimer ce résumé
        </button>
        <button onClick={onRestart} className="btn btn-primary">
          <i className="fas fa-redo"></i> Nouvelle simulation
        </button>
      </div>
    </div>
  );
}

export default Step4Summary;