import type { Metadata } from 'next';
import Link from 'next/link';
import { winterRegulations } from '@/data/winterRegulations';
import { WinterpflichtClient } from './WinterpflichtClient';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Winterreifenpflicht Europa – Länderübersicht 2025',
  description: 'Aktuelle Übersicht zur Winterausrüstung (Winterreifen/Schneeketten) in europäischen Ländern – mit Quellen und Stand-Datum.',
  alternates: { canonical: '/winterpflicht' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Winterreifenpflicht Europa 2025',
  url: 'https://reifencheck.org/winterpflicht',
  description: 'Aktuelle Übersicht zur Winterreifenpflicht in europäischen Ländern.',
  inLanguage: 'de-DE',
};

function getStandDate() {
  const max = winterRegulations.reduce(
    (acc, r) => (r.last_updated > acc ? r.last_updated : acc),
    '1970-01-01'
  );
  return new Date(max).toLocaleDateString('de-DE');
}

export default function WinterpflichtPage() {
  const stand = getStandDate();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="section-container py-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-500">
          <ol className="flex items-center gap-1.5">
            <li><Link href="/" className="hover:text-brand-600">Startseite</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-slate-700 font-semibold">Winterpflicht Europa</li>
          </ol>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <h1 className="page-title">Winterreifenpflicht in Europa</h1>
          <p className="page-subtitle max-w-2xl">
            Kompakte Übersicht pro Land – inkl. Zeitraum, Mindestprofiltiefe und Schneeketten-Regeln.
            Details und Quellen auf der jeweiligen Länder-Seite.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-sm text-amber-700">
            <span aria-hidden="true">📅</span>
            <strong>Stand: {stand}.</strong> Angaben ohne Gewähr – vor Reiseantritt offizielle Quellen prüfen.
          </div>
        </header>

        <AdSlot position="top" />

        {/* Country list with filter */}
        <WinterpflichtClient regulations={winterRegulations} />

        <div className="mt-12"><AdSlot position="mid" /></div>

        {/* Legend */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
          <h2 className="font-bold text-slate-900 mb-3" style={{ fontFamily: 'var(--font-display)' }}>
            Legende
          </h2>
          <div className="flex flex-wrap gap-2 text-sm">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
              Pflicht (fixer Zeitraum)
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5">
              <span className="h-2 w-2 rounded-full bg-amber-500" aria-hidden="true" />
              Situativ (wetter-/schildabhängig)
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5">
              <span className="h-2 w-2 rounded-full bg-slate-400" aria-hidden="true" />
              Keine generelle Pflicht
            </span>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Gesetze können sich ändern; regionale Regeln (z.&thinsp;B. Italien) sind oft strenger.
            Im Zweifel: lokale Beschilderung und offizielle Behördenseiten beachten.
          </p>
        </section>

        {/* Internal links */}
        <aside className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
          <h2 className="font-bold text-slate-800 mb-3" style={{ fontFamily: 'var(--font-display)' }}>
            Weitere Tools
          </h2>
          <ul className="flex flex-wrap gap-3">
            <li><Link href="/tools/reifenrechner" className="text-sm text-brand-600 hover:underline font-semibold">Reifenrechner →</Link></li>
            <li><Link href="/tools/dot-decoder" className="text-sm text-brand-600 hover:underline font-semibold">DOT-Decoder →</Link></li>
            <li><Link href="/guide/reifen-basiswissen" className="text-sm text-brand-600 hover:underline font-semibold">Reifen-Basiswissen →</Link></li>
          </ul>
        </aside>
      </div>
    </>
  );
}
