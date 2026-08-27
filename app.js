// ============================================================
// AIRE GRAMADO ZAGONEL — App Completo v4.0
// Jackson Tomelin · UniController
// ============================================================

const TODAS_PORTAS = [
  // BLOCO F — destaque
  { id:'f-escada',   name:'F - Escada da Garagem', label:'Escada',   sub:'Garagem · F',  icon:'🪜', tipo:'Escada',   grupo:'F', cat:'escada'   },
  { id:'f-hall',     name:'F - Hall do Térreo',    label:'Hall',     sub:'Térreo · F',   icon:'🏛️', tipo:'Hall',     grupo:'F', cat:'hall'     },
  { id:'f-elevador', name:'F - Elevador',           label:'Elevador', sub:'Bloco F',      icon:'🛗', tipo:'Elevador', grupo:'F', cat:'elevador' },

  // LAZER
  { id:'piscina',    name:'Piscina',           label:'Piscina',      sub:'Área de Lazer', icon:'🏊', tipo:'Lazer',  grupo:'LAZER', cat:'lazer' },
  { id:'academia',   name:'Academia',          label:'Academia',     sub:'Área de Lazer', icon:'🏋️', tipo:'Lazer',  grupo:'LAZER', cat:'lazer' },
  { id:'jogos',      name:'Sala de Jogos',     label:'Jogos',        sub:'Área de Lazer', icon:'🎮', tipo:'Lazer',  grupo:'LAZER', cat:'lazer' },
  { id:'brinquedo',  name:'Brinquedoteca',     label:'Brinquedos',   sub:'Área de Lazer', icon:'🧸', tipo:'Lazer',  grupo:'LAZER', cat:'lazer' },

  // PORTARIAS / VEÍCULOS
  { id:'portaria0',  name:'Portaria Rua Nelson Dinnebier', label:'Portaria',  sub:'Rua Nelson',   icon:'🚗', tipo:'Portaria', grupo:'PORTARIA', cat:'portaria' },
  { id:'portaria1',  name:'Portaria Rua Sete de Setembro', label:'Portaria',  sub:'Rua 7 Set.',   icon:'🚗', tipo:'Portaria', grupo:'PORTARIA', cat:'portaria' },

  // VISITANTE
  { id:'vis-ext',    name:'Visitante - Eclusa Externa', label:'Eclusa',  sub:'Externa',      icon:'🙋', tipo:'Eclusa',   grupo:'VISITANTE', cat:'visitante' },
  { id:'vis-int',    name:'Visitante - Eclusa Interna', label:'Eclusa',  sub:'Interna',      icon:'🙋', tipo:'Eclusa',   grupo:'VISITANTE', cat:'visitante' },
];

// Abas de navegação entre grupos
const TABS = [
  { id:'F',        label:'Bloco F',   icon:'🏢' },
  { id:'LAZER',    label:'Lazer',     icon:'🏊' },
  { id:'PORTARIA', label:'Portaria',  icon:'🚗' },
  { id:'VISITANTE',label:'Visitante', icon:'🙋' },
];

let currentDoor = null;
let openTimerInterval = null;
let activeTab = 'F';

// ===== SPLASH =====
function initSplash() {
  const snow = document.getElementById('splashSnow');
  for (let i = 0; i < 14; i++) {
    const p = document.createElement('div');
    p.className = 'snow-p';
    p.textContent = ['❄','❅','❆'][i % 3];
    p.style.cssText = `left:${Math.random()*100}%;animation-duration:${5+Math.random()*7}s;animation-delay:${-Math.random()*10}s;font-size:${10+Math.random()*10}px`;
    snow.appendChild(p);
  }
  const bar = document.getElementById('loaderBar');
  let pct = 0;
  const iv = setInterval(() => {
    pct += Math.random() * 20;
    if (pct >= 100) { pct = 100; clearInterval(iv); }
    bar.style.width = pct + '%';
  }, 120);
  setTimeout(() => {
    document.getElementById('splash').classList.add('hide');
    document.getElementById('appMain').style.display = 'block';
    renderTabs();
    setTab('F');
    updateValidity();
    updateClock();
    setInterval(updateClock, 15000);
    setInterval(updateValidity, 60000);
  }, 2100);
}

function updateClock() {
  const n = new Date();
  document.getElementById('clock').textContent =
    String(n.getHours()).padStart(2,'0') + ':' + String(n.getMinutes()).padStart(2,'0');
}

function updateValidity() {
  const start = new Date('2026-08-26T15:00:00-03:00');
  const end   = new Date('2026-09-02T11:15:00-03:00');
  const now   = new Date();
  const pct   = Math.max(0, Math.min(100, ((now - start) / (end - start)) * 100));
  document.getElementById('vcProgress').style.width = pct + '%';
  const diff = end - now;
  if (diff > 0) {
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const txt = d > 0 ? `${d}d ${h}h restantes` : `${h}h restantes`;
    document.getElementById('vcRemaining').textContent = txt;
    document.getElementById('countdown').textContent = txt;
  } else {
    document.getElementById('vcRemaining').textContent = 'Expirado';
    document.getElementById('countdown').textContent = 'Encerrado';
  }
}

// ===== TABS =====
function renderTabs() {
  const wrap = document.getElementById('tabsWrap');
  wrap.innerHTML = '';
  TABS.forEach(t => {
    const btn = document.createElement('button');
    btn.className = 'tab-btn';
    btn.id = 'tab-' + t.id;
    btn.innerHTML = `<span class="tab-icon">${t.icon}</span><span class="tab-label">${t.label}</span>`;
    btn.onclick = () => setTab(t.id);
    wrap.appendChild(btn);
  });
}

function setTab(id) {
  activeTab = id;
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  const activeBtn = document.getElementById('tab-' + id);
  if (activeBtn) activeBtn.classList.add('active');

  const portas = TODAS_PORTAS.filter(p => p.grupo === id);
  const info = TABS.find(t => t.id === id);

  document.getElementById('shIcon').textContent = info.icon;
  document.getElementById('shTitle').textContent = info.label;
  document.getElementById('shSub').textContent = `${portas.length} ${portas.length === 1 ? 'acesso' : 'acessos'} liberados`;
  document.getElementById('shBadge').textContent = id === 'F' ? 'SEU BLOCO' : '';

  renderDoors(portas);
}

// ===== DOORS =====
function renderDoors(portas) {
  const grid = document.getElementById('doorsGrid');
  grid.innerHTML = '';

  portas.forEach((door, idx) => {
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
    btn.style.opacity = '0';
    btn.style.transform = 'scale(0.4) translateY(16px)';
    btn.addEventListener('click', (e) => {
      rippleEffect(btn.querySelector('.door-circle'));
      if (navigator.vibrate) navigator.vibrate(40);
      openModal(door);
    });
    grid.appendChild(btn);
    setTimeout(() => {
      btn.style.transition = 'opacity .35s ease, transform .45s cubic-bezier(.34,1.56,.64,1)';
      btn.style.opacity = '1';
      btn.style.transform = 'scale(1) translateY(0)';
    }, 60 + idx * 100);
  });
}

function rippleEffect(el) {
  const r = document.createElement('div');
  r.className = 'ripple';
  const s = Math.max(el.offsetWidth, el.offsetHeight);
  r.style.cssText = `width:${s}px;height:${s}px;left:${(el.offsetWidth-s)/2}px;top:${(el.offsetHeight-s)/2}px`;
  el.appendChild(r);
  setTimeout(() => r.remove(), 600);
}

// ===== MODAL =====
function openModal(door) {
  currentDoor = door;
  document.getElementById('modalIcon').textContent = door.icon;
  document.getElementById('modalDoor').textContent = door.name;
  document.getElementById('miBloco').textContent = door.grupo;
  document.getElementById('miTipo').textContent = door.tipo;
  document.getElementById('modalOverlay').classList.add('active');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('active');
  currentDoor = null;
}

function confirmOpen() {
  if (!currentDoor) return;
  const door = currentDoor;
  closeModal();
  const now = new Date();
  const t = now.toLocaleTimeString('pt-BR', { hour:'2-digit', minute:'2-digit' });
  addHistory(door, t);
  document.getElementById('successDoor').textContent = door.name;
  document.getElementById('successTime').textContent = `Liberado às ${t}`;
  document.getElementById('progressBar').style.width = '0%';
  document.getElementById('successOverlay').classList.add('active');
  setTimeout(() => {
    document.getElementById('progressBar').style.transition = 'width 5s linear';
    document.getElementById('progressBar').style.width = '100%';
  }, 60);
  let c = 5;
  document.getElementById('openTimer').textContent = c;
  clearInterval(openTimerInterval);
  openTimerInterval = setInterval(() => {
    c--;
    document.getElementById('openTimer').textContent = c;
    if (c <= 0) { clearInterval(openTimerInterval); closeSuccess(); }
  }, 1000);
  if (navigator.vibrate) navigator.vibrate([60, 40, 60]);
  showToast(`✅ ${door.label} aberta!`);
}

function closeSuccess() {
  clearInterval(openTimerInterval);
  document.getElementById('successOverlay').classList.remove('active');
  setTimeout(() => {
    const pb = document.getElementById('progressBar');
    pb.style.transition = 'none'; pb.style.width = '0%';
    setTimeout(() => { pb.style.transition = 'width 5s linear'; }, 50);
  }, 350);
}

function addHistory(door, t) {
  const list = document.getElementById('historyList');
  const empty = list.querySelector('.history-empty');
  if (empty) empty.remove();
  const item = document.createElement('div');
  item.className = 'history-item';
  item.innerHTML = `
    <div class="hi-icon">${door.icon}</div>
    <div><div class="hi-name">${door.name}</div><div class="hi-time">Hoje às ${t}</div></div>
    <div class="hi-check">✅</div>
  `;
  list.prepend(item);
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2600);
}

function showNotif() {
  document.getElementById('notifOverlay').classList.add('active');
  document.querySelector('.notif-badge').style.display = 'none';
}

function setNav(btn, tab) {
  document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  if (tab === 'map')  showToast('📍 Rua Sete de Setembro, 100');
  if (tab === 'info') showToast('📋 Check-out: 02/09 às 11:15');
}

['modalOverlay','successOverlay','notifOverlay'].forEach(id => {
  document.getElementById(id).addEventListener('click', e => {
    if (e.target.id === id) {
      if (id === 'modalOverlay') closeModal();
      else if (id === 'successOverlay') closeSuccess();
      else document.getElementById(id).classList.remove('active');
    }
  });
});

document.addEventListener('DOMContentLoaded', initSplash);
