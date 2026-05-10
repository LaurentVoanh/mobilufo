/* ═══════════════════════════════════════════════════════════
   ALCYON v4.0 — PORTAIL DE BUGARACH — SCRIPT MOBILE-FIRST
   Tous les protocoles API préservés (phase reply + analyze)
═══════════════════════════════════════════════════════════ */

'use strict';

// ── State ──────────────────────────────────────────────────────
let currentMode    = 'canalisation';
let currentPersona = 'sylvain';
let totalMantras   = 0;
let totalPrieres   = 0;
let radarChart     = null;
let isProcessing   = false;
let isLoggedIn     = false;
let allAnalyses    = [];
let sheetOpen      = false;

// ── Mapping personas ──────────────────────────────────────────
const GLOBALS_PERSONAS = {
  sylvain:      { name: 'Sylvain Durif',  short: 'Sylvain' },
  merlin:       { name: 'Merlin',          short: 'Merlin' },
  melchisedech: { name: 'Melchisédech',   short: 'Melchis.' },
  oriana:       { name: 'Oriana',          short: 'Oriana' },
  homme_vert:   { name: "L'Homme Vert",   short: 'H.Vert' },
  vierge_maria: { name: 'Vierge Maria',   short: 'Maria' },
};

// ── DOM refs ───────────────────────────────────────────────────
const msgInput       = document.getElementById('msg-input');
const sendBtn        = document.getElementById('send-btn');
const messagesEl     = document.getElementById('messages');
const clearBtn       = document.getElementById('clear-btn');
const personaSelect  = document.getElementById('persona-select');
const charCount      = document.getElementById('char-count');
const wordCountEl    = document.getElementById('word-count-input');
const loginOverlay   = document.getElementById('login-overlay');
const loginEmail     = document.getElementById('login-email');
const loginBtn       = document.getElementById('login-btn');
const loginError     = document.getElementById('login-error');
const drawer         = document.getElementById('drawer');
const drawerBackdrop = document.getElementById('drawer-backdrop');
const drawerClose    = document.getElementById('drawer-close');
const topMenuBtn     = document.getElementById('top-menu-btn');
const analysisSheet  = document.getElementById('analysis-sheet');
const sheetBackdrop  = document.getElementById('sheet-backdrop');
const sheetClose     = document.getElementById('sheet-close');
const fabBtn         = document.getElementById('fab-analysis');
const analysisBadge  = document.getElementById('analysis-badge');

// ════════════════════════════════════════════════════════════
// LOGIN
// ════════════════════════════════════════════════════════════
async function doLogin() {
  const email = loginEmail.value.trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    loginError.textContent = '◈ Email vibratoire invalide — vérifiez le format';
    loginEmail.focus();
    return;
  }
  loginBtn.disabled = true;
  loginBtn.textContent = '◈ OUVERTURE DU PORTAIL…';
  loginError.textContent = '';

  try {
    const res  = await fetch('login.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const data = await res.json();
    if (data.error) throw new Error(data.error);

    isLoggedIn = true;
    loginOverlay.classList.add('hidden');
    setText('user-email-display', data.email);
    setText('user-since', 'depuis ' + (data.member_since || '').substring(0, 10));
    setText('sid-display', data.sid || '—');
    const initial = data.email.charAt(0).toUpperCase();
    setText('user-avatar', initial);

    if (msgInput) msgInput.focus();
  } catch (err) {
    loginError.textContent = '◈ ERREUR: ' + err.message;
    loginBtn.disabled = false;
    loginBtn.textContent = '⟶ OUVRIR LE PORTAIL';
  }
}

loginBtn.addEventListener('click', doLogin);
loginEmail.addEventListener('keydown', e => { if (e.key === 'Enter') doLogin(); });

// ════════════════════════════════════════════════════════════
// DRAWER (menu slide)
// ════════════════════════════════════════════════════════════
function openDrawer() {
  drawer.classList.add('open');
  drawerBackdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeDrawer() {
  drawer.classList.remove('open');
  drawerBackdrop.classList.remove('open');
  document.body.style.overflow = '';
}

topMenuBtn?.addEventListener('click', openDrawer);
drawerClose?.addEventListener('click', closeDrawer);
drawerBackdrop?.addEventListener('click', closeDrawer);

// ════════════════════════════════════════════════════════════
// ANALYSIS BOTTOM SHEET
// ════════════════════════════════════════════════════════════
function openSheet() {
  analysisSheet.classList.add('open');
  sheetBackdrop.classList.add('open');
  fabBtn.classList.add('sheet-active');
  fabBtn.querySelector('.fab-icon').textContent = '✕';
  sheetOpen = true;
}
function closeSheet() {
  analysisSheet.classList.remove('open');
  sheetBackdrop.classList.remove('open');
  fabBtn.classList.remove('sheet-active');
  fabBtn.querySelector('.fab-icon').textContent = '◉';
  sheetOpen = false;
}

fabBtn?.addEventListener('click', () => {
  if (sheetOpen) closeSheet(); else openSheet();
});
sheetClose?.addEventListener('click', closeSheet);
sheetBackdrop?.addEventListener('click', closeSheet);

// ════════════════════════════════════════════════════════════
// NAVIGATION
// ════════════════════════════════════════════════════════════
document.querySelectorAll('.bnav-item').forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault();
    if (!isLoggedIn) return;
    const section = item.dataset.section;
    switchSection(section);
  });
});

function switchSection(section) {
  document.querySelectorAll('.bnav-item').forEach(i =>
    i.classList.toggle('active', i.dataset.section === section)
  );
  document.querySelectorAll('.section-panel').forEach(p =>
    p.classList.toggle('active', p.id === 'section-' + section)
  );
  if (section === 'history')  loadHistory();
  if (section === 'analysis') loadCognitiveAnalysis();
  if (section === 'system')   loadSystem();
  closeDrawer();
}

// ════════════════════════════════════════════════════════════
// RADAR CHART INIT
// ════════════════════════════════════════════════════════════
function initCharts() {
  const ctxR = document.getElementById('radar-chart');
  if (!ctxR) return;
  radarChart = new Chart(ctxR.getContext('2d'), {
    type: 'radar',
    data: {
      labels: ['ANDROMÈDE', 'PLÉIADES', 'SIRIUS', 'ARCTURUS', 'ORION'],
      datasets: [{
        data: [0, 0, 0, 0, 0],
        backgroundColor: 'rgba(124,58,237,.08)',
        borderColor: 'rgba(124,58,237,.55)',
        pointBackgroundColor: '#7c3aed',
        pointRadius: 3, borderWidth: 1.5
      }]
    },
    options: {
      animation: { duration: 900 },
      plugins: { legend: { display: false } },
      scales: {
        r: {
          min: 0, max: 100,
          grid: { color: 'rgba(255,255,255,.06)' },
          angleLines: { color: 'rgba(255,255,255,.06)' },
          ticks: { display: false },
          pointLabels: {
            color: '#4a5a80',
            font: { family: 'Share Tech Mono', size: 9 }
          }
        }
      }
    }
  });
}

// ════════════════════════════════════════════════════════════
// AUTO-RESIZE TEXTAREA
// ════════════════════════════════════════════════════════════
function autoResizeTextarea() {
  if (!msgInput) return;
  msgInput.style.height = 'auto';
  msgInput.style.height = Math.min(msgInput.scrollHeight, 120) + 'px';
}

// ════════════════════════════════════════════════════════════
// SEND MESSAGE — 2 PHASES (protocoles préservés)
// ════════════════════════════════════════════════════════════
async function sendMessage() {
  if (isProcessing || !isLoggedIn) return;
  const text = msgInput.value.trim();
  if (!text) return;

  // Switch to chat section if not there
  switchSection('chat');

  isProcessing = true;
  sendBtn.disabled = true;
  msgInput.value = '';
  msgInput.style.height = 'auto';
  updateInputMeta();

  appendMessage('user', text);
  const typingEl = appendTyping();
  setAnalysisStatus('processing', '◈ PHASE 1 — CANALISATION…');

  // ── PHASE 1 : reply ─────────────────────────────────────
  let replyData;
  try {
    const res = await fetch('api.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: text,
        mode: currentMode,
        persona: currentPersona,
        phase: 'reply'
      })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status} — ${res.statusText}`);
    replyData = await res.json();
  } catch (err) {
    typingEl.remove();
    appendMessage('assistant', '⚠ Erreur réseau phase 1: ' + err.message);
    setAnalysisStatus('idle', '◈ ERREUR — ' + err.message);
    isProcessing = false; sendBtn.disabled = false; msgInput.focus();
    return;
  }

  typingEl.remove();

  if (replyData.error === 'SESSION_EXPIRED') {
    loginOverlay.classList.remove('hidden');
    isProcessing = false; sendBtn.disabled = false;
    return;
  }

  if (replyData.error) {
    appendMessage('assistant', '⚠ ' + replyData.error);
    setAnalysisStatus('idle', '◈ ERREUR API — ' + replyData.error);
    isProcessing = false; sendBtn.disabled = false; msgInput.focus();
    return;
  }

  appendMessage('assistant', replyData.reply, replyData.timestamp, replyData.meta);
  updateSidebar(replyData.meta, {});

  // Débloque l'input immédiatement
  isProcessing = false;
  sendBtn.disabled = false;
  msgInput.focus();

  // Flash badge analyse
  analysisBadge?.classList.remove('hidden');

  // ── PHASE 2 : analyze BUGARACH-5D (non-bloquant) ────────
  setAnalysisStatus('processing', '◈ PHASE 2 — ANALYSE VIBRATOIRE 5D…');

  try {
    const res2 = await fetch('api.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: text,
        mode: currentMode,
        persona: currentPersona,
        phase: 'analyze',
        msg_id: replyData.msg_id
      })
    });
    if (!res2.ok) throw new Error(`HTTP ${res2.status}`);
    const ad = await res2.json();

    updateAnalysis(ad.analysis, replyData.meta);
    updateSidebar(replyData.meta, ad.stats || {});
    setAnalysisStatus('done', '◈ ANALYSE 5D COMPLÈTE — ' + ad.timestamp);
    allAnalyses.push({ ts: ad.timestamp, text, analysis: ad.analysis });

    // Auto-ouvrir le sheet si première analyse
    if (allAnalyses.length === 1) openSheet();

  } catch (err) {
    setAnalysisStatus('idle', '◈ ANALYSE 5D ÉCHOUÉE — ' + err.message);
  }
}

// ════════════════════════════════════════════════════════════
// MESSAGES DOM
// ════════════════════════════════════════════════════════════
function appendMessage(role, text, timestamp, meta) {
  const wrap = document.createElement('div');
  wrap.className = 'msg-wrap ' + role;

  const bubble = document.createElement('div');
  bubble.className = 'msg-bubble';
  bubble.textContent = text;

  const m = document.createElement('div');
  m.className = 'msg-meta';
  const personaName = meta?.persona
    ? (GLOBALS_PERSONAS[meta.persona]?.name || meta.persona)
    : 'ALCYON';
  m.textContent = role === 'user'
    ? 'VOUS • ' + new Date().toLocaleTimeString('fr-FR')
    : personaName + ' • ' + (timestamp || '') + ' • ' + (meta?.model || '');

  wrap.appendChild(bubble);
  wrap.appendChild(m);
  messagesEl.appendChild(wrap);
  requestAnimationFrame(() => { messagesEl.scrollTop = messagesEl.scrollHeight; });
  return wrap;
}

function appendTyping() {
  const wrap = document.createElement('div');
  wrap.className = 'msg-wrap assistant';
  wrap.innerHTML = `<div class="typing-indicator">
    <div class="typing-dots"><span></span><span></span><span></span></div>
    CANALISATION EN COURS…
  </div>`;
  messagesEl.appendChild(wrap);
  requestAnimationFrame(() => { messagesEl.scrollTop = messagesEl.scrollHeight; });
  return wrap;
}

// ════════════════════════════════════════════════════════════
// UPDATE ANALYSIS (12 blocs BUGARACH-5D)
// ════════════════════════════════════════════════════════════
function updateAnalysis(analysis, meta) {
  if (!analysis) return;
  const a = analysis.a || {};
  const b = analysis.b || {};

  // ❶ Taux vibratoire + Chakras + Aura
  const vibro = parseInt(a.taux_vibratoire_bovis) || 65;
  setText('vibro-label', vibro + ' U.B.');
  setText('vibro-score', vibro + '/100');
  setWidth('vibro-bar', vibro);

  const chakras = a.chakras || {};
  const chakraKeys = ['racine','sacre','plexus','coeur','gorge','troisieme_oeil','couronne'];
  chakraKeys.forEach(k => {
    const v = parseInt(chakras[k]) || 50;
    setText('chakra-' + k, v);
    setWidth('chakra-bar-' + k, v);
  });
  setText('aura-val', (a.aura_couleur || 'indéterminée') + ' — ' + (a.aura_taille || 'moyenne'));

  // ❷ Divine Trinité
  const trinite = a.divine_trinite || {};
  setMeter('m-trinite-christique', 'mv-trinite-christique', trinite.christique);
  setMeter('m-trinite-monarchique', 'mv-trinite-monarchique', trinite.monarchique);
  setMeter('m-trinite-papal', 'mv-trinite-papal', trinite.papal);

  // ❸ Forces obscures & Éveil
  setMeter('m-emprise-reptilienne', 'mv-emprise-reptilienne', a.emprise_reptilienne);
  setMeter('m-kvorz-level', 'mv-kvorz-level', a.kvorz_level);
  setMeter('m-eveil-conscience', 'mv-eveil-conscience', a.eveil_conscience);

  // ❹ Éléments Agartha
  const elements = a.elements_agartha || {};
  setBar('elem-terre', 'elem-terre-v', elements.terre);
  setBar('elem-eau', 'elem-eau-v', elements.eau);
  setBar('elem-feu', 'elem-feu-v', elements.feu);
  setBar('elem-air', 'elem-air-v', elements.air);
  setBar('elem-ether', 'elem-ether-v', elements.ether);

  // ❺ Status Évacuation
  const statusMap = {
    en_attente: 'EN ATTENTE',
    preparation: 'EN PRÉPARATION',
    en_cours: 'EN COURS',
    termine: 'TERMINÉ'
  };
  const evStatus = a.status_evacuation_fin_des_temps || 'en_attente';
  setText('status-evacuation', statusMap[evStatus] || evStatus.toUpperCase());

  // ❻ Radar Stellaire
  const radar = b.radar_stellaire || {};
  if (radarChart) {
    radarChart.data.datasets[0].data = [
      radar.andromede || 0, radar.pleiades || 0,
      radar.sirius || 0, radar.arcturus || 0, radar.orion || 0
    ];
    radarChart.update();
  }

  // ❼ Géométrie Sacrée
  const geo = b.geometrie_sacree || {};
  setText('geo-metatron', geo.metatron || 25);
  setText('geo-flower-of-life', geo.flower_of_life || 30);
  setText('geo-seed-of-life', geo.seed_of_life || 35);
  setText('geo-merkaba', geo.merkaba || 20);

  // ❽ Ego Dissolution
  const ego = parseInt(b.ego_dissolution) || 40;
  setWidth('ego-bar', ego);
  setText('ego-score', ego + '/100');

  // ❾ Intentions Pures
  renderTags('intentions-tags', b.intentions_pures || [], 'tag-theme');

  // ❿ Verbe Créateur
  renderTags('verbe-tags', b.verbe_createur || [], 'tag-keyword');

  // ⓫ Astrologie Cosmique
  const astro = b.astrologie_cosmique || {};
  setText('astro-lunaire', astro.signe_lunaire || '—');
  setText('astro-solaire', astro.signe_solaire || '—');
  setText('astro-ascendant', astro.ascendant || '—');
  setText('astro-maitre-natal', astro.maitre_natal || '—');

  // ⓬ Métadonnées
  if (meta) {
    setText('meta-persona', GLOBALS_PERSONAS[meta.persona]?.name || meta.persona || '—');
    setText('meta-latency', meta.latency ? meta.latency + ' ms' : '—');
    setText('meta-tin', meta.tokens?.in || '—');
    setText('meta-tout', meta.tokens?.out || '—');
    setText('meta-session', meta.session || '—');
    setText('meta-time', new Date().toLocaleTimeString('fr-FR'));
  }

  // Flash animation
  document.querySelectorAll('.analysis-block').forEach(el => {
    el.classList.remove('updated');
    void el.offsetWidth;
    el.classList.add('updated');
  });
}

// ════════════════════════════════════════════════════════════
// DOM HELPERS
// ════════════════════════════════════════════════════════════
function setText(id, val) {
  const e = document.getElementById(id);
  if (e) e.textContent = val;
}
function setWidth(id, pct) {
  const e = document.getElementById(id);
  if (e) e.style.width = (parseInt(pct) || 0) + '%';
}
function setBar(fId, vId, val) {
  const v = parseInt(val) || 0;
  setWidth(fId, v);
  setText(vId, v);
}
function setMeter(fId, vId, val) {
  const v = parseInt(val) || 0;
  setWidth(fId, v);
  if (vId) setText(vId, v);
}

function renderTags(cId, items, cls) {
  const c = document.getElementById(cId);
  if (!c) return;
  c.innerHTML = '';
  if (!Array.isArray(items) || !items.length) {
    c.innerHTML = '<span class="tag-empty">—</span>';
    return;
  }
  items.slice(0, 7).forEach((item, i) => {
    const t = document.createElement('span');
    t.className = 'tag ' + cls;
    t.textContent = item;
    t.style.animationDelay = (i * 40) + 'ms';
    c.appendChild(t);
  });
}

function setAnalysisStatus(state, text) {
  const e = document.getElementById('analysis-status');
  if (e) e.innerHTML = `<span class="status-${state}">${text}</span>`;
}

function updateSidebar(meta, stats) {
  if (stats) {
    totalMantras += stats.mantras_count || 0;
    totalPrieres += stats.prieres_count || 0;
  }
  setText('total-mantras', totalMantras);
  setText('total-prieres', totalPrieres);
  setText('latence-astro', meta?.latency ? meta.latency + ' ms' : '—');
  if (stats?.karma_score !== undefined) setText('karma-score', stats.karma_score);
}

function updateInputMeta() {
  const t = msgInput?.value || '';
  const w = t.trim() ? t.trim().split(/\s+/).length : 0;
  if (charCount) charCount.textContent = t.length + ' car.';
  if (wordCountEl) wordCountEl.textContent = w + ' mots';
}

function showLoading(cId, icon, label) {
  const c = document.getElementById(cId);
  if (!c) return;
  c.innerHTML = `<div class="section-loading">
    <div class="loading-icon">${icon}</div>
    <div class="loading-text">${label}<br>
      <span class="loading-dots"><span></span><span></span><span></span></span>
    </div>
  </div>`;
}

function escHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ════════════════════════════════════════════════════════════
// PAGES
// ════════════════════════════════════════════════════════════
async function loadHistory() {
  showLoading('history-content', '◎', 'CHARGEMENT ARCHIVES AKASHIQUES');
  try {
    const data = await (await fetch('history.php')).json();
    const c = document.getElementById('history-content');
    if (!data.messages?.length) {
      c.innerHTML = `<div class="section-idle">
        <div class="section-idle-icon">◎</div>
        <div class="section-idle-title">ARCHIVES VIDES</div>
        <div class="section-idle-sub">Aucune canalisation dans cette session.</div>
      </div>`;
      return;
    }
    c.innerHTML = data.messages.map(m => `
      <div class="history-row ${m.role}">
        <div class="history-role">${m.role === 'user' ? 'VOUS' : 'ENTITÉ'}</div>
        <div class="history-content">${escHtml(m.content)}</div>
        <div class="history-meta">${m.created_at || ''} • ${m.model_used || ''} • ${((m.tokens_in || 0) + (m.tokens_out || 0))} tok</div>
      </div>`).join('');
  } catch (e) {
    document.getElementById('history-content').innerHTML =
      `<div class="error-msg">ERREUR: ${escHtml(e.message)}</div>`;
  }
}

async function loadCognitiveAnalysis() {
  showLoading('cognitive-content', '◉', 'CHARGEMENT PROFILS VIBRATOIRES');
  try {
    const data = await (await fetch('stats.php')).json();
    const c = document.getElementById('cognitive-content');
    if (!data.profiles?.length) {
      c.innerHTML = `<div class="section-idle">
        <div class="section-idle-icon">◉</div>
        <div class="section-idle-title">AUCUN PROFIL</div>
        <div class="section-idle-sub">Démarrez des canalisations pour générer des profils.</div>
      </div>`;
      return;
    }
    c.innerHTML = `
      <div class="bb-header">◈ ARCHIVES — ${data.profiles.length} SESSION(S) ANALYSÉE(S)</div>
      <div class="profiles-grid">
      ${data.profiles.map((p, i) => `
        <div class="profile-card">
          <div class="profile-header">
            <span class="profile-sid">SESSION #${i + 1} — ${escHtml((p.session_id || '').substring(0, 10))}</span>
            <span class="profile-count">${p.msg_count} msgs • ${p.total_tokens || 0} tok</span>
          </div>
          <div class="profile-meters">
            <div class="pm-item"><span>VIBRATION</span><div class="meter-track"><div class="meter-fill green" style="width:${Math.round(p.avg_sent || 50)}%"></div></div><span>${Math.round(p.avg_sent || 50)}</span></div>
            <div class="pm-item"><span>COMPLEXITÉ</span><div class="meter-track"><div class="meter-fill accent" style="width:${Math.round(p.avg_cpx || 50)}%"></div></div><span>${Math.round(p.avg_cpx || 50)}</span></div>
            <div class="pm-item"><span>CHARGE COG.</span><div class="meter-track"><div class="meter-fill warn" style="width:${Math.round(p.avg_cog || 50)}%"></div></div><span>${Math.round(p.avg_cog || 50)}</span></div>
          </div>
          ${p.top_emotions?.length ? `<div style="margin-top:.4rem;font-family:'Share Tech Mono',monospace;font-size:.55rem;color:var(--text-muted)">ÉMOTIONS: ${p.top_emotions.map(e => escHtml(e)).join(' · ')}</div>` : ''}
          ${p.top_themes?.length ? `<div style="margin-top:.2rem;font-family:'Share Tech Mono',monospace;font-size:.55rem;color:var(--text-muted)">THÈMES: ${p.top_themes.map(t => escHtml(t)).join(' · ')}</div>` : ''}
        </div>`).join('')}
      </div>`;
  } catch (e) {
    document.getElementById('cognitive-content').innerHTML =
      `<div class="error-msg">ERREUR: ${escHtml(e.message)}</div>`;
  }
}

async function loadSystem() {
  showLoading('system-content', '⬟', 'DIAGNOSTICS DU PORTAIL EN COURS');
  try {
    const d = await (await fetch('system.php')).json();
    document.getElementById('system-content').innerHTML = `
      <div class="sys-grid">
        <div class="sys-item"><span class="sys-label">PHP</span><span class="sys-val">${d.php || '—'}</span></div>
        <div class="sys-item"><span class="sys-label">SERVEUR</span><span class="sys-val">${d.server || '—'}</span></div>
        <div class="sys-item"><span class="sys-label">MEM LIMIT</span><span class="sys-val">${d.memory_limit || '—'}</span></div>
        <div class="sys-item"><span class="sys-label">MAX EXEC</span><span class="sys-val">${d.max_exec || '—'}s</span></div>
        <div class="sys-item"><span class="sys-label">DB SIZE</span><span class="sys-val">${d.db_size || '—'}</span></div>
        <div class="sys-item"><span class="sys-label">SESSIONS</span><span class="sys-val">${d.total_sessions || 0}</span></div>
        <div class="sys-item"><span class="sys-label">MESSAGES</span><span class="sys-val">${d.total_messages || 0}</span></div>
        <div class="sys-item"><span class="sys-label">ANALYSES</span><span class="sys-val">${d.total_analyses || 0}</span></div>
        <div class="sys-item"><span class="sys-label">CLÉS VALIDES</span><span class="sys-val">${d.keys_count || 0}/3</span></div>
        <div class="sys-item"><span class="sys-label">MOD. CHAT</span><span class="sys-val">${d.model_chat || '—'}</span></div>
        <div class="sys-item"><span class="sys-label">MOD. ANALYSE</span><span class="sys-val">${d.model_analysis || '—'}</span></div>
        <div class="sys-item"><span class="sys-label">DATE</span><span class="sys-val">${d.uptime || '—'}</span></div>
      </div>
      <div class="sys-keys-status">
        ${(d.key_status || []).map(k => `
          <div class="key-row-sys">
            <span class="dot ${k.ok ? 'dot-green' : 'dot-red'}"></span>
            ${escHtml(k.role)} — ${k.ok ? 'OPÉRATIONNELLE' : 'INVALIDE'}
          </div>`).join('')}
      </div>`;
  } catch (e) {
    document.getElementById('system-content').innerHTML =
      `<div class="error-msg">ERREUR: ${escHtml(e.message)}</div>`;
  }
}

// ════════════════════════════════════════════════════════════
// CONTROLS
// ════════════════════════════════════════════════════════════
document.querySelectorAll('.mode-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentMode = btn.dataset.mode;
    setText('chat-mode-label', currentMode.toUpperCase());
  });
});

if (personaSelect) {
  personaSelect.addEventListener('change', () => {
    currentPersona = personaSelect.value;
    const p = GLOBALS_PERSONAS[currentPersona];
    const name = p?.name || personaSelect.options[personaSelect.selectedIndex].text.split('—')[0].trim();
    setText('chat-persona-label', name);
    setText('top-persona-chip', p?.short || name.split(' ')[0]);
  });
}

if (msgInput) {
  msgInput.addEventListener('input', () => {
    updateInputMeta();
    autoResizeTextarea();
  });
  msgInput.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
}
if (sendBtn) sendBtn.addEventListener('click', sendMessage);

if (clearBtn) {
  clearBtn.addEventListener('click', async () => {
    if (!confirm('Purifier cette session ? Toutes les canalisations seront effacées.')) return;
    try { await fetch('clear.php', { method: 'POST' }); } catch (e) {}
    messagesEl.innerHTML = `<div class="welcome-msg">
      <div class="welcome-icon">𓀀</div>
      <div class="welcome-text">
        <strong>SESSION PURIFIÉE</strong>
        <span>Nouvelle session démarrée. Le cosmos vous attend.</span>
      </div>
    </div>`;
    totalMantras = 0; totalPrieres = 0; allAnalyses = [];
    analysisBadge?.classList.add('hidden');
    updateSidebar({}, {});
    setAnalysisStatus('idle', '◈ EN ATTENTE');
    closeDrawer();
  });
}

// Swipe-to-close sur le sheet (touch)
let touchStartY = 0;
analysisSheet?.addEventListener('touchstart', e => {
  touchStartY = e.touches[0].clientY;
}, { passive: true });
analysisSheet?.addEventListener('touchmove', e => {
  const dy = e.touches[0].clientY - touchStartY;
  if (dy > 80 && e.target.closest('.sheet-content')?.scrollTop === 0) {
    closeSheet();
  }
}, { passive: true });

// Horloge
function updateClock() {
  const t = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  setText('chat-time', t);
}
setInterval(updateClock, 10000);
updateClock();

// ════════════════════════════════════════════════════════════
// INIT
// ════════════════════════════════════════════════════════════
initCharts();
if (loginEmail) loginEmail.focus();
