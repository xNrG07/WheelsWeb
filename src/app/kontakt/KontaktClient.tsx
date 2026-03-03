'use client';

import { useState } from 'react';

const EMAIL = 'peter.markelic1@gmail.com';

export function KontaktClient() {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback: select text
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">E-Mail</p>
        <p className="font-mono text-slate-900 text-lg">{EMAIL}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <a
          href={`mailto:${EMAIL}?subject=Anfrage%20ReifenCheck`}
          className="btn-primary justify-center text-center"
        >
          <span aria-hidden="true">✉️</span> E-Mail schreiben
        </a>
        <button
          onClick={handleCopy}
          className="btn-secondary justify-center"
          aria-label={copied ? 'E-Mail-Adresse wurde kopiert' : 'E-Mail-Adresse in Zwischenablage kopieren'}
        >
          {copied ? (
            <>
              <span aria-hidden="true">✅</span> Kopiert!
            </>
          ) : (
            <>
              <span aria-hidden="true">📋</span> Adresse kopieren
            </>
          )}
        </button>
      </div>

      <p className="text-xs text-slate-400 border-t border-slate-100 pt-4">
        Wir antworten in der Regel innerhalb weniger Werktage. Für allgemeine Fragen zu den Tools schau bitte zuerst in den FAQ auf der Startseite.
      </p>
    </div>
  );
}
