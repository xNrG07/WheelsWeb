import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { winterRegulations, getCountryBySlug, RULE_TYPE_LABELS, RULE_TYPE_COLORS } from '@/data/winterRegulations';
import { AdSlot } from '@/components/ads/AdSlot';

interface Props {
  params: { country: string };
}

export async function generateStaticParams() {
  return winterRegulations.map((r) => ({ country: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const reg = getCountryBySlug(params.country);
  if (!reg) return {};
  return {
    title: `Winterreifenpflicht ${reg.country} – Regelung 2025`,
    description: `${reg.rule_summary.slice(0, 155)}`,
    alternates: { canonical: `/winterpflicht/${reg.slug}` },
  };
}

export default function CountryDetailPage({ params }: Props) {
  const reg = getCountryBySlug(params.country);
  if (!reg) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `Winterreifenpflicht ${reg.country}`,
    url: `https://www.reifensetup.de/winterpflicht/${reg.slug}`,
    inLanguage: 'de-DE',
    description: reg.rule_summary,
  };

  const allSlugs = winterRegulations.map((r) => ({ slug: r.slug, country: r.country, flag: r.flag }));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="section-container py-10 max-w-3xl">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-500">
          <ol className="flex items-center gap-1.5">
            <li><Link href="/" className="hover:text-brand-600">Startseite</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/winterpflicht" className="hover:text-brand-600">Winterpflicht</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-slate-700 font-medium">{reg.country}</li>
          </ol>
        </nav>

        <header className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl" aria-hidden="true">{reg.flag}</span>
            <div>
              <div className="mb-1">
                <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${RULE_TYPE_COLORS[reg.rule_type]}`}>
                  {RULE_TYPE_LABELS[reg.rule_type]}
                </span>
              </div>
              <h1 className="page-title">Winterreifenpflicht {reg.country}</h1>
            </div>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 border border-amber-200 px-3 py-1.5 text-sm text-amber-700">
            <span aria-hidden="true">📅</span>
            <strong>Stand: {new Date(reg.last_updated).toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })}.</strong>
            Angaben ohne Gewähr.
          </div>
        </header>

        <AdSlot position="top" />

        <article className="prose-custom space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              Regelung im Überblick
            </h2>
            <p className="text-slate-700 leading-relaxed">{reg.rule_summary}</p>
          </section>

          <dl className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Gültigkeitszeitraum</dt>
              <dd className="text-sm text-slate-800 font-medium">{reg.when_applies}</dd>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Schneeketten</dt>
              <dd className="text-sm text-slate-800">{reg.chain_rules}</dd>
            </div>
            {reg.min_tread && (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Mindestprofiltiefe</dt>
                <dd className="text-sm text-slate-800 font-mono font-medium">{reg.min_tread}</dd>
              </div>
            )}
            {reg.penalty && (
              <div className="rounded-xl border border-red-100 bg-red-50 p-4">
                <dt className="text-xs font-semibold uppercase tracking-wider text-red-400 mb-1">Bußgeld / Strafe</dt>
                <dd className="text-sm text-red-800 font-medium">{reg.penalty}</dd>
              </div>
            )}
          </dl>

          {/* Sources */}
          <section>
            <h2 className="text-base font-semibold text-slate-800 mb-3">Offizielle Quellen</h2>
            <ul className="space-y-2">
              {reg.sources.map((src) => (
                <li key={src.url}>
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-brand-600 hover:text-brand-700 hover:underline"
                  >
                    <span aria-hidden="true">🔗</span>
                    {src.label}
                    <span className="sr-only">(öffnet in neuem Tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <div className="warning-box">
            <strong>Hinweis:</strong> Alle Angaben basieren auf öffentlich zugänglichen Informationen (Stand {new Date(reg.last_updated).toLocaleDateString('de-DE')}). Regelungen können sich ändern. Vor Reiseantritt empfehlen wir, die offiziellen Behörden- oder Automobilclub-Webseiten des jeweiligen Landes zu konsultieren.
          </div>
        </article>

        <div className="mt-10"><AdSlot position="mid" /></div>

        {/* Other countries navigation */}
        <nav aria-label="Andere Länder" className="mt-10">
          <h2 className="text-base font-semibold text-slate-800 mb-4">Andere Länder</h2>
          <div className="flex flex-wrap gap-2">
            {allSlugs.filter((c) => c.slug !== reg.slug).map((c) => (
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
