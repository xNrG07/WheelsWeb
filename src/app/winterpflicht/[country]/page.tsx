import { winterRegulations } from '@/data/winterRegulations';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return winterRegulations.map((r) => ({ country: r.slug }));
}

export async function generateMetadata({ params }: { params: { country: string } }): Promise<Metadata> {
  const reg = winterRegulations.find((r) => r.slug === params.country.toLowerCase());
  if (!reg) return { title: 'Winterreifenpflicht – Land nicht gefunden' };
  const standYear = new Date(reg.last_updated).getFullYear();
  return {
    title: `Winterreifenpflicht ${reg.country} – Regeln & Quellen (Stand ${standYear})`,
    description: `Winterreifen- und Schneeketten-Regeln in ${reg.country}: Zeitraum, Mindestprofil, Hinweise und Quellen. Stand: ${reg.last_updated}.`,
    alternates: { canonical: `/winterpflicht/${reg.slug}` },
  };
}

export default function CountryPage({ params }: { params: { country: string } }) {
  const reg = winterRegulations.find((r) => r.slug === params.country.toLowerCase());
  if (!reg) return notFound();

  const stand = new Date(reg.last_updated).toLocaleDateString('de-DE');
  const allSlugs = winterRegulations.map((r) => ({ slug: r.slug, country: r.country, flag: r.flag }));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `Winterreifenpflicht ${reg.country}`,
    url: `https://reifencheck.org/winterpflicht/${reg.slug}`,
    inLanguage: 'de-DE',
    description: reg.rule_summary,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="section-container py-10 max-w-3xl">

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-500">
          <ol className="flex items-center gap-1.5 flex-wrap">
            <li><Link href="/" className="hover:text-brand-600">Startseite</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/winterpflicht" className="hover:text-brand-600">Winterpflicht</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-slate-700 font-semibold">{reg.country}</li>
          </ol>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl" aria-hidden="true">{reg.flag}</span>
            <h1 className="page-title">Winterreifenpflicht {reg.country}</h1>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-sm text-amber-700">
            <span aria-hidden="true">📅</span>
            <strong>Stand: {stand}.</strong> Angaben ohne Gewähr.
          </div>
        </header>

        {/* Main info card */}
        <article className="space-y-5">
          <section
            className="rounded-2xl bg-white p-6 space-y-5"
            style={{ border: '2px solid var(--c-border)', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
          >
            <div>
              <div
                className="text-xs font-bold uppercase tracking-widest mb-2"
                style={{ color: 'var(--c-muted)', fontFamily: 'var(--font-display)' }}
              >
                Regelung im Überblick
              </div>
              <p className="text-slate-800 leading-relaxed">{reg.rule_summary}</p>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {[
                { label: 'Zeitraum', value: reg.when_applies ?? '—' },
                { label: 'Mindestprofil', value: (reg as any).min_tread_depth ?? (reg as any).min_tread ?? '—' },
                { label: 'Schneeketten', value: (reg as any).chains ?? (reg as any).chain_rules ?? '—' },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="rounded-xl p-4"
                  style={{ background: 'var(--c-bg)', border: '1px solid var(--c-border)' }}
                >
                  <div
                    className="text-xs font-bold uppercase tracking-widest mb-1.5"
                    style={{ color: 'var(--c-muted)', fontFamily: 'var(--font-display)' }}
                  >
                    {label}
                  </div>
                  <div className="text-sm text-slate-800">{value}</div>
                </div>
              ))}
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {[
                { label: 'Strafe / Risiko', value: (reg as any).penalty ?? '—', danger: true },
                { label: 'Hinweise', value: (reg as any).notes ?? '—', danger: false },
              ].map(({ label, value, danger }) => (
                <div
                  key={label}
                  className="rounded-xl p-4"
                  style={{
                    background: danger ? '#fef2f2' : 'var(--c-bg)',
                    border: `1px solid ${danger ? '#fca5a5' : 'var(--c-border)'}`,
                  }}
                >
                  <div
                    className="text-xs font-bold uppercase tracking-widest mb-1.5"
                    style={{
                      color: danger ? '#991b1b' : 'var(--c-muted)',
                      fontFamily: 'var(--font-display)',
                    }}
                  >
                    {label}
                  </div>
                  <div className="text-sm" style={{ color: danger ? '#7f1d1d' : 'var(--c-text)' }}>{value}</div>
                </div>
              ))}
            </div>

            {/* Sources */}
            <div>
              <div
                className="text-xs font-bold uppercase tracking-widest mb-2"
                style={{ color: 'var(--c-muted)', fontFamily: 'var(--font-display)' }}
              >
                Offizielle Quellen
              </div>
              <ul className="space-y-2">
                {reg.sources.map((s) => (
                  <li key={s.url}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700 hover:underline"
                    >
                      <span aria-hidden="true">🔗</span>
                      {s.label}
                      <span className="sr-only">(öffnet in neuem Tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Warning */}
          <div className="warning-box flex gap-3">
            <span className="shrink-0 text-lg" aria-hidden="true">⚠️</span>
            <p>
              Regionale Beschilderung hat immer Vorrang. Besonders in Italien, Frankreich und Skandinavien
              können Regeln je nach Region oder Straße abweichen. Vor Reiseantritt offizielle
              Behördenseiten des jeweiligen Landes prüfen.
            </p>
          </div>
        </article>

        {/* Other countries */}
        <nav aria-label="Andere Länder" className="mt-10">
          <h2
            className="text-base font-bold text-slate-800 mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Andere Länder
          </h2>
          <div className="flex flex-wrap gap-2">
            {allSlugs
              .filter((c) => c.slug !== reg.slug)
              .map((c) => (
                <Link
                  key={c.slug}
                  href={`/winterpflicht/${c.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 hover:border-brand-300 hover:text-brand-700 transition-colors"
                >
                  <span aria-hidden="true">{c.flag}</span> {c.country}
                </Link>
              ))}
          </div>
        </nav>
      </div>
    </>
  );
}
