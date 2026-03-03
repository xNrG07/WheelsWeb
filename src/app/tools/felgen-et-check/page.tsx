import type { Metadata } from 'next';
import { FelgenETClient } from './FelgenETClient';
import { AdSlot } from '@/components/ads/AdSlot';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Felgen ET-Check – Einpresstiefe & Spurweite berechnen',
  description: 'Berechne die Auswirkungen eines Felgenwechsels auf Innen-/Außenkante und Spurweite. Keine Fahrzeugdatenbank – reine Geometrie.',
  alternates: { canonical: '/tools/felgen-et-check' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Felgen ET-Check',
  url: 'https://www.reifensetup.de/tools/felgen-et-check',
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  description: 'Berechnet Änderung von Innen-/Außenkante und Spurweite beim Felgenwechsel.',
};

export default function FelgenETPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="section-container py-10">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-500">
          <ol className="flex items-center gap-1.5">
            <li><Link href="/" className="hover:text-brand-600">Startseite</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-slate-700 font-semibold">Felgen ET-Check</li>
          </ol>
        </nav>
        <header className="mb-8">
          <h1 className="page-title">Felgen ET-Check</h1>
          <p className="page-subtitle max-w-2xl">
            Berechne, wie sich ein Felgenwechsel auf die Position der Reifenkanten und die Spurweite
            auswirkt – reine Geometrie, ohne Fahrzeugdatenbank.
          </p>
        </header>
        <AdSlot position="top" />
        <FelgenETClient />
        <div className="mt-12"><AdSlot position="mid" /></div>
        <aside className="mt-8 rounded-2xl bg-white border border-slate-200 p-5 shadow-soft">
          <h2 className="font-bold text-slate-800 mb-3" style={{ fontFamily: 'var(--font-display)' }}>Weitere Tools</h2>
          <ul className="flex flex-wrap gap-3">
            <li><Link href="/tools/reifenrechner" className="text-sm text-brand-600 hover:underline font-semibold">Reifenrechner →</Link></li>
            <li><Link href="/tools/dot-decoder" className="text-sm text-brand-600 hover:underline font-semibold">DOT-Decoder →</Link></li>
            <li><Link href="/winterpflicht" className="text-sm text-brand-600 hover:underline font-semibold">Winterpflicht Europa →</Link></li>
          </ul>
        </aside>
      </div>
    </>
  );
}
