# Folder Analyzer Web

A **pure client-side** web tool for analyzing local directory structures. Generate interactive tree views and downloadable JSON reports of folder hierarchies with optional file content extraction—all without uploading data to any server.

## ✨ Features

- 📂 **Recursive Directory Analysis**: explore nested folder structures
- 🌳 **Interactive Tree View**: expandable/collapsible visualization with file counts
- 📄 **Content Extraction**: optionally read text file contents (configurable size limit)
- 🚫 **Smart Filtering**: ignore common directories (`.git`, `node_modules`, etc.) and filter by file extension
- 💾 **JSON Export**: download complete structure reports for further processing
- 🔒 **100% Client-Side**: no backend, no uploads—your data never leaves your machine
- ⚡ **Zero Dependencies**: vanilla JavaScript, HTML, and CSS

## 🛠️ Tech Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Frontend** | Vanilla JavaScript (ES6+) | Core analysis logic |
| **File API** | `webkitdirectory` attribute | Local directory access |
| **UI** | HTML5 + CSS3 | Interactive tree and controls |
| **Build** | None | Static files—open `index.html` directly |

## 📁 Project Structure

```
folder-analyzer-web/
├── index.html        # Main application page
├── app.js            # Core analysis and tree rendering logic
├── style.css         # UI styling
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Modern browser with File System Access support:
  - ✅ Google Chrome 13+
  - ✅ Microsoft Edge 79+
  - ✅ Opera 15+
  - ⚠️ Firefox (limited support—may require manual file selection)
  - ❌ Safari (no `webkitdirectory` support)

### Usage

1. **Open the Tool**
   - Clone or download this repository
   - Open `index.html` in Chrome or Edge
   - Or deploy to any static host (GitHub Pages, Netlify, etc.)

2. **Select a Directory**
   - Click **"Choose a folder"**
   - Browser will prompt for directory access
   - Select the root folder you want to analyze

3. **Configure Options**
   - ☑️ **Extract file content**: read text files (respects size limit)
   - 📏 **Max content size**: bytes per file (default: 64KB, max: 10MB)
   - 🔤 **Extension filter**: comma-separated list (e.g., `js,py,md`)
   - 🚫 **Ignore folders**: comma-separated blacklist (default: `.git,node_modules,dist,build`)

4. **Analyze & Export**
   - Click **"Analyze"** to process the directory
   - View results in **Tree** (interactive) or **JSON** (raw data) tabs
   - Use **"Expand All"**/**"Collapse All"** to navigate tree view
   - Click **"Download JSON"** to save `structure.json` locally

## 📋 Output Format

### JSON Structure

```json
{
  "name": "my-project",
  "path": "my-project",
  "type": "directory",
  "children": [
    {
      "name": "src",
      "path": "my-project/src",
      "type": "directory",
      "children": [
        {
          "name": "index.js",
          "path": "my-project/src/index.js",
          "type": "file",
          "size": 1248,
          "content": "// File content if enabled..."
        }
      ]
    }
  ],
  "stats": {
    "totalFiles": 42,
    "totalDirs": 8,
    "totalSize": 156789,
    "processTimeMs": 234
  }
}
```

### Tree View

- **Folders**: 📁 icon, click to expand/collapse, show child count
- **Files**: 📄 icon, display size in human-readable format (KB/MB)
- **Stats Panel**: total files, directories, combined size, and analysis time

## ⚙️ Configuration

Edit default values in `app.js`:

```javascript
// Default max content size (bytes)
const DEFAULT_MAX_BYTES = 64000;

// Default ignored directories
const DEFAULT_IGNORE = ['.git', 'node_modules', 'dist', 'build', '.venv', '__pycache__'];

// Max allowed content size (10MB)
const MAX_CONTENT_LIMIT = 10 * 1024 * 1024;
```

## 🔒 Security & Privacy

- **No Server Communication**: all processing happens in your browser's JavaScript engine
- **No Data Storage**: no cookies, local storage, or analytics tracking
- **Temporary File Access**: browser releases file handles after analysis completes
- **Content Sanitization**: extracted text is displayed as plain text (no code execution)

### Security Considerations

- **Large Directories**: analyzing 10,000+ files may cause browser lag or memory issues
- **Binary Files**: content extraction skips binary data; enabling it for mixed directories is safe
- **Sensitive Data**: while private by design, avoid analyzing folders with secrets if sharing JSON output

## 🧪 Testing

Test with a sample project structure:

```
test-project/
├── README.md         (text file)
├── package.json      (JSON data)
├── src/
│   ├── index.js      (JavaScript)
│   └── utils.js
└── node_modules/     (will be ignored by default)
    └── ...
```

Expected outcome:
- Tree shows `test-project`, `src`, and individual files
- JSON includes content for `README.md`, `package.json`, and JS files (if size < limit)
- `node_modules` excluded from analysis

## 🗺️ Roadmap

- [ ] **File Search**: filter tree by filename or content
- [ ] **Syntax Highlighting**: preview code files with color coding
- [ ] **Git Integration**: show file status (modified, untracked) if `.git` present
- [ ] **Diff View**: compare two directory analyses
- [ ] **Export Formats**: add CSV, Markdown tree, or HTML report options
- [ ] **Theme Toggle**: dark mode support
- [ ] **Mobile Support**: responsive layout for tablets (limited by API support)

## 📄 License

This project is licensed under the **MIT License**. See [LICENSE](LICENSE) for details.

---

**Author**: Adam Beloucif  
**Repository**: [github.com/Adam-Blf/folder-analyzer-web](https://github.com/Adam-Blf/folder-analyzer-web)

For bug reports or feature requests, open an issue on GitHub.
