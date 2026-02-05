# 🗂️ Keeper App

A colorful, feature‑rich note and todo manager.  
Create, tag, filter, archive, and organize your notes — all saved locally in the browser.

---

## 🧠 Overview

Keeper App is a fully client‑side note and task manager built with React and Vite.  
It focuses on speed, simplicity, and powerful organization tools, while storing all data in **localStorage** so the app works instantly with no backend required.

You can create notes with a title, text, tags, and custom colors, then filter, search, archive, or delete them with ease.

---

## 🔥 Features

- 📝 **Create notes** with:
  - Title  
  - Description  
  - Tags (comma‑separated)  
  - Custom color  
- 🎨 **Color‑coded notes** for visual grouping  
- 🔍 **Live search**:
  - Updates results as you type  
  - Searches in title, text, and tags  
- 🎛️ **Advanced filters**:
  - Filter by tag  
  - Show archived notes  
  - Sort by:
    - Most recent  
    - Oldest  
    - A → Z  
    - Z → A  
- 🗃️ **Bulk actions**:
  - Select one or multiple notes  
  - Archive  
  - Restore  
  - Delete  
- ✏️ **Edit notes** with full color and tag support  
- 📦 **Archive system** to hide notes without deleting them  
- 💾 **LocalStorage persistence**:
  - All notes, tags, and archive states are saved locally  
  - Fully functional offline  
- 📱 **Responsive layout**  
- ✨ Smooth UI with Material UI components and icons  

---

## 📊 Note Management Logic

Each note includes:

- Title  
- Description  
- Tags  
- Color  
- Created timestamp  
- Archived state  

The app supports:

- Multi‑selection  
- Batch operations  
- Real‑time filtering  
- Real‑time sorting  
- Instant updates thanks to localStorage  

---

## 🛠️ Tech Stack

**Frontend:**
- React  
- Vite  
- HTML, CSS, JavaScript  

**UI & Components:**
- Material UI (`@mui/material`, `@mui/icons-material`)  
- Emotion (`@emotion/react`, `@emotion/styled`)  
- React Icons  

**Tooling:**
- ESLint  
- Vite Plugin React  

---

## 👊 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```
## 🌐 Live Demo
[Try it here](https://mollylamolla.github.io/Keeper.app.deploy/)

## 📄 License
This project is licensed under the ISC License.

