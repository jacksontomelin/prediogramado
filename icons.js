// ============================================================
// ICONS — SVG inline customizados por categoria
// Estilo: Duotone (camada base 20% opacity + contorno bold)
// ============================================================

const ICONS = {

  escada: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="30" width="12" height="12" rx="1" fill="currentColor" opacity="0.2"/>
    <rect x="18" y="18" width="12" height="12" rx="1" fill="currentColor" opacity="0.2"/>
    <rect x="30" y="6" width="12" height="12" rx="1" fill="currentColor" opacity="0.2"/>
    <path d="M6 42 H18 V30 H30 V18 H42 V6" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M6 30 H18" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
    <path d="M18 18 H30" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
  </svg>`,

  elevador: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="6" width="32" height="36" rx="4" fill="currentColor" opacity="0.15"/>
    <rect x="8" y="6" width="32" height="36" rx="4" stroke="currentColor" stroke-width="2.5"/>
    <line x1="24" y1="6" x2="24" y2="42" stroke="currentColor" stroke-width="2"/>
    <path d="M16 20 L20 15 L24 20" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M24 28 L28 33 L32 28" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  hall: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 42 L6 18 L24 8 L42 18 L42 42 Z" fill="currentColor" opacity="0.15"/>
    <path d="M6 42 L6 18 L24 8 L42 18 L42 42 Z" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/>
    <rect x="19" y="28" width="10" height="14" rx="1" fill="currentColor" opacity="0.3"/>
    <rect x="19" y="28" width="10" height="14" rx="1" stroke="currentColor" stroke-width="2"/>
    <circle cx="27" cy="35" r="1.2" fill="currentColor"/>
  </svg>`,

  piscina: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="24" cy="26" rx="16" ry="10" fill="currentColor" opacity="0.15"/>
    <path d="M8 30 Q12 26 16 30 Q20 34 24 30 Q28 26 32 30 Q36 34 40 30" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" fill="none"/>
    <path d="M8 36 Q12 32 16 36 Q20 40 24 36 Q28 32 32 36 Q36 40 40 36" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" fill="none"/>
    <circle cx="18" cy="14" r="4" fill="currentColor" opacity="0.25"/>
    <circle cx="18" cy="14" r="4" stroke="currentColor" stroke-width="2.5"/>
    <line x1="18" y1="18" x2="18" y2="26" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="14" y1="22" x2="22" y2="22" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`,

  academia: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="20" width="8" height="8" rx="2" fill="currentColor" opacity="0.25"/>
    <rect x="36" y="20" width="8" height="8" rx="2" fill="currentColor" opacity="0.25"/>
    <rect x="4" y="20" width="8" height="8" rx="2" stroke="currentColor" stroke-width="2"/>
    <rect x="36" y="20" width="8" height="8" rx="2" stroke="currentColor" stroke-width="2"/>
    <rect x="13" y="16" width="6" height="16" rx="2" fill="currentColor" opacity="0.4"/>
    <rect x="29" y="16" width="6" height="16" rx="2" fill="currentColor" opacity="0.4"/>
    <rect x="13" y="16" width="6" height="16" rx="2" stroke="currentColor" stroke-width="2"/>
    <rect x="29" y="16" width="6" height="16" rx="2" stroke="currentColor" stroke-width="2"/>
    <line x1="19" y1="24" x2="29" y2="24" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
  </svg>`,

  jogos: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="14" width="36" height="24" rx="8" fill="currentColor" opacity="0.15"/>
    <rect x="6" y="14" width="36" height="24" rx="8" stroke="currentColor" stroke-width="2.5"/>
    <line x1="18" y1="22" x2="18" y2="30" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="14" y1="26" x2="22" y2="26" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="32" cy="23" r="2" fill="currentColor"/>
    <circle cx="38" cy="26" r="2" fill="currentColor"/>
    <circle cx="32" cy="29" r="2" fill="currentColor"/>
    <circle cx="26" cy="26" r="2" fill="currentColor"/>
  </svg>`,

  brinquedo: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="28" r="14" fill="currentColor" opacity="0.15"/>
    <circle cx="24" cy="28" r="14" stroke="currentColor" stroke-width="2.5"/>
    <path d="M17 28 Q20 22 24 28 Q28 34 31 28" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" fill="none"/>
    <path d="M20 10 L24 6 L28 10" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <line x1="24" y1="6" x2="24" y2="14" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`,

  portaria: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="20" width="40" height="18" rx="3" fill="currentColor" opacity="0.15"/>
    <rect x="4" y="20" width="40" height="18" rx="3" stroke="currentColor" stroke-width="2.5"/>
    <path d="M4 24 Q24 14 44 24" stroke="currentColor" stroke-width="2" fill="none" opacity="0.5"/>
    <circle cx="12" cy="29" r="3" fill="currentColor" opacity="0.3"/>
    <circle cx="12" cy="29" r="3" stroke="currentColor" stroke-width="2"/>
    <circle cx="36" cy="29" r="3" fill="currentColor" opacity="0.3"/>
    <circle cx="36" cy="29" r="3" stroke="currentColor" stroke-width="2"/>
    <rect x="20" y="24" width="8" height="14" rx="1" fill="currentColor" opacity="0.2"/>
    <line x1="8" y1="38" x2="8" y2="42" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="40" y1="38" x2="40" y2="42" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`,

  visitante: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="16" r="8" fill="currentColor" opacity="0.2"/>
    <circle cx="24" cy="16" r="8" stroke="currentColor" stroke-width="2.5"/>
    <path d="M8 42 C8 32 40 32 40 42" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" fill="none"/>
    <path d="M8 42 C8 32 40 32 40 42" fill="currentColor" opacity="0.15"/>
    <circle cx="36" cy="30" r="6" fill="#fff" stroke="currentColor" stroke-width="2"/>
    <path d="M33 30 L35 32 L39 28" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  // Ícones para a UI geral
  home: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 10.5L12 4L21 10.5V20C21 20.6 20.6 21 20 21H15V16H9V21H4C3.4 21 3 20.6 3 20V10.5Z" fill="currentColor" opacity="0.2" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
  </svg>`,

  map: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 3L3 6V21L9 18L15 21L21 18V3L15 6L9 3Z" fill="currentColor" opacity="0.2" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
    <line x1="9" y1="3" x2="9" y2="18" stroke="currentColor" stroke-width="1.8"/>
    <line x1="15" y1="6" x2="15" y2="21" stroke="currentColor" stroke-width="1.8"/>
  </svg>`,

  info: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" fill="currentColor" opacity="0.15" stroke="currentColor" stroke-width="1.8"/>
    <line x1="12" y1="11" x2="12" y2="17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <circle cx="12" cy="7.5" r="1" fill="currentColor"/>
  </svg>`,

  bell: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3C8.7 3 6 5.7 6 9V15L4 17H20L18 15V9C18 5.7 15.3 3 12 3Z" fill="currentColor" opacity="0.2" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M10 17C10 18.1 10.9 19 12 19C13.1 19 14 18.1 14 17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
  </svg>`,

  check: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" fill="currentColor" opacity="0.15" stroke="currentColor" stroke-width="1.8"/>
    <path d="M8 12L11 15L16 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  location: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C8.1 2 5 5.1 5 9C5 14.3 12 22 12 22C12 22 19 14.3 19 9C19 5.1 15.9 2 12 2Z" fill="currentColor" opacity="0.2" stroke="currentColor" stroke-width="1.8"/>
    <circle cx="12" cy="9" r="3" fill="currentColor" opacity="0.5" stroke="currentColor" stroke-width="1.5"/>
  </svg>`,

  clock: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" fill="currentColor" opacity="0.15" stroke="currentColor" stroke-width="1.8"/>
    <path d="M12 7V12L15 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  unlock: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="11" width="14" height="10" rx="2" fill="currentColor" opacity="0.2" stroke="currentColor" stroke-width="1.8"/>
    <path d="M8 11V7C8 4.8 9.8 3 12 3C14 3 15.6 4.4 15.9 6.3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    <circle cx="12" cy="16" r="1.5" fill="currentColor"/>
  </svg>`,

  mountain: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 20L9 8L13 14L16 10L22 20H2Z" fill="currentColor" opacity="0.2" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M15 6L17 8L19 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.6"/>
  </svg>`,
};

window.ICONS = ICONS;
