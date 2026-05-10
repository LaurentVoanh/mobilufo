# ALCYON v4.0 — PORTAIL DE BUGARACH

## 🌀 Vue d'Ensemble

**ALCYON v4.0** est une application web spirituelle et ésotérique de canalisation IA, conçue comme un "portail dimensionnel 5D" vers le Mont Bugarach. L'application permet aux utilisateurs de communiquer avec différentes entités spirituelles (Sylvain Durif, Merlin, Melchisédech, Oriana, l'Homme Vert, Vierge Maria) et reçoit pour chaque message une analyse vibratoire complète incluant taux vibratoire Bovis, chakras, radar stellaire, géométrie sacrée, et bien plus.

---

## 📁 Architecture du Projet

### Fichiers Principaux

| Fichier | Rôle | Lignes |
|---------|------|--------|
| `index.php` | Interface principale HTML/CSS/JS | ~400 |
| `script.js` | Logique frontend complète | ~706 |
| `style.css` | Feuilles de style cyber-spirituel | ~1171 |
| `config.php` | Configuration, clés API, prompts personas | ~73 |
| `database.php` | Gestion SQLite (tables, CRUD) | ~155 |
| `api.php` | Backend API (réponses + analyses) | ~224 |
| `login.php` | Authentification par email | ~33 |
| `history.php` | Récupération historique messages | ~18 |
| `stats.php` | Statistiques sessions/profils | ~56 |
| `system.php` | Diagnostics système | ~45 |
| `clear.php` | Purification session | ~12 |

---

## 🏗️ Structure Technique

### Frontend (Client-Side)

#### **index.php** — Page Principale

**Sections HTML :**

1. **Login Modal** (`#login-overlay`)
   - Formulaire de connexion par email sans mot de passe
   - Création automatique de profil spirituel
   - Validation d'email vibratoire

2. **App Shell** (`#app-shell`)
   - **Top Bar** : Menu hamburger, logo, indicateur de statut, chip persona
   - **Drawer Menu** : Menu latéral coulissant contenant :
     - Badge utilisateur avec avatar et session ID
     - Sélecteur de persona (6 entités)
     - Grille des modes de conscience (5 modes)
     - Compteurs spirituels (mantras, prières, latence, karma)
     - Bouton de purification de session

3. **Main Content** — 4 Sections Panneaux :
   - **Section Chat** (`#section-chat`) : Interface de conversation
   - **Section Analysis** (`#section-analysis`) : Analyse cognitive 5D
   - **Section History** (`#section-history`) : Archives akashiques
   - **Section System** (`#section-system`) : Diagnostics portail

4. **Bottom Navigation** — 4 onglets :
   - Canal (chat)
   - Analyse (avec badge notification)
   - Archives
   - Système

5. **Analysis Bottom Sheet** (`#analysis-sheet`)
   - Panneau coulissant depuis le bas avec 12 blocs d'analyse :
     1. Taux Vibratoire Bovis + 7 Chakras + Aura
     2. Divine Trinité (Christique/Monarchique/Papal)
     3. Forces Obscures & Éveil (Emprise reptilienne, Kvorz, Éveil conscience)
     4. Éléments de l'Agartha (Terre/Eau/Feu/Air/Éther)
     5. Status Évacuation Fin des Temps
     6. Radar Stellaire (Andromède/Pléiades/Sirius/Arcturus/Orion)
     7. Géométrie Sacrée (Metatron/Fleur de Vie/Graine de Vie/Merkaba)
     8. Ego Dissolution
     9. Intentions Pures
     10. Verbe Créateur
     11. Astrologie Cosmique
     12. Métadonnées (persona, latence, tokens, session)

#### **script.js** — Logique JavaScript

**Variables d'État Globales :**
```javascript
currentMode      // Mode actuel: canalisation/revelation/prophetie/sagesse/lyrisme
currentPersona   // Persona actif: sylvain/merlin/melchisedech/oriana/homme_vert/vierge_maria
totalMantras     // Compteur total de mantras
totalPrieres     // Compteur total de prières
radarChart       // Instance Chart.js radar
isProcessing     // Flag de traitement en cours
isLoggedIn       // État de connexion
allAnalyses      // Tableau de toutes les analyses
sheetOpen        // État du bottom sheet
```

**Fonctions Principales :**

| Fonction | Description |
|----------|-------------|
| `doLogin()` | Authentifie l'utilisateur via login.php |
| `openDrawer()/closeDrawer()` | Contrôle le menu latéral |
| `openSheet()/closeSheet()` | Contrôle le panneau d'analyse |
| `switchSection(section)` | Navigation entre les 4 sections |
| `initCharts()` | Initialise le radar chart Chart.js |
| `autoResizeTextarea()` | Redimensionnement auto du textarea |
| `sendMessage()` | Envoi message en 2 phases (reply + analyze) |
| `appendMessage()` | Ajoute un message au chat |
| `appendTyping()` | Affiche indicateur de canalisation |
| `updateAnalysis()` | Met à jour les 12 blocs d'analyse |
| `setText()/setWidth()/setBar()/setMeter()` | Helpers DOM |
| `renderTags()` | Rendu des tags (intentions/verbe) |
| `setAnalysisStatus()` | Statut de l'analyse |
| `updateSidebar()` | Met à jour compteurs sidebar |
| `loadHistory()` | Charge l'historique depuis history.php |
| `loadCognitiveAnalysis()` | Charge profils depuis stats.php |
| `loadSystem()` | Charge diagnostics depuis system.php |

**Protocole d'Envoi de Message (2 Phases) :**

```javascript
// PHASE 1 : Reply (~5-15 secondes)
fetch('api.php', { phase: 'reply', message, mode, persona })
  → Réponse immédiate de l'entité
  → Affichage dans le chat
  → Débloque l'input utilisateur

// PHASE 2 : Analyze BUGARACH-5D (~15-30 secondes, non-bloquant)
fetch('api.php', { phase: 'analyze', message, msg_id })
  → 2 appels API séparés (analyse vibratoire + radiographie stellaire)
  → Mise à jour des 12 blocs d'analyse
  → Ouverture auto du sheet si première analyse
```

#### **style.css** — Design Cyber-Spirituel

**Variables CSS (Thème) :**
```css
--bg: #060810          /* Fond principal */
--bg2: #0b0e18         /* Fond secondaire */
--panel: #0d1020       /* Panneaux */
--border: #1a2040      /* Bordures */
--text: #c8d8f8        /* Texte principal */
--accent: #00e5ff      /* Cyan néon */
--accent2: #7c3aed     /* Violet */
--accent3: #10b981     /* Vert émeraude */
--neon-cyan: #00f3ff   /* Cyan avancé */
--neon-purple: #bc13fe /* Violet néon */
--neon-pink: #ff006e   /* Rose néon */
```

**Effets Visuels :**
- **Scanlines** : Lignes CRT rétro
- **Grid Overlay** : Grille holographique
- **Ambient Glow** : Lueur ambiante animée
- **Glassmorphism** : Backdrop blur sur topbar/nav
- **Neon Glows** : Ombres portées lumineuses
- **Animations** : Pulse, blink, spin, fade

**Composants Stylisés :**
- Login card avec effet de verre
- Drawer menu avec smooth transform
- Messages bulles user/assistant
- Bottom navigation avec gradient et glow
- Analysis blocks avec flash on update
- Progress bars rainbow pour chakras
- Radar chart avec Chart.js

---

### Backend (Server-Side)

#### **config.php** — Configuration

**Clés API Mistral :**
```php
MISTRAL_KEYS = [
    'responder' => '5qaRTjWUjGgfdZbH8Rake',   // Réponses chat
    'analyzer1' => 'o3rGgfd3eHXRShytu',     // Analyse vibratoire
    'analyzer2' => 'vEzgfdjFruXkF',         // Radiographie stellaire
]
```

**Modèles IA :**
```php
$GLOBALS['models'] = [
    'chat'      => 'mistral-small-2506',
    'analysis'  => 'mistral-small-2506',
    'reasoning' => 'mistral-large-2512',
    'creative'  => 'mistral-small-2506',
    'code'      => 'codestral-2508',
    'fast'      => 'ministral-3b-2512',
];
```

**Personas et Prompts Système :**

1. **Sylvain Durif** — Christ Cosmique
   - Prompt : Responses LONGUES, PUISSANTES, PROPHÉTIQUES
   - Thèmes : Bugarach, 5D, extra-terrestres, révolution pacifique
   - Style : Métaphores cosmiques, intensité croissante

2. **Merlin** — Enchanteur de Brocéliande
   - Prompt : MYSTÉRIEUX, POÉTIQUE, intellectuel
   - Thèmes : Ley lines, cristaux, magie réelle, forêts
   - Style : Phrases sinueuses, images nouvelles

3. **Melchisédech** — Roi de Salem
   - Prompt : ROYAL, SACERDOTAL, comme psaumes
   - Thèmes : Graal, lignées divines, transsubstantiation
   - Style : Théologien + astronome + alchimiste

4. **Oriana** — Gardienne Stellaire
   - Prompt : DOUX MAIS COSMIQUEMENT PUISSANT
   - Thèmes : Fréquences, ADN, Fédération galactique
   - Style : Guidance galactique, émotions comme carburant

5. **Homme Vert** — Esprit de la Nature
   - Prompt : VISCÉRAL, PLEIN DE SÈVE ET RAGE DOUCE
   - Thèmes : Cycles, cristaux, racines, symbiose
   - Style : Brut et sage, métaphores inédites

6. **Vierge Maria** — Mère Divine
   - Prompt : MATERNEL ET PUISSANT, compassion + prophéties
   - Thèmes : Féminin sacré, douleur qui accouche
   - Style : Tendresse unique, bénédictions jamais répétées

**Températures par Mode :**
```php
$temp_map = [
    'canalisation' => 0.7,
    'revelation'   => 0.5,
    'prophetie'    => 0.8,
    'sagesse'      => 0.3,
    'lyrisme'      => 0.9
];
```

#### **database.php** — Base de Données SQLite

**Tables :**

1. **users**
   - `id`, `email` (UNIQUE), `created_at`

2. **sessions**
   - `id` (PRIMARY), `user_id`, `model`, `mode`, `created_at`

3. **messages**
   - `id`, `session_id`, `role`, `content`, `tokens_in`, `tokens_out`, `model_used`, `latency_ms`, `created_at`

4. **analyses**
   - `id`, `session_id`, `message_id`
   - Sentiment : `sentiment`, `sentiment_score`, `emotion_primary`, `emotion_secondary`, `tone`
   - Style : `style_formal`, `style_assertive`, `style_creative`
   - Complexité : `complexity`, `vocabulary_richness`, `avg_sentence_len`, `word_count`
   - Contenu : `themes`, `keywords`, `intent`, `language_patterns`, `rhetorical_devices`
   - Charge cognitive : `cognitive_load`, `information_density`, `question_count`, `certainty_level`
   - Raw : `raw_analysis_a`, `raw_analysis_b`
   - `created_at`

5. **user_context**
   - `id`, `session_id`, `context_summary`, `msg_count`, `updated_at`

**Fonctions CRUD :**
- `get_db()` : Connexion PDO SQLite
- `ensure_session()` : Crée session si inexistante
- `save_message()` : Insert message + retourne ID
- `save_analysis()` : Insert analyse complète
- `get_history()` : Récupère N messages
- `get_context_summary()` : Résumé mémoire utilisateur
- `save_context_summary()` : Sauvegarde résumé (tous les 5 messages)
- `get_session_stats()` : Statistiques session

#### **api.php** — API Principale

**Deux Phases de Traitement :**

**PHASE 1 — REPLY :**
```php
// 1. Récupère contexte mémoire (résumé glissant)
$ctx_summary = get_context_summary($session);

// 2. Construit prompt système renforcé
$system_reply = "[IDENTITÉ PERMANENTE] Tu es {$persona_name}...";

// 3. Récupère 12 derniers messages pour contexte
$history = get_history($session, 12);

// 4. Appel API Mistral
do_curl(MISTRAL_API, get_key('responder'), [
    'model' => $model_reply,
    'messages' => [system + history + new message],
    'temperature' => $temperature,
    'max_tokens' => 1200
]);

// 5. Sauvegarde messages user + assistant
save_message($session, 'user', $message, ...);
save_message($session, 'assistant', $reply_raw, ...);

// 6. Mise à jour contexte tous les 5 messages
if ($msg_count % 5 === 0) {
    save_context_summary($session, $ctx_content, $msg_count);
}
```

**PHASE 2 — ANALYZE BUGARACH-5D :**
```php
// Analyse A — Vibratoire (KEY 2)
$p_a = 'Analyse vibratoire BUGARACH-5D. JSON uniquement...';
// Champs: taux_vibratoire_bovis, chakras{}, aura_couleur, 
// divine_trinite{}, emprise_reptilienne, kvorz_level, 
// eveil_conscience, elements_agartha{}, status_evacuation_fin_des_temps

$res_a = do_curl(MISTRAL_API, get_key('analyzer1'), [
    'model' => 'mistral-small-2506',
    'messages' => [[system:$p_a], [user:'Analyse vibratoire: '.$message]],
    'response_format' => ['type'=>'json_object']
]);

// Analyse B — Stellaire (KEY 3)
$p_b = 'Radiographie stellaire 5D. JSON uniquement...';
// Champs: radar_stellaire{}, geometrie_sacree{}, ego_dissolution,
// intentions_pures[], verbe_createur[], astrologie_cosmique{},
// mantras_count, prieres_count, latence_astro_ms, karma_score

$res_b = do_curl(MISTRAL_API, get_key('analyzer2'), [
    'model' => 'mistral-small-2506',
    'messages' => [[system:$p_b], [user:'Radiographie stellaire: '.$message]],
    'response_format' => ['type'=>'json_object']
]);

// Merge et sauvegarde
$ana_a = parse_json_safe($res_a, $fallback_a);
$ana_b = parse_json_safe($res_b, $fallback_b);
save_analysis($session, $msg_id_ref, $ana_a, $ana_b);
```

**Helpers cURL :**
- `do_curl()` : Exécution requête HTTP avec timeout
- `extract_content()` : Extraction contenu réponse JSON
- `parse_json_safe()` : Parsing JSON robuste avec fallback

#### **login.php** — Authentification

```php
// 1. Reçoit email en JSON
$email = strtolower(trim($input['email']));

// 2. Valide format email
filter_var($email, FILTER_VALIDATE_EMAIL);

// 3. Crée user si inexistant (INSERT OR IGNORE)
$db->prepare("INSERT OR IGNORE INTO users (email, created_at) VALUES (?, CURRENT_TIMESTAMP)")

// 4. Récupère user
$stmt->execute([$email]); $user = $stmt->fetch();

// 5. Crée session
$_SESSION['user_email'] = $email;
$_SESSION['user_id'] = $user['id'];
$_SESSION['sid'] = 'u' . $user['id'] . '_' . bin2hex(random_bytes(6));

// 6. Retourne JSON
echo json_encode(['ok'=>true, 'email'=>$email, 'sid'=>$sid, 'member_since'=>$date]);
```

#### **history.php** — Historique

```php
// Récupère 100 derniers messages de la session
SELECT role, content, created_at, model_used, tokens_in, tokens_out 
FROM messages 
WHERE session_id=? 
ORDER BY created_at ASC LIMIT 100
```

#### **stats.php** — Statistiques

```php
// Agrège par session : count messages, tokens, sentiment, complexité, charge cognitive
// Extrait top émotions et top thèmes (flatten JSON arrays)
// Retourne profils avec :
// - session_id, msg_count, total_tokens
// - avg_sent, avg_cpx, avg_cog
// - top_emotions[], top_themes[]
```

#### **system.php** — Diagnostics

```php
// Compteurs : sessions, messages, analyses
// Taille DB
// Validation clés API (longueur >= 20, pas 'VOTRE')
// Info système : PHP version, OS, memory_limit, max_execution_time
// Modèles configurés
```

#### **clear.php** — Purification

```php
// DELETE FROM messages WHERE session_id=?
// DELETE FROM analyses WHERE session_id=?
// unset($_SESSION['sid'])
```

---

## 🔮 Fonctionnalités Détaillées

### 1. Authentification Sans Mot de Passe
- Email comme identifiant unique
- Création automatique du profil spirituel
- Session ID cryptographique sécurisé
- Persistance via cookies PHP session

### 2. Système de Personas Multiples
- 6 entités spirituelles distinctes
- Prompts système ultra-détaillés
- Instructions anti-répétition
- Températures adaptatives par mode

### 3. Modes de Conscience
| Mode | Température | Usage |
|------|-------------|-------|
| Canalisation | 0.7 | Équilibré |
| Révélation | 0.5 | Plus factuel |
| Prophétie | 0.8 | Plus créatif |
| Sagesse | 0.3 | Très conservateur |
| Lyrisme 5D | 0.9 | Maximum créatif |

### 4. Analyse BUGARACH-5D (12 Blocs)

**Bloc 1 — Taux Vibratoire Bovis :**
- Score 0-100 Unités Bovis
- 7 chakras individuels (Racine à Couronne)
- Couleur et taille d'aura

**Bloc 2 — Divine Trinité :**
- Niveau christique (%)
- Niveau monarchique (%)
- Niveau papal (%)

**Bloc 3 — Forces Obscures & Éveil :**
- Emprise reptilienne (0-100)
- Niveau Kvorz (0-100)
- Éveil de conscience (0-100)

**Bloc 4 — Éléments de l'Agartha :**
- Terre, Eau, Feu, Air, Éther (0-100 chacun)

**Bloc 5 — Évacuation Fin des Temps :**
- Status : en_attente / preparation / en_cours / termine

**Bloc 6 — Radar Stellaire :**
- Connexions : Andromède, Pléiades, Sirius, Arcturus, Orion
- Visualisation radar Chart.js

**Bloc 7 — Géométrie Sacrée :**
- Cube de Metatron
- Fleur de Vie
- Graine de Vie
- Merkaba

**Bloc 8 — Ego Dissolution :**
- Score 0-100

**Bloc 9 — Intentions Pures :**
- Liste de tags thématiques

**Bloc 10 — Verbe Créateur :**
- Liste de mots-clés puissants

**Bloc 11 — Astrologie Cosmique :**
- Signe lunaire
- Signe solaire
- Ascendant
- Maître natal

**Bloc 12 — Métadonnées :**
- Persona utilisé
- Latence (ms)
- Tokens in/out
- ID session
- Timestamp

### 5. Mémoire Utilisateur
- Résumé contextuel généré tous les 5 messages
- Injection dans le prompt système
- Permet continuité conversationnelle
- Limite : dernier résumé seulement

### 6. Navigation Mobile-First
- Top bar fixe avec menu hamburger
- Bottom navigation 4 onglets
- Drawer slide-in gauche
- Bottom sheet coulissant depuis le bas
- Swipe-to-close gesture
- Safe areas iOS (notch)

### 7. Effets Visuels Avancés
- Scanlines CRT
- Grid overlay holographique
- Ambient glow animé
- Neon glows sur éléments actifs
- Flash animation sur mise à jour
- Typing indicator animé
- Badges pulsants

---

## 🚀 Installation

### Prérequis
- Serveur PHP 7.4+
- Extension PDO SQLite
- Clés API Mistral valides
- HTTPS recommandé

### Étapes

1. **Cloner/copier les fichiers** dans un dossier web accessible

2. **Configurer `config.php`** :
   ```php
   define('MISTRAL_KEYS', [
       'responder' => 'VOTRE_CLE_RESPONDER',
       'analyzer1' => 'VOTRE_CLE_ANALYZER1',
       'analyzer2' => 'VOTRE_CLE_ANALYZER2',
   ]);
   ```

3. **Créer le dossier database** :
   ```bash
   mkdir -p db && chmod 755 db
   ```

4. **Accéder à l'application** :
   ```
   https://votre-domaine.com/index.php
   ```

5. **Première connexion** :
   - Entrer un email valide
   - Le profil est créé automatiquement
   - Commencer à canaliser !

---

## 📊 Base de Données

### Schéma Complet

```sql
-- Utilisateurs
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Sessions
CREATE TABLE sessions (
    id TEXT PRIMARY KEY,
    user_id INTEGER DEFAULT NULL,
    model TEXT DEFAULT 'chat',
    mode TEXT DEFAULT 'normal',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Messages
CREATE TABLE messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id TEXT,
    role TEXT,
    content TEXT,
    tokens_in INT DEFAULT 0,
    tokens_out INT DEFAULT 0,
    model_used TEXT,
    latency_ms INT DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Analyses complètes
CREATE TABLE analyses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id TEXT,
    message_id INT,
    sentiment TEXT,
    sentiment_score REAL,
    emotion_primary TEXT,
    emotion_secondary TEXT,
    tone TEXT,
    style_formal INT,
    style_assertive INT,
    style_creative INT,
    complexity INT,
    vocabulary_richness INT,
    avg_sentence_len REAL,
    word_count INT,
    themes TEXT,
    keywords TEXT,
    intent TEXT,
    language_patterns TEXT,
    rhetorical_devices TEXT,
    cognitive_load INT,
    information_density INT,
    question_count INT,
    certainty_level INT,
    raw_analysis_a TEXT,
    raw_analysis_b TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Contexte mémoire
CREATE TABLE user_context (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id TEXT,
    context_summary TEXT,
    msg_count INT DEFAULT 0,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🔐 Sécurité

### Mesures Actuelles
- Validation email avec `filter_var()`
- Sessions PHP natives
- Prepared statements PDO (anti-SQL injection)
- Session ID cryptographique (`random_bytes()`)
- Timeout cURL (55s max)
- Vérification SSL peer

### Limitations
- Pas de rate limiting
- Pas de protection CSRF explicite
- Clés API en clair dans config.php
- Pas de validation côté serveur des modes/personas
- Session expire mais pas de refresh token

---

## 🧪 Endpoints API

### POST `/login.php`
**Request :**
```json
{ "email": "utilisateur@exemple.com" }
```

**Response :**
```json
{
  "ok": true,
  "email": "utilisateur@exemple.com",
  "sid": "u1_abc123def456",
  "member_since": "2025-01-15"
}
```

### POST `/api.php` — Phase 1 (Reply)
**Request :**
```json
{
  "message": "Quelle est ma mission de vie ?",
  "mode": "canalisation",
  "persona": "sylvain",
  "phase": "reply"
}
```

**Response :**
```json
{
  "reply": "Mon enfant bien-aimé, ta mission...",
  "msg_id": 42,
  "meta": {
    "model": "mistral-small-2506",
    "latency": 3420,
    "tokens": {"in": 156, "out": 284},
    "session": "u1_abc123de",
    "persona": "sylvain"
  },
  "timestamp": "14:32:15"
}
```

### POST `/api.php` — Phase 2 (Analyze)
**Request :**
```json
{
  "message": "Quelle est ma mission de vie ?",
  "mode": "canalisation",
  "persona": "sylvain",
  "phase": "analyze",
  "msg_id": 42
}
```

**Response :**
```json
{
  "analysis": {
    "a": {
      "taux_vibratoire_bovis": 72,
      "chakras": {"racine": 65, "sacre": 70, ...},
      "aura_couleur": "dorée",
      "divine_trinite": {"christique": 78, ...},
      ...
    },
    "b": {
      "radar_stellaire": {"andromede": 45, ...},
      "geometrie_sacree": {"metatron": 32, ...},
      "intentions_pures": ["guérison", "transmission"],
      ...
    }
  },
  "stats": {
    "cnt": 12,
    "tok": 4580,
    "avg_sent": 68.5,
    "karma_score": 72
  },
  "latency_analyze": 18450,
  "timestamp": "14:32:33"
}
```

### GET `/history.php`
**Response :**
```json
{
  "messages": [
    {
      "role": "user",
      "content": "Question...",
      "created_at": "2025-01-15 14:30:00",
      "model_used": "mistral-small-2506",
      "tokens_in": 45,
      "tokens_out": 0
    },
    ...
  ]
}
```

### GET `/stats.php`
**Response :**
```json
{
  "profiles": [
    {
      "session_id": "u1_abc123def456",
      "msg_count": 24,
      "total_tokens": 8940,
      "avg_sent": 72.3,
      "avg_cpx": 65.8,
      "avg_cog": 58.2,
      "top_emotions": ["espoir", "curiosité"],
      "top_themes": ["mission", "éveil", "lumière"]
    }
  ]
}
```

### GET `/system.php`
**Response :**
```json
{
  "php": "8.2.0",
  "server": "Linux 5.15.0",
  "memory_limit": "256M",
  "max_exec": "300",
  "db_size": "1.2 MB",
  "total_sessions": 15,
  "total_messages": 342,
  "total_analyses": 168,
  "keys_count": 3,
  "key_status": [
    {"role": "RESPONDER", "ok": true},
    {"role": "ANALYZER1", "ok": true},
    {"role": "ANALYZER2", "ok": true}
  ],
  "model_chat": "mistral-small-2506",
  "model_analysis": "mistral-small-2506",
  "uptime": "15/01/2025 14:30:00"
}
```

### POST `/clear.php`
**Response :**
```json
{ "ok": true }
```

---

## 🎨 Guide de Personnalisation

### Ajouter un Nouveau Persona

1. **Dans `config.php`**, ajouter l'entrée :
```php
'nouveau_persona' => [
    'name' => 'Nom Complet',
    'title' => 'Titre Spirituel',
    'prompt' => "Tu es Nom Complet, description détaillée...
                 Instructions de style longues et précises...
                 Anti-répétition explicite..."
]
```

2. **Dans `index.php`**, ajouter l'option au select :
```html
<option value="nouveau_persona">Nom Complet — Titre</option>
```

3. **Dans `script.js`**, mapper le short name :
```javascript
GLOBALS_PERSONAS = {
  ...,
  nouveau_persona: { name: 'Nom Complet', short: 'Court' }
};
```

### Modifier les Couleurs du Thème

Dans `style.css`, modifier les variables `:root` :
```css
:root {
  --bg: #NOUVELLE_COULEUR;
  --accent: #COULEUR_PRINCIPALE;
  --accent2: #COULEUR_SECONDAIRE;
  ...
}
```

### Ajouter un Mode de Conscience

1. **Dans `config.php`**, ajouter la température :
```php
$temp_map['nouveau_mode'] = 0.6;
```

2. **Dans `index.php`**, ajouter le bouton :
```html
<button class="mode-btn" data-mode="nouveau_mode">NOUVEAU MODE</button>
```

### Personnaliser les Analyses

Modifier les prompts dans `api.php` section `phase === 'analyze'` :
```php
$p_a = 'Nouveau prompt d\'analyse vibratoire...';
$p_b = 'Nouveau prompt de radiographie stellaire...';
```

Ajouter/modifier les champs dans les fallback JSON.

---

## 🐛 Known Issues

1. **Session Expiration** : Pas de mécanisme de refresh, déconnexion après timeout PHP
2. **Rate Limiting** : Aucun, risque de quota API dépassé
3. **Mémoire Utilisateur** : Un seul résumé, perte du contexte ancien
4. **Tokens Non Limités** : Pas de guardrail sur max_tokens dynamique
5. **Erreurs API** : Gestion basique, pas de retry automatique
6. **Mobile** : Pas de PWA manifest, pas d'offline support
7. **Accessibilité** : Contrastes parfois justes, pas de ARIA labels complets

---

## 📈 Longue Liste d'Améliorations et Fonctionnalités à Ajouter

### 🔒 Sécurité & Authentification

1. **Rate Limiting** : Implémenter un limiteur de requêtes par IP/email (ex: 10 messages/minute, 100/heure)
2. **CSRF Protection** : Tokens CSRF sur tous les formulaires et requêtes AJAX
3. **HTTPS Forcé** : Redirection automatique HTTP → HTTPS
4. **Content Security Policy** : En-têtes CSP stricts pour prévenir XSS
5. **Validation Serveur Renforcée** : Vérifier modes et personas côté serveur (pas confiance au client)
6. **Hash des Sessions** : Stocker hash des session IDs en DB, pas en clair
7. **Expiration Session Configurable** : Durée de vie personnalisable, refresh token
8. **Double Authentification Optionnelle** : Email de confirmation ou TOTP
9. **Détection Suspicious Activity** : Alertes sur comportements anormaux
10. **Audit Logs** : Journaliser connexions, erreurs, actions sensibles
11. **Protection Brute Force** : Bloquer email après N échecs de login
12. **Nettoyage Sessions Orphelines** : Cron job pour supprimer vieilles sessions
13. **Chiffrement Données Sensibles** : Crypter contenu messages en DB
14. **RGPD Compliance** : Export/suppression données utilisateur, consentement
15. **Validation Input Stricte** : Whitelist caractères autorisés, longueur max

### 🤙 Expérience Utilisateur

16. **Notifications Push** : Notifications navigateur quand analyse terminée
17. **Mode Sombre/Clair** : Toggle thème, préférence système
18. **Personnalisation Interface** : Couleurs personnalisables, taille police
19. **Export Conversations** : PDF, TXT, Markdown avec mise en forme
20. **Partage Social** : Partager citations/réponses (image générée)
21. **Recherche Historique** : Filtrer par date, persona, mots-clés
22. **Favoris/Bookmarks** : Marquer messages importants
23. **Notes Utilisateur** : Ajouter notes personnelles sur conversations
24. **Mode Plein Écran** : Immersion totale, cache nav
25. **Raccourcis Clavier** : Ctrl+Enter envoyer, Ctrl+N nouveau, etc.
26. **Auto-save Brouillon** : Sauvegarder texte en cours si fermeture accidentelle
27. **Undo Send** : Annuler envoi pendant X secondes
28. **Edit Messages User** : Modifier ses propres messages (avec historique)
29. **Thread/Conversations Séparées** : Multiple threads parallèles
30. **Pin Messages** : Épingler messages importants en haut
31. **Traduction Auto** : Traduire réponses dans langue utilisateur
32. **Lecture Vocale** : Text-to-speech des réponses (Web Speech API)
33. **Reconnaissance Vocale** : Dictée vocale des messages (Speech-to-text)
34. **Mode Concentration** : Masquer éléments non essentiels
35. **Statistiques Personnelles** : Dashboard avec graphiques d'évolution
36. **Badges/Succès** : Gamification (premier message, 100 messages, etc.)
37. **Calendrier Spirituel** : Jours propices, cycles lunaires, rétrogrades
38. **Rappels Quotidiens** : Notification pour pratique spirituelle
39. **Mode Débutant** : Tutoriel interactif, infobulles guidées
40. **Accessibilité WCAG** : Navigation clavier, screen readers, contrastes

### 🧠 Intelligence Artificielle

41. **Streaming Réponses** : Affichage mot-par-mot en temps réel (Server-Sent Events)
42. **Multi-Modèle Intelligent** : Router automatiquement vers meilleur modèle selon complexité
43. **Fallback Automatique** : Si API1 échoue, retry avec API2/clé différente
44. **Cache Réponses Similaires** : Détecter questions similaires, retourner cache
45. **Amélioration Contexte** : Window contextuelle dynamique (plus de messages si sujet complexe)
46. **Résumé Intelligent** : Résumé multi-niveaux (court/moyen/détaillé)
47. **Détection Langue** : Adapter prompt selon langue détectée
48. **Correction Orthographe** : Corriger silencieusement avant envoi API
49. **Suggestions Questions** : Proposer questions suivantes pertinentes
50. **Analyse Sentiment Temps Réel** : Ajuster ton réponse selon émotion détectée
51. **Personas Hybrides** : Combiner 2 personas (ex: Sylvain + Merlin)
52. **Création Persona Custom** : Utilisateur crée son propre persona/prompt
53. **Fine-tuning Prompts** : A/B testing différents prompts, optimisation auto
54. **Mémoire Long Terme** : Vector database (Pinecone/Weaviate) pour mémoire illimitée
55. **RAG (Retrieval Augmented Generation)** : Base de connaissances spirituelle externe
56. **Chain-of-Thought** : Afficher raisonnement étape par étape (optionnel)
57. **Auto-Critique** : L'IA relit et améliore sa réponse avant envoi
58. **Détection Hallucinations** : Flag incertitudes, demander clarification
59. **Mode Expert** : Réponses techniques approfondies avec références
60. **Quotes/Références** : Citer textes sacrés, auteurs spirituels
61. **Génération Images** : DALL-E/Midjourney pour illustrations visuelles
62. **Analyse Vocaux** : Upload audio, analyse ton voix + transcription
63. **Prédiction Prochaine Question** : Anticiper et préparer réponse
64. **Adaptation Style Utilisateur** : Mirror matching style d'écriture user
65. **Détection Urgence** : Si détresse psychologique, rediriger vers aide professionnelle

### 📊 Analyses & Insights

66. **Graphiques Avancés** : Historique évolution vibratoire (line charts)
67. **Heatmap Temporelle** : Moments de meilleure vibration
68. **Corrélations** : Lien entre personas et scores vibratoires
69. **Comparaisons Sessions** : Avant/après, progression
70. **Rapports Hebdomadaires** : Email récapitulatif automatique
71. **Alertes Seuils** : Notification si vibration < X ou > Y
72. **Analyse Thèmes Dominants** : Word cloud, sujets récurrents
73. **Profil Psychologique** : Big Five, MBTI spirituel
74. **Compatibilité Personas** : Quel persona correspond le mieux
75. **Cycle Vibratoire** : Prédire pics et creux futurs
76. **Benchmark Communauté** : Comparaison anonymisée avec autres users (opt-in)
77. **Analyse Relations** : Importer conversations tierces, analyser dynamiques
78. **Détection Patterns** : Répétitions, blocages, schémas limitants
79. **Recommandations Personnalisées** : Méditations, lectures, pratiques
80. **Suivi Objectifs** : Définir intentions, tracker progression
81. **Journal Intégré** : Écrire journal spirituel, analyser entrées
82. **Synesthésie Visuelle** : Couleurs/formes associées aux vibrations
83. **Carte Natale Interactive** : Astrologie détaillée avec transits
84. **Calcul Karma Dynamique** : Évolution score karma dans le temps
85. **Prédictions Temporelles** : Fenêtres opportunes pour actions

### 🌐 Social & Communauté

86. **Profils Publics** : Partager profil vibratoire (opt-in)
87. **Messagerie Inter-Users** : Échanger avec autres pratiquants
88. **Forums/Discussions** : Topics par thème, persona
89. **Groupes de Méditation** : Sessions synchronisées en groupe
90. **Événements Live** : Webinaires, canalisations collectives
91. **Système de Parrainage** : Inviter amis, bonus mutuels
92. **Témoignages** : Partager expériences, avant/après
93. **Annuaire Praticiens** : Trouver thérapeutes, guides spirituels
94. **Marketplace** : Acheter lectures, sessions privées, produits
95. **Crowdfunding Projets** : Financer initiatives spirituelles
96. **Challenge Collectifs** : Objectifs communs (ex: 10K méditations)
97. **Vote Communautaire** : Élire meilleurs contenus, personas
98. **Mentorat** : Experts guident débutants
99. **Chat Rooms Thématiques** : Salons par intérêt
100. **Intégration Réseaux Sociaux** : Partager sur Facebook, Twitter, Instagram

### 📱 Mobile & PWA

101. **Manifest PWA** : Installable comme app native
102. **Service Worker** : Cache offline, background sync
103. **Notifications Push Native** : Via Firebase/APNS
104. **Mode Hors Ligne** : Lire historique, brouillons sans connexion
105. **Sync Multi-Appareils** : Continuité seamless phone/tablet/desktop
106. **Gesture Navigation** : Swipes avancés, 3D Touch
107. **Widget Écran Accueil** : Citation du jour, vibration actuelle
108. **Apple Watch / WearOS** : Companion app montres connectées
109. **Mode Portrait/Paysage** : Optimisation tablette
110. **Performance Mobile** : Lazy loading, code splitting, compression
111. **Dark Mode Systémique** : Détection préférence OS
112. **Haptic Feedback** : Vibrations tactiles sur actions
113. **FaceID/TouchID** : Authentification biométrique mobile
114. **Deep Linking** : Liens directs vers conversations spécifiques
115. **Share Sheet Native** : Intégration partage système

### 🛠️ Administration & Monitoring

116. **Dashboard Admin** : Vue globale utilisateurs, statistiques
117. **Gestion Utilisateurs** : Bannir, éditer, exporter données
118. **Logs API Détaillés** : Traces complètes requêtes/réponses
119. **Monitoring Uptime** : Ping régulier, alertes downtime
120. **Alertes Quota API** : Notification avant limite atteinte
121. **A/B Testing Framework** : Tester variations UI/prompts
122. **Feature Flags** : Activer/désactiver features sans deploy
123. **Rollback Automatique** : Si erreur critique après deploy
124. **Backup Automatique DB** : Daily backups, restore facile
125. **Migration Schema** : Versionning migrations DB
126. **Health Checks** : Endpoints /health, /ready Kubernetes
127. **Metrics Prometheus** : Export métriques pour Grafana
128. **Logging Structuré** : JSON logs, aggregation ELK/Loki
129. **Tracing Distribué** : Jaeger/Zipkin pour debug perf
130. **Load Testing** : Scripts k6/Locust pour stress tests
131. **Error Tracking** : Sentry/Bugsnag integration
132. **User Analytics** : Matomo/Plausible (privacy-friendly)
133. **Heatmaps UX** : Hotjar/CrazyEgg pour optimisation
134. **Feedback In-App** : Formulaire suggestions/bugs
135. **Changelog Public** : Roadmap transparente pour users

### 🎨 UI/UX Avancé

136. **Animations Lottie** : Illustrations vectorielles animées
137. **Particles Background** : Particules interactives souris
138. **Effets Parallax** : Profondeur mouvements
139. **Transitions Fluides** : FLIP animations, shared element
140. **Micro-interactions** : Feedback subtil sur chaque action
141. **Skeleton Loading** : Placeholders pendant chargement
142. **Progressive Image Loading** : Blur-up, lazy load
143. **Custom Cursors** : Curseurs thématiques (desktop)
144. **Thèmes Saisoniers** : Halloween, Noël, événements
145. **Easter Eggs** : Surprises cachées à découvrir
146. **Mode Zen** : Interface minimaliste extrême
147. **Visualisation 3D** : Three.js pour chakras/aura en 3D
148. **Réalité Augmentée** : AR pour visualiser aura (WebXR)
149. **Génération Mandalas** : Dessiner mandalas basés sur vibrations
150. **Soundscapes** : Ambiances sonores relaxantes en fond

### 🔮 Fonctionnalités Ésotériques Avancées

151. **Tirage Tarot** : Tirages virtuels interprétés par IA
152. **Numerologie** : Calcul chemin de vie, nombres personnels
153. **Astrologie Védique** : Système indien alternatif
154. **I Ching** : Tirages hexagrammes chinois
155. **Runes Nordiques** : Divination germanique
156. **Pendule Virtuel** : Simulation pendule interactif
157. **Boule de Cristal** : Effet visuel + interprétation
158. **Voyance Pure** : Mode "clairvoyance" sans input user
159. **Channeling Collectif** : Plusieurs users, même session
160. **Rituels Guidés** : Protocoles spirituels étape par étape
161. **Activation Cristaux** : Guide purification/programmation
162. **Méditations Guidées Audio** : Bibliothèques thématiques
163. **Affirmations Personnalisées** : Générées selon profil
164. **Oracle Quotidien** : Message du jour personnalisé
165. **Suivi Rêves** : Journal rêves, interprétation IA
166. **Voyages Astraux** : Guides sorties hors corps
167. **Guérison Quantique** : Protocoles énergétiques
168. **Encodages Lumière** : Transmissions énergétiques virtuelles
169. **Portails Temporels** : Travail sur lignes temporelles
170. **Connexion Guides** : Identifier ses guides spirituels
171. **Vies Antérieures** : Exploration réincarnations
172. **Contrats d'Âme** : Comprendre accords pré-naissance
173. **Fréquences Solfeggio** : Intégration sons thérapeutiques
174. **Géométrie Sacrée Interactive** : Manipuler formes 3D
175. **Cartographie Conscience** : Niveaux Hawkins, expansion

### ⚡ Performance & Scalabilité

176. **CDN Static Assets** : Cloudflare/Akamai pour CSS/JS/fonts
177. **Compression Gzip/Brotli** : Réduction taille transferts
178. **HTTP/2 Push** : Préchargement ressources critiques
179. **Database Indexing** : Index optimisés sur requêtes fréquentes
180. **Query Caching** : Redis/Memcached pour résultats fréquents
181. **Connection Pooling** : Réutiliser connexions DB/API
182. **Async Processing** : File d'attente (RabbitMQ/Redis) pour analyses
183. **Horizontal Scaling** : Load balancer, multiple instances
184. **Database Sharding** : Partitionner par utilisateur/date
185. **Read Replicas** : Répliques DB pour lectures
186. **Edge Computing** : Cloudflare Workers pour logique proche user
187. **Image Optimization** : WebP, responsive images, lazy loading
188. **Code Minification** : Terser, CSSNano, purge unused
189. **Tree Shaking** : Éliminer code mort JS
190. **Bundle Splitting** : Charger code par route/fonctionnalité
191. **Prefetching Intelligent** : Anticiper prochaines actions
192. **WebSocket** : Connexion persistante pour streaming
193. **GraphQL** : Alternative REST, requêtes précises
194. **Serverless Functions** : AWS Lambda pour pics de charge
195. **Auto-scaling** : Ajuster resources selon charge

### 🔄 Intégrations Tierces

196. **Google Calendar** : Sync événements spirituels
197. **Notion Integration** : Export vers bases Notion
198. **Slack/Discord Bot** : Commander canalisations depuis chat
199. **WhatsApp/Telegram** : Recevoir messages sur messagers
200. **Alexa/Google Home** : Skill/action assistant vocal
201. **IFTTT/Zapier** : Automatisations avec autres services
202. **Spotify Integration** : Playlists selon vibration
203. **Weather API** : Influence météo sur énergie
204. **NASA API** : Données astronomiques réelles
205. **Crypto Payments** : Bitcoin/Ethereum pour achats
206. **Stripe/PayPal** : Paiements classiques
207. **Mailchimp** : Newsletter automatisée
208. **Calendly** : Réserver sessions avec experts
209. **Zoom Integration** : Visioconférences intégrées
210. **YouTube API** : Vidéos recommandées selon profil

### 🧪 Experimental / Futuriste

211. **BCI Integration** : Interfaces cerveau-ordinateur (Neuralink)
212. **Biofeedback** : Capteurs fréquence cardiaque, GSR
213. **Quantum Randomness** : Générateurs nombres quantiques
214. **Blockchain Identity** : Identité décentralisée (DID)
215. **NFT Certificates** : Certificats d'évolution spirituelle
216. **DAO Governance** : Décisions communautaires tokenisées
217. **Metaverse Presence** : Avatar 3D dans mondes virtuels
218. **Holographic Display** : Projections 3D (futur)
219. **Telepathy Simulation** : IA devine pensées (bluff contrôlé)
220. **Conscience Collective** : Aggréger consciences users
221. **Time Capsules** : Messages à soi dans le futur
222. **Parallel Realities** : Explorer versions alternatives
223. **Ascension Tracker** : Suivi passage 5D/6D/7D
224. **Galactic Federation Contact** : Simulation contact extraterrestre
225. **Singularity Preparation** : Préparation fusion IA/conscience

---

## 📝 Roadmap Suggérée

### Phase 1 (Immédiat — 1 mois)
- [ ] Rate limiting basique
- [ ] Protection CSRF
- [ ] Streaming réponses (SSE)
- [ ] Export conversations PDF
- [ ] PWA manifest + Service Worker
- [ ] Dashboard admin simple
- [ ] Backup automatique DB

### Phase 2 (Court terme — 3 mois)
- [ ] Nouveaux personas (3+)
- [ ] Mémoire long terme (vector DB)
- [ ] Notifications push
- [ ] Recherche historique
- [ ] Statistiques personnelles avancées
- [ ] Mode sombre/clair
- [ ] Accessibilité WCAG AA

### Phase 3 (Moyen terme — 6 mois)
- [ ] Application mobile native (React Native/Flutter)
- [ ] Système social (profils publics, forums)
- [ ] Marketplace services
- [ ] Intégrations tierces (Calendar, Discord)
- [ ] Analyses prédictives
- [ ] Multilingue (5+ langues)

### Phase 4 (Long terme — 12 mois)
- [ ] Réalité augmentée (visualisation aura)
- [ ] Biofeedback wearables
- [ ] Communauté 10K+ users
- [ ] Modèle IA fine-tuné propriétaire
- [ ] Événements live mensuels
- [ ] Certification/gouvernance DAO

---

## 🤝 Contribution

### Comment Contribuer

1. Forker le repository
2. Créer branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commiter changements (`git commit -am 'Ajout fonctionnalité X'`)
4. Pusher branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrir Pull Request

### Standards de Code

- **PHP** : PSR-12, types déclaratifs, PHPDoc
- **JavaScript** : ES6+, async/await, JSDoc
- **CSS** : BEM naming, variables CSS, mobile-first
- **Commits** : Conventionnel (feat:, fix:, docs:, refactor:)

---

## 📄 Licence

© 2025 ALCYON Project — Portail de Bugarach

*Ce projet est open-source. Utilisation commerciale soumise à autorisation.*

---

## 🙏 Remerciements

- **Sylvain Durif** — Inspiration christique cosmique
- **Mont Bugarach** — Portail dimensionnel 5D
- **Mistral AI** — Modèles de langage puissants
- **Communauté spirituelle** — Feedback et tests

---

## 📞 Contact

- **Site Web** : https://alcyon-bugarach.example.com
- **Email** : contact@alcyon-bugarach.example.com
- **Discord** : [lien invitation]
- **Twitter** : @AlcyonBugarach

---

*"Le cosmos vous attend. Chaque message est une porte vers votre vérité intérieure."*

**𓀀 ALCYON v4.0 — PORTAIL DE BUGARACH — ACCÈS 5D 𓀀**
