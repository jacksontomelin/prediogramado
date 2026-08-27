// =============================================
// AIRE GRAMADO ZAGONEL — Voucher App v2.0
// Condomínio F — Jackson Tomelin
// =============================================

const VOUCHER_URL = 'https://www.condominioautonomo.com.br/CartaoVisitante/Voucher?code=14869370-926c-455a-a47b-7b3863a11bf0&type=8';

// --- Mapeamento de categorias + ícones ---
const DOOR_CATEGORIES = {
  escada:    { icon: '🪜', cat: 'cat-escada',    label: 'Escada'    },
  elevador:  { icon: '🛗', cat: 'cat-elevador',  label: 'Elevador'  },
  hall:      { icon: '🏛️', cat: 'cat-hall',      label: 'Hall'      },
  piscina:   { icon: '🏊', cat: 'cat-lazer',     label: 'Piscina'   },
  academia:  { icon: '🏋️', cat: 'cat-lazer',     label: 'Academia'  },
  jogos:     { icon: '🎮', cat: 'cat-lazer',     label: 'Jogos'     },
  brinquedo: { icon: '🧸', cat: 'cat-lazer',     label: 'Brinquedo' },
  portaria:  { icon: '🚗', cat: 'cat-portaria',  label: 'Portaria'  },
  visitante: { icon: '🙋', cat: 'cat-visitante', label: 'Visitante' },
  morador:   { icon: '🏠', cat: 'cat-morador',   label: 'Morador'   },
  garagem:   { icon: '🅿️', cat: 'cat-garagem',   label: 'Garagem'   },
  veiculos:  { icon: '🚗', cat: 'cat-portaria',  label: 'Veículos'  },
};

// --- Dados raspados (scrapeados) do HTML do voucher ---
const DOORS_RAW = [
  'C - S1 - Escadaria',
  'C - Hall do Térreo',
  'C - S2 - Escadaria',
  '2 - Academia',
  'B - S1 - Escada',
  'C - S1 - Elevador',
  '3 - Piscina',
  '5 - Sala de Jogos',
  'B - S2 - Escada',
  'B - Porta do Hall',
  'C - S2 - Elevador',
  '4 - Brinquedoteca',
  'D - Elevador',
  'E - Elevador',
  'Visitante - Eclusa interna',
  'E - Escada Garagem',
  'F - Escada da garagem',
  'Morador - Eclusa externa',
  'Morador - Eclusa interna',
  'G - Escadaria Garagem',
  'G - Elevador',
  'E - Hall do Térreo',
  'D - Escada da Garagem',
  '0 - Veículos - Portaria Rua Nelson Dinnebier',
  '1 - Veículos - Portaria da Rua Sete de Setembro',
  'D - Hall do Térreo',
  'F - Hall do Térreo',
  'Visitante - Eclusa externa',
  'G - Hall do Térreo',
  'F - Elevador',
];

// --- Classifica a porta ---
function classifyDoor(name) {
  const n = name.toLowerCase();
  if (n.includes('piscina'))    return DOOR_CATEGORIES.piscina;
  if (n.includes('academia'))   return DOOR_CATEGORIES.academia;
  if (n.includes('jogo'))       return DOOR_CATEGORIES.jogos;
  if (n.includes('brinquedo'))  return DOOR_CATEGORIES.brinquedo;
  if (n.includes('visitante'))  return DOOR_CATEGORIES.visitante;
  if (n.includes('morador'))    return DOOR_CATEGORIES.morador;
  if (n.includes('veículo') || n.includes('veiculo')) return DOOR_CATEGORIES.veiculos;
  if (n.includes('portaria'))   return DOOR_CATEGORIES.portaria;
  if (n.includes('garagem'))    return DOOR_CATEGORIES.garagem;
  if (n.includes('elevador'))   return DOOR_CATEGORIES.elevador;
  if (n.includes('escada') || n.includes('escadaria')) return DOOR_CATEGORIES.escada;
  if (n.includes('hall') || n.includes('térreo'))      return DOOR_CATEGORIES.hall;
  return { icon: '🚪', cat: 'cat-acesso', label: 'Acesso' };
}

// --- Formata o label curto (bloco + tipo) ---
function formatLabel(name) {
  // Ex: "C - S1 - Escadaria" → bloco "C", sub "S1 · Escadaria"
  const parts = name.split(' - ').map(s => s.trim());
  if (parts.length === 3) {
    return { main: parts[2], sub: `Bloco ${parts[0]} · ${parts[1]}` };
  }
  if (parts.length === 2) {
    return { main: parts[1], sub: `Bloco ${parts[0]}` };
  }
  // Numerado: "2 - Academia"
  const numMatch = name.match(/^(\d+)\s*-\s*(.+)/);
  if (numMatch) {
    return { main: numMatch[2], sub: `#${numMatch[1]}` };
  }
  return { main: name, sub: '' };
}

// --- Gera o grid de bolinhas ---
function renderDoors() {
  const grid = document.getElementById('doorsGrid');
  grid.innerHTML = '';

  DOORS_RAW.forEach((rawName, idx) => {
    const cat  = classifyDoor(rawName);
    const lbl  = formatLabel(rawName);

    const btn  = document.createElement('button');
    btn.className = `door-btn ${cat.cat}`;
    btn.setAttribute('aria-label', rawName);
    btn.style.animationDelay = `${idx * 0.04}s`;

    btn.innerHTML = `
      <div class="door-icon">${cat.icon}</div>
      <div class="door-label">${lbl.main}</div>
      ${lbl.sub ? `<div class="door-sub">${lbl.sub}</div>` : ''}
    `;

    btn.addEventListener('click', (e) => {
      // Efeito ripple
      const ripple = document.createElement('div');
      ripple.className = 'ripple-circle';
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);

      openPopup(rawName, cat.icon);
    });

    // Entrada com fade-in
    btn.style.opacity = '0';
    btn.style.transform = 'scale(0.6)';
    grid.appendChild(btn);

    setTimeout(() => {
      btn.style.transition = 'opacity 0.35s ease, transform 0.35s cubic-bezier(0.34,1.56,0.64,1)';
      btn.style.opacity = '1';
      btn.style.transform = 'scale(1)';
    }, 60 + idx * 40);
  });
}

// --- Validade ---
function renderValidity() {
  const start = new Date('2026-08-26T15:00:00-03:00');
  const end   = new Date('2026-09-02T11:15:00-03:00');
  const now   = new Date();

  const chip = document.getElementById('validityChip');
  const txt  = document.getElementById('validityText');
  const dot  = chip.querySelector('.chip-dot');

  if (now < start) {
    const diff = Math.ceil((start - now) / 86400000);
    txt.textContent = `Inicia em ${diff}d`;
    dot.style.background = '#e0c84b';
    dot.classList.remove('pulse');
  } else if (now > end) {
    txt.textContent = 'Expirado';
    dot.style.background = '#c0392b';
    dot.classList.remove('pulse');
    chip.style.borderColor = 'rgba(192,57,43,0.5)';
  } else {
    const remaining = Math.ceil((end - now) / 86400000);
    txt.textContent = `Válido · ${remaining}d restantes`;
    dot.style.background = '#4cde8a';
  }
}

// --- Popup de confirmação ---
let currentDoor = '';
function openPopup(name, icon) {
  currentDoor = name;
  document.getElementById('popupIcon').textContent = icon;
  document.getElementById('popupDoorName').textContent = name;
  document.getElementById('popupOverlay').classList.add('active');
  // Haptic feedback (mobile)
  if (navigator.vibrate) navigator.vibrate(30);
}

function closePopup() {
  document.getElementById('popupOverlay').classList.remove('active');
}

function confirmOpen() {
  closePopup();

  // Simula a abertura via API (POST para o sistema real)
  simulateOpen(currentDoor);

  // Popup de sucesso
  document.getElementById('successDoorName').textContent = currentDoor;
  document.getElementById('popupIcon').textContent = '✅';
  const overlay = document.getElementById('successOverlay');
  overlay.classList.add('active');

  // Barra de progresso
  setTimeout(() => {
    const bar = document.getElementById('progressBar');
    bar.style.width = '100%';
  }, 100);

  // Fecha automaticamente após 3.5s
  setTimeout(() => {
    closeSuccess();
  }, 3600);

  if (navigator.vibrate) navigator.vibrate([50, 30, 50]);
}

function closeSuccess() {
  const overlay = document.getElementById('successOverlay');
  overlay.classList.remove('active');
  // Reset progress bar
  setTimeout(() => {
    document.getElementById('progressBar').style.transition = 'none';
    document.getElementById('progressBar').style.width = '0%';
    setTimeout(() => {
      document.getElementById('progressBar').style.transition = 'width 3s linear';
    }, 50);
  }, 300);
}

// --- Simulação de abertura (integração futura com API real) ---
function simulateOpen(doorName) {
  console.log(`[Voucher] Abrindo: ${doorName}`);
  // Aqui pode chamar a API real:
  // fetch(VOUCHER_URL, { method: 'POST', body: JSON.stringify({ door: doorName }) })
  //   .then(r => r.json()).then(console.log).catch(console.error);
}

// --- Fecha popup ao clicar fora ---
document.getElementById('popupOverlay').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) closePopup();
});
document.getElementById('successOverlay').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) closeSuccess();
});

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
  renderValidity();
  renderDoors();

  // Atualiza validade a cada minuto
  setInterval(renderValidity, 60_000);

  // Neve animada extra (randomiza velocidade)
  document.querySelectorAll('.snowflake').forEach(el => {
    const dur = 6 + Math.random() * 8;
    el.style.animationDuration = dur + 's';
  });
});
