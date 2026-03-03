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

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <Link href="/winterpflicht" className="text-sm text-brand-700 hover:underline">← Zur Länderübersicht</Link>
        <h1 className="text-2xl font-semibold text-slate-900">{reg.flag} {reg.country}: Winterausrüstung</h1>
        <p className="text-xs text-slate-500">Stand: {stand}</p>
      </header>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft space-y-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Pflicht / Regel</div>
          <p className="mt-1 text-slate-800">{reg.rule_summary}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Zeitraum</div>
            <div className="mt-1 text-sm text-slate-800">{reg.when_applies ?? '—'}</div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Mindestprofil</div>
            <div className="mt-1 text-sm text-slate-800">{reg.min_tread_depth}</div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Schneeketten</div>
            <div className="mt-1 text-sm text-slate-800">{reg.chains}</div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Strafe / Risiko</div>
            <div className="mt-1 text-sm text-slate-800">{reg.penalty}</div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Hinweise</div>
            <div className="mt-1 text-sm text-slate-800">{reg.notes}</div>
          </div>
        </div>

        <div className="pt-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Quellen</div>
          <ul className="mt-2 list-disc pl-5 space-y-1 text-sm">
            {reg.sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noreferrer" className="text-brand-700 hover:underline">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
        <h2 className="text-base font-semibold text-amber-900">Wichtig</h2>
        <p className="mt-2 text-sm text-amber-900">
          Regionale Beschilderung hat Vorrang. Besonders in Italien, Frankreich (Bergzonen) und Skandinavien können Regeln je nach Region/Straße abweichen.
        </p>
      </section>
    </div>
  );
}
