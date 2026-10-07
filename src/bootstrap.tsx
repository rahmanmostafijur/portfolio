import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'

const container = document.getElementById('root')!
const app = (
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)

// Pages written by scripts/prerender.mjs are hydrated. Any other URL (served the home page
// HTML through the SPA rewrite) is rendered fresh so the markup never mismatches the route.
if (container.dataset.prerendered === window.location.pathname) {
  ReactDOM.hydrateRoot(container, app)
} else {
  container.textContent = ''
  ReactDOM.createRoot(container).render(app)
}
