# Portfolio — Votre Nom

Portfolio professionnel bilingue (FR/EN) — Actuariat · Risk Management · Data Science

## Stack technique

- **React 19** + **Vite 8**
- **Tailwind CSS 3**
- **React Router v7** (BrowserRouter + fallback 404 pour GitHub Pages)
- Rendu Markdown maison (sans dépendances)
- CMS intégré (localStorage)

## Lancer en développement

```bash
npm install
npm run dev
```

Le site sera accessible sur http://localhost:5173/portfolio/

## Build et déploiement

```bash
npm run build      # génère le dossier dist/
npm run deploy     # build + push vers GitHub Pages
```

**Site live :** https://glardy.github.io/portfolio/

## Structure du projet

```
src/
├── App.jsx              # Shell, routes, toutes les pages
├── index.css            # Base Tailwind + Inter
├── main.jsx             # Entry point + router + analytics/PWA bootstrap
├── components/
│   └── Markdown.jsx     # Rendu Markdown minimal
└── data/
    ├── projects.js      # Données projets + helpers localStorage
    └── posts.js         # Données articles + helpers localStorage
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Accueil |
| `/portfolio` | Liste des projets |
| `/portfolio/:slug` | Détail d'un projet |
| `/blog` | Liste des articles (recherche + filtres) |
| `/blog/:slug` | Détail d'un article |
| `/page_secrete` | Formulaire privé de témoignages |
| `/contact` | Formulaire de contact |
| `/admin` | Interface d'administration (protégée) |

## SEO (Phase 1)

- `public/robots.txt` : autorise l'indexation publique et bloque `/admin` + `/page_secrete`.
- `public/sitemap.xml` : liste les pages publiques (accueil, portfolio, blog, contact, détails).
- Meta SEO dynamiques : titre, description, Open Graph, Twitter cards, canonical et schema.org dans `src/App.jsx`.
- Base URL actuelle : `https://glardy.github.io/portfolio` (à remplacer quand vous aurez votre domaine).

## PWA (Phase 3)

- `public/manifest.webmanifest` : app installable (nom, icônes, thème, scope).
- `public/sw.js` : cache applicatif pour navigation offline de base.
- Enregistrement automatique du service worker dans `src/main.jsx`.
- Bouton d'installation conditionnel dans l'en-tête (`beforeinstallprompt`) dans `src/App.jsx`.

## Analytics (Phase 4)

- Intégration Plausible compatible SPA (pageview à chaque changement de route) dans `src/main.jsx` et `src/App.jsx`.
- Variable d'environnement requise :
  - `VITE_PLAUSIBLE_DOMAIN=glardy.github.io`
- Exemple en local : créer un fichier `.env.local` à la racine avec cette variable.
- Quand vous aurez votre domaine perso, remplacez par votre domaine final (ex. `nom-prenom.com`).

## Formulaire contact (Phase 5)

- Intégration Formspree via `fetch` dans `src/App.jsx` (envoi réel + états succès/erreur).
- Variable d'environnement :
  - `VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/mjyvbvgv`
- Le formulaire n'envoie pas de données si l'endpoint est invalide : vérifiez la valeur dans `.env.local` en production.

## Accessibilité + performance (Phase 6)

- Lien d'évitement clavier en haut de page : `Skip to content`.
- Focus visible renforcé (`:focus-visible`) pour navigation clavier.
- Respect du mode réduction des animations (`prefers-reduced-motion`).
- Images des cartes projets/articles en `loading="lazy"` et `decoding="async"`.

## Timeline carrière (Étape suivante)

- Section timeline bilingue ajoutée sur la page d'accueil.
- Affiche un parcours pro/formation en 3 étapes, lisible et orienté recrutement.

## Interface admin

Accédez à `/admin` sur le site (local ou en ligne).

**Mot de passe par défaut :** `portfolio2026`
> ⚠️ Changez-le dans `src/App.jsx` (`ADMIN_PASSWORD`) avant de déployer en production.

L'admin permet de :
- **Créer, modifier, supprimer** des projets et des articles
- **Créer, modérer et publier** des témoignages
- **Publier / mettre en brouillon** chaque élément
- **Rédiger le contenu en Markdown** (FR et EN simultanément)

Les données sont sauvegardées dans le `localStorage` du navigateur.
Pour persister les contenus de façon permanente, reportez les modifications
dans `src/data/projects.js` et `src/data/posts.js`.

## Personnalisation

1. **Nom et infos** : chercher `Votre Nom` dans `App.jsx` et `data/*.js`
2. **Contenus** : modifier `src/data/projects.js` et `src/data/posts.js`
3. **Couleurs** : modifier les classes Tailwind dans `App.jsx`
4. **Mot de passe admin** : modifier `ADMIN_PASSWORD` dans `App.jsx`
"# Portfolio_V2" 
