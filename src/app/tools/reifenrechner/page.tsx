import type { Metadata } from 'next';
import { ReifenrechnerClient } from './ReifenrechnerClient';
import { AdSlot } from '@/components/ads/AdSlot';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Reifenrechner – Reifengröße berechnen & vergleichen',
  description:
    'Kostenloser Reifenrechner: Vergleiche zwei Reifengrößen nach Durchmesser, Umfang, Tachoabweichung und Bodenfreiheitsänderung. ETRTO-konform.',
  alternates: { canonical: '/tools/reifenrechner' },
  openGraph: {
    title: 'Reifenrechner – Reifengrößen vergleichen',
    description: 'Tachoabweichung, Umfang, Durchmesser und Bodenfreiheit – jetzt kostenlos berechnen.',
    url: '/tools/reifenrechner',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Reifenrechner',
  url: 'https://www.reifensetup.de/tools/reifenrechner',
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  description: 'Vergleicht zwei Reifengrößen: Gesamtdurchmesser, Umfang, Tachoabweichung und Bodenfreiheitsänderung.',
  inLanguage: 'de-DE',
};

export default function ReifenrechnerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="section-container py-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-500">
          <ol className="flex items-center gap-1.5">
            <li><Link href="/" className="hover:text-brand-600">Startseite</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-slate-700 font-medium">Reifenrechner</li>
          </ol>
        </nav>

        <header className="mb-8">
          <h1 className="page-title">Reifenrechner</h1>
          <p className="page-subtitle max-w-2xl">
            Vergleiche zwei Reifengrößen und berechne Gesamtdurchmesser, Umfang,
            Tachoabweichung sowie die Änderung der Bodenfreiheit – nach ETRTO-Standard.
          </p>
        </header>

        {/* Ad slot AFTER intro text, BEFORE inputs */}
        <AdSlot position="top" />

        <ReifenrechnerClient />

        {/* Ad slot between result and FAQ-area – no inputs nearby */}
        <div className="mt-12">
          <AdSlot position="mid" />
        </div>

        {/* Internal linking */}
        <aside className="mt-8 rounded-2xl bg-slate-50 border border-slate-200 p-5">
          <h2 className="font-semibold text-slate-800 mb-3">Weitere Tools</h2>
          <ul className="flex flex-wrap gap-3">
            <li><Link href="/tools/felgen-et-check" className="text-sm text-brand-600 hover:underline">Felgen ET-Check →</Link></li>
            <li><Link href="/tools/dot-decoder" className="text-sm text-brand-600 hover:underline">DOT-Decoder →</Link></li>
            <li><Link href="/winterpflicht" className="text-sm text-brand-600 hover:underline">Winterpflicht Europa →</Link></li>
            <li><Link href="/guide/reifen-basiswissen" className="text-sm text-brand-600 hover:underline">Reifen-Basiswissen →</Link></li>
          </ul>
        </aside>
      </div>
    </>
  );
}
