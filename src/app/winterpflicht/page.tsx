import { Metadata } from 'next';
import { winterRegulations } from '@/data/winterRegulations';
import { WinterpflichtClient } from './WinterpflichtClient';

export const metadata: Metadata = {
  title: 'Winterreifenpflicht Europa – Länderübersicht',
  description: 'Aktuelle Übersicht zur Winterausrüstung (Winterreifen/Schneeketten) in europäischen Ländern – mit Quellen und Stand-Datum.',
  alternates: { canonical: '/winterpflicht' },
};

function getStandDate() {
  const max = winterRegulations.reduce((acc, r) => (r.last_updated > acc ? r.last_updated : acc), '1970-01-01');
  const d = new Date(max);
  return d.toLocaleDateString('de-DE');
}

export default function WinterpflichtPage() {
  const stand = getStandDate();

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-slate-900">Winterreifenpflicht in Europa</h1>
        <p className="text-slate-600">
          Hier findest du eine kompakte Übersicht pro Land – inkl. Zeitraum, Mindestprofil und Schneeketten-Regeln.
          Details + Quellen findest du auf der jeweiligen Länder-Seite.
        </p>
        <p className="text-xs text-slate-500">Stand (letzte Datenpflege): {stand}</p>
      </header>

      <WinterpflichtClient regulations={winterRegulations} />

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
        <h2 className="text-base font-semibold text-slate-900">Legende</h2>
        <div className="mt-3 flex flex-wrap gap-2 text-sm">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
            <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" /> Pflicht (fixer Zeitraum)
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
            <span className="h-2 w-2 rounded-full bg-amber-500" aria-hidden="true" /> Situativ (wetter-/schildabhängig)
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
            <span className="h-2 w-2 rounded-full bg-slate-400" aria-hidden="true" /> Keine generelle Pflicht
          </span>
        </div>
        <p className="mt-3 text-xs text-slate-500">
          Hinweis: Gesetze/Verordnungen können sich ändern und regionale Regeln (z.B. Italien) sind häufig streng(er).
          Im Zweifel: lokale Beschilderung + offizielle Quellen beachten.
        </p>
      </section>
    </div>
  );
}
