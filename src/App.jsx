import { NavLink, Route, Routes, Link, useLocation, useParams } from 'react-router-dom'
import { useMemo, useState, useEffect, useRef } from 'react'
import Markdown from './components/Markdown'
import { getProjects, saveProjects, getProjectBySlug } from './data/projects'
import { getPosts, savePosts, getPostBySlug } from './data/posts'
import { getTestimonials, saveTestimonials } from './data/testimonials'

const ADMIN_PASSWORD = 'portfolio2026'
const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT || 'https://formspree.io/f/mjyvbvgv'

const allCategories = {
  fr: ['Tous', 'Actuariat', 'Data', 'Finance'],
  en: ['All', 'Actuarial', 'Data', 'Finance'],
}

const t = {
  fr: {
    langToggle: 'EN',
    ctaContact: 'Me contacter',
    badge: 'Actuaire & Data Scientist',
    heroIntro: 'Bonjour, je suis',
    heroTitle: 'Votre Nom',
    heroText: 'Actuaire qualifié et data scientist, je transforme des données complexes en insights actionnables pour les secteurs de l\'assurance et de la finance.',
    primaryCta: 'Voir mes projets',
    secondaryCta: 'En savoir plus',
    stat1Val: '<30',
    stat1Label: 'ans',
    stat2Val: 'Master',
    stat2Label: 'Actuariat & Finance',
    stat3Val: '3',
    stat3Label: 'ans d\'expérience',
    aboutLabel: 'À propos',
    aboutTitle: 'Une expertise à l\'intersection des mathématiques et de la donnée',
    aboutText: 'Diplômé d\'un Master en Actuariat, j\'ai développé une expertise solide en modélisation des risques, analyse statistique et machine learning appliqué aux problématiques assurantielles et financières.',
    aboutText2: 'Mon approche combine rigueur mathématique et pragmatisme data pour produire des solutions robustes et explicables.',
    metric1: 'Modélisation',
    metric2: 'Analyse',
    timelineLabel: 'Parcours',
    timelineTitle: 'Timeline carrière & formation',
    timelineIntro: 'Un parcours structuré entre formation actuarielle, finance et data science.',
    portfolioLabel: 'Portfolio',
    portfolioTitle: 'Mes projets',
    readMore: 'Voir le projet →',
    blogLabel: 'Blog',
    blogTitle: 'Articles & réflexions',
    blogSearch: 'Rechercher un article…',
    blogSortNewest: 'Plus récents',
    blogSortOldest: 'Plus anciens',
    blogNoResults: 'Aucun article trouvé.',
    blogTagsLabel: 'Tags',
    blogClearFilters: 'Réinitialiser',
    blogPrev: 'Précédent',
    blogNext: 'Suivant',
    blogPage: 'Page',
    relatedArticles: 'Articles similaires',
    readArticle: 'Lire l\'article →',
    pwaInstall: 'Installer l’app',
    testimonialsLabel: 'Témoignages',
    testimonialsTitle: 'Ce que disent les personnes avec qui je travaille',
    testimonialsIntro: 'Des retours validés et publiés après modération.',
    testimonialsEmpty: 'Les témoignages validés apparaîtront ici prochainement.',
    secretTitle: 'Page de témoignage',
    secretIntro: 'Merci de laisser un retour court et sincère. Le témoignage sera modéré avant publication.',
    secretSubmit: 'Envoyer le témoignage',
    secretSuccess: 'Merci ! Votre témoignage a bien été enregistré et sera modéré avant publication.',
    secretNote: 'Nom, fonction, entreprise et message sont visibles par l’équipe de modération.',
    contactLabel: 'Contact',
    contactTitle: 'Travaillons ensemble',
    contactText: 'Vous avez un projet, une question ou souhaitez simplement échanger ? N\'hésitez pas à me contacter.',
    email: 'votrenom@email.com',
    phone: '+33 6 00 00 00 00',
    formName: 'Votre nom',
    formEmail: 'Votre email',
    formMessage: 'Votre message',
    formSubmit: 'Envoyer le message',
    formSubmitting: 'Envoi en cours...',
    formSuccess: '✓ Message envoyé. Merci, je vous répondrai rapidement.',
    formError: 'Erreur lors de l’envoi. Merci de réessayer dans quelques instants.',
    backPortfolio: '← Retour au portfolio',
    backBlog: '← Retour au blog',
    notFound: 'Page introuvable',
    notFoundBack: 'Retour à l\'accueil',
    adminTitle: 'Administration',
    adminLogout: 'Déconnexion',
    adminProjects: 'Projets',
    adminPosts: 'Articles',
    adminNewProject: 'Nouveau projet',
    adminNewPost: 'Nouvel article',
    adminSave: 'Enregistrer',
    adminDelete: 'Supprimer',
    adminEdit: 'Modifier',
    adminPublished: 'Publié',
    adminDraft: 'Brouillon',
    adminPasswordLabel: 'Mot de passe',
    adminLoginBtn: 'Se connecter',
    adminLoginError: 'Mot de passe incorrect.',
    adminFieldTitle: 'Titre (FR)',
    adminFieldTitleEn: 'Titre (EN)',
    adminFieldExcerpt: 'Extrait (FR)',
    adminFieldExcerptEn: 'Extrait (EN)',
    adminFieldContent: 'Contenu (FR)',
    adminFieldContentEn: 'Contenu (EN)',
    adminFieldCategory: 'Catégorie (FR)',
    adminFieldCategoryEn: 'Catégorie (EN)',
    adminFieldDate: 'Date',
    adminFieldSlug: 'Slug',
    adminFieldTags: 'Tags (virgule)',
    adminFieldSummary: 'Résumé (FR)',
    adminFieldSummaryEn: 'Résumé (EN)',
    adminTestimonials: 'Témoignages',
    adminNewTestimonial: 'Nouveau témoignage',
    adminFieldAuthorName: 'Nom + prénom',
    adminFieldRole: 'Fonction (FR)',
    adminFieldRoleEn: 'Fonction (EN)',
    adminFieldCompany: 'Entreprise (FR)',
    adminFieldCompanyEn: 'Entreprise (EN)',
    adminFieldRelation: 'Relation (FR)',
    adminFieldRelationEn: 'Relation (EN)',
    adminFieldQuote: 'Témoignage (FR)',
    adminFieldQuoteEn: 'Témoignage (EN)',
    adminFieldRating: 'Note',
    adminNoTestimonialsPending: 'Aucun témoignage en attente.',
    adminNoTestimonialsPublished: 'Aucun témoignage publié.',
    adminConfirmDelete: 'Supprimer cet élément ?',
  },
  en: {
    langToggle: 'FR',
    ctaContact: 'Contact me',
    badge: 'Actuary & Data Scientist',
    heroIntro: 'Hi, I\'m',
    heroTitle: 'Your Name',
    heroText: 'Qualified actuary and data scientist, I transform complex data into actionable insights for insurance and finance sectors.',
    primaryCta: 'See my projects',
    secondaryCta: 'Learn more',
    stat1Val: '<30',
    stat1Label: 'years old',
    stat2Val: 'Master',
    stat2Label: 'Actuarial & Finance',
    stat3Val: '3',
    stat3Label: 'years experience',
    aboutLabel: 'About',
    aboutTitle: 'Expertise at the intersection of mathematics and data',
    aboutText: 'Graduate of a Master\'s in Actuarial Science, I have developed solid expertise in risk modeling, statistical analysis and machine learning applied to insurance and financial challenges.',
    aboutText2: 'My approach combines mathematical rigor and data pragmatism to deliver robust, explainable solutions.',
    metric1: 'Modeling',
    metric2: 'Analysis',
    timelineLabel: 'Journey',
    timelineTitle: 'Career & education timeline',
    timelineIntro: 'A structured path across actuarial education, finance, and data science.',
    portfolioLabel: 'Portfolio',
    portfolioTitle: 'My projects',
    readMore: 'View project →',
    blogLabel: 'Blog',
    blogTitle: 'Articles & insights',
    blogSearch: 'Search articles…',
    blogSortNewest: 'Newest first',
    blogSortOldest: 'Oldest first',
    blogNoResults: 'No articles found.',
    blogTagsLabel: 'Tags',
    blogClearFilters: 'Reset',
    blogPrev: 'Previous',
    blogNext: 'Next',
    blogPage: 'Page',
    relatedArticles: 'Related articles',
    readArticle: 'Read article →',
    pwaInstall: 'Install app',
    testimonialsLabel: 'Testimonials',
    testimonialsTitle: 'What people say about working with me',
    testimonialsIntro: 'Validated feedback published after moderation.',
    testimonialsEmpty: 'Validated testimonials will appear here soon.',
    secretTitle: 'Testimonial page',
    secretIntro: 'Please share a short, honest review. It will be moderated before publication.',
    secretSubmit: 'Submit testimonial',
    secretSuccess: 'Thank you! Your testimonial has been saved and will be moderated before publication.',
    secretNote: 'Name, role, company and message are visible to the moderation team.',
    contactLabel: 'Contact',
    contactTitle: 'Let\'s work together',
    contactText: 'Have a project, a question, or just want to chat? Feel free to reach out.',
    email: 'votrenom@email.com',
    phone: '+33 6 00 00 00 00',
    formName: 'Your name',
    formEmail: 'Your email',
    formMessage: 'Your message',
    formSubmit: 'Send message',
    formSubmitting: 'Sending...',
    formSuccess: '✓ Message sent. Thank you, I will get back to you soon.',
    formError: 'Sending failed. Please try again in a few moments.',
    backPortfolio: '← Back to portfolio',
    backBlog: '← Back to blog',
    notFound: 'Page not found',
    notFoundBack: 'Back to home',
    adminTitle: 'Administration',
    adminLogout: 'Log out',
    adminProjects: 'Projects',
    adminPosts: 'Posts',
    adminNewProject: 'New project',
    adminNewPost: 'New post',
    adminSave: 'Save',
    adminDelete: 'Delete',
    adminEdit: 'Edit',
    adminPublished: 'Published',
    adminDraft: 'Draft',
    adminPasswordLabel: 'Password',
    adminLoginBtn: 'Log in',
    adminLoginError: 'Incorrect password.',
    adminFieldTitle: 'Title (FR)',
    adminFieldTitleEn: 'Title (EN)',
    adminFieldExcerpt: 'Excerpt (FR)',
    adminFieldExcerptEn: 'Excerpt (EN)',
    adminFieldContent: 'Content (FR)',
    adminFieldContentEn: 'Content (EN)',
    adminFieldCategory: 'Category (FR)',
    adminFieldCategoryEn: 'Category (EN)',
    adminFieldDate: 'Date',
    adminFieldSlug: 'Slug',
    adminFieldTags: 'Tags (comma)',
    adminFieldSummary: 'Summary (FR)',
    adminFieldSummaryEn: 'Summary (EN)',
    adminTestimonials: 'Testimonials',
    adminNewTestimonial: 'New testimonial',
    adminFieldAuthorName: 'Full name',
    adminFieldRole: 'Role (FR)',
    adminFieldRoleEn: 'Role (EN)',
    adminFieldCompany: 'Company (FR)',
    adminFieldCompanyEn: 'Company (EN)',
    adminFieldRelation: 'Relation (FR)',
    adminFieldRelationEn: 'Relation (EN)',
    adminFieldQuote: 'Testimonial (FR)',
    adminFieldQuoteEn: 'Testimonial (EN)',
    adminFieldRating: 'Rating',
    adminNoTestimonialsPending: 'No testimonials pending.',
    adminNoTestimonialsPublished: 'No published testimonials.',
    adminConfirmDelete: 'Delete this item?',
  },
}

const slugify = (str) => str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const fmtDate = (dateStr, lang) =>
  new Date(dateStr).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

const SITE_URL = 'https://glardy.github.io/portfolio'
const POSTS_PER_PAGE = 3

function setMetaTag(attr, key, value) {
  let tag = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attr, key)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', value)
}

function getPostTags(post, language) {
  if (Array.isArray(post.tags) && post.tags.length > 0) {
    return post.tags.map((tag) => String(tag).trim()).filter(Boolean)
  }
  const category = post.category?.[language] ?? post.category
  return category ? [String(category)] : []
}

// ─── Field ────────────────────────────────────────────────────────────────────
function Field({ label, name, value, onChange, textarea, rows = 4, mono, fullWidth }) {
  const base = 'w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-300'
  const monoClass = mono ? ' font-mono' : ''
  const colSpan = fullWidth ? 'sm:col-span-2' : ''
  return (
    <div className={colSpan}>
      <label className="block text-xs font-medium uppercase tracking-widest text-zinc-400 mb-1">{label}</label>
      {textarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          rows={rows}
          className={base + monoClass}
        />
      ) : (
        <input
          name={name}
          value={value}
          onChange={onChange}
          className={base + monoClass}
        />
      )}
    </div>
  )
}

// ─── AdminList ────────────────────────────────────────────────────────────────
function AdminList({ items, onEdit, onDelete, tr, lang }) {
  return (
    <ul className="rounded-xl border border-zinc-200 bg-white divide-y divide-zinc-100 overflow-hidden">
      {items.map((item) => (
        <li key={item.slug} className="flex items-center justify-between px-4 py-3 gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <span
              className={`w-2 h-2 rounded-full shrink-0 ${item.published ? 'bg-emerald-400' : 'bg-zinc-300'}`}
              title={item.published ? tr.adminPublished : tr.adminDraft}
            />
            <span className="text-sm font-medium text-zinc-800 truncate">
              {item.title?.[lang] ?? item.title}
            </span>
            {item.date && (
              <span className="text-xs text-zinc-400 shrink-0">{fmtDate(item.date, lang)}</span>
            )}
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => onEdit(item)}
              className="text-xs border border-zinc-200 rounded-lg px-3 py-1 text-zinc-600 hover:bg-zinc-50"
            >
              {tr.adminEdit}
            </button>
            <button
              onClick={() => onDelete(item.slug)}
              className="text-xs border border-red-200 rounded-lg px-3 py-1 text-red-500 hover:bg-red-50"
            >
              {tr.adminDelete}
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}

function TestimonialAdminList({ items, onEdit, onDelete, tr, lang, emptyText }) {
  if (!items.length) {
    return (
      <div className="rounded-xl border border-dashed border-zinc-200 bg-white px-4 py-6 text-sm text-zinc-400">
        {emptyText}
      </div>
    )
  }
  return (
    <ul className="rounded-xl border border-zinc-200 bg-white divide-y divide-zinc-100 overflow-hidden">
      {items.map((item) => {
        const role = item.role?.[lang] ?? item.role
        const company = item.company?.[lang] ?? item.company
        const quote = item.quote?.[lang] ?? item.quote
        return (
          <li key={item.id} className="px-4 py-4 flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className={`w-2 h-2 rounded-full shrink-0 ${item.published ? 'bg-emerald-400' : 'bg-zinc-300'}`} />
                <span className="text-sm font-semibold text-zinc-900 truncate">{item.authorName}</span>
              </div>
              <p className="text-xs text-zinc-500">
                {[role, company].filter(Boolean).join(' · ')}
              </p>
              <p className="text-sm text-zinc-600 mt-2 max-h-12 overflow-hidden">“{quote}”</p>
              <div className="mt-2 flex items-center gap-3 text-xs text-zinc-400">
                <span>{stars(item.rating)}</span>
                {item.date && <span>{fmtDate(item.date, lang)}</span>}
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => onEdit(item)}
                className="text-xs border border-zinc-200 rounded-lg px-3 py-1 text-zinc-600 hover:bg-zinc-50"
              >
                {tr.adminEdit}
              </button>
              <button
                onClick={() => onDelete(item.id)}
                className="text-xs border border-red-200 rounded-lg px-3 py-1 text-red-500 hover:bg-red-50"
              >
                {tr.adminDelete}
              </button>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

// flatten {fr,en} objects to flat fields for the editor form
function flattenForEditor(item) {
  if (!item) return null
  return {
    ...item,
    title: item.title?.fr ?? item.title ?? '',
    titleEn: item.title?.en ?? item.titleEn ?? '',
    category: item.category?.fr ?? item.category ?? '',
    categoryEn: item.category?.en ?? item.categoryEn ?? '',
    excerpt: item.excerpt?.fr ?? item.excerpt ?? '',
    excerptEn: item.excerpt?.en ?? item.excerptEn ?? '',
    summary: item.summary?.fr ?? item.summary ?? '',
    summaryEn: item.summary?.en ?? item.summaryEn ?? '',
    content: item.content?.fr ?? item.content ?? '',
    contentEn: item.content?.en ?? item.contentEn ?? '',
  }
}

// re-compose flat fields back to {fr,en} objects for storage
function composeFromFlat(flat) {
  return {
    ...flat,
    title: { fr: flat.title || '', en: flat.titleEn || '' },
    category: { fr: flat.category || '', en: flat.categoryEn || '' },
    excerpt: { fr: flat.excerpt || '', en: flat.excerptEn || '' },
    summary: { fr: flat.summary || '', en: flat.summaryEn || '' },
    content: { fr: flat.content || '', en: flat.contentEn || '' },
  }
}

function flattenTestimonial(item) {
  if (!item) return null
  return {
    ...item,
    authorName: item.authorName || '',
    role: item.role?.fr ?? item.role ?? '',
    roleEn: item.role?.en ?? item.roleEn ?? '',
    company: item.company?.fr ?? item.company ?? '',
    companyEn: item.company?.en ?? item.companyEn ?? '',
    relation: item.relation?.fr ?? item.relation ?? '',
    relationEn: item.relation?.en ?? item.relationEn ?? '',
    quote: item.quote?.fr ?? item.quote ?? '',
    quoteEn: item.quote?.en ?? item.quoteEn ?? '',
    rating: item.rating ?? 5,
  }
}

function composeTestimonialFromFlat(flat) {
  return {
    ...flat,
    role: { fr: flat.role || '', en: flat.roleEn || '' },
    company: { fr: flat.company || '', en: flat.companyEn || '' },
    relation: { fr: flat.relation || '', en: flat.relationEn || '' },
    quote: { fr: flat.quote || '', en: flat.quoteEn || '' },
    rating: Number(flat.rating || 5),
  }
}

function stars(rating) {
  return Array.from({ length: 5 }, (_, i) => (i < Number(rating) ? '★' : '☆')).join('')
}

function TestimonialCard({ testimonial, tr, lang }) {
  const role = testimonial.role?.[lang] ?? testimonial.role
  const company = testimonial.company?.[lang] ?? testimonial.company
  const relation = testimonial.relation?.[lang] ?? testimonial.relation
  const quote = testimonial.quote?.[lang] ?? testimonial.quote
  return (
    <figure className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm flex flex-col gap-4">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-zinc-900 truncate">{testimonial.authorName}</p>
          <p className="text-xs text-zinc-500 mt-1">
            {[role, company].filter(Boolean).join(' · ')}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-xs text-zinc-400">{stars(testimonial.rating)}</p>
          {relation && <p className="text-[11px] uppercase tracking-widest text-zinc-400 mt-1">{relation}</p>}
        </div>
      </div>
      <blockquote className="text-sm leading-relaxed text-zinc-600">“{quote}”</blockquote>
      <figcaption className="text-xs text-zinc-400">
        {testimonial.date ? fmtDate(testimonial.date, lang) : ''}
      </figcaption>
    </figure>
  )
}

// ─── PostEditor ───────────────────────────────────────────────────────────────
function PostEditor({ initial, onSave, onCancel, tr }) {
  const empty = {
    title: '', titleEn: '', slug: '', date: new Date().toISOString().slice(0, 10),
    category: '', categoryEn: '', excerpt: '', excerptEn: '',
    content: '', contentEn: '', tags: '', published: false,
  }
  const [form, setForm] = useState(() => {
    const flat = flattenForEditor(initial) || empty
    return { ...flat, tags: Array.isArray(initial?.tags) ? initial.tags.join(', ') : (flat.tags || '') }
  })
  const handle = (e) => {
    const { name, value, type, checked } = e.target
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }
  const autoSlug = () => {
    if (!form.slug && form.title) setForm((f) => ({ ...f, slug: slugify(f.title) }))
  }
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label={tr.adminFieldTitle} name="title" value={form.title} onChange={handle} />
        <Field label={tr.adminFieldTitleEn} name="titleEn" value={form.titleEn} onChange={handle} />
        <Field label={tr.adminFieldSlug} name="slug" value={form.slug} onChange={handle} onBlur={autoSlug} />
        <Field label={tr.adminFieldDate} name="date" value={form.date} onChange={handle} />
        <Field label={tr.adminFieldCategory} name="category" value={form.category} onChange={handle} />
        <Field label={tr.adminFieldCategoryEn} name="categoryEn" value={form.categoryEn} onChange={handle} />
        <Field label={tr.adminFieldTags} name="tags" value={form.tags} onChange={handle} fullWidth />
        <Field label={tr.adminFieldExcerpt} name="excerpt" value={form.excerpt} onChange={handle} textarea rows={3} fullWidth />
        <Field label={tr.adminFieldExcerptEn} name="excerptEn" value={form.excerptEn} onChange={handle} textarea rows={3} fullWidth />
        <Field label={tr.adminFieldContent} name="content" value={form.content} onChange={handle} textarea rows={12} mono fullWidth />
        <Field label={tr.adminFieldContentEn} name="contentEn" value={form.contentEn} onChange={handle} textarea rows={12} mono fullWidth />
        <ImageField value={form.image || ''} onChange={(v) => setForm((f) => ({ ...f, image: v }))} />
      </div>
      <div className="mt-4 flex items-center gap-4">
        <label className="flex items-center gap-2 text-sm text-zinc-600 cursor-pointer">
          <input type="checkbox" name="published" checked={form.published} onChange={handle} className="accent-zinc-800" />
          {tr.adminPublished}
        </label>
        <div className="ml-auto flex gap-3">
          <button onClick={onCancel} className="text-sm border border-zinc-200 rounded-lg px-4 py-2 text-zinc-500 hover:bg-zinc-50">
            Annuler / Cancel
          </button>
          <button onClick={() => onSave(composeFromFlat({ ...form, tags: form.tags.split(',').map((s) => s.trim()).filter(Boolean) }))} className="text-sm bg-zinc-900 text-white rounded-lg px-4 py-2 hover:bg-zinc-700">
            {tr.adminSave}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── ProjectEditor ────────────────────────────────────────────────────────────
function ProjectEditor({ initial, onSave, onCancel, tr }) {
  const empty = {
    title: '', titleEn: '', slug: '', date: new Date().toISOString().slice(0, 10),
    category: '', categoryEn: '', summary: '', summaryEn: '',
    content: '', contentEn: '', tags: '', published: false,
  }
  const [form, setForm] = useState(() => {
    const flat = flattenForEditor(initial) || empty
    return { ...flat, tags: Array.isArray(initial?.tags) ? initial.tags.join(', ') : (flat.tags || '') }
  })
  const handle = (e) => {
    const { name, value, type, checked } = e.target
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }
  const autoSlug = () => {
    if (!form.slug && form.title) setForm((f) => ({ ...f, slug: slugify(f.title) }))
  }
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label={tr.adminFieldTitle} name="title" value={form.title} onChange={handle} />
        <Field label={tr.adminFieldTitleEn} name="titleEn" value={form.titleEn} onChange={handle} />
        <Field label={tr.adminFieldSlug} name="slug" value={form.slug} onChange={handle} onBlur={autoSlug} />
        <Field label={tr.adminFieldDate} name="date" value={form.date} onChange={handle} />
        <Field label={tr.adminFieldCategory} name="category" value={form.category} onChange={handle} />
        <Field label={tr.adminFieldCategoryEn} name="categoryEn" value={form.categoryEn} onChange={handle} />
        <Field label={tr.adminFieldTags} name="tags" value={form.tags} onChange={handle} fullWidth />
        <Field label={tr.adminFieldSummary} name="summary" value={form.summary} onChange={handle} textarea rows={3} fullWidth />
        <Field label={tr.adminFieldSummaryEn} name="summaryEn" value={form.summaryEn} onChange={handle} textarea rows={3} fullWidth />
        <Field label={tr.adminFieldContent} name="content" value={form.content} onChange={handle} textarea rows={12} mono fullWidth />
        <Field label={tr.adminFieldContentEn} name="contentEn" value={form.contentEn} onChange={handle} textarea rows={12} mono fullWidth />
        <ImageField value={form.image || ''} onChange={(v) => setForm((f) => ({ ...f, image: v }))} />
      </div>
      <div className="mt-4 flex items-center gap-4">
        <label className="flex items-center gap-2 text-sm text-zinc-600 cursor-pointer">
          <input type="checkbox" name="published" checked={form.published} onChange={handle} className="accent-zinc-800" />
          {tr.adminPublished}
        </label>
        <div className="ml-auto flex gap-3">
          <button onClick={onCancel} className="text-sm border border-zinc-200 rounded-lg px-4 py-2 text-zinc-500 hover:bg-zinc-50">
            Annuler / Cancel
          </button>
          <button
            onClick={() => onSave(composeFromFlat({ ...form, tags: form.tags.split(',').map((s) => s.trim()).filter(Boolean) }))}
            className="text-sm bg-zinc-900 text-white rounded-lg px-4 py-2 hover:bg-zinc-700"
          >
            {tr.adminSave}
          </button>
        </div>
      </div>
    </div>
  )
}

function TestimonialEditor({ initial, onSave, onCancel, tr, showStatus = true, submitLabel, compact = false }) {
  const empty = {
    authorName: '',
    role: '',
    roleEn: '',
    company: '',
    companyEn: '',
    relation: '',
    relationEn: '',
    quote: '',
    quoteEn: '',
    rating: 5,
    date: new Date().toISOString().slice(0, 10),
    published: false,
  }
  const [form, setForm] = useState(flattenTestimonial(initial) || empty)
  const handle = (e) => {
    const { name, value, type, checked } = e.target
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }
  const save = () => onSave(composeTestimonialFromFlat({ ...form, rating: Number(form.rating || 5) }))
  const fieldGrid = compact ? 'grid grid-cols-1 sm:grid-cols-2 gap-4' : 'grid grid-cols-1 sm:grid-cols-2 gap-4'
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className={fieldGrid}>
        <Field label={tr.adminFieldAuthorName} name="authorName" value={form.authorName} onChange={handle} fullWidth />
        <Field label={tr.adminFieldDate} name="date" value={form.date} onChange={handle} />
        <Field label={tr.adminFieldRole} name="role" value={form.role} onChange={handle} />
        <Field label={tr.adminFieldRoleEn} name="roleEn" value={form.roleEn} onChange={handle} />
        <Field label={tr.adminFieldCompany} name="company" value={form.company} onChange={handle} />
        <Field label={tr.adminFieldCompanyEn} name="companyEn" value={form.companyEn} onChange={handle} />
        <Field label={tr.adminFieldRelation} name="relation" value={form.relation} onChange={handle} />
        <Field label={tr.adminFieldRelationEn} name="relationEn" value={form.relationEn} onChange={handle} />
        <Field label={tr.adminFieldRating} name="rating" value={form.rating} onChange={handle} />
        <Field label={tr.adminFieldQuote} name="quote" value={form.quote} onChange={handle} textarea rows={4} fullWidth />
        <Field label={tr.adminFieldQuoteEn} name="quoteEn" value={form.quoteEn} onChange={handle} textarea rows={4} fullWidth />
      </div>
      {showStatus && (
        <div className="mt-4 flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm text-zinc-600 cursor-pointer">
            <input type="checkbox" name="published" checked={form.published} onChange={handle} className="accent-zinc-800" />
            {tr.adminPublished}
          </label>
        </div>
      )}
      <div className="mt-4 flex justify-end gap-3">
        <button onClick={onCancel} className="text-sm border border-zinc-200 rounded-lg px-4 py-2 text-zinc-500 hover:bg-zinc-50">
          Annuler / Cancel
        </button>
        <button onClick={save} className="text-sm bg-zinc-900 text-white rounded-lg px-4 py-2 hover:bg-zinc-700">
          {submitLabel || tr.adminSave}
        </button>
      </div>
    </div>
  )
}

// ─── ImageField ──────────────────────────────────────────────────────────────
function ImageField({ value, onChange }) {
  const fileRef = useRef()
  const handleFile = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => onChange(ev.target.result)
    reader.readAsDataURL(file)
  }
  return (
    <div className="col-span-2 flex flex-col gap-2">
      <label className="block text-xs font-medium uppercase tracking-widest text-zinc-400">Image (vignette)</label>
      <div className="flex gap-3 items-start">
        {value ? (
          <div className="relative shrink-0">
            <img src={value} alt="preview" className="w-28 h-20 object-cover rounded-lg border border-zinc-200" />
            <button
              type="button"
              onClick={() => onChange('')}
              className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-zinc-800 text-white text-xs flex items-center justify-center hover:bg-red-500"
              title="Supprimer"
            >×</button>
          </div>
        ) : (
          <div className="w-28 h-20 rounded-lg border-2 border-dashed border-zinc-200 flex items-center justify-center text-zinc-300 text-xs shrink-0">
            Aperçu
          </div>
        )}
        <div className="flex flex-col gap-2 flex-1 min-w-0">
          <input
            type="text"
            placeholder="https://... (URL de l'image)"
            value={value && value.startsWith('data:') ? '' : (value || '')}
            onChange={(e) => onChange(e.target.value)}
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-300"
          />
          <button
            type="button"
            onClick={() => fileRef.current.click()}
            className="self-start text-xs border border-zinc-200 rounded-lg px-3 py-1.5 text-zinc-600 hover:bg-zinc-50"
          >
            📁 Choisir un fichier
          </button>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
          <p className="text-xs text-zinc-400">URL externe ou fichier local (stocké en base64)</p>
        </div>
      </div>
    </div>
  )
}


const cardBgs = ['bg-zinc-100', 'bg-slate-100', 'bg-stone-100']
function ProjectCard({ project, index, tr, lang }) {
  const bg = cardBgs[index % cardBgs.length]
  const title = project.title?.[lang] ?? project.title
  const summary = project.summary?.[lang] ?? project.summary
  const category = project.category?.[lang] ?? project.category
  return (
    <Link
      to={`/portfolio/${project.slug}`}
      className="group rounded-xl border border-zinc-200 bg-white hover:shadow-md transition-shadow overflow-hidden flex flex-col"
    >
      {project.image ? (
        <img src={project.image} alt={title} loading="lazy" decoding="async" className="w-full h-40 object-cover" />
      ) : (
        <div className={`${bg} px-6 pt-5 pb-3`}>
          <span className="text-xs font-medium uppercase tracking-widest text-zinc-400">{String(index + 1).padStart(2, '0')}</span>
        </div>
      )}
      <div className="px-6 py-4 flex flex-col flex-1 gap-3">
        <div>
          <span className="text-xs font-medium text-zinc-500 uppercase tracking-wide">{category}</span>
          <h3 className="mt-1 text-base font-semibold text-zinc-900 leading-snug">{title}</h3>
        </div>
        <p className="text-sm text-zinc-600 leading-relaxed flex-1">{summary}</p>
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {project.tags.map((tag) => (
              <span key={tag} className="text-xs bg-zinc-100 text-zinc-500 rounded-full px-2 py-0.5">{tag}</span>
            ))}
          </div>
        )}
        <span className="text-xs font-medium text-zinc-900 group-hover:underline">{tr.readMore}</span>
      </div>
    </Link>
  )
}

// ─── PostCard ─────────────────────────────────────────────────────────────────
function PostCard({ post, tr, lang }) {
  const title = post.title?.[lang] ?? post.title
  const excerpt = post.excerpt?.[lang] ?? post.excerpt
  const category = post.category?.[lang] ?? post.category
  const tags = getPostTags(post, lang).slice(0, 3)
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group rounded-xl border border-zinc-200 bg-white hover:shadow-md transition-shadow flex flex-col overflow-hidden"
    >
      {post.image ? (
        <img src={post.image} alt={title} loading="lazy" decoding="async" className="w-full h-36 object-cover" />
      ) : (
        <div className="px-5 pt-5 pb-3 border-b border-zinc-100 flex items-center justify-between gap-2">
          <span className="text-xs font-medium uppercase tracking-widest text-zinc-400">{category}</span>
          <span className="text-xs text-zinc-400">{fmtDate(post.date, lang)}</span>
        </div>
      )}
      <div className="px-5 py-4 flex flex-col flex-1 gap-2">
        {post.image && (
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-medium uppercase tracking-widest text-zinc-400">{category}</span>
            <span className="text-xs text-zinc-400">{fmtDate(post.date, lang)}</span>
          </div>
        )}
        <h3 className="text-base font-semibold text-zinc-900 leading-snug">{title}</h3>
        <p className="text-sm text-zinc-500 leading-relaxed flex-1">{excerpt}</p>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.map((tag) => (
              <span key={tag} className="text-xs bg-zinc-100 text-zinc-500 rounded-full px-2 py-0.5">{tag}</span>
            ))}
          </div>
        )}
        <span className="text-xs font-medium text-zinc-900 group-hover:underline">{tr.readArticle}</span>
      </div>
    </Link>
  )
}

// ─── HomePage ─────────────────────────────────────────────────────────────────
function HomePage({ tr, language }) {
  const projects = useMemo(() => getProjects().filter((p) => p.published).slice(0, 3), [])
  const testimonials = useMemo(() => getTestimonials().filter((item) => item.published).slice(0, 3), [])
  const timelineItems = language === 'fr'
    ? [
      {
        period: '2026 - Aujourd’hui',
        title: 'Consultant actuariat & data',
        subtitle: 'Missions en risk management et analytics décisionnelle',
      },
      {
        period: '2024 - 2026',
        title: 'Master Actuariat & Finance',
        subtitle: 'Spécialisation en modélisation des risques, solvabilité et ALM',
      },
      {
        period: '2022 - 2024',
        title: 'Data science appliquée à la finance',
        subtitle: 'Projets ML, scoring, détection de fraude et visualisation',
      },
    ]
    : [
      {
        period: '2026 - Present',
        title: 'Actuarial & data consultant',
        subtitle: 'Assignments in risk management and decision analytics',
      },
      {
        period: '2024 - 2026',
        title: 'Master in Actuarial Science & Finance',
        subtitle: 'Specialized in risk modeling, solvency, and ALM',
      },
      {
        period: '2022 - 2024',
        title: 'Data science applied to finance',
        subtitle: 'ML projects, scoring, fraud detection, and visualization',
      },
    ]
  return (
    <main id="main-content" tabIndex={-1}>
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-block text-xs font-medium uppercase tracking-widest text-zinc-400 border border-zinc-200 rounded-full px-3 py-1 mb-6">
            {tr.badge}
          </span>
          <p className="text-zinc-500 text-lg mb-1">{tr.heroIntro}</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 mb-5 leading-tight">{tr.heroTitle}</h1>
          <p className="text-zinc-600 text-lg leading-relaxed mb-8 max-w-lg">{tr.heroText}</p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/portfolio"
              className="bg-zinc-900 text-white text-sm font-medium rounded-lg px-5 py-2.5 hover:bg-zinc-700 transition-colors"
            >
              {tr.primaryCta}
            </Link>
            <Link
              to="/contact"
              className="border border-zinc-200 text-zinc-700 text-sm font-medium rounded-lg px-5 py-2.5 hover:bg-zinc-50 transition-colors"
            >
              {tr.secondaryCta}
            </Link>
          </div>
        </div>
        <aside className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
          <div className="w-20 h-20 rounded-full bg-zinc-100 mb-5 flex items-center justify-center text-2xl font-bold text-zinc-400">
            VN
          </div>
          <p className="font-semibold text-zinc-900 text-lg">{tr.heroTitle}</p>
          <p className="text-zinc-500 text-sm mt-1">{tr.badge}</p>
          <div className="mt-6 grid grid-cols-3 gap-3 text-center">
            {[
              { val: tr.stat1Val, label: tr.stat1Label },
              { val: tr.stat2Val, label: tr.stat2Label },
              { val: tr.stat3Val, label: tr.stat3Label },
            ].map(({ val, label }) => (
              <div key={label} className="rounded-xl bg-zinc-50 border border-zinc-100 px-2 py-3">
                <p className="text-lg font-bold text-zinc-900">{val}</p>
                <p className="text-xs text-zinc-400 mt-0.5 leading-tight">{label}</p>
              </div>
            ))}
          </div>
        </aside>
      </section>

      {/* About */}
      <section className="bg-zinc-50 border-y border-zinc-200 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <span className="text-xs font-medium uppercase tracking-widest text-zinc-400">{tr.aboutLabel}</span>
            <h2 className="mt-3 text-3xl font-bold text-zinc-900 leading-snug">{tr.aboutTitle}</h2>
          </div>
          <div className="space-y-4">
            <p className="text-zinc-600 leading-relaxed">{tr.aboutText}</p>
            <p className="text-zinc-600 leading-relaxed">{tr.aboutText2}</p>
            <div className="grid grid-cols-2 gap-4 mt-6">
              {[tr.metric1, tr.metric2].map((m) => (
                <div key={m} className="rounded-xl border border-zinc-200 bg-white p-4 text-sm font-medium text-zinc-800">
                  {m}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="mb-10">
          <span className="text-xs font-medium uppercase tracking-widest text-zinc-400">{tr.timelineLabel}</span>
          <h2 className="mt-2 text-3xl font-bold text-zinc-900">{tr.timelineTitle}</h2>
          <p className="mt-3 text-zinc-600 max-w-2xl">{tr.timelineIntro}</p>
        </div>
        <ol className="relative border-s border-zinc-200 ms-3 space-y-8">
          {timelineItems.map((item) => (
            <li key={`${item.period}-${item.title}`} className="ms-6">
              <span className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full bg-zinc-900" />
              <p className="text-xs uppercase tracking-widest text-zinc-400">{item.period}</p>
              <h3 className="mt-1 text-lg font-semibold text-zinc-900">{item.title}</h3>
              <p className="mt-1 text-sm text-zinc-600">{item.subtitle}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Featured projects */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-xs font-medium uppercase tracking-widest text-zinc-400">{tr.portfolioLabel}</span>
            <h2 className="mt-2 text-3xl font-bold text-zinc-900">{tr.portfolioTitle}</h2>
          </div>
          <Link to="/portfolio" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
            {tr.readMore}
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} tr={tr} lang={language} />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-zinc-50 border-y border-zinc-200 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-xs font-medium uppercase tracking-widest text-zinc-400">{tr.testimonialsLabel}</span>
              <h2 className="mt-2 text-3xl font-bold text-zinc-900">{tr.testimonialsTitle}</h2>
            </div>
            <p className="text-sm text-zinc-500 max-w-md text-right hidden md:block">{tr.testimonialsIntro}</p>
          </div>
          {testimonials.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-zinc-200 bg-white p-8 text-center text-sm text-zinc-500">
              {tr.testimonialsEmpty}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} tr={tr} lang={language} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

// ─── PortfolioPage ────────────────────────────────────────────────────────────
function PortfolioPage({ tr, language }) {
  const projects = useMemo(() => getProjects().filter((p) => p.published), [])
  return (
    <main id="main-content" tabIndex={-1} className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <span className="text-xs font-medium uppercase tracking-widest text-zinc-400">{tr.portfolioLabel}</span>
      <h1 className="mt-2 text-3xl font-bold text-zinc-900 mb-10">{tr.portfolioTitle}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} tr={tr} lang={language} />
        ))}
      </div>
    </main>
  )
}

// ─── ProjectDetailPage ────────────────────────────────────────────────────────
function ProjectDetailPage({ tr, language }) {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)
  if (!project) return <NotFoundPage tr={tr} />
  const title = language === 'fr' ? project.title?.fr ?? project.title : project.title?.en ?? project.titleEn ?? project.title
  const summary = language === 'fr' ? project.summary?.fr ?? project.summary : project.summary?.en ?? project.summaryEn ?? project.summary
  const category = language === 'fr' ? project.category?.fr ?? project.category : project.category?.en ?? project.categoryEn ?? project.category
  const content = language === 'fr' ? project.content?.fr ?? project.content : project.content?.en ?? project.contentEn ?? project.content
  return (
    <main id="main-content" tabIndex={-1} className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <Link to="/portfolio" className="text-sm text-zinc-400 hover:text-zinc-800 transition-colors mb-8 inline-block">
        {tr.backPortfolio}
      </Link>
      <span className="text-xs font-medium uppercase tracking-widest text-zinc-400">{category}</span>
      <h1 className="mt-2 text-3xl font-bold text-zinc-900 mb-2">{title}</h1>
      <p className="text-sm text-zinc-400 mb-6">{fmtDate(project.date, language)}</p>
      {project.tags && project.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag) => (
            <span key={tag} className="text-xs bg-zinc-100 text-zinc-500 rounded-full px-3 py-1">{tag}</span>
          ))}
        </div>
      )}
      <div className="rounded-xl border border-zinc-200 bg-zinc-50 px-6 py-5 mb-10">
        <p className="text-zinc-600 leading-relaxed">{summary}</p>
      </div>
      <div className="prose prose-zinc max-w-none">
        <Markdown content={content} />
      </div>
      <div className="mt-16 rounded-xl border border-zinc-200 bg-white p-8 text-center">
        <p className="text-zinc-600 mb-4">{tr.contactText}</p>
        <Link
          to="/contact"
          className="bg-zinc-900 text-white text-sm font-medium rounded-lg px-5 py-2.5 hover:bg-zinc-700 transition-colors"
        >
          {tr.ctaContact}
        </Link>
      </div>
    </main>
  )
}

// ─── SecretTestimonialPage ─────────────────────────────────────────────────────
function SecretTestimonialPage({ tr, language }) {
  const [sent, setSent] = useState(false)

  const save = (data) => {
    const existing = getTestimonials()
    const next = [
      ...existing,
      {
        ...data,
        id: Date.now(),
        published: false,
        source: 'page_secrete',
      },
    ]
    saveTestimonials(next)
    setSent(true)
  }

  return (
    <main id="main-content" tabIndex={-1} className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <span className="text-xs font-medium uppercase tracking-widest text-zinc-400">{tr.testimonialsLabel}</span>
      <h1 className="mt-2 text-3xl font-bold text-zinc-900 mb-4">{tr.secretTitle}</h1>
      <p className="text-zinc-600 leading-relaxed max-w-2xl mb-10">{tr.secretIntro}</p>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
          {sent ? (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-emerald-900">
              <p className="font-semibold mb-2">✓</p>
              <p className="text-sm leading-relaxed">{tr.secretSuccess}</p>
            </div>
          ) : (
            <TestimonialEditor
              tr={tr}
              onSave={save}
              onCancel={() => setSent(false)}
              showStatus={false}
              submitLabel={tr.secretSubmit}
            />
          )}
        </div>
        <aside className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-widest text-zinc-400 mb-3">{tr.testimonialsIntro}</p>
          <p className="text-sm text-zinc-600 leading-relaxed mb-6">{tr.secretNote}</p>
          <div className="rounded-xl bg-zinc-50 border border-zinc-100 p-4 text-sm text-zinc-600">
            <p className="font-semibold text-zinc-900 mb-2">{language === 'fr' ? 'À fournir' : 'Required'}</p>
            <ul className="space-y-2 text-sm">
              <li>• {language === 'fr' ? 'Nom et prénom' : 'Full name'}</li>
              <li>• {language === 'fr' ? 'Fonction / rôle' : 'Role / function'}</li>
              <li>• {language === 'fr' ? 'Entreprise ou organisation' : 'Company or organization'}</li>
              <li>• {language === 'fr' ? 'Message de retour' : 'Feedback message'}</li>
            </ul>
          </div>
        </aside>
      </div>
    </main>
  )
}

// ─── BlogPage ─────────────────────────────────────────────────────────────────
function BlogPage({ tr, language }) {
  const posts = useMemo(() => getPosts().filter((p) => p.published), [])
  const cats = allCategories[language]
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState(cats[0])
  const [sort, setSort] = useState('newest')
  const [selectedTags, setSelectedTags] = useState([])
  const [page, setPage] = useState(1)

  const availableTags = useMemo(() => {
    const tags = new Set()
    posts.forEach((post) => getPostTags(post, language).forEach((tag) => tags.add(tag)))
    return Array.from(tags).sort((a, b) => a.localeCompare(b))
  }, [posts, language])

  const filtered = useMemo(() => {
    let list = posts
    const firstCat = cats[0]
    if (cat !== firstCat) {
      list = list.filter((p) => {
        const c = p.category?.[language] ?? p.category
        return c === cat
      })
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter((p) => {
        const title = (p.title?.[language] ?? p.title ?? '')
        const excerpt = (p.excerpt?.[language] ?? p.excerpt ?? '')
        return title.toLowerCase().includes(q) || excerpt.toLowerCase().includes(q)
      })
    }
    if (selectedTags.length > 0) {
      list = list.filter((p) => {
        const tags = getPostTags(p, language)
        return selectedTags.some((tag) => tags.includes(tag))
      })
    }
    list = [...list].sort((a, b) =>
      sort === 'newest'
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date)
    )
    return list
  }, [posts, cat, search, sort, language, cats, selectedTags])

  useEffect(() => {
    setPage(1)
  }, [search, cat, sort, selectedTags])

  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE))
  const safePage = Math.min(page, totalPages)
  const paginated = useMemo(() => {
    const start = (safePage - 1) * POSTS_PER_PAGE
    return filtered.slice(start, start + POSTS_PER_PAGE)
  }, [filtered, safePage])

  const toggleTag = (tag) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const resetFilters = () => {
    setSearch('')
    setCat(cats[0])
    setSort('newest')
    setSelectedTags([])
    setPage(1)
  }

  return (
    <main id="main-content" tabIndex={-1} className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <span className="text-xs font-medium uppercase tracking-widest text-zinc-400">{tr.blogLabel}</span>
      <h1 className="mt-2 text-3xl font-bold text-zinc-900 mb-8">{tr.blogTitle}</h1>
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <input
          type="search"
          placeholder={tr.blogSearch}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-lg border border-zinc-200 px-4 py-2 text-sm text-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-300"
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-600 focus:outline-none"
        >
          <option value="newest">{tr.blogSortNewest}</option>
          <option value="oldest">{tr.blogSortOldest}</option>
        </select>
      </div>
      <div className="flex flex-wrap gap-2 mb-10">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`text-xs font-medium rounded-full px-4 py-1.5 border transition-colors ${
              cat === c
                ? 'bg-zinc-900 text-white border-zinc-900'
                : 'border-zinc-200 text-zinc-500 hover:border-zinc-400'
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="mb-8">
        <p className="text-xs font-medium uppercase tracking-widest text-zinc-400 mb-3">{tr.blogTagsLabel}</p>
        <div className="flex flex-wrap gap-2">
          {availableTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`text-xs font-medium rounded-full px-3 py-1.5 border transition-colors ${
                selectedTags.includes(tag)
                  ? 'bg-zinc-900 text-white border-zinc-900'
                  : 'border-zinc-200 text-zinc-500 hover:border-zinc-400'
              }`}
            >
              {tag}
            </button>
          ))}
          {(search || cat !== cats[0] || sort !== 'newest' || selectedTags.length > 0) && (
            <button onClick={resetFilters} className="text-xs font-medium rounded-full px-3 py-1.5 border border-zinc-200 text-zinc-500 hover:border-zinc-400">
              {tr.blogClearFilters}
            </button>
          )}
        </div>
      </div>
      {paginated.length === 0 ? (
        <p className="text-zinc-400 text-sm">{tr.blogNoResults}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {paginated.map((post) => (
            <PostCard key={post.slug} post={post} tr={tr} lang={language} />
          ))}
        </div>
      )}
      {filtered.length > 0 && (
        <div className="flex items-center justify-between border-t border-zinc-200 pt-6">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={safePage === 1}
            className="text-sm border border-zinc-200 rounded-lg px-3 py-1.5 text-zinc-500 disabled:opacity-40"
          >
            {tr.blogPrev}
          </button>
          <span className="text-sm text-zinc-500">{tr.blogPage} {safePage} / {totalPages}</span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={safePage === totalPages}
            className="text-sm border border-zinc-200 rounded-lg px-3 py-1.5 text-zinc-500 disabled:opacity-40"
          >
            {tr.blogNext}
          </button>
        </div>
      )}
    </main>
  )
}

// ─── PostDetailPage ───────────────────────────────────────────────────────────
function PostDetailPage({ tr, language }) {
  const { slug } = useParams()
  const post = getPostBySlug(slug)
  if (!post) return <NotFoundPage tr={tr} />
  const title = language === 'fr' ? post.title?.fr ?? post.title : post.title?.en ?? post.titleEn ?? post.title
  const excerpt = language === 'fr' ? post.excerpt?.fr ?? post.excerpt : post.excerpt?.en ?? post.excerptEn ?? post.excerpt
  const category = language === 'fr' ? post.category?.fr ?? post.category : post.category?.en ?? post.categoryEn ?? post.category
  const content = language === 'fr' ? post.content?.fr ?? post.content : post.content?.en ?? post.contentEn ?? post.content
  const currentTags = getPostTags(post, language)
  const relatedPosts = useMemo(() => {
    return getPosts()
      .filter((item) => item.published && item.slug !== slug)
      .map((item) => {
        const itemCategory = item.category?.[language] ?? item.category
        const itemTags = getPostTags(item, language)
        const sharedTags = itemTags.filter((tag) => currentTags.includes(tag)).length
        const score = (itemCategory === category ? 2 : 0) + sharedTags
        return { item, score }
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score || new Date(b.item.date) - new Date(a.item.date))
      .slice(0, 3)
      .map(({ item }) => item)
  }, [slug, language, category, currentTags])
  return (
    <main id="main-content" tabIndex={-1} className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <Link to="/blog" className="text-sm text-zinc-400 hover:text-zinc-800 transition-colors mb-8 inline-block">
        {tr.backBlog}
      </Link>
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xs font-medium uppercase tracking-widest text-zinc-400">{category}</span>
        <span className="text-zinc-300">·</span>
        <span className="text-xs text-zinc-400">{fmtDate(post.date, language)}</span>
      </div>
      <h1 className="text-3xl font-bold text-zinc-900 mb-4">{title}</h1>
      <p className="text-zinc-500 text-lg leading-relaxed mb-10 border-l-2 border-zinc-200 pl-4">{excerpt}</p>
      {currentTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {currentTags.map((tag) => (
            <span key={tag} className="text-xs bg-zinc-100 text-zinc-500 rounded-full px-3 py-1">{tag}</span>
          ))}
        </div>
      )}
      <div className="prose prose-zinc max-w-none">
        <Markdown content={content} />
      </div>
      {relatedPosts.length > 0 && (
        <section className="mt-14 border-t border-zinc-200 pt-10">
          <h2 className="text-xl font-semibold text-zinc-900 mb-5">{tr.relatedArticles}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedPosts.map((relatedPost) => (
              <PostCard key={relatedPost.slug} post={relatedPost} tr={tr} lang={language} />
            ))}
          </div>
        </section>
      )}
    </main>
  )
}

// ─── ContactPage ──────────────────────────────────────────────────────────────
function ContactPage({ tr }) {
  const [status, setStatus] = useState('idle')
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const handle = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  const submit = async (e) => {
    e.preventDefault()
    setStatus('submitting')
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      })
      if (!response.ok) {
        throw new Error(`Formspree response: ${response.status}`)
      }
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
    } catch (error) {
      console.error(error)
      setStatus('error')
    }
  }
  return (
    <main id="main-content" tabIndex={-1} className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      <span className="text-xs font-medium uppercase tracking-widest text-zinc-400">{tr.contactLabel}</span>
      <h1 className="mt-2 text-3xl font-bold text-zinc-900 mb-12">{tr.contactTitle}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left */}
        <div>
          <p className="text-zinc-600 leading-relaxed mb-8">{tr.contactText}</p>
          <div className="space-y-4">
            <a href={`mailto:${tr.email}`} className="flex items-center gap-3 text-sm text-zinc-700 hover:text-zinc-900">
              <span className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-500">@</span>
              {tr.email}
            </a>
            <div className="flex items-center gap-3 text-sm text-zinc-700">
              <span className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-500">☎</span>
              {tr.phone}
            </div>
          </div>
        </div>
        {/* Right */}
        <div className="rounded-xl border border-zinc-200 bg-white p-8">
          <form onSubmit={submit} className="space-y-4">
            {status === 'success' && (
              <p className="text-emerald-700 text-sm bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2" role="status">
                {tr.formSuccess}
              </p>
            )}
            {status === 'error' && (
              <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2" role="alert">
                {tr.formError}
              </p>
            )}
            <div>
              <label className="block text-xs font-medium uppercase tracking-widest text-zinc-400 mb-1">{tr.formName}</label>
              <input name="name" value={form.name} onChange={handle} required className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-300" />
            </div>
            <div>
              <label className="block text-xs font-medium uppercase tracking-widest text-zinc-400 mb-1">{tr.formEmail}</label>
              <input name="email" type="email" value={form.email} onChange={handle} required className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-300" />
            </div>
            <div>
              <label className="block text-xs font-medium uppercase tracking-widest text-zinc-400 mb-1">{tr.formMessage}</label>
              <textarea name="message" value={form.message} onChange={handle} rows={5} required className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-300" />
            </div>
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full bg-zinc-900 text-white text-sm font-medium rounded-lg px-5 py-2.5 hover:bg-zinc-700 transition-colors disabled:opacity-60"
            >
              {status === 'submitting' ? tr.formSubmitting : tr.formSubmit}
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}

// ─── NotFoundPage ─────────────────────────────────────────────────────────────
function NotFoundPage({ tr }) {
  return (
    <main id="main-content" tabIndex={-1} className="max-w-xl mx-auto px-4 py-32 text-center">
      <p className="text-6xl font-bold text-zinc-200 mb-4">404</p>
      <p className="text-xl font-semibold text-zinc-800 mb-6">{tr ? tr.notFound : 'Page not found'}</p>
      <Link to="/" className="text-sm text-zinc-500 hover:text-zinc-900 underline">
        {tr ? tr.notFoundBack : 'Back to home'}
      </Link>
    </main>
  )
}

// ─── AdminPage ────────────────────────────────────────────────────────────────
function AdminPage({ tr, language }) {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('admin_authed') === '1')
  const [pwd, setPwd] = useState('')
  const [loginError, setLoginError] = useState(false)
  const [tab, setTab] = useState('posts')
  const [posts, setPosts] = useState(() => getPosts())
  const [projects, setProjects] = useState(() => getProjects())
  const [testimonials, setTestimonials] = useState(() => getTestimonials())
  const [editingPost, setEditingPost] = useState(null)
  const [editingProject, setEditingProject] = useState(null)
  const [editingTestimonial, setEditingTestimonial] = useState(null)
  const [newPost, setNewPost] = useState(false)
  const [newProject, setNewProject] = useState(false)
  const [newTestimonial, setNewTestimonial] = useState(false)

  const login = (e) => {
    e.preventDefault()
    if (pwd === ADMIN_PASSWORD) {
      sessionStorage.setItem('admin_authed', '1')
      setAuthed(true)
      setLoginError(false)
    } else {
      setLoginError(true)
    }
  }

  const logout = () => {
    sessionStorage.removeItem('admin_authed')
    setAuthed(false)
  }

  const savePost = (data) => {
    const updated = posts.some((p) => p.slug === data.slug)
      ? posts.map((p) => (p.slug === data.slug ? data : p))
      : [...posts, data]
    savePosts(updated)
    setPosts(updated)
    setEditingPost(null)
    setNewPost(false)
  }

  const deletePost = (slug) => {
    if (!window.confirm(tr.adminConfirmDelete)) return
    const updated = posts.filter((p) => p.slug !== slug)
    savePosts(updated)
    setPosts(updated)
    if (editingPost && editingPost.slug === slug) setEditingPost(null)
  }

  const saveProject = (data) => {
    const updated = projects.some((p) => p.slug === data.slug)
      ? projects.map((p) => (p.slug === data.slug ? data : p))
      : [...projects, data]
    saveProjects(updated)
    setProjects(updated)
    setEditingProject(null)
    setNewProject(false)
  }

  const deleteProject = (slug) => {
    if (!window.confirm(tr.adminConfirmDelete)) return
    const updated = projects.filter((p) => p.slug !== slug)
    saveProjects(updated)
    setProjects(updated)
    if (editingProject && editingProject.slug === slug) setEditingProject(null)
  }

  const saveTestimonial = (data) => {
    const updated = testimonials.some((item) => String(item.id) === String(data.id))
      ? testimonials.map((item) => (String(item.id) === String(data.id) ? data : item))
      : [...testimonials, { ...data, id: data.id || Date.now() }]
    saveTestimonials(updated)
    setTestimonials(updated)
    setEditingTestimonial(null)
    setNewTestimonial(false)
  }

  const deleteTestimonial = (id) => {
    if (!window.confirm(tr.adminConfirmDelete)) return
    const updated = testimonials.filter((item) => String(item.id) !== String(id))
    saveTestimonials(updated)
    setTestimonials(updated)
    if (editingTestimonial && String(editingTestimonial.id) === String(id)) setEditingTestimonial(null)
  }

  if (!authed) {
    return (
      <main id="main-content" tabIndex={-1} className="max-w-sm mx-auto px-4 py-32">
        <h1 className="text-2xl font-bold text-zinc-900 mb-8 text-center">{tr.adminTitle}</h1>
        <form onSubmit={login} className="rounded-xl border border-zinc-200 bg-white p-8 space-y-4">
          <div>
            <label className="block text-xs font-medium uppercase tracking-widest text-zinc-400 mb-1">
              {tr.adminPasswordLabel}
            </label>
            <input
              type="password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-300"
            />
          </div>
          {loginError && <p className="text-xs text-red-500">{tr.adminLoginError}</p>}
          <button type="submit" className="w-full bg-zinc-900 text-white text-sm font-medium rounded-lg px-5 py-2.5 hover:bg-zinc-700">
            {tr.adminLoginBtn}
          </button>
        </form>
      </main>
    )
  }

  return (
    <main id="main-content" tabIndex={-1} className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-zinc-900">{tr.adminTitle}</h1>
        <button onClick={logout} className="text-sm border border-zinc-200 rounded-lg px-4 py-2 text-zinc-500 hover:bg-zinc-50">
          {tr.adminLogout}
        </button>
      </div>

      {/* Tab switcher */}
      <div className="flex gap-2 mb-8">
        {['posts', 'projects', 'testimonials'].map((tabKey) => (
          <button
            key={tabKey}
            onClick={() => setTab(tabKey)}
            className={`text-sm font-medium rounded-lg px-4 py-2 border transition-colors ${
              tab === tabKey
                ? 'bg-zinc-900 text-white border-zinc-900'
                : 'border-zinc-200 text-zinc-500 hover:border-zinc-400'
            }`}
          >
            {tabKey === 'posts' ? tr.adminPosts : tabKey === 'projects' ? tr.adminProjects : tr.adminTestimonials}
          </button>
        ))}
      </div>

      {tab === 'posts' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium uppercase tracking-widest text-zinc-400">{tr.adminPosts}</span>
            <button
              onClick={() => { setNewPost(true); setEditingPost(null) }}
              className="text-sm bg-zinc-900 text-white rounded-lg px-4 py-2 hover:bg-zinc-700"
            >
              {tr.adminNewPost}
            </button>
          </div>
          <AdminList items={posts} onEdit={(item) => { setEditingPost(item); setNewPost(false) }} onDelete={deletePost} tr={tr} lang={language} />
          {(newPost || editingPost) && (
            <PostEditor
              key={editingPost ? editingPost.slug : 'new'}
              initial={editingPost}
              onSave={savePost}
              onCancel={() => { setEditingPost(null); setNewPost(false) }}
              tr={tr}
            />
          )}
        </div>
      )}

      {tab === 'projects' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium uppercase tracking-widest text-zinc-400">{tr.adminProjects}</span>
            <button
              onClick={() => { setNewProject(true); setEditingProject(null) }}
              className="text-sm bg-zinc-900 text-white rounded-lg px-4 py-2 hover:bg-zinc-700"
            >
              {tr.adminNewProject}
            </button>
          </div>
          <AdminList items={projects} onEdit={(item) => { setEditingProject(item); setNewProject(false) }} onDelete={deleteProject} tr={tr} lang={language} />
          {(newProject || editingProject) && (
            <ProjectEditor
              key={editingProject ? editingProject.slug : 'new'}
              initial={editingProject}
              onSave={saveProject}
              onCancel={() => { setEditingProject(null); setNewProject(false) }}
              tr={tr}
            />
          )}
        </div>
      )}

      {tab === 'testimonials' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium uppercase tracking-widest text-zinc-400">{tr.adminTestimonials}</span>
            <button
              onClick={() => { setNewTestimonial(true); setEditingTestimonial(null) }}
              className="text-sm bg-zinc-900 text-white rounded-lg px-4 py-2 hover:bg-zinc-700"
            >
              {tr.adminNewTestimonial}
            </button>
          </div>
          <div className="space-y-8">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-widest text-zinc-400">À modérer</span>
                <span className="text-xs text-zinc-400">{testimonials.filter((item) => !item.published).length}</span>
              </div>
              <TestimonialAdminList
                items={testimonials.filter((item) => !item.published)}
                onEdit={(item) => { setEditingTestimonial(item); setNewTestimonial(false) }}
                onDelete={deleteTestimonial}
                tr={tr}
                lang={language}
                emptyText={tr.adminNoTestimonialsPending}
              />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-widest text-zinc-400">Publiés</span>
                <span className="text-xs text-zinc-400">{testimonials.filter((item) => item.published).length}</span>
              </div>
              <TestimonialAdminList
                items={testimonials.filter((item) => item.published)}
                onEdit={(item) => { setEditingTestimonial(item); setNewTestimonial(false) }}
                onDelete={deleteTestimonial}
                tr={tr}
                lang={language}
                emptyText={tr.adminNoTestimonialsPublished}
              />
            </div>
          </div>
          {(newTestimonial || editingTestimonial) && (
            <TestimonialEditor
              key={editingTestimonial ? editingTestimonial.id : 'new'}
              initial={editingTestimonial}
              onSave={saveTestimonial}
              onCancel={() => { setEditingTestimonial(null); setNewTestimonial(false) }}
              tr={tr}
            />
          )}
        </div>
      )}
    </main>
  )
}

// ─── App (default export) ─────────────────────────────────────────────────────
const navItems = [
  { labelFr: 'Accueil', labelEn: 'Home', to: '/' },
  { labelFr: 'Portfolio', labelEn: 'Portfolio', to: '/portfolio' },
  { labelFr: 'Blog', labelEn: 'Blog', to: '/blog' },
  { labelFr: 'Contact', labelEn: 'Contact', to: '/contact' },
]

export default function App() {
  const [language, setLanguage] = useState('fr')
  const location = useLocation()
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [canInstall, setCanInstall] = useState(false)
  const tr = t[language]

  const toggleLang = () => setLanguage((l) => (l === 'fr' ? 'en' : 'fr'))

  useEffect(() => {
    const onBeforeInstallPrompt = (event) => {
      event.preventDefault()
      setDeferredPrompt(event)
      setCanInstall(true)
    }
    const onAppInstalled = () => {
      setDeferredPrompt(null)
      setCanInstall(false)
    }
    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt)
    window.addEventListener('appinstalled', onAppInstalled)
    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt)
      window.removeEventListener('appinstalled', onAppInstalled)
    }
  }, [])

  const installApp = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    await deferredPrompt.userChoice
    setDeferredPrompt(null)
    setCanInstall(false)
  }

  useEffect(() => {
    document.documentElement.lang = language

    const rawPath = location.pathname || '/'
    const cleanPath = rawPath === '/' ? '/' : rawPath.replace(/\/+$/, '')
    const canonicalPath = cleanPath === '/' ? '/' : cleanPath
    const canonicalUrl = `${SITE_URL}${canonicalPath}`

    const isHiddenPage = cleanPath.startsWith('/admin') || cleanPath.startsWith('/page_secrete')
    let pageTitle = 'Portfolio | Actuariat & Finance'
    let pageDescription = language === 'fr'
      ? 'Portfolio professionnel pour un profil actuariat, risk management et data science.'
      : 'Professional portfolio focused on actuarial science, risk management and data science.'
    let ogType = 'website'
    let structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Votre Nom',
      jobTitle: language === 'fr' ? 'Actuaire et Data Scientist' : 'Actuary and Data Scientist',
      url: `${SITE_URL}/`,
    }

    if (cleanPath === '/') {
      pageTitle = `${tr.heroTitle} | ${tr.badge}`
      pageDescription = tr.heroText
    } else if (cleanPath === '/portfolio') {
      pageTitle = `${tr.portfolioTitle} | Portfolio`
      pageDescription = language === 'fr'
        ? 'Découvrez une sélection de projets en actuariat, risk management et data science.'
        : 'Explore selected projects in actuarial science, risk management and data science.'
    } else if (cleanPath.startsWith('/portfolio/')) {
      const slug = decodeURIComponent(cleanPath.replace('/portfolio/', ''))
      const project = getProjectBySlug(slug)
      if (project) {
        const title = project.title?.[language] ?? project.title
        const summary = project.summary?.[language] ?? project.summary
        pageTitle = `${title} | Portfolio`
        pageDescription = summary
        ogType = 'article'
        structuredData = {
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          headline: title,
          description: summary,
          datePublished: project.date,
          url: canonicalUrl,
        }
      }
    } else if (cleanPath === '/blog') {
      pageTitle = `${tr.blogTitle} | Blog`
      pageDescription = language === 'fr'
        ? 'Articles, analyses et retours d’expérience en actuariat et finance quantitative.'
        : 'Articles, analyses and field insights on actuarial science and quantitative finance.'
    } else if (cleanPath.startsWith('/blog/')) {
      const slug = decodeURIComponent(cleanPath.replace('/blog/', ''))
      const post = getPostBySlug(slug)
      if (post) {
        const title = post.title?.[language] ?? post.title
        const excerpt = post.excerpt?.[language] ?? post.excerpt
        pageTitle = `${title} | Blog`
        pageDescription = excerpt
        ogType = 'article'
        structuredData = {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: title,
          description: excerpt,
          datePublished: post.date,
          author: {
            '@type': 'Person',
            name: 'Votre Nom',
          },
          url: canonicalUrl,
        }
      }
    } else if (cleanPath === '/contact') {
      pageTitle = `${tr.contactTitle} | Contact`
      pageDescription = tr.contactText
    }

    document.title = pageTitle
    setMetaTag('name', 'description', pageDescription)
    setMetaTag('name', 'robots', isHiddenPage ? 'noindex, nofollow' : 'index, follow')
    setMetaTag('property', 'og:type', ogType)
    setMetaTag('property', 'og:title', pageTitle)
    setMetaTag('property', 'og:description', pageDescription)
    setMetaTag('property', 'og:url', canonicalUrl)
    setMetaTag('property', 'og:image', `${SITE_URL}/favicon.svg`)
    setMetaTag('name', 'twitter:card', 'summary_large_image')
    setMetaTag('name', 'twitter:title', pageTitle)
    setMetaTag('name', 'twitter:description', pageDescription)
    setMetaTag('name', 'twitter:image', `${SITE_URL}/favicon.svg`)

    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', canonicalUrl)

    let schema = document.head.querySelector('#dynamic-schema')
    if (!schema) {
      schema = document.createElement('script')
      schema.setAttribute('type', 'application/ld+json')
      schema.setAttribute('id', 'dynamic-schema')
      document.head.appendChild(schema)
    }
    schema.textContent = JSON.stringify(structuredData)
  }, [language, location.pathname, tr.badge, tr.blogTitle, tr.contactText, tr.contactTitle, tr.heroText, tr.heroTitle, tr.portfolioTitle])

  useEffect(() => {
    const cleanPath = (location.pathname || '/').replace(/\/+$/, '') || '/'
    const isHiddenPage = cleanPath.startsWith('/admin') || cleanPath.startsWith('/page_secrete')
    if (isHiddenPage || typeof window.plausible !== 'function') return
    const pageUrl = `${SITE_URL}${cleanPath}${location.search || ''}`
    window.plausible('pageview', { u: pageUrl })
  }, [location.pathname, location.search])

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-white focus:border focus:border-zinc-300 focus:rounded-md focus:px-3 focus:py-2 focus:text-sm"
      >
        Aller au contenu / Skip to content
      </a>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-zinc-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <span className="w-7 h-7 rounded bg-zinc-900 text-white text-xs font-bold flex items-center justify-center">
              VN
            </span>
            <span className="text-sm font-semibold text-zinc-900">Votre Nom</span>
          </Link>

          {/* Nav */}
          <nav aria-label="Navigation principale" className="hidden md:flex items-center gap-1 ml-2">
            {navItems.map(({ labelFr, labelEn, to }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `text-sm px-3 py-1.5 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-zinc-100 text-zinc-900 font-medium'
                      : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'
                  }`
                }
              >
                {language === 'fr' ? labelFr : labelEn}
              </NavLink>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            {canInstall && (
              <button
                onClick={installApp}
                aria-label={tr.pwaInstall}
                className="hidden sm:inline-flex text-xs font-medium border border-zinc-200 rounded-lg px-3 py-1.5 text-zinc-500 hover:bg-zinc-50 transition-colors"
              >
                {tr.pwaInstall}
              </button>
            )}
            {/* Language toggle */}
            <button
              onClick={toggleLang}
              aria-label={tr.langToggle}
              className="text-xs font-medium border border-zinc-200 rounded-lg px-3 py-1.5 text-zinc-500 hover:bg-zinc-50 transition-colors"
            >
              {tr.langToggle}
            </button>
            {/* CTA */}
            <Link
              to="/contact"
              className="hidden sm:inline-flex bg-zinc-900 text-white text-sm font-medium rounded-lg px-4 py-1.5 hover:bg-zinc-700 transition-colors"
            >
              {tr.ctaContact}
            </Link>
          </div>
        </div>
      </header>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<HomePage tr={tr} language={language} />} />
        <Route path="/portfolio" element={<PortfolioPage tr={tr} language={language} />} />
        <Route path="/portfolio/:slug" element={<ProjectDetailPage tr={tr} language={language} />} />
        <Route path="/blog" element={<BlogPage tr={tr} language={language} />} />
        <Route path="/blog/:slug" element={<PostDetailPage tr={tr} language={language} />} />
        <Route path="/contact" element={<ContactPage tr={tr} />} />
        <Route path="/page_secrete" element={<SecretTestimonialPage tr={tr} language={language} />} />
        <Route path="/admin" element={<AdminPage tr={tr} language={language} />} />
        <Route path="*" element={<NotFoundPage tr={tr} />} />
      </Routes>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-white mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-400">© {new Date().getFullYear()} Votre Nom</p>
          <div className="flex items-center gap-4">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-zinc-400 hover:text-zinc-800 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-zinc-400 hover:text-zinc-800 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://kaggle.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-zinc-400 hover:text-zinc-800 transition-colors"
            >
              Kaggle
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}
