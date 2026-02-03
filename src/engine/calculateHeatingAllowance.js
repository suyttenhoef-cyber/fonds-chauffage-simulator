// =============================================
// CONSTANTES ET CONFIGURATION
// =============================================

// Types de combustible éligibles
export const HEATING_TYPES = [
  {
    id: 'mazout',
    label: 'Mazout (fioul domestique)',
    description: 'Chauffage central au mazout',
    icon: 'fas fa-oil-can',
    eligible: true,
    details: 'Fioul domestique pour chaudières individuelles ou collectives'
  },
  {
    id: 'propane',
    label: 'Gaz propane en vrac',
    description: 'Livré par camion-citerne',
    icon: 'fas fa-gas-pump',
    eligible: true,
    details: 'Uniquement le propane livré en vrac (pas les bouteilles)'
  },
  {
    id: 'petrole',
    label: 'Pétrole lampant (type C)',
    description: 'Pour poêles à pétrole',
    icon: 'fas fa-fire',
    eligible: true,
    details: 'Également appelé "kérosène" pour chauffage d\'appoint'
  },
  {
    id: 'gaz_naturel',
    label: 'Gaz naturel',
    description: 'Réseau de distribution',
    icon: 'fas fa-burn',
    eligible: false,
    details: 'Non éligible au Fonds Social Chauffage'
  },
  {
    id: 'electricite',
    label: 'Électricité',
    description: 'Chauffage électrique',
    icon: 'fas fa-bolt',
    eligible: false,
    details: 'Non éligible au Fonds Social Chauffage'
  },
  {
    id: 'bois',
    label: 'Bois ou pellets',
    description: 'Chauffage au bois',
    icon: 'fas fa-tree',
    eligible: false,
    details: 'Non éligible au Fonds Social Chauffage'
  },
  {
    id: 'autre',
    label: 'Autre combustible',
    description: 'Autre type de chauffage',
    icon: 'fas fa-question-circle',
    eligible: false,
    details: 'Vérifiez les conditions d\'éligibilité'
  }
];

// Types de situation sociale
export const SITUATION_TYPES = [
  {
    id: 'bim_omnio',
    label: 'Bénéficiaire BIM/OMNIO',
    description: 'Intervention majorée de l\'assurance maladie',
    icon: 'fas fa-heartbeat',
    priority: 1,
    multiplier: 1.0
  },
  {
    id: 'ris_gra',
    label: 'RIS ou GRA',
    description: 'Revenu d\'intégration sociale ou Garantie de revenus aux ainés',
    icon: 'fas fa-hand-holding-usd',
    priority: 2,
    multiplier: 1.0
  },
  {
    id: 'cpas',
    label: 'Aide du CPAS',
    description: 'Bénéficiaire d\'une aide sociale du CPAS',
    icon: 'fas fa-hands-helping',
    priority: 3,
    multiplier: 0.9
  },
  {
    id: 'faible_revenu',
    label: 'Faibles revenus',
    description: 'Revenus inférieurs à 150% du seuil RIS',
    icon: 'fas fa-euro-sign',
    priority: 4,
    multiplier: 0.8
  },
  {
    id: 'dettes',
    label: 'Médiation de dettes',
    description: 'En médiation ou règlement collectif de dettes',
    icon: 'fas fa-balance-scale',
    priority: 5,
    multiplier: 0.8
  },
  {
    id: 'autre',
    label: 'Autre situation',
    description: 'Autre situation précaire',
    icon: 'fas fa-user',
    priority: 6,
    multiplier: 0.7
  }
];

// Niveaux de revenus
export const INCOME_LEVELS = [
  {
    id: 'very_low',
    label: 'Revenus très faibles',
    description: 'Inférieurs au seuil RIS',
    icon: 'fas fa-euro-sign',
    threshold: '< 100% RIS',
    multiplier: 1.0
  },
  {
    id: 'low',
    label: 'Revenus faibles',
    description: 'Entre 100% et 125% du seuil RIS',
    icon: 'fas fa-euro-sign',
    threshold: '100-125% RIS',
    multiplier: 0.9
  },
  {
    id: 'medium_low',
    label: 'Revenus moyens-faibles',
    description: 'Entre 125% et 150% du seuil RIS',
    icon: 'fas fa-euro-sign',
    threshold: '125-150% RIS',
    multiplier: 0.8
  },
  {
    id: 'medium',
    label: 'Revenus moyens',
    description: 'Entre 150% et 200% du seuil RIS',
    icon: 'fas fa-euro-sign',
    threshold: '150-200% RIS',
    multiplier: 0.7
  },
  {
    id: 'high',
    label: 'Revenus supérieurs',
    description: 'Supérieurs à 200% du seuil RIS',
    icon: 'fas fa-euro-sign',
    threshold: '> 200% RIS',
    multiplier: 0.6
  }
];

// Types de ménage
export const HOUSEHOLD_TYPES = [
  {
    id: 'single',
    label: 'Personne isolée',
    icon: 'fas fa-user',
    baseSize: 1
  },
  {
    id: 'couple',
    label: 'Couple',
    icon: 'fas fa-user-friends',
    baseSize: 2
  },
  {
    id: 'family',
    label: 'Famille',
    icon: 'fas fa-home',
    baseSize: 3
  },
  {
    id: 'other',
    label: 'Autre',
    icon: 'fas fa-users',
    baseSize: 1
  }
];

// Types d'allocation
export const ALLOCATION_TYPES = [
  {
    id: 'volume',
    label: 'Allocation par litre',
    description: 'Calcul basé sur la consommation réelle',
    icon: 'fas fa-chart-line',
    details: [
      '0,14 € par litre',
      'Plafond : 1.500 litres/an',
      'Maximum : 210 €'
    ]
  },
  {
    id: 'flat_rate',
    label: 'Allocation forfaitaire',
    description: 'Montant fixe indépendant de la consommation',
    icon: 'fas fa-file-invoice-dollar',
    details: [
      'Forfait annuel : 210 €',
      'Montant garanti',
      'Sans justificatif de consommation'
    ]
  }
];

// Constantes de calcul
export const RATE_PER_LITER = 0.14; // € par litre
export const MAX_LITERS = 1500; // litres maximum pris en compte
export const FLAT_RATE = 210; // € allocation forfaitaire
export const MAX_ALLOCATION = 210; // € allocation maximum

// =============================================
// FONCTIONS D'UTILITÉ
// =============================================

// Vérifie si un type de chauffage est éligible
export const isHeatingEligible = (heatingType) => {
  const type = HEATING_TYPES.find(t => t.id === heatingType);
  return type ? type.eligible : false;
};

// Obtient le libellé d'un type de chauffage
export const getHeatingTypeLabel = (typeId) => {
  const type = HEATING_TYPES.find(t => t.id === typeId);
  return type ? type.label : 'Type non spécifié';
};

// Obtient le libellé d'une situation
export const getSituationLabel = (situationId) => {
  const situation = SITUATION_TYPES.find(s => s.id === situationId);
  return situation ? situation.label : 'Situation non spécifiée';
};

// =============================================
// VALIDATION DES DONNÉES
// =============================================

// Valide les données de situation
export const validateSituation = (situation) => {
  const errors = {};
  
  if (!situation.category) {
    errors.category = 'Veuillez sélectionner une situation principale';
  }
  
  if (!situation.householdType) {
    errors.householdType = 'Veuillez sélectionner un type de ménage';
  }
  
  if (!situation.householdSize || situation.householdSize < 1) {
    errors.householdSize = 'Le nombre de personnes doit être d\'au moins 1';
  }
  
  if (situation.householdSize > 20) {
    errors.householdSize = 'Le nombre de personnes est trop élevé';
  }
  
  if (!situation.incomeLevel) {
    errors.incomeLevel = 'Veuillez sélectionner un niveau de revenus';
  }
  
  return errors;
};

// Valide les données de consommation
export const validateConsumption = (consumption, allocationType) => {
  const errors = {};
  
  if (allocationType === 'volume') {
    const liters = parseFloat(consumption.liters);
    const price = parseFloat(consumption.pricePerLiter);
    
    if (!liters || liters <= 0) {
      errors.liters = 'Le nombre de litres doit être positif';
    } else if (liters > 5000) {
      errors.liters = 'Le nombre de litres semble trop élevé';
    }
    
    if (!price || price <= 0) {
      errors.pricePerLiter = 'Le prix par litre doit être positif';
    } else if (price > 10) {
      errors.pricePerLiter = 'Le prix par litre semble trop élevé';
    }
    
    if (!consumption.deliveryDate) {
      errors.deliveryDate = 'La date de livraison est requise';
    } else {
      const deliveryDate = new Date(consumption.deliveryDate);
      const today = new Date();
      
      if (deliveryDate > today) {
        errors.deliveryDate = 'La date de livraison ne peut pas être dans le futur';
      }
      
      // Vérifie si la date est dans les 365 derniers jours
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
      
      if (deliveryDate < oneYearAgo) {
        errors.deliveryDate = 'La livraison doit dater de moins d\'un an';
      }
    }
  }
  
  return errors;
};

// =============================================
// CALCUL DE L'ALLOCATION
// =============================================

// Calcule l'allocation forfaitaire
const calculateFlatRateAllocation = (situation) => {
  let baseAmount = FLAT_RATE;
  
  // Applique le multiplicateur selon la situation
  const situationType = SITUATION_TYPES.find(s => s.id === situation.category);
  if (situationType) {
    baseAmount *= situationType.multiplier;
  }
  
  // Applique le multiplicateur selon les revenus
  const incomeLevel = INCOME_LEVELS.find(i => i.id === situation.incomeLevel);
  if (incomeLevel) {
    baseAmount *= incomeLevel.multiplier;
  }
  
  // Ajuste selon la taille du ménage
  if (situation.householdSize > 2) {
    const additionalPersons = situation.householdSize - 2;
    baseAmount += (additionalPersons * 20); // 20€ par personne supplémentaire
  }
  
  // Plafonne à 210€ maximum
  return Math.min(baseAmount, MAX_ALLOCATION);
};

// Calcule l'allocation par volume
const calculateVolumeAllocation = (situation, consumption) => {
  const liters = parseFloat(consumption.liters);
  const eligibleLiters = Math.min(liters, MAX_LITERS);
  
  let baseAmount = eligibleLiters * RATE_PER_LITER;
  
  // Applique le multiplicateur selon la situation
  const situationType = SITUATION_TYPES.find(s => s.id === situation.category);
  if (situationType) {
    baseAmount *= situationType.multiplier;
  }
  
  // Applique le multiplicateur selon les revenus
  const incomeLevel = INCOME_LEVELS.find(i => i.id === situation.incomeLevel);
  if (incomeLevel) {
    baseAmount *= incomeLevel.multiplier;
  }
  
  // Bonus pour familles avec enfants
  if (situation.hasChildren) {
    baseAmount *= 1.1; // +10% pour familles avec enfants
  }
  
  // Plafonne à 210€ maximum
  return {
    amount: Math.min(baseAmount, MAX_ALLOCATION),
    details: {
      eligibleLiters,
      totalCost: liters * parseFloat(consumption.pricePerLiter),
      percentage: (baseAmount / (liters * parseFloat(consumption.pricePerLiter))) * 100
    }
  };
};

// Fonction principale de calcul
export const calculateAllowance = (heatingType, situation, consumption, allocationType) => {
  // Vérifie l'éligibilité du combustible
  if (!isHeatingEligible(heatingType)) {
    return {
      eligible: false,
      type: allocationType,
      amount: 0,
      message: 'Le type de combustible n\'est pas éligible'
    };
  }
  
  let result;
  
  if (allocationType === 'flat_rate') {
    const amount = calculateFlatRateAllocation(situation);
    result = {
      eligible: true,
      type: 'flat_rate',
      amount: parseFloat(amount.toFixed(2)),
      details: {
        percentage: 0
      }
    };
  } else {
    const calculation = calculateVolumeAllocation(situation, consumption);
    result = {
      eligible: true,
      type: 'volume',
      amount: parseFloat(calculation.amount.toFixed(2)),
      details: calculation.details
    };
  }
  
  return result;
};

// =============================================
// UTILITAIRES POUR LE RÉSUMÉ
// =============================================

// Calcule la date limite de demande (60 jours après livraison)
export const calculateDeadline = (deliveryDate) => {
  const date = new Date(deliveryDate);
  date.setDate(date.getDate() + 60);
  return date.toISOString().split('T')[0];
};

// Liste des documents requis selon la situation
export const getDocumentsList = (situation) => {
  const baseDocuments = [
    {
      title: 'Facture originale du combustible',
      description: 'Facture avec date de livraison, quantité et prix',
      icon: 'fas fa-file-invoice-dollar',
      important: 'Doit dater de moins de 60 jours'
    },
    {
      title: 'Copie de la carte d\'identité',
      description: 'Carte d\'identité du demandeur et des autres membres du ménage',
      icon: 'fas fa-id-card'
    },
    {
      title: 'Composition de ménage',
      description: 'Document officiel prouvant la composition du ménage',
      icon: 'fas fa-users'
    },
    {
      title: 'Dernier avertissement extrait de rôle',
      description: 'Avis d\'imposition ou document équivalent',
      icon: 'fas fa-file-alt'
    }
  ];
  
  const additionalDocuments = [];
  
  if (situation?.isBIM) {
    additionalDocuments.push({
      title: 'Attestation BIM/OMNIO',
      description: 'Document prouvant le statut BIM ou OMNIO',
      icon: 'fas fa-heartbeat',
      important: 'Obligatoire pour cette situation'
    });
  }
  
  if (situation?.isCPAS) {
    additionalDocuments.push({
      title: 'Attestation CPAS',
      description: 'Document prouvant le suivi par le CPAS',
      icon: 'fas fa-hands-helping'
    });
  }
  
  if (situation?.hasDebtMediation) {
    additionalDocuments.push({
      title: 'Attestation de médiation',
      description: 'Document prouvant la médiation de dettes',
      icon: 'fas fa-balance-scale'
    });
  }
  
  return [...baseDocuments, ...additionalDocuments];
};

// Calcule le multiplicateur total
export const calculateTotalMultiplier = (situation) => {
  let multiplier = 1.0;
  
  const situationType = SITUATION_TYPES.find(s => s.id === situation.category);
  if (situationType) {
    multiplier *= situationType.multiplier;
  }
  
  const incomeLevel = INCOME_LEVELS.find(i => i.id === situation.incomeLevel);
  if (incomeLevel) {
    multiplier *= incomeLevel.multiplier;
  }
  
  if (situation.hasChildren) {
    multiplier *= 1.1;
  }
  
  return parseFloat(multiplier.toFixed(2));
};