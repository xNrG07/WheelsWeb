import Link from 'next/link';
import { siteConfig } from '@/lib/config';
import { ConsentSettingsButton } from '@/components/consent/ConsentSettingsButton';

const toolLinks = [
  { href: '/tools/reifenrechner', label: 'Reifenrechner' },
  { href: '/tools/felgen-et-check', label: 'Felgen ET-Check' },
  { href: '/tools/dot-decoder', label: 'DOT-Decoder' },
  { href: '/winterpflicht', label: 'Winterpflicht Europa' },
  { href: '/guide/reifen-basiswissen', label: 'Reifen-Basiswissen' },
];

const legalLinks = [
  { href: '/impressum', label: 'Impressum' },
  { href: '/datenschutz', label: 'Datenschutz' },
  { href: '/kontakt', label: 'Kontakt' },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="section-container py-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">

          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5 mb-3">
              <span
                className="flex h-8 w-8 items-center justify-center rounded-lg text-white text-sm font-black"
                style={{ background: 'var(--c-brand)', fontFamily: 'var(--font-display)' }}
              >
                RS
              </span>
              <span
                className="text-lg font-bold text-slate-900"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                ReifenSetup
              </span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed">
              Kostenlose Reifen-Tools für DACH &amp; Europa.
              Alle Berechnungen laufen im Browser – kein Backend, kein Tracking.
            </p>
          </div>

          {/* Tools */}
          <nav aria-label="Tool-Links">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-400">Tools</p>
            <ul className="space-y-2">
              {toolLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-slate-600 hover:text-brand-700 transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal */}
          <nav aria-label="Rechtliche Links">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-400">Rechtliches</p>
            <ul className="space-y-2">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-slate-600 hover:text-brand-700 transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <ConsentSettingsButton />
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-slate-100 pt-6 text-xs text-slate-400">
          <p>© {year} {siteConfig.name}. Alle Angaben ohne Gewähr.</p>
          <p>Kein Ersatz für Fachberatung · Keine Fahrzeugdatenbank</p>
        </div>
      </div>
    </footer>
  );
}
