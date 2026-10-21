import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

const plausibleDomain = import.meta.env.VITE_PLAUSIBLE_DOMAIN

if (plausibleDomain) {
  window.plausible = window.plausible || function () {
    (window.plausible.q = window.plausible.q || []).push(arguments)
  }
  const script = document.createElement('script')
  script.defer = true
  script.dataset.domain = plausibleDomain
  script.src = 'https://plausible.io/js/script.manual.js'
  document.head.appendChild(script)
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`)
  })
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/portfolio">
      <App />
    </BrowserRouter>
  </StrictMode>,
)
