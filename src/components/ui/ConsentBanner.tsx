'use client';

import { useEffect, useState } from 'react';

// All code comments are in English as requested by the project convention.

type ConsentState = {
  necessary: true;
  ads: boolean;
  decided: boolean;
};

export const CONSENT_STORAGE_KEY = 'rs_consent_v1';

function loadConsent(): ConsentState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function saveConsent(state: ConsentState) {
  localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(state));
  // Notify listeners in the same tab
  window.dispatchEvent(new Event('rs-consent-changed'));
}

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = loadConsent();
    setVisible(!stored);
  }, []);

  function accept(ads: boolean) {
    const state: ConsentState = { necessary: true, ads, decided: true };
    saveConsent(state);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Datenschutz-Einstellungen"
      aria-live="polite"
      className="consent-banner fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white px-4 py-5 shadow-xl sm:px-6"
    >
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <p className="text-sm font-semibold text-slate-900 mb-1">🍪 Einstellungen</p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Wir speichern technisch notwendige Einstellungen lokal im Browser. Mit deiner Zustimmung laden wir zusätzlich
              Google AdSense (Werbung).{' '}
              <a href="/datenschutz" className="underline text-brand-600 hover:text-brand-700">
                Mehr erfahren
              </a>
            </p>
            <div className="mt-2 flex gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true"></span>
                Notwendig: immer aktiv
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block h-2 w-2 rounded-full bg-slate-300" aria-hidden="true"></span>
                Werbung (AdSense): optional
              </span>
            </div>
            <p className="mt-2 text-[11px] text-slate-400">
              Hinweis: Für Traffic aus EWR/UK/CH kann für personalisierte Werbung eine Google-zertifizierte CMP erforderlich sein.
              Dieses einfache Banner ist dafür nicht automatisch ausreichend.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 shrink-0">
            <button onClick={() => accept(false)} className="btn-secondary text-sm px-4 py-2">
              Nur notwendig
            </button>
            <button onClick={() => accept(true)} className="btn-primary text-sm px-4 py-2">
              Zustimmen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Hook: read current ad consent state.
export function useAdsConsent(): boolean {
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const read = () => {
      const stored = loadConsent();
      setOk(!!stored?.ads);
    };

    read();
    window.addEventListener('storage', read);
    window.addEventListener('rs-consent-changed', read);
    return () => {
      window.removeEventListener('storage', read);
      window.removeEventListener('rs-consent-changed', read);
    };
  }, []);

  return ok;
}

export function resetConsent() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(CONSENT_STORAGE_KEY);
  window.dispatchEvent(new Event('rs-consent-changed'));
}
