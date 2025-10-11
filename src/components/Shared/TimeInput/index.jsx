import React, { useState, useEffect, useRef } from "react";

export default function TimeInput({
  value = "",
  onChange = () => {},
  withSeconds = false,
  id,
  name,
  className,
  placeholder = "",
  min,
  max,
}) {
  const [supportsNative, setSupportsNative] = useState(true);
  const [internal, setInternal] = useState(() => normalizeValue(value, withSeconds));
  const hoursRef = useRef(null);
  const minutesRef = useRef(null);
  const secondsRef = useRef(null);

  // detect support for input[type=time]
  useEffect(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "time");
    // some browsers set type back to "text" if not supported
    setSupportsNative(input.type === "time");
  }, []);

  // sync controlled value -> internal
  useEffect(() => {
    setInternal(normalizeValue(value, withSeconds));
  }, [value, withSeconds]);

  // helper to notify parent
  function emit(val) {
    if (!val) {
      onChange(null);
      return;
    }
    onChange(val);
  }

  // native input change handler
  function onNativeChange(e) {
    const v = e.target.value; // "HH:MM" or "HH:MM:SS"
    setInternal(v);
    emit(v || null);
  }

  // custom inputs: hour/min/sec handlers
  function onPartChange(partName, raw) {
    // sanitize digits only
    let digits = String(raw).replace(/\D/g, "");
    if (digits.length > 2) digits = digits.slice(0, 2);

    // parse ints with bounds
    let h = internal?.split(":")[0] ?? "";
    let m = internal?.split(":")[1] ?? "";
    let s = withSeconds ? (internal?.split(":")[2] ?? "") : "";

    if (partName === "h") {
      h = digits;
      if (h) {
        const num = clampNumber(parseInt(h, 10), 0, 23);
        h = pad2(num);
      } else h = "";
    } else if (partName === "m") {
      m = digits;
      if (m) {
        const num = clampNumber(parseInt(m, 10), 0, 59);
        m = pad2(num);
      } else m = "";
    } else if (partName === "s") {
      s = digits;
      if (s) {
        const num = clampNumber(parseInt(s, 10), 0, 59);
        s = pad2(num);
      } else s = "";
    }

    const parts = withSeconds ? [h, m, s] : [h, m];
    const formed = parts.every(p => p.length === 2) ? parts.join(":") : "";
    setInternal(formed);
    emit(formed || null);
  }

  // keyboard step (arrow up/down)
  function onPartKey(e, part) {
    if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;
    e.preventDefault();
    const delta = e.key === "ArrowUp" ? 1 : -1;

    let parts = internal ? internal.split(":") : ["", "",""];
    if (!withSeconds) parts = [...parts.slice(0,2), "00"];

    let num = parseInt(parts[part === "h" ? 0 : part === "m" ? 1 : 2], 10);
    if (Number.isNaN(num)) {
      num = part === "h" ? 0 : 0;
    }
    const max = part === "h" ? 23 : 59;
    let newNum = (num + delta + (max + 1)) % (max + 1);
    const newParts = [...parts];
    newParts[part === "h" ? 0 : part === "m" ? 1 : 2] = pad2(newNum);
    const formed = withSeconds ? newParts.join(":") : [newParts[0], newParts[1]].join(":");
    setInternal(formed);
    emit(formed);
  }

  // rendering
  if (supportsNative) {
    return (
      <input
        type="time"
        id={id}
        name={name}
        className={className}
        value={internal || ""}
        onChange={onNativeChange}
        step={withSeconds ? 1 : 60}
        placeholder={placeholder}
        min={min}
        max={max}
        aria-label={name || id || "Time input"}
      />
    );
  }

  // fallback UI
  return (
    <div className={`time-input-fallback ${className || ""}`} role="group" aria-labelledby={id ? `${id}-label` : undefined}>
      <label id={id ? `${id}-label` : undefined} style={{display: 'none'}}>{placeholder || name || 'Time'}</label>
      <div style={{display: "inline-flex", gap: 8, alignItems: "center"}}>
        <NumberPart
          ref={hoursRef}
          ariaLabel="Hours"
          value={(internal && internal.split(":")[0]) || ""}
          onChange={(v) => onPartChange("h", v)}
          onKeyDown={(e) => onPartKey(e, "h")}
          max={23}
          min={0}
          placeholder="hh"
        />
        <span aria-hidden>:</span>
        <NumberPart
          ref={minutesRef}
          ariaLabel="Minutes"
          value={(internal && internal.split(":")[1]) || ""}
          onChange={(v) => onPartChange("m", v)}
          onKeyDown={(e) => onPartKey(e, "m")}
          max={59}
          min={0}
          placeholder="mm"
        />
        {withSeconds && (
          <>
            <span aria-hidden>:</span>
            <NumberPart
              ref={secondsRef}
              ariaLabel="Seconds"
              value={(internal && internal.split(":")[2]) || ""}
              onChange={(v) => onPartChange("s", v)}
              onKeyDown={(e) => onPartKey(e, "s")}
              max={59}
              min={0}
              placeholder="ss"
            />
          </>
        )}
      </div>
      {/* hidden input to play nice with forms */}
      <input type="hidden" id={id} name={name} value={internal || ""} />
    </div>
  );
}

/* ---------- Small helpers & subcomponents ---------- */

function normalizeValue(val, withSeconds) {
  if (!val) return "";
  const parts = String(val).split(":");
  if (withSeconds) {
    if (parts.length === 3) return `${pad2(parts[0])}:${pad2(parts[1])}:${pad2(parts[2])}`;
    if (parts.length === 2) return `${pad2(parts[0])}:${pad2(parts[1])}:00`;
  } else {
    if (parts.length >= 2) return `${pad2(parts[0])}:${pad2(parts[1])}`;
  }
  return "";
}

function pad2(v) {
  const s = String(v);
  return s.length === 1 ? `0${s}` : s.length === 0 ? "00" : s;
}

function clampNumber(n, a, b) {
  if (Number.isNaN(n)) return a;
  return Math.max(a, Math.min(b, n));
}

// Number input for two-digit parts with accessible labels
const NumberPart = React.forwardRef(function NumberPart(
  { ariaLabel, value, onChange, onKeyDown, min = 0, max = 59, placeholder = "" },
  ref
) {
  // keep local text to allow partial typing
  const [text, setText] = useState(value || "");

  useEffect(() => setText(value || ""), [value]);

  function handleChange(e) {
    const v = e.target.value;
    // allow empty or 1-2 digits
    if (v === "" || /^\d{1,2}$/.test(v)) {
      setText(v);
      onChange(v);
    }
  }

  function handleBlur() {
    // pad and clamp on blur
    if (text === "") {
      onChange("");
      return;
    }
    const num = clampNumber(parseInt(text, 10), min, max);
    const padded = pad2(num);
    setText(padded);
    onChange(padded);
  }

  return (
    <input
      ref={ref}
      inputMode="numeric"
      pattern="[0-9]*"
      aria-label={ariaLabel}
      value={text}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={onKeyDown}
      maxLength={2}
      style={{
        width: 40,
        padding: "6px 8px",
        textAlign: "center",
        appearance: "textfield",
				border: 'none'
      }}
      placeholder={placeholder}
    />
  );
});
