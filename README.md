[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/adambeloucif/) ![Visitor Badge](https://visitor-badge.laobi.icu/badge?page_id=Adam-Blf.folder-analyzer-web)


![Dernier commit](https://img.shields.io/github/last-commit/Adam-Blf/folder-analyzer-web?style=flat&logo=git&logoColor=white&color=0080ff&label=Dernier%20commit) ![Langage principal](https://img.shields.io/github/languages/top/Adam-Blf/folder-analyzer-web?style=flat&logo=git&logoColor=white&color=0080ff&label=Langage%20principal) ![Nombre de langages](https://img.shields.io/github/languages/count/Adam-Blf/folder-analyzer-web?style=flat&logo=git&logoColor=white&color=0080ff&label=Nombre%20de%20langages)

### Construit avec les outils et technologies : 

![JavaScript](https://img.shields.io/badge/-JavaScript-0080ff?style=flat) ![CSS](https://img.shields.io/badge/-CSS-0080ff?style=flat) ![HTML](https://img.shields.io/badge/-HTML-0080ff?style=flat)

🇫🇷 Français | 🇬🇧 Anglais | 🇪🇸 Espagnol | 🇮🇹 Italien | 🇵🇹 Portugais | 🇷🇺 Russe | 🇩🇪 Allemand | 🇹🇷 Turc

# Folder Analyzer Web - Analyseur de Structure de Dossiers / Folder Structure Analyzer

![Status](https://img.shields.io/badge/status-complete-brightgreen)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![Vercel](https://img.shields.io/badge/deploy-Vercel-000?logo=vercel&logoColor=white)

[🇫🇷 Version Française](#version-française) | [🇬🇧 English Version](#english-version)

---

## <a name="version-française"></a>🇫🇷 Version Française

Outil web **100% côté client** pour analyser les structures de répertoires locaux. Générez des vues arborescentes interactives et des rapports JSON téléchargeables des hiérarchies de dossiers avec extraction optionnelle du contenu des fichiers—le tout sans télécharger de données vers un serveur.

### ✨ Fonctionnalités

- 📂 **Analyse Récursive** : explorez les structures de dossiers imbriquées
- 🌳 **Vue Arborescente Interactive** : visualisation extensible/repliable avec compteurs de fichiers
- 📄 **Extraction de Contenu** : lecture optionnelle du contenu des fichiers texte (limite de taille configurable)
- 🚫 **Filtrage Intelligent** : ignore les répertoires courants (`.git`, `node_modules`, etc.) et filtre par extension
- 💾 **Export JSON** : téléchargez des rapports de structure complets pour traitement ultérieur
- 🔒 **100% Côté Client** : aucun backend, aucun téléversement—vos données ne quittent jamais votre machine
- ⚡ **Zéro Dépendances** : JavaScript vanilla, HTML et CSS

### 🛠️ Stack Technologique

| Composant | Technologie | Objectif |
|-----------|-------------|----------|
| **Frontend** | JavaScript Vanilla (ES6+) | Logique d'analyse principale |
| **File API** | Attribut `webkitdirectory` | Accès aux répertoires locaux |
| **UI** | HTML5 + CSS3 | Arborescence interactive et contrôles |
| **Build** | Aucun | Fichiers statiques—ouvrez `index.html` directement |

### 📁 Structure du Projet

```
folder-analyzer-web/
├── index.html        # Page d'application principale
├── app.js            # Logique d'analyse et de rendu d'arborescence
├── style.css         # Style UI
└── README.md
```

### 🚀 Démarrage Rapide

#### Prérequis

- Navigateur moderne avec support File System Access :
  - ✅ Google Chrome 13+
  - ✅ Microsoft Edge 79+
  - ✅ Opera 15+
  - ⚠️ Firefox (support limité—peut nécessiter sélection manuelle)
  - ❌ Safari (pas de support `webkitdirectory`)

#### Utilisation

1. **Ouvrir l'Outil** : ouvrez `index.html` dans Chrome ou Edge
2. **Sélectionner Répertoire** : cliquez **"Choose a folder"**
3. **Configurer Options** :
   - ☑️ Extraire contenu fichiers
   - 📏 Taille max contenu (défaut: 64KB)
   - 🔤 Filtre d'extensions (ex: `js,py,md`)
   - 🚫 Ignorer dossiers (défaut: `.git,node_modules`)
4. **Analyser & Exporter** : cliquez **"Analyze"** → téléchargez JSON

### 🔒 Sécurité

- **Traitement Local** : aucune donnée n'est envoyée à un serveur
- **Accès Navigateur** : nécessite autorisation utilisateur explicite
- **Confidentialité** : aucun suivi, aucune analytique, aucun cookie

### 🗺️ Feuille de Route

- [ ] Support Safari (alternatives File API)
- [ ] Export CSV/XML
- [ ] Statistiques avancées (tailles, dates)
- [ ] Comparaison de structures
- [ ] Mode sombre
- [ ] Historique de sessions

---

## <a name="english-version"></a>🇬🇧 English Version

A **pure client-side** web tool for analyzing local directory structures. Generate interactive tree views and downloadable JSON reports of folder hierarchies with optional file content extraction—all without uploading data to any server.

### ✨ Features

- 📂 **Recursive Directory Analysis**: explore nested folder structures
- 🌳 **Interactive Tree View**: expandable/collapsible visualization with file counts
- 📄 **Content Extraction**: optionally read text file contents (configurable size limit)
- 🚫 **Smart Filtering**: ignore common directories (`.git`, `node_modules`, etc.) and filter by file extension
- 💾 **JSON Export**: download complete structure reports for further processing
- 🔒 **100% Client-Side**: no backend, no uploads—your data never leaves your machine
- ⚡ **Zero Dependencies**: vanilla JavaScript, HTML, and CSS

### 🛠️ Tech Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Frontend** | Vanilla JavaScript (ES6+) | Core analysis logic |
| **File API** | `webkitdirectory` attribute | Local directory access |
| **UI** | HTML5 + CSS3 | Interactive tree and controls |
| **Build** | None | Static files—open `index.html` directly |

### 📁 Project Structure

```
folder-analyzer-web/
├── index.html        # Main application page
├── app.js            # Core analysis and tree rendering logic
├── style.css         # UI styling
└── README.md
```

### 🚀 Quick Start

#### Prerequisites

- Modern browser with File System Access support:
  - ✅ Google Chrome 13+
  - ✅ Microsoft Edge 79+
  - ✅ Opera 15+
  - ⚠️ Firefox (limited support—may require manual file selection)
  - ❌ Safari (no `webkitdirectory` support)

#### Usage

1. **Open Tool**: open `index.html` in Chrome or Edge
2. **Select Directory**: click **"Choose a folder"**
3. **Configure Options**:
   - ☑️ Extract file content
   - 📏 Max content size (default: 64KB)
   - 🔤 Extension filter (e.g., `js,py,md`)
   - 🚫 Ignore folders (default: `.git,node_modules`)
4. **Analyze & Export**: click **"Analyze"** → download JSON

### 🔒 Security

- **Local Processing**: no data sent to servers
- **Browser Access**: requires explicit user permission
- **Privacy**: no tracking, no analytics, no cookies

### 🗺️ Roadmap

- [ ] Safari support (File API alternatives)
- [ ] CSV/XML export
- [ ] Advanced statistics (sizes, dates)
- [ ] Structure comparison
- [ ] Dark mode
- [ ] Session history

### 📄 License

This project is open source. See LICENSE file for details.

---

**Author**: Adam Beloucif  
**Repository**: [github.com/Adam-Blf/folder-analyzer-web](https://github.com/Adam-Blf/folder-analyzer-web)

For bug reports or feature requests, open an issue on GitHub.

---

<p align="center">
  <sub>Par <a href="https://adam.beloucif.com">Adam Beloucif</a> · Data Engineer & Fullstack Developer · <a href="https://github.com/Adam-Blf">GitHub</a> · <a href="https://www.linkedin.com/in/adambeloucif/">LinkedIn</a></sub>
</p>
