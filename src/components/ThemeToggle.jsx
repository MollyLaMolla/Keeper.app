import React from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

function ThemeToggle({ value, onChange }) {
  return (
    <button
      type="button"
      className="theme-toggle-btn"
      aria-pressed={value}
      onClick={() => onChange(!value)}
      title={value ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span className={"icon-wrapper" + (value ? " hidden" : " visible")}>
        <LightModeIcon fontSize="small" />
      </span>
      <span className={"icon-wrapper" + (value ? " visible" : " hidden")}>
        <DarkModeIcon fontSize="small" />
      </span>
      <span className="theme-toggle-focus-ring" aria-hidden="true" />
    </button>
  );
}

export default ThemeToggle;
