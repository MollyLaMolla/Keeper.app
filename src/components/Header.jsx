import React from "react";
import HighlightIcon from "@mui/icons-material/Highlight";
import { useI18n } from "../i18n";
import ThemeToggle from "./ThemeToggle";

function Header({ primaryColor = "#ff7a18", darkMode, onToggleDark }) {
  const { lang, setLang } = useI18n();
  const next = lang === "en" ? "it" : "en";
  return (
    <header
      style={{
        backgroundColor: primaryColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "14px 28px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <h1
          style={{ display: "flex", alignItems: "center", gap: 6, margin: 0 }}
        >
          <HighlightIcon />
          <span>Keeper</span>
        </h1>
      </div>
      <div
        className="header-actions"
        style={{ display: "flex", alignItems: "center", gap: 12 }}
      >
        <button
          onClick={() => {
            setLang(next);
            localStorage.setItem("keeper.lang", next);
          }}
          className="header-btn lang-btn"
          title={
            lang === "en"
              ? "Cambia lingua in Italiano"
              : "Switch language to English"
          }
        >
          {lang.toUpperCase()}
        </button>
        <div
          className="header-theme-toggle"
          title={darkMode ? "Light" : "Dark"}
        >
          <ThemeToggle value={darkMode} onChange={onToggleDark} />
        </div>
      </div>
    </header>
  );
}

export default Header;
