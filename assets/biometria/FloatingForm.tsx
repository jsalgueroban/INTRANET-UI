import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { floatingPanel } from "../js/ui-floating-panel.js";
export function FloatingForm({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const [host] = useState(() => document.createElement("div"));
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    const panel = floatingPanel(host, { title, wide: true });
    const close = () => closeRef.current();
    panel.dialog.addEventListener("close", close);
    panel.open(document.activeElement);
    host.querySelector<HTMLElement>("input,select,textarea")?.focus();
    return () => {
      panel.dialog.removeEventListener("close", close);
      if (panel.dialog.open) panel.close();
      panel.dialog.remove();
    };
  }, [host, title]);
  return createPortal(children, host);
}
