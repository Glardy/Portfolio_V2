// src/data/posts.js
// Source unique de données pour tous les articles du blog.
// Modifiable depuis l'interface /admin ou directement ici.

const STORAGE_KEY = 'portfolio_posts'

const defaultPosts = [
  {
    id: 1,
    slug: 'risque-contrainte-ou-levier',
    title: { fr: 'Le risque est-il une contrainte ou un levier stratégique ?', en: 'Is risk a constraint or a strategic lever?' },
    category: { fr: 'Actuariat', en: 'Actuarial' },
    date: '2026-07-15',
    excerpt: {
      fr: "Les organisations qui appréhendent le risque de manière proactive gagnent en résilience et en lisibilité.",
      en: 'Organizations that anticipate risk proactively become more resilient, measurable, and strategic.',
    },
    content: {
      fr: `## Introduction\n\nLong perçu comme une contrainte réglementaire ou comptable, le risque est aujourd'hui réhabilité comme un vecteur de performance. Les entreprises qui s'y investissent avec méthode en tirent un avantage compétitif structurel.\n\n## Une vision dépassée du risque\n\nDans une conception traditionnelle, le risque est quelque chose à minimiser, à couvrir, à externaliser. Cette posture défensive a longtemps dominé les services financiers, en particulier dans l'assurance et la banque.\n\n## Vers une culture du risque stratégique\n\nLes organisations les plus performantes ne cherchent pas à éliminer le risque mais à le comprendre, le quantifier et l'intégrer à leur processus décisionnel. Cela suppose :\n\n- Des outils de modélisation adaptés\n- Une gouvernance claire des seuils d'appétit au risque\n- Une culture transverse de la donnée\n\n## Conclusion\n\nLe risque bien géré est une source de confiance, pas de peur. Les actuaires et risk managers ont un rôle central à jouer dans ce changement de paradigme.`,
      en: `## Introduction\n\nLong seen as a regulatory or accounting constraint, risk is now being rehabilitated as a driver of performance. Organizations that approach it methodically gain a structural competitive advantage.\n\n## An outdated view of risk\n\nIn the traditional conception, risk is something to minimize, hedge, or outsource. This defensive posture has long dominated financial services, especially in insurance and banking.\n\n## Toward a strategic risk culture\n\nThe highest-performing organizations do not seek to eliminate risk — they seek to understand it, quantify it, and embed it into decision-making. This requires:\n\n- Appropriate modeling tools\n- Clear risk appetite governance frameworks\n- A cross-functional data culture\n\n## Conclusion\n\nWell-managed risk is a source of confidence, not fear. Actuaries and risk managers have a central role to play in this paradigm shift.`,
    },
    tags: ['Risk', 'Strategy', 'Governance'],
    published: true,
  },
  {
    id: 2,
    slug: 'data-science-finance',
    title: { fr: 'Comment la data science transforme la finance', en: 'How data science is reshaping finance' },
    category: { fr: 'Data', en: 'Data' },
    date: '2026-06-10',
    excerpt: {
      fr: "Les modèles prédictifs aident à informer les décisions de portefeuille et d'allocation de ressources.",
      en: 'Predictive models help inform portfolio decisions and smarter capital allocation.',
    },
    content: {
      fr: `## Un secteur en pleine mutation\n\nLa finance est l'un des secteurs les plus exposés à la révolution data. Entre la disponibilité croissante de données alternatives et la puissance des algorithmes de machine learning, les pratiques traditionnelles d'analyse sont profondément remises en cause.\n\n## Les cas d'usage concrets\n\n### Scoring de crédit\nLes modèles de scoring ont largement bénéficié des techniques d'ensemble et des réseaux de neurones, améliorant significativement la discrimination entre bons et mauvais payeurs.\n\n### Allocation d'actifs\nLes modèles de prévision des rendements et de la volatilité alimentent des stratégies systématiques plus robustes et moins sujettes aux biais comportementaux.\n\n### Détection de fraude\nLes algorithmes non supervisés (clustering, autoencoders) permettent d'identifier des comportements anormaux avec une précision bien supérieure aux règles manuelles.\n\n## Les limites à ne pas ignorer\n\nL'interprétabilité reste un enjeu majeur. Dans un contexte réglementé, un modèle "boîte noire" ne suffit pas : il faut pouvoir expliquer chaque décision.\n\n## Conclusion\n\nLa data science ne remplace pas l'expertise financière, elle l'amplifie. Les profils capables d'articuler les deux sont les plus demandés du marché.`,
      en: `## A sector in transformation\n\nFinance is one of the most exposed sectors to the data revolution. With the growing availability of alternative data and the power of machine learning algorithms, traditional analysis practices are being fundamentally challenged.\n\n## Concrete use cases\n\n### Credit scoring\nScoring models have greatly benefited from ensemble techniques and neural networks, significantly improving discrimination between good and bad payers.\n\n### Asset allocation\nReturn and volatility forecasting models power more robust systematic strategies that are less subject to behavioral biases.\n\n### Fraud detection\nUnsupervised algorithms (clustering, autoencoders) identify abnormal behavior with far greater precision than manual rules.\n\n## Limits not to ignore\n\nInterpretability remains a major challenge. In a regulated context, a black-box model is not enough — every decision must be explainable.\n\n## Conclusion\n\nData science does not replace financial expertise, it amplifies it. Profiles capable of bridging both are the most in demand.`,
    },
    tags: ['Machine Learning', 'Finance', 'Predictive Analytics'],
    published: true,
  },
  {
    id: 3,
    slug: 'solvabilite-decision-strategique',
    title: { fr: 'Solvabilité II et prise de décision stratégique', en: 'Solvency II and strategic decision-making' },
    category: { fr: 'Finance', en: 'Finance' },
    date: '2026-05-22',
    excerpt: {
      fr: "Une lecture équilibrée entre contraintes réglementaires et dynamique de croissance durable.",
      en: 'A balanced view between regulatory obligations and long-term sustainable growth ambition.',
    },
    content: {
      fr: `## Le cadre Solvabilité II\n\nEntré en vigueur en 2016, Solvabilité II a profondément transformé la gouvernance du risque dans le secteur de l'assurance européen. Son approche par les risques a remplacé la logique purement prudentielle du passé.\n\n## Impact sur les décisions stratégiques\n\nLes exigences de capital induites par Solvabilité II influencent directement :\n- Les choix d'allocation d'actifs\n- Les décisions de réassurance\n- Le lancement de nouveaux produits\n- Les stratégies de croissance externe\n\n## Solvabilité II comme outil de pilotage\n\nAu-delà de la conformité, Solvabilité II peut être utilisé comme un véritable outil de pilotage interne. Les indicateurs SCR, MCR et ratio de couverture deviennent des métriques de performance à part entière.\n\n## Conclusion\n\nLes assureurs qui parviennent à transformer la contrainte réglementaire en avantage compétitif sont ceux qui intègrent le mieux la donnée et le modèle dans leurs processus décisionnels.`,
      en: `## The Solvency II framework\n\nEntering into force in 2016, Solvency II fundamentally transformed risk governance in the European insurance sector. Its risk-based approach replaced the purely prudential logic of the past.\n\n## Impact on strategic decisions\n\nThe capital requirements under Solvency II directly influence:\n- Asset allocation choices\n- Reinsurance decisions\n- New product launches\n- External growth strategies\n\n## Solvency II as a management tool\n\nBeyond compliance, Solvency II can be used as a genuine internal management tool. SCR, MCR and coverage ratios become performance metrics in their own right.\n\n## Conclusion\n\nInsurers that transform regulatory constraints into competitive advantages are those that best integrate data and modeling into their decision-making processes.`,
    },
    tags: ['Solvency II', 'Regulation', 'Capital'],
    published: true,
  },
  {
    id: 4,
    slug: 'ml-fraude-assurance',
    title: { fr: 'Machine learning et détection de fraude en assurance', en: 'Machine learning for insurance fraud detection' },
    category: { fr: 'Data', en: 'Data' },
    date: '2026-04-18',
    excerpt: {
      fr: "Panorama des méthodes de détection automatisée et de leur applicabilité au secteur assurantiel.",
      en: 'Overview of automated detection methods and their applicability in the insurance sector.',
    },
    content: {
      fr: `## Le problème de la fraude en assurance\n\nLa fraude à l'assurance représente entre 5 % et 10 % des sinistres déclarés selon les estimations sectorielles. Son impact sur la rentabilité technique est considérable.\n\n## Les approches classiques et leurs limites\n\nLes règles expertes traditionnelles (montants seuils, motifs suspects) produisent de nombreux faux positifs et s'adaptent mal à l'évolution des comportements frauduleux.\n\n## Machine learning appliqué\n\n### Approches supervisées\nQuand des labels de fraude existent, les modèles XGBoost et Random Forest offrent d'excellentes performances, à condition de gérer correctement le déséquilibre des classes.\n\n### Approches non supervisées\nEn l'absence de labels, les techniques de détection d'anomalies (Isolation Forest, autoencoders) permettent d'identifier les sinistres atypiques.\n\n## Enjeux d'implémentation\n\n- Qualité et disponibilité des données\n- Explicabilité des décisions (RGPD, directive IA)\n- Intégration dans les processus métier existants\n\n## Conclusion\n\nLe ML est un outil puissant mais ne remplace pas l'expertise des gestionnaires sinistres. La meilleure approche est hybride.`,
      en: `## The insurance fraud problem\n\nInsurance fraud accounts for between 5% and 10% of reported claims according to industry estimates. Its impact on technical profitability is significant.\n\n## Classical approaches and their limits\n\nTraditional expert rules (amount thresholds, suspicious patterns) generate many false positives and adapt poorly to evolving fraudulent behaviors.\n\n## Applied machine learning\n\n### Supervised approaches\nWhen fraud labels exist, XGBoost and Random Forest models offer excellent performance, provided class imbalance is properly managed.\n\n### Unsupervised approaches\nIn the absence of labels, anomaly detection techniques (Isolation Forest, autoencoders) identify atypical claims.\n\n## Implementation challenges\n\n- Data quality and availability\n- Decision explainability (GDPR, AI Act)\n- Integration into existing business processes\n\n## Conclusion\n\nML is a powerful tool but does not replace claims handler expertise. The best approach is hybrid.`,
    },
    tags: ['Fraud Detection', 'XGBoost', 'Insurance'],
    published: true,
  },
  {
    id: 5,
    slug: 'queues-distribution-actuariat',
    title: { fr: 'Modélisation des queues de distribution en actuariat', en: 'Tail risk modeling in actuarial science' },
    category: { fr: 'Actuariat', en: 'Actuarial' },
    date: '2026-03-05',
    excerpt: {
      fr: "Approche théorique et pratique des distributions à queues épaisses pour la tarification extrême.",
      en: 'Theoretical and practical approach to heavy-tail distributions for extreme risk pricing.',
    },
    content: {
      fr: `## Pourquoi les queues de distribution importent\n\nEn actuariat, les sinistres extrêmes concentrent l'essentiel du risque. La loi des grands nombres s'applique bien au coeur de la distribution, mais c'est dans les queues que se jouent les vrais enjeux de tarification et de solvabilité.\n\n## Principales familles de distributions\n\n- **Pareto généralisée (GPD)** : adaptée à la modélisation des excès au-delà d'un seuil\n- **Fréchet, Weibull, Gumbel** : le trio des valeurs extrêmes (EVT)\n- **Log-normale, Burr, Inverse Gaussienne** : classiques en assurance\n\n## Théorie des valeurs extrêmes (EVT)\n\nL'EVT fournit un cadre rigoureux pour extrapoler le comportement des queues au-delà des données observées. Le choix du seuil u reste le principal point de sensibilité.\n\n## Application pratique\n\nCalibration des queues sur données réelles, test de stabilité du paramètre de forme, validation par QQ-plot et tests de Kolmogorov-Smirnov.\n\n## Conclusion\n\nUne bonne modélisation des queues est indispensable pour un pricing responsable et une gestion du capital conforme à Solvabilité II.`,
      en: `## Why tail distributions matter\n\nIn actuarial science, extreme claims concentrate most of the risk. The law of large numbers works well at the center of the distribution, but it is in the tails where the real pricing and solvency challenges lie.\n\n## Key distribution families\n\n- **Generalized Pareto (GPD)**: suited for modeling excesses beyond a threshold\n- **Fréchet, Weibull, Gumbel**: the extreme value trio (EVT)\n- **Log-normal, Burr, Inverse Gaussian**: classics in insurance\n\n## Extreme Value Theory (EVT)\n\nEVT provides a rigorous framework for extrapolating tail behavior beyond observed data. The choice of threshold u remains the main sensitivity point.\n\n## Practical application\n\nTail calibration on real data, shape parameter stability testing, validation via QQ-plot and Kolmogorov-Smirnov tests.\n\n## Conclusion\n\nGood tail modeling is essential for responsible pricing and Solvency II-compliant capital management.`,
    },
    tags: ['Extreme Value Theory', 'Pricing', 'Tail Risk'],
    published: true,
  },
  {
    id: 6,
    slug: 'taux-bas-alm',
    title: { fr: "Taux d'intérêt bas : impact sur la gestion actif-passif", en: 'Low interest rates: impact on ALM' },
    category: { fr: 'Finance', en: 'Finance' },
    date: '2026-02-14',
    excerpt: {
      fr: "Comment les compagnies d'assurance adaptent leur stratégie d'investissement dans un contexte de taux bas.",
      en: 'How insurance companies adapt their investment strategy in a low interest rate environment.',
    },
    content: {
      fr: `## Le contexte de taux bas (et ses héritages)\n\nMême si les taux sont remontés depuis 2022, les engagements long terme des assureurs vie restent fortement sensibles aux conditions passées. La gestion actif-passif (ALM) reste un enjeu central.\n\n## Impact sur les engagements\n\nLes provisions techniques calculées avec des taux d'actualisation faibles gonflent mécaniquement le bilan. La duration des passifs tend à dépasser celle des actifs disponibles.\n\n## Réponses stratégiques\n\n- Allongement de la duration du portefeuille obligataire\n- Diversification vers les actifs réels (infrastructure, immobilier)\n- Produits à participation aux bénéfices aménagée\n- Optimisation des coûts de couverture\n\n## Outils de modélisation ALM\n\nLes modèles stochastiques de taux (CIR, Hull-White, LMM) permettent de simuler différents scénarios et d'évaluer la robustesse de la stratégie d'investissement.\n\n## Conclusion\n\nL'ALM est une discipline qui illustre parfaitement la nécessité d'articuler compétences actuarielles, financières et quantitatives pour piloter des décisions complexes.`,
      en: `## The low-rate context (and its legacy)\n\nEven though rates have risen since 2022, long-term life insurance liabilities remain highly sensitive to past conditions. Asset-liability management (ALM) remains a central challenge.\n\n## Impact on liabilities\n\nTechnical provisions calculated with low discount rates mechanically inflate the balance sheet. Liability duration tends to exceed that of available assets.\n\n## Strategic responses\n\n- Extending the duration of the bond portfolio\n- Diversification into real assets (infrastructure, real estate)\n- Products with adjusted profit-sharing mechanisms\n- Hedging cost optimization\n\n## ALM modeling tools\n\nStochastic interest rate models (CIR, Hull-White, LMM) allow simulation of different scenarios and evaluation of investment strategy robustness.\n\n## Conclusion\n\nALM perfectly illustrates the need to combine actuarial, financial and quantitative skills to navigate complex decisions.`,
    },
    tags: ['ALM', 'Interest Rates', 'Asset Allocation'],
    published: true,
  },
]

export function getPosts() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : defaultPosts
  } catch {
    return defaultPosts
  }
}

export function savePosts(posts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
}

export function getPostBySlug(slug) {
  return getPosts().find((p) => p.slug === slug) || null
}
