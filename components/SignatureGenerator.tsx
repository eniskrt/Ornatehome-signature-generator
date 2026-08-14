"use client";

import Image from "next/image";
import { useMemo, useState, useSyncExternalStore } from "react";
import brandIcon from "@/app/icon.png";
import { CopySignatureButton } from "./CopySignatureButton";
import { SignatureForm } from "./SignatureForm";
import { SignaturePreview } from "./SignaturePreview";
import { defaultEmployee } from "@/lib/config";
import { generateSignatureHtml, generateSignatureText, normalizeBaseUrl, type Employee } from "@/lib/signature";

const configuredBaseUrl = process.env.NEXT_PUBLIC_SIGNATURE_BASE_URL;
const subscribeToOrigin = () => () => undefined;
const getBrowserOrigin = () => window.location.origin;
const getServerOrigin = () => "http://localhost:3000";

export function SignatureGenerator() {
  const [employee, setEmployee] = useState<Employee>(defaultEmployee);
  const browserOrigin = useSyncExternalStore(subscribeToOrigin, getBrowserOrigin, getServerOrigin);
  const baseUrl = normalizeBaseUrl(configuredBaseUrl || browserOrigin);

  const html = useMemo(() => generateSignatureHtml(employee, baseUrl), [employee, baseUrl]);
  const plainText = useMemo(() => generateSignatureText(employee), [employee]);

  return (
    <main>
      <header className="site-header">
        <Image className="brand-mark" src={brandIcon} width={52} height={52} alt="" priority />
        <div>
          <p>Ornate Home</p>
          <h1>Email Signature Generator</h1>
        </div>
      </header>

      <div className="workspace">
        <SignatureForm employee={employee} onChange={setEmployee} />
        <section className="panel preview-panel" aria-labelledby="preview-heading">
          <div className="section-heading preview-heading-row">
            <div>
              <span className="eyebrow">Live output</span>
              <h2 id="preview-heading">Signature preview</h2>
              <p>Email-safe HTML, ready to paste.</p>
            </div>
            <span className="live-badge"><i /> Live</span>
          </div>
          <SignaturePreview html={html} />
          <CopySignatureButton html={html} plainText={plainText} />
        </section>
      </div>

      <footer>Internal tool · No data leaves your browser</footer>
    </main>
  );
}
