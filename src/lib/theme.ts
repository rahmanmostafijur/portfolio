/** localStorage key for the theme choice. Keep in sync with the inline script in index.html. */
export const THEME_STORAGE_KEY = 'theme-v2';

export function saveTheme(isDark: boolean): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, isDark ? 'dark' : 'light');
  } catch {
    // Storage can be unavailable (private mode, blocked site data); the toggle still works for this visit.
  }
}
