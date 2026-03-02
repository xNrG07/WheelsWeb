import type { Metadata } from 'next';
import Link from 'next/link';
import { tools, siteConfig } from '@/lib/config';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: `${siteConfig.name} – Kostenlose Reifen-Tools für DACH & Europa`,
  description: siteConfig.description,
  alternates: { canonical: '/' },
};

const faqs = [
  {
    q: 'Sind die Berechnungen korrekt?',
    a: 'Die Formeln basieren auf den standardisierten ETRTO-Definitionen für Reifenmaße. Abweichungen von ±1–2 % sind durch Reifentoleranzen des Herstellers möglich. Die Ergebnisse ersetzen keine Fachberatung.',
  },
  {
    q: 'Brauche ich eine Anmeldung?',
    a: 'Nein. Alle Tools funktionieren vollständig clientseitig im Browser – ohne Account, ohne Datenspeicherung auf unseren Servern.',
  },
  {
    q: 'Welche Reifengrößen werden unterstützt?',
    a: 'Der Reifenrechner unterstützt alle gängigen metrischen Reifenbezeichnungen (z. B. 205/55 R16). Spezialgrößen wie LT- oder Flottreifen sind nicht abgedeckt.',
  },
  {
    q: 'Wie aktuell sind die Winterreifenpflicht-Daten?',
    a: 'Jede Länderseite trägt ein "Stand"-Datum. Wir aktualisieren die Regelungen jährlich im Oktober. Vor Reiseantritt empfehlen wir, die offiziellen Behördenseiten zu prüfen.',
  },
  {
    q: 'Kann ich die Tools auf meiner Website einbetten?',
    a: 'Nein. Die Tools sind ausschließlich über reifensetup.de nutzbar. Ein Embedding oder Scraping ist nicht gestattet.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      description: siteConfig.description,
      inLanguage: 'de-DE',
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: `${siteConfig.url}/winterpflicht?q={search_term_string}` },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 py-16 sm:py-24">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, white 1px, transparent 1px)', backgroundSize: '32px 32px' }}
          aria-hidden="true"
        />
        <div className="section-container relative text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-brand-400/40 bg-brand-800/60 px-4 py-1.5 text-sm font-medium text-brand-200 mb-6">
            <span aria-hidden="true">🇩🇪 🇦🇹 🇨🇭</span> DACH & Europa – kostenlos & werbefinanziert
          </p>
          <h1
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Reifen-Tools, <br className="sm:hidden" />
            <span className="text-brand-300">die rechnen.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-brand-200">
            Reifengrößen vergleichen, Felgen-ET prüfen, DOT-Code auslesen und
            Winterreifenpflicht in ganz Europa nachschlagen – direkt im Browser,
            ohne Anmeldung.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/tools/reifenrechner" className="btn-primary bg-white text-brand-800 hover:bg-brand-50">
              Zum Reifenrechner →
            </Link>
            <Link href="/guide/reifen-basiswissen" className="btn-secondary border-brand-400/50 bg-brand-800/40 text-brand-100 hover:bg-brand-700/50">
              Reifen-Basiswissen
            </Link>
          </div>
        </div>
      </section>

      {/* Ad slot – after intro, before tools, clearly separated */}
      <div className="section-container">
        <AdSlot position="top" />
      </div>

      {/* Tool cards */}
      <section className="section-container py-12" aria-labelledby="tools-heading">
        <h2 id="tools-heading" className="text-2xl font-bold text-slate-900 mb-2"
          style={{ fontFamily: 'var(--font-display)' }}>
          Alle Tools
        </h2>
        <p className="text-slate-500 mb-8 text-sm">4 Werkzeuge – alle kostenlos, alle clientseitig</p>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              href={tool.href}
              className="tool-card group flex flex-col"
              aria-label={`Tool: ${tool.title}`}
            >
              <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${tool.color} text-2xl shadow-sm`}
                aria-hidden="true">
                {tool.icon}
              </div>
              <h3 className="font-semibold text-slate-900 group-hover:text-brand-700 transition-colors"
                style={{ fontFamily: 'var(--font-display)' }}>
                {tool.title}
              </h3>
              <p className="mt-2 flex-1 text-sm text-slate-500 leading-relaxed">
                {tool.description}
              </p>
              <span className="mt-4 text-sm font-medium text-brand-600 group-hover:text-brand-700">
                Öffnen →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust section */}
      <section className="bg-slate-100 py-10" aria-labelledby="trust-heading">
        <div className="section-container">
          <h2 id="trust-heading" className="sr-only">Warum ReifenSetup?</h2>
          <div className="grid gap-6 sm:grid-cols-3 text-center">
            {[
              { icon: '🔒', title: 'Keine Datensammlung', text: 'Alle Berechnungen laufen im Browser. Kein Server, kein Tracking.' },
              { icon: '⚡', title: 'Sofortige Ergebnisse', text: 'Interaktiv und reaktiv – ohne Seitenreload, ohne Wartezeit.' },
              { icon: '📐', title: 'Standardformeln', text: 'ETRTO-konforme Berechnungen nach DIN-Norm. Transparent und nachvollziehbar.' },
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-center gap-2">
                <span className="text-3xl" aria-hidden="true">{item.icon}</span>
                <h3 className="font-semibold text-slate-900">{item.title}</h3>
                <p className="text-sm text-slate-500">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ad slot mid – between content and FAQ, separated */}
      <div className="section-container">
        <AdSlot position="mid" />
      </div>

      {/* FAQ */}
      <section className="section-container py-12" aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="text-2xl font-bold text-slate-900 mb-8"
          style={{ fontFamily: 'var(--font-display)' }}>
          Häufige Fragen
        </h2>
        <dl className="divide-y divide-slate-200">
          {faqs.map((faq) => (
            <div key={faq.q} className="py-5">
              <dt className="font-semibold text-slate-900">{faq.q}</dt>
              <dd className="mt-2 text-sm text-slate-600 leading-relaxed">{faq.a}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-sm text-slate-500">
          Weitere Informationen im{' '}
          <Link href="/guide/reifen-basiswissen" className="text-brand-600 hover:underline">
            Reifen-Basiswissen Guide
          </Link>
          .
        </p>
      </section>
    </>
  );
}
