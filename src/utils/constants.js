// Date utility functions
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-BE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

export const addDays = (dateString, days) => {
  const date = new Date(dateString);
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
};

export const isWithinDays = (dateString, days) => {
  const date = new Date(dateString);
  const today = new Date();
  const diffTime = Math.abs(today - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= days;
};

// Currency formatting
export const formatCurrency = (amount, currency = 'EUR') => {
  return new Intl.NumberFormat('fr-BE', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2
  }).format(amount);
};

// Validation helpers
export const isValidNumber = (value) => {
  return !isNaN(parseFloat(value)) && isFinite(value) && parseFloat(value) > 0;
};

export const isValidDate = (dateString) => {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
};

// CPAS specific constants
export const CPAS_REGIONS = {
  bruxelles: 'Région Bruxelles-Capitale',
  wallonie: 'Wallonie',
  flandre: 'Flandre'
};

export const RIS_THRESHOLDS = {
  single: 1218.70, // € per month (2024)
  couple: 1828.05, // € per month (2024)
  additional_person: 304.68 // € per month (2024)
};