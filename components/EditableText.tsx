"use client";

import { useRef, useEffect } from "react";
import { useEdit } from "./EditProvider";

interface Props {
  id: string;
  fallback: string;
  as?: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "div";
  className?: string;
  style?: React.CSSProperties;
}

export default function EditableText({
  id,
  fallback,
  as = "span",
  className = "",
  style,
}: Props) {
  const { editing, getText, setText } = useEdit();
  const ref = useRef<HTMLElement>(null);
  const value = getText(id, fallback);

  useEffect(() => {
    if (ref.current && !editing) {
      ref.current.textContent = value;
    }
  }, [value, editing]);

  const editClass = editing
    ? `${className} outline-none ring-2 ring-amber-400/40 ring-offset-2 ring-offset-[#050a14] rounded px-1 cursor-text`
    : className;

  const handleBlur = (e: React.FocusEvent) => {
    const el = e.currentTarget as HTMLElement;
    setText(id, el.textContent ?? fallback);
  };

  const common = {
    ref: ref as React.RefObject<never>,
    className: editClass,
    style,
    dangerouslySetInnerHTML: { __html: value },
    suppressHydrationWarning: true,
    ...(editing
      ? { contentEditable: true, suppressContentEditableWarning: true, onBlur: handleBlur }
      : {}),
  };

  switch (as) {
    case "p": return <p {...common} />;
    case "h1": return <h1 {...common} />;
    case "h2": return <h2 {...common} />;
    case "h3": return <h3 {...common} />;
    case "h4": return <h4 {...common} />;
    case "div": return <div {...common} />;
    default: return <span {...common} />;
  }
}
