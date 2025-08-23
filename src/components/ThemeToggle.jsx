import React from "react";

function ThemeToggle({ value, onChange }) {
  return (
    <label className="theme-toggle">
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span>{value ? "🌙" : "☀️"}</span>
    </label>
  );
}

export default ThemeToggle;
