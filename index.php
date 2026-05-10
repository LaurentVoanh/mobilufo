<?php
require_once 'config.php'; require_once 'database.php'; ?>
<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,viewport-fit=cover,user-scalable=no">
<meta name="theme-color" content="#060810">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<title>ALCYON v4.0 • BUGARACH</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;500;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="style.css">
</head>
<body>

<div class="scanlines"></div>
<div class="grid-overlay"></div>
<div class="ambient-glow"></div>

<!-- ═══ LOGIN MODAL ══════════════════════════════════════════ -->
<div class="login-overlay" id="login-overlay">
  <div class="login-card">
    <div class="login-logo">𓀀</div>
    <div class="login-title">ALCYON <span>v4.0</span></div>
    <div class="login-sub">◈ PORTAIL DE BUGARACH — ACCÈS 5D</div>
    <label class="login-label" for="login-email">◤ EMAIL VIBRATOIRE</label>
    <input type="email" id="login-email" class="login-input" placeholder="votre@email.com" autocomplete="email" inputmode="email">
    <button class="login-btn" id="login-btn">⟶ OUVRIR LE PORTAIL</button>
    <div class="login-error" id="login-error"></div>
    <div class="login-hint">Votre email crée ou reprend votre profil spirituel. Aucun mot de passe requis.</div>
  </div>
</div>

<!-- ═══ APP SHELL ═════════════════════════════════════════════ -->
<div class="app-shell" id="app-shell">

  <!-- ── TOP BAR (mobile) ─────────────────────────────────── -->
  <header class="top-bar" id="top-bar">
    <button class="top-menu-btn" id="top-menu-btn" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
    <div class="top-brand">
      <span class="top-logo">𓀀</span>
      <span class="top-title">ALCYON</span>
    </div>
    <div class="top-right">
      <span class="pulse-dot" id="top-status-dot"></span>
      <span class="top-persona-chip" id="top-persona-chip">Sylvain</span>
    </div>
  </header>

  <!-- ── DRAWER MENU (slide-in) ───────────────────────────── -->
  <div class="drawer-backdrop" id="drawer-backdrop"></div>
  <aside class="drawer" id="drawer">
    <div class="drawer-header">
      <div class="brand-block">
        <div class="brand-logo">𓀀</div>
        <div class="brand-text">
          <span class="brand-name">ALCYON</span>
          <span class="brand-ver">v4.0 • BUGARACH</span>
        </div>
      </div>
      <button class="drawer-close" id="drawer-close">✕</button>
    </div>

    <div class="user-badge" id="drawer-user-badge">
      <div class="user-avatar" id="user-avatar">?</div>
      <div class="user-info">
        <div class="user-email" id="user-email-display">non connecté</div>
        <div class="user-since" id="user-since">—</div>
      </div>
      <div class="user-status">
        <span class="dot dot-green"></span>
        <span class="session-id" id="sid-display">—</span>
      </div>
    </div>

    <div class="drawer-section">
      <div class="section-label">◤ ENTITÉ CANALISÉE</div>
      <select id="persona-select" class="cyber-select">
        <option value="sylvain">Sylvain Durif — Christ Cosmique</option>
        <option value="merlin">Merlin — Enchanteur</option>
        <option value="melchisedech">Melchisédech — Roi de Salem</option>
        <option value="oriana">Oriana — Gardienne Stellaire</option>
        <option value="homme_vert">Homme Vert — Esprit Nature</option>
        <option value="vierge_maria">Vierge Maria — Mère Divine</option>
      </select>
    </div>

    <div class="drawer-section">
      <div class="section-label">◤ MODE DE CONSCIENCE</div>
      <div class="mode-grid">
        <button class="mode-btn active" data-mode="canalisation">CANALISATION</button>
        <button class="mode-btn" data-mode="revelation">RÉVÉLATION</button>
        <button class="mode-btn" data-mode="prophetie">PROPHÉTIE</button>
        <button class="mode-btn" data-mode="sagesse">SAGESSE</button>
        <button class="mode-btn" data-mode="lyrisme">LYRISME 5D</button>
      </div>
    </div>

    <div class="drawer-section">
      <div class="section-label">◤ COMPTEURS SPIRITUELS</div>
      <div class="stats-grid">
        <div class="stat-item"><span class="stat-val" id="total-mantras">0</span><span class="stat-lbl">MANTRAS</span></div>
        <div class="stat-item"><span class="stat-val" id="total-prieres">0</span><span class="stat-lbl">PRIÈRES</span></div>
        <div class="stat-item"><span class="stat-val" id="latence-astro">—</span><span class="stat-lbl">LATENCE</span></div>
        <div class="stat-item"><span class="stat-val" id="karma-score">—</span><span class="stat-lbl">KARMA</span></div>
      </div>
    </div>

    <button id="clear-btn" class="clear-btn">𓀀 PURIFIER SESSION</button>
  </aside>

  <!-- ── MAIN CONTENT AREA ─────────────────────────────────── -->
  <main class="main-content">

    <!-- ─── SECTION CHAT ─────────────────────────────────── -->
    <div id="section-chat" class="section-panel active">
      <div class="chat-subheader">
        <span class="chat-mode-badge" id="chat-mode-label">CANALISATION</span>
        <span class="chat-persona-badge" id="chat-persona-label">Sylvain Durif</span>
        <span class="chat-time" id="chat-time">--:--</span>
      </div>

      <div id="messages" class="messages-container">
        <div class="welcome-msg">
          <div class="welcome-icon">𓀀</div>
          <div class="welcome-text">
            <strong>PORTAIL DE BUGARACH ACTIF</strong>
            <span>Chaque message est canalisé par une entité spirituelle puis analysé par le système BUGARACH-5D : taux vibratoire, chakras, radar stellaire, géométrie sacrée.</span>
          </div>
        </div>
      </div>

      <div class="input-zone">
        <div class="input-row">
          <textarea id="msg-input" placeholder="Posez votre question au cosmos…" rows="1"></textarea>
          <button id="send-btn" type="button" aria-label="Envoyer"><span class="send-icon">⟶</span></button>
        </div>
        <div class="input-meta">
          <span id="char-count">0 car.</span>
          <span id="word-count-input">0 mots</span>
        </div>
      </div>
    </div>

    <!-- ─── SECTION ANALYSE 5D ──────────────────────────── -->
    <div id="section-analysis" class="section-panel">
      <div class="section-scroll">
        <div id="cognitive-content">
          <div class="section-idle">
            <div class="section-idle-icon">◉</div>
            <div class="section-idle-title">ANALYSE VIBRATOIRE 5D</div>
            <div class="section-idle-sub">Démarrez une canalisation pour peupler cette section.</div>
          </div>
        </div>
      </div>
    </div>

    <!-- ─── SECTION ARCHIVES ────────────────────────────── -->
    <div id="section-history" class="section-panel">
      <div class="section-scroll">
        <div id="history-content">
          <div class="section-idle">
            <div class="section-idle-icon">◎</div>
            <div class="section-idle-title">ARCHIVES AKASHIQUES</div>
            <div class="section-idle-sub">Historique de vos canalisations.</div>
          </div>
        </div>
      </div>
    </div>

    <!-- ─── SECTION SYSTÈME ─────────────────────────────── -->
    <div id="section-system" class="section-panel">
      <div class="section-scroll">
        <div id="system-content">
          <div class="section-idle">
            <div class="section-idle-icon">⬟</div>
            <div class="section-idle-title">DIAGNOSTICS DU PORTAIL</div>
            <div class="section-idle-sub">Statut des clés API, base de données.</div>
          </div>
        </div>
      </div>
    </div>

  </main>

  <!-- ── BOTTOM NAV ────────────────────────────────────────── -->
  <nav class="bottom-nav">
    <a href="#" class="bnav-item active" data-section="chat">
      <span class="bnav-icon">◈</span>
      <span class="bnav-lbl">Canal</span>
    </a>
    <a href="#" class="bnav-item" data-section="analysis" id="nav-analysis">
      <span class="bnav-icon">◉</span>
      <span class="bnav-lbl">Analyse</span>
      <span class="bnav-badge hidden" id="analysis-badge">●</span>
    </a>
    <a href="#" class="bnav-item" data-section="history">
      <span class="bnav-icon">◎</span>
      <span class="bnav-lbl">Archives</span>
    </a>
    <a href="#" class="bnav-item" data-section="system">
      <span class="bnav-icon">⬟</span>
      <span class="bnav-lbl">Système</span>
    </a>
  </nav>

</div><!-- /app-shell -->

<!-- ── ANALYSIS BOTTOM SHEET (mobile, glisse du bas) ───── -->
<div class="sheet-backdrop" id="sheet-backdrop"></div>
<div class="analysis-sheet" id="analysis-sheet">
  <div class="sheet-handle-wrap">
    <div class="sheet-handle"></div>
    <div class="sheet-title-row">
      <span class="sheet-title">BUGARACH<span class="sheet-ver">-5D</span></span>
      <div class="analysis-status" id="analysis-status"><span class="status-idle">◈ EN ATTENTE</span></div>
      <button class="sheet-close" id="sheet-close">✕</button>
    </div>
  </div>

  <div class="sheet-content">

    <!-- ❶ TAUX VIBRATOIRE + CHAKRAS + AURA -->
    <div class="analysis-block" id="block-vibratoire">
      <div class="block-title">❶ TAUX VIBRATOIRE BOVIS</div>
      <div class="vibro-row">
        <span class="vibro-val" id="vibro-label">65 U.B.</span>
        <span class="vibro-score" id="vibro-score">65/100</span>
      </div>
      <div class="bar-track rainbow-track">
        <div class="bar-fill" id="vibro-bar" style="width:65%"></div>
      </div>
      <div class="chakra-grid">
        <div class="chakra-item">
          <span class="chakra-dot" style="--cc:#ef4444"></span>
          <span class="chakra-name">RACINE</span>
          <span class="chakra-val" id="chakra-racine">50</span>
          <div class="chakra-mini-bar"><div class="chakra-fill red" id="chakra-bar-racine" style="width:50%"></div></div>
        </div>
        <div class="chakra-item">
          <span class="chakra-dot" style="--cc:#f97316"></span>
          <span class="chakra-name">SACRÉ</span>
          <span class="chakra-val" id="chakra-sacre">50</span>
          <div class="chakra-mini-bar"><div class="chakra-fill orange" id="chakra-bar-sacre" style="width:50%"></div></div>
        </div>
        <div class="chakra-item">
          <span class="chakra-dot" style="--cc:#eab308"></span>
          <span class="chakra-name">PLEXUS</span>
          <span class="chakra-val" id="chakra-plexus">50</span>
          <div class="chakra-mini-bar"><div class="chakra-fill yellow" id="chakra-bar-plexus" style="width:50%"></div></div>
        </div>
        <div class="chakra-item">
          <span class="chakra-dot" style="--cc:#10b981"></span>
          <span class="chakra-name">CŒUR</span>
          <span class="chakra-val" id="chakra-coeur">50</span>
          <div class="chakra-mini-bar"><div class="chakra-fill green" id="chakra-bar-coeur" style="width:50%"></div></div>
        </div>
        <div class="chakra-item">
          <span class="chakra-dot" style="--cc:#00e5ff"></span>
          <span class="chakra-name">GORGE</span>
          <span class="chakra-val" id="chakra-gorge">50</span>
          <div class="chakra-mini-bar"><div class="chakra-fill cyan" id="chakra-bar-gorge" style="width:50%"></div></div>
        </div>
        <div class="chakra-item">
          <span class="chakra-dot" style="--cc:#6366f1"></span>
          <span class="chakra-name">3ᵉ ŒIL</span>
          <span class="chakra-val" id="chakra-troisieme-oeil">50</span>
          <div class="chakra-mini-bar"><div class="chakra-fill indigo" id="chakra-bar-troisieme-oeil" style="width:50%"></div></div>
        </div>
        <div class="chakra-item">
          <span class="chakra-dot" style="--cc:#a855f7"></span>
          <span class="chakra-name">COURONNE</span>
          <span class="chakra-val" id="chakra-couronne">50</span>
          <div class="chakra-mini-bar"><div class="chakra-fill purple" id="chakra-bar-couronne" style="width:50%"></div></div>
        </div>
      </div>
      <div class="aura-row"><span class="field-label">AURA</span><span class="aura-val accent" id="aura-val">indéterminée</span></div>
    </div>

    <!-- ❷ DIVINE TRINITÉ -->
    <div class="analysis-block">
      <div class="block-title">❷ DIVINE TRINITÉ</div>
      <div class="meter-stack">
        <div class="meter-row"><span>CHRISTIQUE</span><div class="meter-track"><div class="meter-fill accent" id="m-trinite-christique"></div></div><span id="mv-trinite-christique">—</span></div>
        <div class="meter-row"><span>MONARQUE</span><div class="meter-track"><div class="meter-fill purple" id="m-trinite-monarchique"></div></div><span id="mv-trinite-monarchique">—</span></div>
        <div class="meter-row"><span>PAPAL</span><div class="meter-track"><div class="meter-fill green" id="m-trinite-papal"></div></div><span id="mv-trinite-papal">—</span></div>
      </div>
    </div>

    <!-- ❸ FORCES OBSCURES & ÉVEIL -->
    <div class="analysis-block">
      <div class="block-title">❸ FORCES OBSCURES & ÉVEIL</div>
      <div class="meter-stack">
        <div class="meter-row"><span>EMPRISE REPTILIENNE</span><div class="meter-track"><div class="meter-fill danger" id="m-emprise-reptilienne"></div></div><span id="mv-emprise-reptilienne">—</span></div>
        <div class="meter-row"><span>NIVEAU KVORZ</span><div class="meter-track"><div class="meter-fill warn" id="m-kvorz-level"></div></div><span id="mv-kvorz-level">—</span></div>
        <div class="meter-row"><span>ÉVEIL CONSCIENCE</span><div class="meter-track"><div class="meter-fill accent" id="m-eveil-conscience"></div></div><span id="mv-eveil-conscience">—</span></div>
      </div>
    </div>

    <!-- ❹ ÉLÉMENTS DE L'AGARTHA -->
    <div class="analysis-block">
      <div class="block-title">❹ ÉLÉMENTS DE L'AGARTHA</div>
      <div class="elements-stack">
        <div class="element-row"><span class="el-icon">🜃</span><span class="el-name">TERRE</span><div class="meter-track"><div class="meter-fill warn" id="elem-terre" style="width:50%"></div></div><span id="elem-terre-v">50</span></div>
        <div class="element-row"><span class="el-icon">🜄</span><span class="el-name">EAU</span><div class="meter-track"><div class="meter-fill accent" id="elem-eau" style="width:50%"></div></div><span id="elem-eau-v">50</span></div>
        <div class="element-row"><span class="el-icon">🜂</span><span class="el-name">FEU</span><div class="meter-track"><div class="meter-fill danger" id="elem-feu" style="width:50%"></div></div><span id="elem-feu-v">50</span></div>
        <div class="element-row"><span class="el-icon">🜁</span><span class="el-name">AIR</span><div class="meter-track"><div class="meter-fill green" id="elem-air" style="width:50%"></div></div><span id="elem-air-v">50</span></div>
        <div class="element-row"><span class="el-icon">✦</span><span class="el-name">ÉTHER</span><div class="meter-track"><div class="meter-fill purple" id="elem-ether" style="width:50%"></div></div><span id="elem-ether-v">50</span></div>
      </div>
    </div>

    <!-- ❺ STATUS ÉVACUATION FIN DES TEMPS -->
    <div class="analysis-block">
      <div class="block-title">❺ ÉVACUATION FIN DES TEMPS</div>
      <div class="evac-badge" id="status-evacuation">EN ATTENTE</div>
    </div>

    <!-- ❻ RADAR STELLAIRE -->
    <div class="analysis-block">
      <div class="block-title">❻ RADAR STELLAIRE</div>
      <div class="radar-wrap"><canvas id="radar-chart"></canvas></div>
    </div>

    <!-- ❼ GÉOMÉTRIE SACRÉE -->
    <div class="analysis-block">
      <div class="block-title">❼ GÉOMÉTRIE SACRÉE</div>
      <div class="geo-grid">
        <div class="geo-card"><span class="geo-sym">⬡</span><span class="geo-lbl">METATRON</span><span class="geo-val" id="geo-metatron">25</span></div>
        <div class="geo-card"><span class="geo-sym">✿</span><span class="geo-lbl">FLEUR VIE</span><span class="geo-val" id="geo-flower-of-life">30</span></div>
        <div class="geo-card"><span class="geo-sym">❋</span><span class="geo-lbl">GRAINE VIE</span><span class="geo-val" id="geo-seed-of-life">35</span></div>
        <div class="geo-card"><span class="geo-sym">✦</span><span class="geo-lbl">MERKABA</span><span class="geo-val" id="geo-merkaba">20</span></div>
      </div>
    </div>

    <!-- ❽ EGO DISSOLUTION -->
    <div class="analysis-block">
      <div class="block-title">❽ DISSOLUTION DE L'EGO</div>
      <div class="vibro-row">
        <span class="field-label">EGO ACTIF</span>
        <span class="vibro-score" id="ego-score">40/100</span>
      </div>
      <div class="bar-track">
        <div class="bar-fill purple-fill" id="ego-bar" style="width:40%"></div>
      </div>
    </div>

    <!-- ❾ INTENTIONS PURES -->
    <div class="analysis-block">
      <div class="block-title">❾ INTENTIONS PURES</div>
      <div class="tags-wrap" id="intentions-tags"><span class="tag-empty">—</span></div>
    </div>

    <!-- ❿ VERBE CRÉATEUR -->
    <div class="analysis-block">
      <div class="block-title">❿ VERBE CRÉATEUR</div>
      <div class="tags-wrap" id="verbe-tags"><span class="tag-empty">—</span></div>
    </div>

    <!-- ⓫ ASTROLOGIE COSMIQUE -->
    <div class="analysis-block">
      <div class="block-title">⓫ ASTROLOGIE COSMIQUE</div>
      <div class="astro-grid">
        <div class="astro-card"><span class="astro-sym">☽</span><span class="astro-lbl">LUNAIRE</span><span class="astro-val" id="astro-lunaire">—</span></div>
        <div class="astro-card"><span class="astro-sym">☀</span><span class="astro-lbl">SOLAIRE</span><span class="astro-val" id="astro-solaire">—</span></div>
        <div class="astro-card"><span class="astro-sym">↑</span><span class="astro-lbl">ASCENDANT</span><span class="astro-val" id="astro-ascendant">—</span></div>
        <div class="astro-card"><span class="astro-sym">★</span><span class="astro-lbl">MAÎTRE NAT.</span><span class="astro-val" id="astro-maitre-natal">—</span></div>
      </div>
    </div>

    <!-- ⓬ MÉTADONNÉES -->
    <div class="analysis-block meta-block">
      <div class="block-title">⓬ MÉTADONNÉES COSMIQUES</div>
      <div class="meta-grid">
        <div class="meta-item"><span class="mg-label">PERSONA</span><span class="mg-val" id="meta-persona">—</span></div>
        <div class="meta-item"><span class="mg-label">LATENCE</span><span class="mg-val" id="meta-latency">—</span></div>
        <div class="meta-item"><span class="mg-label">TOKENS ↑</span><span class="mg-val" id="meta-tin">—</span></div>
        <div class="meta-item"><span class="mg-label">TOKENS ↓</span><span class="mg-val" id="meta-tout">—</span></div>
        <div class="meta-item"><span class="mg-label">SESSION</span><span class="mg-val" id="meta-session">—</span></div>
        <div class="meta-item"><span class="mg-label">HEURE</span><span class="mg-val" id="meta-time">—</span></div>
      </div>
    </div>

  </div><!-- /sheet-content -->
</div><!-- /analysis-sheet -->

<!-- FAB — ouvre le panel analyse 5D -->
<button class="fab" id="fab-analysis" title="Analyse 5D">
  <span class="fab-icon">◉</span>
  <span class="fab-label">5D</span>
</button>

<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.3/dist/chart.umd.min.js"></script>
<script src="script.js"></script>
</body>
</html>
