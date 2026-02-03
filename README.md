# Simulateur Fonds Social Chauffage

Application web React/Vite pour les agents CPAS permettant de calculer l'éligibilité et le montant des allocations de chauffage selon les règles officielles du Fonds Social Chauffage.

## 📋 Fonctionnalités

- ✅ **Vérification du type de combustible** (seuls 3 sont éligibles : mazout, propane en vrac, pétrole lampant)
- ✅ **Encodage de la situation personnelle** du ménage avec toutes les catégories officielles
- ✅ **Encodage des données de consommation** ou facture
- ✅ **Calcul complet** selon les règles officielles du Fonds Social Chauffage
- ✅ **Deux types d'allocation** :
  - Allocation par litre (0,14€/litre, plafond 1.500 litres/an)
  - Allocation forfaitaire (210€ maximum)
- ✅ **Résumé professionnel** utilisable par les agents CPAS
- ✅ **Validation complète** des données avec messages d'erreur clairs
- ✅ **Interface intuitive** avec navigation fluide
- ✅ **Responsive design** pour tous les appareils
- ✅ **Impression du résumé** pour dossier CPAS

## 🚀 Installation locale

```bash
# Cloner le repository
git clone https://github.com/suyttenhoef-cyber/fonds-chauffage-simulator.git
cd fonds-chauffage-simulator

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev