# 📂 Folder Analyzer Web

Projet web qui permet d’analyser un dossier local et de générer un fichier **JSON** décrivant sa structure et le contenu de ses fichiers texte.

## ⚡ Fonctionnalités

- Lecture récursive de l’arborescence locale (via `webkitdirectory`)
- Filtrage des dossiers ignorés (`.git`, `node_modules`, etc.)
- Extraction du contenu texte des fichiers (avec limite personnalisable)
- Téléchargement du résultat au format `structure.json`
- Interface 100 % client-side, sans backend ni dépendance

## 🖥️ Utilisation locale

1. Ouvre `index.html` dans Chrome ou Edge.
2. Clique sur **“Choisir un dossier”**.
3. Coche ou décoche les options.
4. Clique sur **Analyser**.
5. Le JSON s’affiche ; clique sur **Télécharger JSON**.# folder-analyzer-web
