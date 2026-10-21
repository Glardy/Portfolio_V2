// src/data/projects.js
// Source unique de données pour tous les projets.
// Modifiable depuis l'interface /admin ou directement ici.

const STORAGE_KEY = 'portfolio_projects'

const defaultProjects = [
  {
    id: 1,
    slug: 'tarification-assurance',
    title: { fr: 'Tarification assurance', en: 'Insurance pricing model' },
    category: { fr: 'Actuariat', en: 'Actuarial' },
    date: '2026-06-01',
    summary: {
      fr: 'Modélisation de portefeuille et analyse de solvabilité pour des scénarios de tarification plus robustes.',
      en: 'Portfolio modeling and solvency analysis to improve pricing resilience and risk decision support.',
    },
    content: {
      fr: `## Contexte\n\nDans un contexte de durcissement des conditions de marché, ce projet visait à reconstruire le moteur de tarification d'un portefeuille assurance dommages.\n\n## Méthodologie\n\n- Analyse exploratoire des données historiques de sinistres\n- Modélisation fréquence-sévérité par régression GLM\n- Intégration des contraintes de solvabilité Solvabilité II\n- Backtesting sur données hors-échantillon\n\n## Résultats\n\nRéduction de 12 % de l'écart entre prime pure estimée et réalisée sur les 6 premiers mois de déploiement.`,
      en: `## Context\n\nIn a context of tightening market conditions, this project aimed to rebuild the pricing engine for a property & casualty insurance portfolio.\n\n## Methodology\n\n- Exploratory analysis of historical claims data\n- Frequency-severity modeling using GLM regression\n- Integration of Solvency II constraints\n- Backtesting on out-of-sample data\n\n## Results\n\n12% reduction in the gap between estimated pure premium and realized premium over the first 6 months.`,
    },
    tags: ['Python', 'Risk', 'Data'],
    published: true,
  },
  {
    id: 2,
    slug: 'dashboard-risk-management',
    title: { fr: 'Dashboard risk management', en: 'Risk management dashboard' },
    category: { fr: 'Risk', en: 'Risk' },
    date: '2026-04-15',
    summary: {
      fr: 'Visualisation des indicateurs de risque clés et des alertes de crise avec un focus décisionnel.',
      en: 'Visualization of key risk indicators and crisis triggers with a sharp decision-making focus.',
    },
    content: {
      fr: `## Contexte\n\nCe projet répondait au besoin d'un pilotage centralisé des risques opérationnels et financiers d'une structure de taille intermédiaire.\n\n## Fonctionnalités\n\n- Tableau de bord KPIs risques en temps réel\n- Système d'alertes paramétrables par seuil\n- Scénarios de stress tests\n- Export automatisé de rapports\n\n## Technologies\n\nPython, SQL, Power BI`,
      en: `## Context\n\nThis project addressed the need for centralized monitoring of operational and financial risks in a mid-size organization.\n\n## Features\n\n- Real-time risk KPI dashboard\n- Configurable threshold alert system\n- Stress test scenario simulation\n- Automated report export\n\n## Technologies\n\nPython, SQL, Power BI`,
    },
    tags: ['Analytics', 'Finance', 'Tableau'],
    published: true,
  },
  {
    id: 3,
    slug: 'prediction-defaillance',
    title: { fr: 'Prédiction de défaillance', en: 'Default prediction' },
    category: { fr: 'Data Science', en: 'Data Science' },
    date: '2026-02-20',
    summary: {
      fr: "Étude prédictive pour identifier les signaux d'instabilité et améliorer la qualité des décisions.",
      en: 'Predictive study to detect early instability signals and improve decision quality.',
    },
    content: {
      fr: `## Contexte\n\nIdentification précoce des entreprises à risque de défaillance à partir de données financières publiques.\n\n## Approche\n\n- Feature engineering sur données comptables (ratios de liquidité, solvabilité, rentabilité)\n- Comparaison de modèles : Logit, Random Forest, XGBoost\n- Validation croisée et calibration des probabilités\n- Interprétabilité SHAP\n\n## Impact\n\nAUC de 0,87 sur le jeu de test. Détection correcte de 79 % des défaillances à 12 mois.`,
      en: `## Context\n\nEarly identification of companies at risk of default using public financial data.\n\n## Approach\n\n- Feature engineering on accounting data (liquidity, solvency, profitability ratios)\n- Model comparison: Logit, Random Forest, XGBoost\n- Cross-validation and probability calibration\n- SHAP interpretability\n\n## Impact\n\nAUC of 0.87 on the test set. Correct detection of 79% of defaults at 12 months.`,
    },
    tags: ['ML', 'SQL', 'NLP'],
    published: true,
  },
]

export function getProjects() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : defaultProjects
  } catch {
    return defaultProjects
  }
}

export function saveProjects(projects) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
}

export function getProjectBySlug(slug) {
  return getProjects().find((p) => p.slug === slug) || null
}
