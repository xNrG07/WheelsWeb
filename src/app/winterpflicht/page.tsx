import type { Metadata } from 'next';
import Link from 'next/link';
import { winterRegulations, RULE_TYPE_LABELS, RULE_TYPE_COLORS, type RuleType } from '@/data/winterRegulations';
import { WinterpflichtClient } from './WinterpflichtClient';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Winterreifenpflicht Europa – Übersicht 2025',
  description:
    'Winterreifenpflicht in 15 europäischen Ländern: Regelungen, Fristen, Mindestprofiltiefe und Bußgelder für Deutschland, Österreich, Schweiz und mehr.',
  alternates: { canonical: '/winterpflicht' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Winterreifenpflicht Europa 2025',
  url: 'https://www.reifensetup.de/winterpflicht',
  description: 'Aktuelle Übersicht zur Winterreifenpflicht in europäischen Ländern.',
  inLanguage: 'de-DE',
};

export default function WinterpflichtPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="section-container py-10">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-500">
          <ol className="flex items-center gap-1.5">
            <li><Link href="/" className="hover:text-brand-600">Startseite</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-slate-700 font-medium">Winterpflicht Europa</li>
          </ol>
        </nav>

        <header className="mb-6">
          <h1 className="page-title">Winterreifenpflicht in Europa</h1>
          <p className="page-subtitle max-w-2xl">
            Übersicht der aktuellen Regelungen in 15 Ländern –
            mit Zeiträumen, Mindestprofiltiefe, Bußgeldern und direkten Quellenlinks.
          </p>
          <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-amber-50 border border-amber-200 px-3 py-1.5 text-sm text-amber-700">
            <span aria-hidden="true">📅</span>
            <strong>Stand: Januar 2025.</strong> Angaben ohne Gewähr – vor Reiseantritt offizielle Behördenseiten prüfen.
          </div>
        </header>

        {/* Legend */}
        <div className="mb-6 flex flex-wrap gap-2" role="legend" aria-label="Legende Regelungstypen">
          {(Object.entries(RULE_TYPE_LABELS) as [RuleType, string][]).map(([type, label]) => (
            <span key={type} className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${RULE_TYPE_COLORS[type]}`}>
              {label}
            </span>
          ))}
        </div>

        <AdSlot position="top" />

        <WinterpflichtClient regulations={winterRegulations} />

        <div className="mt-12"><AdSlot position="mid" /></div>

        <aside className="mt-8 rounded-2xl bg-slate-50 border border-slate-200 p-5">
          <h2 className="font-semibold text-slate-800 mb-3">Weitere Tools</h2>
          <ul className="flex flex-wrap gap-3">
            <li><Link href="/tools/reifenrechner" className="text-sm text-brand-600 hover:underline">Reifenrechner →</Link></li>
            <li><Link href="/tools/dot-decoder" className="text-sm text-brand-600 hover:underline">DOT-Decoder →</Link></li>
            <li><Link href="/guide/reifen-basiswissen" className="text-sm text-brand-600 hover:underline">Reifen-Basiswissen →</Link></li>
          </ul>
        </aside>
      </div>
    </>
  );
}
