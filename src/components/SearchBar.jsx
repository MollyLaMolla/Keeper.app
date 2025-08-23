import React from "react";
import { useI18n } from "../i18n";

function SearchBar({ query, onChange }) {
  const { t } = useI18n();
  return (
    <input
      className="search-bar"
      type="search"
      placeholder={t("searchPlaceholder")}
      value={query}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default SearchBar;
