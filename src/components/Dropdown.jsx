import { useEffect, useRef, useState, useCallback } from "react";

/**
 * Accessible custom dropdown to replace native <select> with fully styleable menu.
 * Props: value, onChange(val), options: [{value,label}], placeholder(optional), className
 */
export default function Dropdown({
  value,
  onChange,
  options,
  placeholder,
  className = "",
}) {
  const [open, setOpen] = useState(false);
  const [focusIndex, setFocusIndex] = useState(() =>
    options.findIndex((o) => o.value === value)
  );
  const wrapperRef = useRef(null);

  const close = useCallback(() => setOpen(false), []);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) close();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, close]);

  // Update focus index if value changes externally
  useEffect(() => {
    setFocusIndex(options.findIndex((o) => o.value === value));
  }, [value, options]);

  const selectValue = (val) => {
    if (val === value) return close();
    onChange(val);
    close();
  };

  const current = options.find((o) => o.value === value);

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      setFocusIndex((i) => (i + 1) % options.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      setFocusIndex((i) => (i - 1 + options.length) % options.length);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!open) setOpen(true);
      else if (focusIndex >= 0) selectValue(options[focusIndex].value);
    } else if (e.key === "Escape") {
      if (open) {
        e.preventDefault();
        close();
      }
    }
  };

  // Scroll focused option into view when navigating with keyboard
  useEffect(() => {
    if (!open) return;
    const list = wrapperRef.current?.querySelector(".dropdown-menu");
    if (!list) return;
    const el = list.querySelector('[data-index="' + focusIndex + '"]');
    if (el && el.scrollIntoView) {
      el.scrollIntoView({ block: "nearest" });
    }
  }, [focusIndex, open]);

  // Ensure we have a focusable option when opening
  useEffect(() => {
    if (open && focusIndex === -1 && options.length) {
      const idx = options.findIndex((o) => o.value === value);
      setFocusIndex(idx >= 0 ? idx : 0);
    }
  }, [open, focusIndex, options, value]);

  return (
    <div
      ref={wrapperRef}
      className={`dropdown ${open ? "open" : ""} ${className}`}
      onKeyDown={onKeyDown}
    >
      <button
        type="button"
        className="dropdown-trigger select"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="dropdown-label">
          {current ? current.label : placeholder || ""}
        </span>
        <span className="dropdown-arrow" aria-hidden>
          ▾
        </span>
      </button>
      {open && (
        <div
          className="dropdown-menu"
          role="listbox"
          aria-activedescendant={
            focusIndex >= 0 ? `dd-opt-${focusIndex}` : undefined
          }
        >
          {options.map((o, i) => (
            <button
              type="button"
              key={o.value}
              id={`dd-opt-${i}`}
              data-index={i}
              role="option"
              aria-selected={o.value === value}
              className={`dropdown-option ${o.value === value ? "selected" : ""}`}
              onClick={() => selectValue(o.value)}
              onMouseEnter={() => setFocusIndex(i)}
            >
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
