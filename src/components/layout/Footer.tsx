import Link from 'next/link';
import { siteConfig } from '@/lib/config';

const legalLinks = [
  { href: '/impressum', label: 'Impressum' },
  { href: '/datenschutz', label: 'Datenschutz' },
  { href: '/kontakt', label: 'Kontakt' },
];

const toolLinks = [
  { href: '/tools/reifenrechner', label: 'Reifenrechner' },
  { href: '/tools/felgen-et-check', label: 'Felgen ET-Check' },
  { href: '/tools/dot-decoder', label: 'DOT-Decoder' },
  { href: '/winterpflicht', label: 'Winterpflicht Europa' },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="section-container py-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 font-display text-lg font-bold text-brand-700"
              style={{ fontFamily: 'var(--font-display)' }}>
              <span aria-hidden="true">🔧</span> ReifenSetup
            </Link>
            <p className="mt-2 text-sm text-slate-500 leading-relaxed">
              Kostenlose Reifen-Tools für Fahrer in DACH und Europa. Keine Werbung in Toolnähe, keine Tracker.
            </p>
          </div>

          {/* Tools */}
          <nav aria-label="Tools Navigation">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Tools</p>
            <ul className="space-y-1.5">
              {toolLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-slate-600 hover:text-brand-700 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/guide/reifen-basiswissen" className="text-sm text-slate-600 hover:text-brand-700 transition-colors">
                  Reifen-Basiswissen
                </Link>
              </li>
            </ul>
          </nav>

          {/* Legal */}
          <nav aria-label="Rechtliche Links">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Rechtliches</p>
            <ul className="space-y-1.5">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-slate-600 hover:text-brand-700 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom bar — Ad slot separated by clear visual gap */}
        <div className="mt-8 border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>© {year} {siteConfig.name}. Alle Angaben ohne Gewähr.</p>
          <p>Kein Ersatz für Fachberatung · Keine Fahrzeugdatenbank · Keine Gewährleistung</p>
        </div>
      </div>

      {/* ── AD SLOT: Footer ── clear separation from nav/legal content above ── */}
      {/* AdSlot component is rendered here only when consent given */}
      {/* <AdSlot position="bottom" /> */}
    </footer>
  );
}
