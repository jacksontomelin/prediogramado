// ============================================================
// AIRE GRAMADO ZAGONEL — Bloco F App v3.0
// Jackson Tomelin · UniController
// ============================================================

// --- Somente portas do Bloco F ---
const BLOCO_F = [
  {
    id: 'f-escada',
    name: 'Escada da Garagem',
    label: 'Escada',
    sub: 'Garagem',
    icon: '🪜',
    tipo: 'Escada',
    cat: 'escada',
  },
  {
    id: 'f-hall',
    name: 'F - Hall do Térreo',
    label: 'Hall',
    sub: 'Térreo',
    icon: '🏛️',
    tipo: 'Hall',
    cat: 'hall',
  },
  {
    id: 'f-elevador',
    name: 'F - Elevador',
    label: 'Elevador',
    sub: 'Bloco F',
    icon: '🛗',
    tipo: 'Elevador',
    cat: 'elevador',
  },
];

// --- Estado global ---
let currentDoor = null;
let openTimerInterval = null;
let historyItems = [];

// ===== SPLASH =====
function initSplash() {
  // Gera flocos de neve
  const snow = document.getElementById('splashSnow');
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.className = 'snow-p';
    p.textContent = ['❄', '❅', '❆'][i % 3];
    p.style.cssText = `
      left:${Math.random()*100}%;
      animation-duration:${5+Math.random()*7}s;
      animation-delay:${-Math.random()*10}s;
      font-size:${10+Math.random()*10}px;
    `;
    snow.appendChild(p);
  }

  // Barra de loading
  const bar = document.getElementById('loaderBar');
  let pct = 0;
  const iv = setInterval(() => {
    pct += Math.random() * 18;
    if (pct >= 100) { pct = 100; clearInterval(iv); }
    bar.style.width = pct + '%';
  }, 120);

  // Revela app
  setTimeout(() => {
    document.getElementById('splash').classList.add('hide');
    document.getElementById('appMain').style.display = 'block';
    renderDoors();
    updateValidity();
    updateClock();
    setInterval(updateClock, 10000);
    setInterval(updateValidity, 60000);
  }, 2200);
}

// ===== CLOCK =====
function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2,'0');
  const m = String(now.getMinutes()).padStart(2,'0');
  document.getElementById('clock').textContent = `${h}:${m}`;
}

// ===== VALIDADE =====
function updateValidity() {
  const start = new Date('2026-08-26T15:00:00-03:00');
  const end   = new Date('2026-09-02T11:15:00-03:00');
  const now   = new Date();

  const total  = end - start;
  const elapsed = now - start;
  const pct    = Math.max(0, Math.min(100, (elapsed / total) * 100));

  document.getElementById('vcProgress').style.width = pct + '%';

  let remaining = '';
  if (now < start) {
    remaining = 'Ainda não iniciou';
    document.getElementById('vcStatusText').textContent = 'Pendente';
    document.getElementById('vcStatus').querySelector('.vc-dot').style.background = '#e6c96d';
  } else if (now > end) {
    remaining = 'Expirado';
    document.getElementById('vcStatusText').textContent = 'Expirado';
    document.getElementById('vcStatus').querySelector('.vc-dot').style.background = '#e05555';
  } else {
    const diffMs = end - now;
    const days   = Math.floor(diffMs / 86400000);
    const hours  = Math.floor((diffMs % 86400000) / 3600000);
    remaining = days > 0 ? `${days}d ${hours}h restantes` : `${hours}h restantes`;
  }

  document.getElementById('vcRemaining').textContent = remaining;

  // Countdown no quick info
  if (now < end && now >= start) {
    const diffMs = end - now;
    const d = Math.floor(diffMs / 86400000);
    const h = Math.floor((diffMs % 86400000) / 3600000);
    document.getElementById('countdown').textContent = `${d}d ${h}h`;
  } else {
    document.getElementById('countdown').textContent = now > end ? 'Encerrado' : 'Aguardando';
  }
}

// ===== RENDER PORTAS (bolinhas Bloco F) =====
function renderDoors() {
  const grid = document.getElementById('doorsGrid');
  grid.innerHTML = '';

  BLOCO_F.forEach((door, idx) => {
    const btn = document.createElement('button');
    btn.className = `door-btn ${door.cat}`;
    btn.setAttribute('aria-label', `Abrir ${door.name}`);

    btn.innerHTML = `
      <div class="door-circle">
        <div class="door-badge"></div>
        <div class="door-icon">${door.icon}</div>
        <div class="door-label">${door.label}</div>
        <div class="door-sub-label">${door.sub}</div>
      </div>
    `;

    // Entrada animada
    btn.style.opacity = '0';
    btn.style.transform = 'scale(0.4) translateY(20px)';

    btn.addEventListener('click', (e) => {
      rippleEffect(btn.querySelector('.door-circle'), e);
      if (navigator.vibrate) navigator.vibrate(40);
      openModal(door);
    });

    grid.appendChild(btn);

    setTimeout(() => {
      btn.style.transition = 'opacity 0.4s ease, transform 0.5s cubic-bezier(.34,1.56,.64,1)';
      btn.style.opacity = '1';
      btn.style.transform = 'scale(1) translateY(0)';
    }, 100 + idx * 120);
  });
}

// ===== RIPPLE =====
function rippleEffect(el, event) {
  const rect = el.getBoundingClientRect();
  const r = Math.max(rect.width, rect.height);
  const d = document.createElement('div');
  d.className = 'ripple';
  d.style.cssText = `
    width:${r}px;height:${r}px;
    left:${(rect.width-r)/2}px;
    top:${(rect.height-r)/2}px;
  `;
  el.appendChild(d);
  setTimeout(() => d.remove(), 600);
}

// ===== MODAL =====
function openModal(door) {
  currentDoor = door;
  document.getElementById('modalIcon').textContent = door.icon;
  document.getElementById('modalTitle').textContent = 'Abrir Acesso';
  document.getElementById('modalDoor').textContent = door.name;
  document.getElementById('miBloco').textContent = 'F';
  document.getElementById('miTipo').textContent = door.tipo;
  document.getElementById('modalOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('active');
  document.body.style.overflow = '';
  currentDoor = null;
}

// ===== CONFIRMAR ABERTURA =====
function confirmOpen() {
  if (!currentDoor) return;

  const door = currentDoor;
  closeModal();

  // Registra no histórico
  const now = new Date();
  const timeStr = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  addHistory(door, timeStr);

  // Mostra sucesso
  document.getElementById('successDoor').textContent = door.name;
  document.getElementById('successTime').textContent = `Aberto às ${timeStr}`;
  document.getElementById('progressBar').style.width = '0%';

  const successOverlay = document.getElementById('successOverlay');
  successOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Barra de progresso
  setTimeout(() => {
    document.getElementById('progressBar').style.width = '100%';
  }, 80);

  // Countdown regressivo
  let count = 5;
  document.getElementById('openTimer').textContent = count;
  clearInterval(openTimerInterval);
  openTimerInterval = setInterval(() => {
    count--;
    document.getElementById('openTimer').textContent = count;
    if (count <= 0) {
      clearInterval(openTimerInterval);
      closeSuccess();
    }
  }, 1000);

  if (navigator.vibrate) navigator.vibrate([60, 40, 60]);

  // Simula chamada API
  console.log(`[Gramado App] Porta aberta: ${door.name} às ${timeStr}`);
}

function closeSuccess() {
  clearInterval(openTimerInterval);
  document.getElementById('successOverlay').classList.remove('active');
  document.body.style.overflow = '';

  // Reset progress bar
  setTimeout(() => {
    const pb = document.getElementById('progressBar');
    pb.style.transition = 'none';
    pb.style.width = '0%';
    setTimeout(() => { pb.style.transition = 'width 5s linear'; }, 50);
  }, 350);
}

// ===== HISTÓRICO =====
function addHistory(door, timeStr) {
  historyItems.unshift({ door, timeStr });

  const list = document.getElementById('historyList');
  const empty = list.querySelector('.history-empty');
  if (empty) empty.remove();

  const item = document.createElement('div');
  item.className = 'history-item';
  item.innerHTML = `
    <div class="hi-icon">${door.icon}</div>
    <div>
      <div class="hi-name">${door.name}</div>
      <div class="hi-time">Hoje às ${timeStr}</div>
    </div>
    <div class="hi-check">✅</div>
  `;
  list.prepend(item);
}

// ===== TOAST =====
function showToast(msg, duration = 2500) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), duration);
}

// ===== NOTIFICAÇÃO =====
function showNotif() {
  document.getElementById('notifOverlay').classList.add('active');
  document.getElementById('notifOverlay').querySelector('.modal').style.borderRadius = '28px 28px 0 0';
  document.body.style.overflow = 'hidden';
  // Remove badge
  document.querySelector('.notif-badge').style.display = 'none';
}

// ===== NAV =====
function setNav(btn, tab) {
  document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  if (tab === 'map') {
    showToast('🗺️ Rua Sete de Setembro, 100 — Gramado/RS');
  } else if (tab === 'info') {
    showToast('ℹ️ Check-out: 02/09 às 11:15');
  }
}

// ===== FECHAR OVERLAY AO CLICAR FORA =====
['modalOverlay', 'successOverlay', 'notifOverlay'].forEach(id => {
  document.getElementById(id).addEventListener('click', (e) => {
    if (e.target.id === id) {
      if (id === 'modalOverlay') closeModal();
      else if (id === 'successOverlay') closeSuccess();
      else {
        document.getElementById(id).classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  });
});

// ===== INIT =====
document.addEventListener('DOMContentLoaded', initSplash);
