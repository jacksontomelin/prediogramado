// ============================================================
// AIRE GRAMADO ZAGONEL — App v5.0 — SVG Duotone Icons
// Jackson Tomelin · UniController
// ============================================================

const PORTAS = {
  F: [
    { id:'f-escada',   name:'F - Escada da Garagem', label:'Escada',   sub:'Garagem',  iconKey:'escada',   tipo:'Escada',   grupo:'F',        color:'#4a7c5f' },
    { id:'f-hall',     name:'F - Hall do Térreo',    label:'Hall',     sub:'Térreo',   iconKey:'hall',     tipo:'Hall',     grupo:'F',        color:'#4a9e6b' },
    { id:'f-elevador', name:'F - Elevador',           label:'Elevador', sub:'Bloco F',  iconKey:'elevador', tipo:'Elevador', grupo:'F',        color:'#c8a84b' },
  ],
  LAZER: [
    { id:'piscina',  name:'Piscina',        label:'Piscina',   sub:'Lazer',  iconKey:'piscina',  tipo:'Lazer', grupo:'LAZER', color:'#3e8bbf' },
    { id:'academia', name:'Academia',       label:'Academia',  sub:'Lazer',  iconKey:'academia', tipo:'Lazer', grupo:'LAZER', color:'#8b4dc2' },
    { id:'jogos',    name:'Sala de Jogos',  label:'Jogos',     sub:'Lazer',  iconKey:'jogos',    tipo:'Lazer', grupo:'LAZER', color:'#d4694a' },
    { id:'brinquedo',name:'Brinquedoteca', label:'Brinquedos',sub:'Lazer',  iconKey:'brinquedo',tipo:'Lazer', grupo:'LAZER', color:'#c26b8b' },
  ],
  PORTARIA: [
    { id:'p0', name:'Portaria Rua Nelson Dinnebier', label:'Portaria',sub:'Rua Nelson',iconKey:'portaria',tipo:'Portaria',grupo:'PORTARIA',color:'#8b2c2c' },
    { id:'p1', name:'Portaria Rua Sete de Setembro', label:'Portaria',sub:'Rua 7 Set.',iconKey:'portaria',tipo:'Portaria',grupo:'PORTARIA',color:'#8b2c2c' },
  ],
  VISITANTE: [
    { id:'ve', name:'Visitante - Eclusa Externa', label:'Eclusa', sub:'Externa', iconKey:'visitante', tipo:'Eclusa', grupo:'VISITANTE', color:'#e06b1e' },
    { id:'vi', name:'Visitante - Eclusa Interna', label:'Eclusa', sub:'Interna', iconKey:'visitante', tipo:'Eclusa', grupo:'VISITANTE', color:'#e06b1e' },
  ],
};

const TABS = [
  { id:'F',         label:'Bloco F',  iconKey:'hall'     },
  { id:'LAZER',     label:'Lazer',    iconKey:'piscina'  },
  { id:'PORTARIA',  label:'Portaria', iconKey:'portaria' },
  { id:'VISITANTE', label:'Visitante',iconKey:'visitante'},
];

let currentDoor = null;
let openTimerInterval = null;

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
  const iv = setInterval(() => { pct += Math.random()*20; if(pct>=100){pct=100;clearInterval(iv);} bar.style.width=pct+'%'; }, 120);
  setTimeout(() => {
    document.getElementById('splash').classList.add('hide');
    document.getElementById('appMain').style.display = 'block';
    renderTabs();
    setTab('F');
    renderHistory();
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
  const pct   = Math.max(0, Math.min(100, ((now-start)/(end-start))*100));
  document.getElementById('vcProgress').style.width = pct + '%';
  const diff = end - now;
  if (diff > 0) {
    const d = Math.floor(diff/86400000), h = Math.floor((diff%86400000)/3600000);
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
    const svg = window.ICONS[t.iconKey] || '';
    btn.innerHTML = `<span class="tab-icon-svg">${svg}</span><span class="tab-label">${t.label}</span>`;
    btn.onclick = () => setTab(t.id);
    wrap.appendChild(btn);
  });
}

function setTab(id) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  const ab = document.getElementById('tab-' + id);
  if (ab) ab.classList.add('active');
  const t = TABS.find(x => x.id === id);
  const portas = PORTAS[id] || [];
  const svg = window.ICONS[t.iconKey] || '';
  document.getElementById('shIconSvg').innerHTML = svg;
  document.getElementById('shTitle').textContent = t.label;
  document.getElementById('shSub').textContent = `${portas.length} ${portas.length===1?'acesso':'acessos'} liberados`;
  document.getElementById('shBadge').textContent = id === 'F' ? 'SEU BLOCO' : '';
  renderDoors(portas);
}

// ===== DOORS =====
function renderDoors(portas) {
  const grid = document.getElementById('doorsGrid');
  grid.innerHTML = '';
  portas.forEach((door, idx) => {
    const btn = document.createElement('button');
    btn.className = 'door-btn';
    btn.setAttribute('aria-label', `Abrir ${door.name}`);
    const svg = window.ICONS[door.iconKey] || '';
    btn.innerHTML = `
      <div class="door-circle" style="--door-color:${door.color}">
        <div class="door-badge"></div>
        <div class="door-svg-wrap">${svg}</div>
        <div class="door-label">${door.label}</div>
        <div class="door-sub-label">${door.sub}</div>
      </div>
    `;
    btn.style.opacity = '0';
    btn.style.transform = 'scale(0.4) translateY(16px)';
    btn.addEventListener('click', () => {
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
  const svg = window.ICONS[door.iconKey] || '';
  document.getElementById('modalIconSvg').innerHTML = svg;
  document.getElementById('modalIconSvg').style.color = door.color;
  document.getElementById('modalDoor').textContent = door.name;
  document.getElementById('miBloco').textContent = door.grupo;
  document.getElementById('miTipo').textContent = door.tipo;
  document.getElementById('modalOverlay').classList.add('active');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('active');
  currentDoor = null;
}

// ===== CONFIG BACKEND =====
// URL do endpoint que efetivamente abre a porta.
// Preencha com o endpoint real do sistema condominioautonomo.com.br.
// Ex.: 'https://www.condominioautonomo.com.br/CartaoVisitante/AbrirPorta'
const BACKEND_URL = '';           // <<< coloque a URL do backend aqui
const VOUCHER_CODE = '14869370-926c-455a-a47b-7b3863a11bf0';

async function abrirPortaBackend(door) {
  // Se não houver backend configurado, apenas simula (modo demo)
  if (!BACKEND_URL) {
    console.log('[demo] abertura simulada:', door.name);
    return { ok: true, demo: true };
  }
  try {
    const resp = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: VOUCHER_CODE, porta: door.id, nome: door.name }),
    });
    return { ok: resp.ok, status: resp.status };
  } catch (e) {
    console.error('[backend] falha ao abrir porta:', e);
    return { ok: false, error: String(e) };
  }
}

function confirmOpen() {
  if (!currentDoor) return;
  const door = currentDoor;
  closeModal();

  const now = new Date();
  const t = now.toLocaleTimeString('pt-BR', { hour:'2-digit', minute:'2-digit' });

  // Mostra sucesso e chama o backend em paralelo
  document.getElementById('successDoorName').textContent = door.name;
  document.getElementById('successTime').textContent = `Liberado às ${t}`;
  const pb = document.getElementById('progressBar');
  pb.style.transition = 'none'; pb.style.width = '0%';
  document.getElementById('successOverlay').classList.add('active');
  setTimeout(() => { pb.style.transition='width 5s linear'; pb.style.width='100%'; }, 60);
  let c = 5;
  document.getElementById('openTimer').textContent = c;
  clearInterval(openTimerInterval);
  openTimerInterval = setInterval(() => {
    c--;
    document.getElementById('openTimer').textContent = c;
    if (c <= 0) { clearInterval(openTimerInterval); closeSuccess(); }
  }, 1000);
  if (navigator.vibrate) navigator.vibrate([60, 40, 60]);

  // Chamada real ao backend — só acontece ao apertar "Abrir"
  abrirPortaBackend(door).then(res => {
    if (res.ok) {
      addHistory(door, t);
      showToast(`Acesso liberado — ${door.label}`);
    } else {
      showToast(`Falha ao abrir — tente novamente`);
    }
  });
}

function closeSuccess() {
  clearInterval(openTimerInterval);
  document.getElementById('successOverlay').classList.remove('active');
}

function addHistory(door, t) {
  saveHistory(door, t);
  renderHistory();
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

function showNotif() {
  document.getElementById('notifOverlay').classList.add('active');
  document.querySelector('.notif-badge').style.display = 'none';
}

function setNav(btn, tab) {
  document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  if (tab === 'map')  showToast('Rua Sete de Setembro, 100 · Gramado/RS');
  if (tab === 'info') showToast('Check-out: 02/09 às 11:15');
}

function attachOverlayListeners() {
  ['modalOverlay','successOverlay','notifOverlay'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('click', e => {
      if (e.target.id === id) {
        if (id === 'modalOverlay') closeModal();
        else if (id === 'successOverlay') closeSuccess();
        else el.classList.remove('active');
      }
    });
  });
}

function boot() {
  attachOverlayListeners();
  initSplash();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}

// ===== PERSISTÊNCIA LOCAL =====
const STORAGE_KEY = 'gramado_historico';

function saveHistory(door, t) {
  const existing = loadHistory();
  existing.unshift({ name: door.name, label: door.label, iconKey: door.iconKey, color: door.color, time: t, date: new Date().toLocaleDateString('pt-BR') });
  // Mantém só os últimos 20
  const trimmed = existing.slice(0, 20);
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed)); } catch(e) {}
}

function loadHistory() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch(e) { return []; }
}

function renderHistory() {
  const items = loadHistory();
  const list = document.getElementById('historyList');
  if (!items.length) {
    list.innerHTML = '<div class="history-empty">Nenhum acesso registrado ainda.</div>';
    return;
  }
  list.innerHTML = '';
  items.forEach(item => {
    const el = document.createElement('div');
    el.className = 'history-item';
    const svg = window.ICONS[item.iconKey] || '';
    el.innerHTML = `
      <div class="hi-icon" style="color:${item.color}">${svg}</div>
      <div>
        <div class="hi-name">${item.name}</div>
        <div class="hi-time">${item.date} às ${item.time}</div>
      </div>
      <div class="hi-check">${window.ICONS.check}</div>
    `;
    list.appendChild(el);
  });
}
