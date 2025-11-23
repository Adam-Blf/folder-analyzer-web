/* Folder Analyzer Web avec arborescence interactive - Adam Beloucif */

const dirPicker = document.getElementById("dirPicker");
const withContent = document.getElementById("withContent");
const maxBytesEl = document.getElementById("maxBytes");
const extFilterEl = document.getElementById("extFilter");
const ignoreListEl = document.getElementById("ignoreList");
const analyzeBtn = document.getElementById("analyzeBtn");
const downloadBtn = document.getElementById("downloadBtn");
const output = document.getElementById("output");
const statsEl = document.getElementById("stats");

const tabTree = document.getElementById("tabTree");
const tabJson = document.getElementById("tabJson");
const treeView = document.getElementById("treeView");
const treeEl = document.getElementById("tree");
const expandAllBtn = document.getElementById("expandAllBtn");
const collapseAllBtn = document.getElementById("collapseAllBtn");
const themeToggle = document.getElementById("themeToggle");

// Theme Management
if (localStorage.getItem('theme') === 'light') {
  document.body.classList.add('light-mode');
  if(themeToggle) themeToggle.textContent = '☀️';
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    themeToggle.textContent = isLight ? '☀️' : '🌙';
  });
}

let lastJson = null;

tabTree.addEventListener("click", () => {
  tabTree.classList.add("active");
  tabJson.classList.remove("active");
  treeView.classList.remove("hidden");
  output.classList.add("hidden");
});
tabJson.addEventListener("click", () => {
  tabJson.classList.add("active");
  tabTree.classList.remove("active");
  output.classList.remove("hidden");
  treeView.classList.add("hidden");
});

analyzeBtn.addEventListener("click", async () => {
  const files = Array.from(dirPicker.files || []);
  if (!files.length) {
    alert("Sélectionne un dossier avant d’analyser.");
    return;
  }

  const opts = {
    withContent: withContent.checked,
    maxBytes: Math.min(Math.max(parseInt(maxBytesEl.value, 10) || 64000, 1024), 10 * 1024 * 1024),
    exts: parseList(extFilterEl.value),
    ignoreSegs: parseList(ignoreListEl.value),
  };

  const t0 = performance.now();
  const result = await buildTreeFromFileList(files, opts);
  const json = {
    analyzedAt: new Date().toISOString(),
    root: inferRootName(files),
    options: opts,
    tree: result
  };
  lastJson = json;

  // JSON brut
  output.textContent = JSON.stringify(json, null, 2);

  // Vue arborescente
  renderTree(result, json.root);

  const t1 = performance.now();
  statsEl.textContent = `Fichiers: ${files.length} • Temps: ${(t1 - t0).toFixed(0)} ms`;
  downloadBtn.disabled = false;
  expandAllBtn.disabled = false;
  collapseAllBtn.disabled = false;
});

downloadBtn.addEventListener("click", () => {
  if (!lastJson) return;
  const blob = new Blob([JSON.stringify(lastJson, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${sanitizeFilename(lastJson.root || "folder")}-structure.json`;
  a.click();
  URL.revokeObjectURL(url);
});

expandAllBtn.addEventListener("click", () => {
  treeEl.querySelectorAll("details").forEach(d => d.open = true);
});
collapseAllBtn.addEventListener("click", () => {
  treeEl.querySelectorAll("details").forEach(d => d.open = false);
});

/* Helpers */
function parseList(s) { return s ? s.split(",").map(x => x.trim()).filter(Boolean) : []; }
function sanitizeFilename(name) { return name.replace(/[\\/:*?"<>|]+/g, "_"); }
function inferRootName(files) {
  const f = files[0];
  return f && f.webkitRelativePath ? f.webkitRelativePath.split("/")[0] : "root";
}

function formatBytes(n) {
  if (n < 1024) return `${n} o`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} Ko`;
  if (n < 1024 * 1024 * 1024) return `${(n / 1024 / 1024).toFixed(1)} Mo`;
  return `${(n / 1024 / 1024 / 1024).toFixed(1)} Go`;
}

/* Construction de l’arbre depuis FileList */
async function buildTreeFromFileList(files, opts) {
  const rootName = inferRootName(files);
  const root = { type: "directory", name: rootName, children: [] };
  const dirMap = new Map([[rootName, root]]);
  files.sort((a, b) => a.webkitRelativePath.localeCompare(b.webkitRelativePath, "fr"));

  for (const f of files) {
    const rel = f.webkitRelativePath || f.name;
    if (opts.ignoreSegs.some(seg => rel.split("/").includes(seg))) continue;

    const parts = rel.split("/");
    let currKey = rootName;
    let currNode = dirMap.get(currKey);

    for (let i = 1; i < parts.length - 1; i++) {
      const seg = parts[i];
      const nextKey = currKey + "/" + seg;
      if (!dirMap.has(nextKey)) {
        const dn = { type: "directory", name: seg, children: [] };
        currNode.children.push(dn);
        dirMap.set(nextKey, dn);
      }
      currKey = nextKey;
      currNode = dirMap.get(nextKey);
    }

    const fileName = parts[parts.length - 1];
    const node = await fileNodeFromFile(f, fileName, opts);
    currNode.children.push(node);
  }
  return root;
}

async function fileNodeFromFile(file, name, opts) {
  const ext = name.includes(".") ? name.slice(name.lastIndexOf(".")) : "";
  const node = { type: "file", name, extension: ext, size: file.size };

  if (opts.withContent && (opts.exts.length === 0 || opts.exts.includes(ext))) {
    try {
      const buf = await readAsArrayBuffer(file.slice(0, opts.maxBytes));
      const arr = new Uint8Array(buf);
      if (looksLikeText(arr)) {
        const dec = new TextDecoder("utf-8");
        node.text = dec.decode(arr);
        node.truncated = file.size > opts.maxBytes;
      } else {
        node.binary = true;
        node.previewBytes = arr.length;
      }
    } catch (e) {
      node.readError = e.message;
    }
  }
  return node;
}

function readAsArrayBuffer(blob) {
  return new Promise((res, rej) => {
    const fr = new FileReader();
    fr.onload = () => res(fr.result);
    fr.onerror = () => rej(fr.error || new Error("FileReader error"));
    fr.readAsArrayBuffer(blob);
  });
}

function looksLikeText(u8) {
  const n = Math.min(2048, u8.length);
  if (n === 0) return true;
  let ctrl = 0;
  for (let i = 0; i < n; i++) {
    const b = u8[i];
    if (b === 0) return false;
    if (b < 32 && ![9, 10, 13].includes(b)) ctrl++;
  }
  return ctrl / n < 0.03;
}

/* Rendu de l’arborescence avec <details>/<summary> */
function renderTree(tree, rootName) {
  treeEl.innerHTML = "";
  const rootDetails = document.createElement("details");
  rootDetails.open = true;

  const rootSummary = document.createElement("summary");
  rootSummary.className = "folder";
  rootSummary.innerHTML = `${escapeHtml(rootName)} <span class="badge">dossier</span>`;
  rootDetails.appendChild(rootSummary);

  const container = document.createElement("div");
  rootDetails.appendChild(container);
  treeEl.appendChild(rootDetails);

  appendChildren(container, tree.children);
}

function appendChildren(container, children = []) {
  for (const node of children) {
    if (node.type === "directory") {
      const det = document.createElement("details");
      const sum = document.createElement("summary");
      sum.className = "folder";
      sum.innerHTML = `${escapeHtml(node.name)} <span class="badge">dossier</span>`;
      det.appendChild(sum);

      const inner = document.createElement("div");
      det.appendChild(inner);
      container.appendChild(det);

      appendChildren(inner, node.children || []);
    } else if (node.type === "file") {
      const line = document.createElement("div");
      line.className = "file";
      const meta = [];
      if (node.extension) meta.push(node.extension);
      if (typeof node.size === "number") meta.push(formatBytes(node.size));
      const metaStr = meta.length ? `<span class="meta">(${meta.join(", ")})</span>` : "";
      line.innerHTML = `${escapeHtml(node.name)} ${metaStr}`;
      container.appendChild(line);
    } else {
      const line = document.createElement("div");
      line.textContent = node.name;
      container.appendChild(line);
    }
  }
}

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}
