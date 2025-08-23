import React from "react";
import HighlightIcon from "@mui/icons-material/Highlight";
import { useI18n } from "../i18n";

function Header({ primaryColor = "#ff7a18" }) {
  const { lang, setLang } = useI18n();
  const next = lang === "en" ? "it" : "en";
  return (
    <header
      style={{
        backgroundColor: primaryColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
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
      <button
        onClick={() => {
          setLang(next);
          localStorage.setItem("keeper.lang", next);
        }}
        style={{
          background: "#ffffff22",
          border: "1px solid #ffffff55",
          color: "#fff",
          padding: "6px 14px",
          borderRadius: 24,
          cursor: "pointer",
          fontWeight: 600,
          letterSpacing: ".5px",
        }}
        title={
          lang === "en"
            ? "Cambia lingua in Italiano"
            : "Switch language to English"
        }
      >
        {lang.toUpperCase()}
      </button>
    </header>
  );
}

export default Header;
