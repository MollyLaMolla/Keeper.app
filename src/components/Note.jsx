import React, { useState, useRef, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import ArchiveIcon from "@mui/icons-material/Archive";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useI18n } from "../i18n";

function Note({
  id,
  title,
  content,
  archived,
  tags = [],
  color = "default",
  onSelect,
  onDelete,
  onArchive,
  onUpdate,
  selected,
  primaryColor = "#ff7a18",
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);
  const [draftContent, setDraftContent] = useState(content);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const { t } = useI18n();
  const pickerRef = useRef(null);
  const colorBtnRef = useRef(null);

  function handleSave() {
    onUpdate(id, { title: draftTitle, content: draftContent });
    setIsEditing(false);
  }

  const palette = {
    default: { bg: "#fff2e5", accent: "#ff7a18", text: "#000" },
    black: { bg: "#3f3f3fff", accent: "#303030ff", text: "#ffffff" },
    yellow: { bg: "#fff8d6", accent: "#e6a400", text: "#000" },
    red: { bg: "#ffe5e5", accent: "#d44333", text: "#000" },
    pink: { bg: "#ffe6f2", accent: "#d63a8a", text: "#000" },
    purple: { bg: "#f2e9ff", accent: "#8644d8", text: "#000" },
    blue: { bg: "#e8f5ff", accent: "#2086d7", text: "#000" },
    teal: { bg: "#e3fbf8", accent: "#079b8d", text: "#000" },
    green: { bg: "#ecfbea", accent: "#249d4d", text: "#000" },
    gray: { bg: "#f1f2f3", accent: "#54616d", text: "#000" },
  };
  const colorOptions = [
    "default",
    "black",
    "yellow",
    "red",
    "pink",
    "purple",
    "blue",
    "teal",
    "green",
    "gray",
  ];
  const [currentColor, setCurrentColor] = useState(color);
  const scheme = palette[currentColor] || palette.default;

  useEffect(() => {
    setCurrentColor(color);
  }, [color]);

  function handleColorChange(c) {
    setCurrentColor(c);
    onUpdate(id, { color: c });
    setShowColorPicker(false);
  }

  useEffect(() => {
    if (!showColorPicker) return;
    function handleClick(e) {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(e.target) &&
        colorBtnRef.current &&
        !colorBtnRef.current.contains(e.target)
      ) {
        setShowColorPicker(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showColorPicker]);

  return (
    <div
      className={"note" + (archived ? " note-archived" : "")}
      style={{
        background: scheme.bg,
        color: scheme.text,
        "--accent": scheme.accent,
      }}
      data-accent={scheme.accent}
      data-archived-label={t("archivedBadge")}
      onClick={(e) => {
        if (e.shiftKey) {
          onSelect?.(id);
        }
      }}
    >
      <div className="note-select">
        {(() => {
          const borderColor =
            currentColor === "black" ? "#ffffff99" : scheme.accent;
          const fillColor =
            currentColor === "black" ? "#ffffffd9" : scheme.accent;
          return (
            <input
              type="checkbox"
              className="note-checkbox"
              checked={selected}
              onChange={() => onSelect?.(id)}
              aria-label={t("selectNote")}
              style={{ "--chk-border": borderColor, "--chk-fill": fillColor }}
            />
          );
        })()}
      </div>
      {isEditing ? (
        <>
          <input
            className="note-edit-title"
            value={draftTitle}
            onChange={(e) => setDraftTitle(e.target.value)}
          />
          <textarea
            className="note-edit-content"
            value={draftContent}
            onChange={(e) => setDraftContent(e.target.value)}
            rows={4}
          />
          <button
            ref={colorBtnRef}
            className="btn subtle"
            style={{ color: scheme.accent, borderColor: scheme.accent }}
            onClick={() => setShowColorPicker((s) => !s)}
            aria-haspopup="true"
            aria-expanded={showColorPicker}
          >
            {t("color")}
          </button>
        </>
      ) : (
        <>
          <h1>{title}</h1>
          <p>{content}</p>
          <div className="tags-row">
            {tags.map((t) => (
              <span
                key={t}
                className="tag-pill"
                style={{ background: scheme.accent, color: "#fff" }}
              >
                {t}
              </span>
            ))}
          </div>
        </>
      )}
      <Stack direction="row" spacing={1} className="note-actions">
        {isEditing ? (
          <Button
            size="small"
            variant="contained"
            onClick={handleSave}
            sx={{ backgroundColor: scheme.accent, color: "white" }}
          >
            <SaveIcon fontSize="small" />
          </Button>
        ) : (
          <Button
            size="small"
            variant="contained"
            onClick={() => setIsEditing(true)}
            sx={{ backgroundColor: scheme.accent, color: "white" }}
          >
            <EditIcon fontSize="small" />
          </Button>
        )}
        <Button
          size="small"
          variant="outlined"
          onClick={() => onArchive(id)}
          style={{
            borderColor: currentColor === "black" ? "#ffffff66" : scheme.accent,
            color: currentColor === "black" ? "#ffffffcc" : scheme.accent,
            backgroundColor: "#00000015",
          }}
          className="archive-btn"
          data-accent={scheme.accent}
        >
          {archived ? (
            <UnarchiveIcon fontSize="small" />
          ) : (
            <ArchiveIcon fontSize="small" />
          )}
        </Button>
        <Button
          size="small"
          color="error"
          variant="text"
          onClick={() => onDelete(id)}
        >
          <DeleteIcon fontSize="small" />
        </Button>
      </Stack>
      {isEditing && showColorPicker && (
        <div
          ref={pickerRef}
          className="color-pop"
          style={{ position: "absolute", top: 10, right: 10 }}
        >
          {colorOptions.map((c) => (
            <button
              key={c}
              aria-label={c}
              className={`swatch${c === currentColor ? " active" : ""}`}
              style={{
                background: c === "black" ? palette[c].bg : palette[c].accent,
                border:
                  c === currentColor
                    ? "2px solid #00000044"
                    : "2px solid transparent",
              }}
              onClick={() => handleColorChange(c)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Note;
