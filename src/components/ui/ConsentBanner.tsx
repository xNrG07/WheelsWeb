'use client';

import { useEffect, useState } from 'react';
import { AD_CONFIG } from '@/lib/config';

type ConsentState = {
  necessary: true;
  marketing: boolean;
  decided: boolean;
};

const STORAGE_KEY = 'rs_consent_v1';

function loadConsent(): ConsentState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function saveConsent(state: ConsentState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function injectAdSense(publisherId: string) {
  if (document.getElementById('adsense-script')) return;
  const script = document.createElement('script');
  script.id = 'adsense-script';
  script.async = true;
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`;
  script.crossOrigin = 'anonymous';
  document.head.appendChild(script);
}

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);
  const [consent, setConsent] = useState<ConsentState | null>(null);

  useEffect(() => {
    const stored = loadConsent();
    if (!stored) {
      setVisible(true);
    } else {
      setConsent(stored);
      if (stored.marketing && AD_CONFIG.ENABLED) {
        injectAdSense(AD_CONFIG.PUBLISHER_ID);
      }
    }
  }, []);

  function accept(marketing: boolean) {
    const state: ConsentState = { necessary: true, marketing, decided: true };
    saveConsent(state);
    setConsent(state);
    setVisible(false);
    if (marketing && AD_CONFIG.ENABLED) {
      injectAdSense(AD_CONFIG.PUBLISHER_ID);
    }
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Cookie-Einstellungen"
      aria-live="polite"
      className="consent-banner fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white px-4 py-5 shadow-xl sm:px-6"
    >
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <p className="text-sm font-semibold text-slate-900 mb-1">
              🍪 Datenschutz-Einstellungen
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Wir verwenden technisch notwendige Cookies. Mit Ihrer Zustimmung laden wir außerdem Google AdSense für personalisierte Werbung.{' '}
              <a href="/datenschutz" className="underline text-brand-600 hover:text-brand-700">
                Mehr erfahren
              </a>
            </p>
            <div className="mt-2 flex gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <span className="inline-block h-2 w-2 rounded-full bg-green-500" aria-hidden="true"></span>
                Notwendige Cookies: immer aktiv
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block h-2 w-2 rounded-full bg-slate-300" aria-hidden="true"></span>
                Marketing (Google AdSense): optional
              </span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 shrink-0">
            <button
              onClick={() => accept(false)}
              className="btn-secondary text-sm px-4 py-2"
            >
              Nur notwendige
            </button>
            <button
              onClick={() => accept(true)}
              className="btn-primary text-sm px-4 py-2"
            >
              Alle akzeptieren
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Hook: read current consent state in any component */
export function useMarketingConsent(): boolean {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const stored = loadConsent();
    setOk(!!stored?.marketing);
  }, []);
  return ok;
}
