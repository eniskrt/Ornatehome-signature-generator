"use client";

import { useEffect, useRef, useState } from "react";

type Props = { html: string; plainText: string };
type Status = "idle" | "signature" | "html" | "error";

async function copyRichHtml(html: string, plainText: string) {
  if (navigator.clipboard?.write && typeof ClipboardItem !== "undefined") {
    const item = new ClipboardItem({
      "text/html": new Blob([html], { type: "text/html" }),
      "text/plain": new Blob([plainText], { type: "text/plain" }),
    });
    await navigator.clipboard.write([item]);
    return;
  }

  const container = document.createElement("div");
  container.contentEditable = "true";
  container.style.position = "fixed";
  container.style.left = "-9999px";
  container.innerHTML = html;
  document.body.appendChild(container);
  const range = document.createRange();
  range.selectNodeContents(container);
  const selection = window.getSelection();
  selection?.removeAllRanges();
  selection?.addRange(range);
  const copied = document.execCommand("copy");
  selection?.removeAllRanges();
  container.remove();
  if (!copied) throw new Error("Copy is not supported by this browser.");
}

export function CopySignatureButton({ html, plainText }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  function showStatus(next: Status) {
    setStatus(next);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus("idle"), 2600);
  }

  async function copySignature() {
    try {
      await copyRichHtml(html, plainText);
      showStatus("signature");
    } catch {
      showStatus("error");
    }
  }

  async function copyHtml() {
    try {
      await navigator.clipboard.writeText(html);
      showStatus("html");
    } catch {
      showStatus("error");
    }
  }

  const message = status === "signature"
    ? "Signature copied!"
    : status === "html"
      ? "HTML copied!"
      : status === "error"
        ? "Copy failed. Check browser clipboard permissions."
        : "";

  return (
    <div className="copy-actions">
      <button className="primary-button" type="button" onClick={copySignature}>Copy Signature</button>
      <button className="secondary-button" type="button" onClick={copyHtml}>Copy HTML</button>
      <p className={`copy-status ${status === "error" ? "is-error" : ""}`} role="status" aria-live="polite">{message}</p>
    </div>
  );
}
