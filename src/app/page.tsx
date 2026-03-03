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
    a: 'Nein. Die Tools sind ausschließlich über reifencheck.org nutzbar. Ein Embedding oder Scraping ist nicht gestattet.',
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

const trustItems = [
  { icon: '🔒', title: 'Keine Datensammlung', text: 'Alle Berechnungen laufen lokal im Browser. Kein Server speichert deine Eingaben.' },
  { icon: '⚡', title: 'Sofort & reaktiv', text: 'Ergebnisse erscheinen beim Tippen – kein Laden, kein Reload.' },
  { icon: '📐', title: 'ETRTO-Norm', text: 'Standardisierte Formeln nach DIN/ETRTO. Transparent und nachvollziehbar.' },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-16 sm:py-24"
        style={{ background: 'linear-gradient(135deg, #0f1923 0%, #1a56db 60%, #1447c0 100%)' }}
      >
        {/* grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
          aria-hidden="true"
        />
        {/* accent dot top-right */}
        <div
          className="absolute -top-20 -right-20 h-80 w-80 rounded-full opacity-20 blur-3xl"
          style={{ background: 'var(--c-accent)' }}
          aria-hidden="true"
        />

        <div className="section-container relative text-center">
          <p
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-semibold text-white/80 mb-6 tracking-wide"
            style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.06em' }}
          >
            <span aria-hidden="true">🇩🇪 🇦🇹 🇨🇭</span> DACH &amp; Europa – kostenlos
          </p>

          <h1
            className="text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl"
            style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.01em' }}
          >
            Reifen-Tools,{' '}
            <span style={{ color: 'var(--c-accent)' }}>die rechnen.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70 leading-relaxed">
            Reifengrößen vergleichen, Felgen-ET prüfen, DOT-Code auslesen und
            Winterreifenpflicht in Europa nachschlagen – direkt im Browser, ohne Anmeldung.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/tools/reifenrechner"
              className="btn-primary"
              style={{ background: 'var(--c-accent)', fontFamily: 'var(--font-display)' }}
            >
              Zum Reifenrechner →
            </Link>
            <Link
              href="/guide/reifen-basiswissen"
              className="btn-secondary"
              style={{ background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.25)', color: '#fff' }}
            >
              Reifen-Basiswissen
            </Link>
          </div>
        </div>
      </section>

      {/* Ad slot – after intro */}
      <div className="section-container">
        <AdSlot position="top" />
      </div>

      {/* ── Tool cards ───────────────────────────────────────────── */}
      <section className="section-container py-12" aria-labelledby="tools-heading">
        <div className="mb-8">
          <h2
            id="tools-heading"
            className="text-3xl font-black text-slate-900"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Alle Tools
          </h2>
          <p className="mt-1 text-sm text-slate-500">4 Werkzeuge · alle kostenlos · alle clientseitig</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              href={tool.href}
              className="tool-card group flex flex-col"
              aria-label={`Tool: ${tool.title}`}
            >
              <div
                className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-2xl"
                style={{ background: 'var(--c-bg)', border: '1.5px solid var(--c-border)' }}
                aria-hidden="true"
              >
                {tool.icon}
              </div>
              <h3
                className="font-bold text-slate-900 group-hover:text-brand-700 transition-colors"
                style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', letterSpacing: '0.02em' }}
              >
                {tool.title}
              </h3>
              <p className="mt-2 flex-1 text-sm text-slate-500 leading-relaxed">
                {tool.description}
              </p>
              <span
                className="mt-4 text-sm font-bold tracking-wide"
                style={{ color: 'var(--c-brand)', fontFamily: 'var(--font-display)' }}
              >
                Öffnen →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Trust strip ──────────────────────────────────────────── */}
      <section className="border-y border-slate-200 bg-white py-10" aria-labelledby="trust-heading">
        <div className="section-container">
          <h2 id="trust-heading" className="sr-only">Warum ReifenCheck?</h2>
          <div className="grid gap-8 sm:grid-cols-3 text-center">
            {trustItems.map((item) => (
              <div key={item.title} className="flex flex-col items-center gap-3">
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-2xl text-2xl"
                  style={{ background: 'var(--c-bg)' }}
                  aria-hidden="true"
                >
                  {item.icon}
                </span>
                <div>
                  <h3
                    className="font-bold text-slate-900"
                    style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', letterSpacing: '0.03em' }}
                  >
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ad slot mid */}
      <div className="section-container">
        <AdSlot position="mid" />
      </div>

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <section className="section-container py-12" aria-labelledby="faq-heading">
        <h2
          id="faq-heading"
          className="text-3xl font-black text-slate-900 mb-8"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Häufige Fragen
        </h2>
        <dl className="divide-y divide-slate-200">
          {faqs.map((faq) => (
            <div key={faq.q} className="py-5">
              <dt className="font-bold text-slate-900" style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', letterSpacing: '0.02em' }}>
                {faq.q}
              </dt>
              <dd className="mt-2 text-sm text-slate-600 leading-relaxed">{faq.a}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-sm text-slate-500">
          Weitere Informationen im{' '}
          <Link href="/guide/reifen-basiswissen" className="text-brand-600 hover:underline font-semibold">
            Reifen-Basiswissen Guide
          </Link>
          .
        </p>
      </section>
    </>
  );
}
