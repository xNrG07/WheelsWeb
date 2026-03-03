import type { Metadata } from 'next';
import { DOTDecoderClient } from './DOTDecoderClient';
import { AdSlot } from '@/components/ads/AdSlot';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'DOT-Decoder – Reifenalter und Produktionsdatum auslesen',
  description: 'Gib den DOT-Code deines Reifens ein und erfahre Produktionswoche, -jahr, Alter in Monaten und ob der Reifen noch sicher ist.',
  alternates: { canonical: '/tools/dot-decoder' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'DOT-Decoder',
  url: 'https://reifencheck.org/tools/dot-decoder',
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  description: 'Dekodiert den DOT-Code eines Reifens und zeigt Produktionsdatum und Alter.',
};

export default function DOTDecoderPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="section-container py-10">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-500">
          <ol className="flex items-center gap-1.5">
            <li><Link href="/" className="hover:text-brand-600">Startseite</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-slate-700 font-semibold">DOT-Decoder</li>
          </ol>
        </nav>
        <header className="mb-8">
          <h1 className="page-title">DOT-Decoder</h1>
          <p className="page-subtitle max-w-2xl">
            Die letzten 4 Ziffern des DOT-Codes zeigen die Produktionswoche und das Produktionsjahr.
            Gib deinen Code ein und erfahre das genaue Alter deines Reifens.
          </p>
        </header>
        <AdSlot position="top" />
        <DOTDecoderClient />
        <div className="mt-12"><AdSlot position="mid" /></div>
        <section className="mt-8 rounded-2xl bg-white border border-slate-200 p-5 shadow-soft">
          <h2 className="font-bold text-slate-800 mb-2" style={{ fontFamily: 'var(--font-display)' }}>Was ist der DOT-Code?</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Der DOT-Code (Department of Transportation) ist eine Pflichtangabe auf jedem
            Autoreifen. Die letzten 4 Ziffern, z. B.{' '}
            <code className="bg-slate-100 rounded px-1 font-mono text-xs">2319</code>,
            bedeuten: <strong>23. Woche des Jahres 2019</strong>. Reifen sollten nach 6 Jahren geprüft und nach 10 Jahren ausgetauscht werden.
          </p>
        </section>
        <aside className="mt-5 rounded-2xl bg-white border border-slate-200 p-5 shadow-soft">
          <h2 className="font-bold text-slate-800 mb-3" style={{ fontFamily: 'var(--font-display)' }}>Weitere Tools</h2>
          <ul className="flex flex-wrap gap-3">
            <li><Link href="/tools/reifenrechner" className="text-sm text-brand-600 hover:underline font-semibold">Reifenrechner →</Link></li>
            <li><Link href="/tools/felgen-et-check" className="text-sm text-brand-600 hover:underline font-semibold">ET-Check →</Link></li>
            <li><Link href="/winterpflicht" className="text-sm text-brand-600 hover:underline font-semibold">Winterpflicht →</Link></li>
          </ul>
        </aside>
      </div>
    </>
  );
}
