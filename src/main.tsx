import './index.css'

// Let the prerendered HTML paint first, then load the app and hydrate it.
// Keeping this entry tiny means the first paint never waits for the app bundle.
requestAnimationFrame(() => {
  setTimeout(() => {
    void import('./bootstrap')
  }, 0)
})
