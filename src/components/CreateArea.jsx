import { useState, useRef, useEffect } from "react";
import { useI18n, translate } from "../i18n";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import Zoom from "@mui/material/Zoom";

function CreateArea({ onAdd, primaryColor = "#ff7a18" }) {
  const { lang, t } = useI18n();
  const palette = [
    // New default: was orange
    { key: "default", bg: "#fff2e5", accent: "#ff7a18" },
    // Lightened black (dark gray) now second
    { key: "black", bg: "#3f3f3fff", accent: "#3f3f3fff" },
    { key: "yellow", bg: "#fff8d6", accent: "#e6a400" },
    { key: "red", bg: "#ffe5e5", accent: "#d44333" },
    { key: "pink", bg: "#ffe6f2", accent: "#d63a8a" },
    { key: "purple", bg: "#f2e9ff", accent: "#8644d8" },
    { key: "blue", bg: "#e8f5ff", accent: "#2086d7" },
    { key: "teal", bg: "#e3fbf8", accent: "#079b8d" },
    { key: "green", bg: "#ecfbea", accent: "#249d4d" },
    { key: "gray", bg: "#f1f2f3", accent: "#54616d" },
  ];
  const colorMap = Object.fromEntries(
    palette.map((p) => [p.key, { bg: p.bg, accent: p.accent }])
  );

  const [note, setNote] = useState({
    title: "",
    content: "",
    tags: "",
    color: "default",
  });

  const [isNoteTaken, setIsNoteTaken] = useState(false);
  const [showPalette, setShowPalette] = useState(false);
  const paletteRef = useRef(null);

  useEffect(() => {
    function onClickOutside(e) {
      if (paletteRef.current && !paletteRef.current.contains(e.target)) {
        setShowPalette(false);
      }
    }
    if (showPalette) document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [showPalette]);

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function submitNote(event) {
    if (!note.title.trim() && !note.content.trim()) {
      event.preventDefault();
      return;
    }
    onAdd(note);
    setNote({
      title: "",
      content: "",
      tags: "",
      color: note.color,
    });
    event.preventDefault();
  }

  return (
    <div>
      <form className="create-note">
        {isNoteTaken && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder={t("placeholderTitle")}
          />
        )}

        <textarea
          name="content"
          onClick={() => setIsNoteTaken(true)}
          onChange={handleChange}
          value={note.content}
          placeholder={t("placeholderContent")}
          rows={isNoteTaken ? "3" : "1"}
        />
        {isNoteTaken && (
          <>
            <input
              name="tags"
              onChange={handleChange}
              value={note.tags}
              placeholder={t("placeholderTags")}
              className="tags-input"
            />
            <div className="create-note-footer">
              <div className="color-picker-wrapper">
                <button
                  type="button"
                  className="color-picker-trigger"
                  onClick={() => setShowPalette((v) => !v)}
                  aria-haspopup="true"
                  aria-expanded={showPalette}
                >
                  <span
                    className="color-dot"
                    style={{ background: colorMap[note.color].accent }}
                  ></span>
                  <span>{t("color")}</span>
                </button>
                {showPalette && (
                  <div className="color-pop" ref={paletteRef}>
                    {palette.map(({ key, bg, accent }) => {
                      const active = note.color === key;
                      return (
                        <button
                          key={key}
                          type="button"
                          className={
                            "color-pop-swatch" + (active ? " active" : "")
                          }
                          style={{ background: bg, outlineColor: accent }}
                          onClick={() => {
                            setNote((n) => ({ ...n, color: key }));
                            setShowPalette(false);
                          }}
                          aria-label={t("color") + " " + key}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
              <Box sx={{ "& > :not(style)": { m: 0 } }}>
                <Zoom in={isNoteTaken}>
                  <Fab
                    onClick={submitNote}
                    className="add-btn"
                    variant="extended"
                    sx={{
                      backgroundColor:
                        colorMap[note.color]?.accent || primaryColor,
                      color: "#fff",
                      fontWeight: 600,
                      letterSpacing: ".5px",
                      boxShadow: "0 4px 14px -4px rgba(0,0,0,.4)",
                    }}
                  >
                    <AddIcon /> {t("add")}
                  </Fab>
                </Zoom>
              </Box>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

export default CreateArea;
