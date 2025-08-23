import { useCallback, useEffect, useMemo, useState } from "react";
import Dropdown from "./Dropdown";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import SearchBar from "./SearchBar";
import { I18nContext, translate, useI18n } from "../i18n";

// Local storage key constant
const LS_KEY = "keeper.notes";

function App() {
  const [notes, setNotes] = useState([]); // {id, title, content, archived, createdAt, updatedAt}
  const [query, setQuery] = useState("");
  const [showArchived, setShowArchived] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("keeper.dark");
    return saved === "true";
  });
  const [selected, setSelected] = useState(new Set());
  const [tagFilter, setTagFilter] = useState("");
  const [sort, setSort] = useState("created-desc");
  const { t, lang } = useI18n();

  // Load notes from localStorage on first mount
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(LS_KEY) || "[]");
      if (Array.isArray(saved)) setNotes(saved);
    } catch (e) {
      console.warn("Failed to parse saved notes", e);
    }
  }, []);

  // Persist notes whenever they change
  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    localStorage.setItem("keeper.dark", String(darkMode));
  }, [darkMode]);

  const idGenerator = () =>
    crypto?.randomUUID?.() || Math.random().toString(36).slice(2);

  const addNote = useCallback(
    (newNote) => {
      setNotes((prev) => [
        ...prev,
        {
          id: idGenerator(),
          title: newNote.title.trim() || t("untitled"),
          content: newNote.content.trim(),
          tags: newNote.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
          color: newNote.color || "default",
          archived: false,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
      ]);
    },
    [t]
  );

  const deleteNote = useCallback((id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const toggleArchive = useCallback((id) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, archived: !n.archived, updatedAt: Date.now() } : n
      )
    );
  }, []);

  const updateNote = useCallback((id, patch) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, ...patch, updatedAt: Date.now() } : n
      )
    );
  }, []);

  const filteredNotes = useMemo(() => {
    const lower = query.toLowerCase();
    let list = notes.filter((n) => {
      if (!showArchived && n.archived) return false;
      return (
        !lower ||
        n.title.toLowerCase().includes(lower) ||
        n.content.toLowerCase().includes(lower)
      );
    });
    if (tagFilter) {
      list = list.filter((n) => n.tags?.includes(tagFilter));
    }
    const sorter = {
      "created-desc": (a, b) => b.createdAt - a.createdAt,
      "created-asc": (a, b) => a.createdAt - b.createdAt,
      "title-asc": (a, b) => a.title.localeCompare(b.title),
      "title-desc": (a, b) => b.title.localeCompare(a.title),
    }[sort];
    return [...list].sort(sorter);
  }, [notes, query, showArchived, tagFilter, sort]);

  const stats = useMemo(() => {
    const total = notes.length;
    const archived = notes.filter((n) => n.archived).length;
    return { total, archived, active: total - archived };
  }, [notes]);

  const toggleSelect = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const clearSelection = () => setSelected(new Set());
  const bulkArchive = (v) => {
    setNotes((prev) =>
      prev.map((n) =>
        selected.has(n.id) ? { ...n, archived: v, updatedAt: Date.now() } : n
      )
    );
    clearSelection();
  };
  const selectAll = () => {
    setSelected(new Set(filteredNotes.map((n) => n.id)));
  };
  const bulkDelete = () => {
    if (!selected.size) return;
    if (!window.confirm(t("confirmDeleteSelected"))) return;
    setNotes((prev) => prev.filter((n) => !selected.has(n.id)));
    clearSelection();
  };

  const allTags = useMemo(
    () => Array.from(new Set(notes.flatMap((n) => n.tags || []))).sort(),
    [notes]
  );

  // Se nascondo archiviati deseleziono eventuali archiviati selezionati
  useEffect(() => {
    if (!showArchived) {
      setSelected((prev) => {
        if (prev.size === 0) return prev;
        let changed = false;
        const next = new Set();
        prev.forEach((id) => {
          const n = notes.find((x) => x.id === id);
          if (n && !n.archived) {
            next.add(id);
          } else {
            changed = true;
          }
        });
        return changed ? next : prev; // evita setState identico -> niente loop
      });
    }
  }, [showArchived, notes]);

  const clearArchived = () => {
    if (!stats.archived) return;
    if (!window.confirm(t("confirmDeleteAllArchived"))) return;
    setNotes((prev) => prev.filter((n) => !n.archived));
  };

  const restoreArchived = () => {
    if (!stats.archived) return;
    setNotes((prev) =>
      prev.map((n) =>
        n.archived ? { ...n, archived: false, updatedAt: Date.now() } : n
      )
    );
  };

  return (
    <div className={darkMode ? "app app-dark" : "app"}>
      <Header
        primaryColor="#ff7a18"
        darkMode={darkMode}
        onToggleDark={setDarkMode}
      />
      <div className="toolbar">
        <CreateArea onAdd={addNote} primaryColor="#ff7a18" />
        <div className="toolbar-row">
          <SearchBar query={query} onChange={setQuery} />
          <button
            className={
              "btn-secondary toggle-archived" + (showArchived ? " active" : "")
            }
            onClick={() => setShowArchived((v) => !v)}
            title={
              showArchived
                ? t("hideArchivedNotesTitle")
                : t("showArchivedNotesTitle")
            }
          >
            {showArchived
              ? t("hideArchived")
              : t("showArchivedWithCount", { count: stats.archived })}
          </button>
          <Dropdown
            value={tagFilter}
            onChange={setTagFilter}
            options={[
              { value: "", label: t("allTags") },
              ...allTags.map((tg) => ({ value: tg, label: tg })),
            ]}
            className="toolbar-dropdown"
            placeholder={t("allTags")}
          />
          <Dropdown
            value={sort}
            onChange={setSort}
            options={[
              { value: "created-desc", label: t("newest") },
              { value: "created-asc", label: t("oldest") },
              { value: "title-asc", label: t("titleAZ") },
              { value: "title-desc", label: t("titleZA") },
            ]}
            className="toolbar-dropdown"
          />
        </div>
        {selected.size > 0 && (
          <div className="bulk-bar">
            <span>{t("selectedCount", { count: selected.size })}</span>
            <button
              className="btn-secondary"
              onClick={
                selected.size === filteredNotes.length
                  ? clearSelection
                  : selectAll
              }
            >
              {selected.size === filteredNotes.length
                ? t("deselectAll")
                : t("selectAll")}
            </button>
            <button className="btn-secondary" onClick={() => bulkArchive(true)}>
              {t("archive")}
            </button>
            <button
              className="btn-secondary"
              onClick={() => bulkArchive(false)}
            >
              {t("unarchive")}
            </button>
            <button className="btn-secondary" onClick={bulkDelete}>
              {t("delete")}
            </button>
            <button className="btn-secondary" onClick={clearSelection}>
              {t("cancel")}
            </button>
          </div>
        )}
        {showArchived && stats.archived > 0 && (
          <div className="bulk-bar" style={{ marginTop: 10 }}>
            <button className="btn-secondary" onClick={restoreArchived}>
              {t("restoreArchiveWithCount", { count: stats.archived })}
            </button>
            <button className="btn-danger" onClick={clearArchived}>
              {t("emptyArchiveWithCount", { count: stats.archived })}
            </button>
          </div>
        )}
        <div className="stats">
          <span>
            {t("statsTotal")} {stats.total}
          </span>
          <span>
            {t("statsActive")} {stats.active}
          </span>
          <span>
            {t("statsArchived")} {stats.archived}
          </span>
        </div>
      </div>
      <div className="notes-grid">
        {filteredNotes.map((note) => (
          <Note
            key={note.id}
            id={note.id}
            title={note.title}
            content={note.content}
            archived={note.archived}
            tags={note.tags}
            color={note.color}
            onDelete={deleteNote}
            onArchive={toggleArchive}
            onUpdate={updateNote}
            onSelect={toggleSelect}
            selected={selected.has(note.id)}
            primaryColor="#ff7a18"
          />
        ))}
        {filteredNotes.length === 0 && (
          <div className="empty">{t("noNotes")}</div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default function AppWithProvider() {
  const [lang, setLang] = useState(
    () => localStorage.getItem("keeper.lang") || "en"
  );
  return (
    <I18nContext.Provider
      value={{ lang, setLang, t: (k, p) => translate(lang, k, p) }}
    >
      <App />
    </I18nContext.Provider>
  );
}
