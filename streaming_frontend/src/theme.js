//
// Theme configuration and CSS variables helper
//

// PUBLIC_INTERFACE
export const theme = {
  colors: {
    primary: '#191970',   // Midnight Blue
    secondary: '#FFFFFF', // White
    accent: '#FF7F50',    // Coral
    text: '#1F2937',      // Gray-800
    textMuted: '#6B7280', // Gray-500
    bg: '#F9FAFB',        // Gray-50
    card: '#FFFFFF',
    border: '#E5E7EB',
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444'
  },
  shadows: {
    sm: '0 1px 2px rgba(0,0,0,0.06)',
    md: '0 4px 6px rgba(0,0,0,0.08)',
    lg: '0 10px 15px rgba(0,0,0,0.1)'
  },
  radius: {
    sm: '6px',
    md: '10px',
    lg: '14px',
    xl: '18px'
  },
  spacing(px) {
    return `${px}px`;
  }
};

// PUBLIC_INTERFACE
export function injectThemeCSS() {
  const root = document.documentElement;
  const c = theme.colors;
  root.style.setProperty('--color-primary', c.primary);
  root.style.setProperty('--color-secondary', c.secondary);
  root.style.setProperty('--color-accent', c.accent);
  root.style.setProperty('--color-text', c.text);
  root.style.setProperty('--color-text-muted', c.textMuted);
  root.style.setProperty('--color-bg', c.bg);
  root.style.setProperty('--color-card', c.card);
  root.style.setProperty('--color-border', c.border);
  root.style.setProperty('--shadow-sm', theme.shadows.sm);
  root.style.setProperty('--shadow-md', theme.shadows.md);
  root.style.setProperty('--shadow-lg', theme.shadows.lg);
  root.style.setProperty('--radius-sm', theme.radius.sm);
  root.style.setProperty('--radius-md', theme.radius.md);
  root.style.setProperty('--radius-lg', theme.radius.lg);
  root.style.setProperty('--radius-xl', theme.radius.xl);
}
