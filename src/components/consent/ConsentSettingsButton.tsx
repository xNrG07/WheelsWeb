'use client';

import { resetConsent } from '@/components/ui/ConsentBanner';

// All code comments are in English as requested by the project convention.

export function ConsentSettingsButton({ className }: { className?: string }) {
  const onClick = () => {
    // If Google Funding Choices exposes a revocation UI, try to open it.
    const w = window as any;
    if (typeof w.googlefc?.showRevocationMessage === 'function') {
      try {
        w.googlefc.showRevocationMessage();
        return;
      } catch {
        // fall back
      }
    }

    // Fallback: reset local consent and reload to show the banner again.
    resetConsent();
    window.location.reload();
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={className ?? 'text-sm text-slate-500 hover:text-slate-900'}
    >
      Cookie-Einstellungen
    </button>
  );
}
