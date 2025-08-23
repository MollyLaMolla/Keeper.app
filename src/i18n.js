import React from "react";

export const translations = {
  en: {
    untitled: "(Untitled)",
    confirmDeleteSelected: "Delete selected notes?",
    confirmDeleteAllArchived: "Permanently delete all archived notes?",
    hideArchivedNotesTitle: "Hide archived notes",
    showArchivedNotesTitle: "Show archived notes",
    hideArchived: "Hide archived",
    showArchivedWithCount: "Show archived ({count})",
    allTags: "All tags",
    newest: "Newest",
    oldest: "Oldest",
    titleAZ: "Title A-Z",
    titleZA: "Title Z-A",
    selectedCount: "{count} selected",
    archive: "Archive",
    unarchive: "Unarchive",
    delete: "Delete",
    cancel: "Cancel",
    emptyArchiveWithCount: "Empty archive ({count})",
    statsTotal: "Total:",
    statsActive: "Active:",
    statsArchived: "Archived:",
    noNotes: "No notes found.",
    placeholderTitle: "Title",
    placeholderContent: "Take a note...",
    placeholderTags: "Tags (comma separated)",
    color: "Color",
    add: "Add",
    selectNote: "Select note",
    archivedBadge: "ARCHIVED",
    searchPlaceholder: "Search...",
  },
  it: {
    untitled: "(Senza titolo)",
    confirmDeleteSelected: "Eliminare le note selezionate?",
    confirmDeleteAllArchived:
      "Eliminare definitivamente tutte le note archiviate?",
    hideArchivedNotesTitle: "Nascondi note archiviate",
    showArchivedNotesTitle: "Mostra note archiviate",
    hideArchived: "Nascondi archiviati",
    showArchivedWithCount: "Mostra archiviati ({count})",
    allTags: "Tutti i tag",
    newest: "Più recenti",
    oldest: "Più vecchie",
    titleAZ: "Titolo A-Z",
    titleZA: "Titolo Z-A",
    selectedCount: "{count} selezionate",
    archive: "Archivia",
    unarchive: "Ripristina",
    delete: "Elimina",
    cancel: "Annulla",
    emptyArchiveWithCount: "Svuota archivio ({count})",
    statsTotal: "Totali:",
    statsActive: "Attive:",
    statsArchived: "Archiviate:",
    noNotes: "Nessuna nota trovata.",
    placeholderTitle: "Titolo",
    placeholderContent: "Prendi una nota...",
    placeholderTags: "Tag (separati da virgola)",
    color: "Colore",
    add: "Aggiungi",
    selectNote: "Seleziona nota",
    archivedBadge: "ARCHIVIATA",
    searchPlaceholder: "Cerca...",
  },
};

export function translate(lang, key, params = {}) {
  const dict = translations[lang] || translations.en;
  let str = dict[key] || key;
  Object.entries(params).forEach(([k, v]) => {
    str = str.replace(new RegExp(`{${k}}`, "g"), v);
  });
  return str;
}

export const I18nContext = React.createContext({
  lang: "en",
  setLang: () => {},
  t: (key, params) => translate("en", key, params),
});

export function useI18n() {
  return React.useContext(I18nContext);
}
