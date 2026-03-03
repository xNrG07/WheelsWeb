'use client';

import { useState } from 'react';

interface TireSize { width: string; aspect: string; rim: string; }
interface TireCalc { sidewall: number; diameter: number; circumference: number; }

function calcTire(t: TireSize): TireCalc | null {
  const w = parseFloat(t.width), a = parseFloat(t.aspect), r = parseFloat(t.rim);
  if (isNaN(w) || isNaN(a) || isNaN(r) || w <= 0 || a <= 0 || r <= 0) return null;
  const sidewall = (w * a) / 100;
  const rimMm = r * 25.4;
  const diameter = rimMm + 2 * sidewall;
  const circumference = Math.PI * diameter;
  return { sidewall, diameter, circumference };
}

const SPEEDS = [50, 80, 100, 130];
const fmt = (n: number, d = 1) => n.toFixed(d);

function TireInputGroup({
  label,
  value,
  onChange,
  id,
  accent,
}: {
  label: string;
  value: TireSize;
  onChange: (v: TireSize) => void;
  id: string;
  accent?: boolean;
}) {
  return (
    <div
      className="rounded-2xl bg-white p-5"
      style={{
        border: `2px solid ${accent ? 'var(--c-brand)' : 'var(--c-border)'}`,
        boxShadow: 'var(--tw-shadow, 0 1px 3px rgba(0,0,0,0.07))',
      }}
    >
      <div
        className="mb-4 inline-flex items-center gap-2 rounded-lg px-3 py-1 text-xs font-bold uppercase tracking-widest"
        style={{
          background: accent ? 'var(--c-brand)' : 'var(--c-bg)',
          color: accent ? '#fff' : 'var(--c-muted)',
          fontFamily: 'var(--font-display)',
        }}
      >
        {label}
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label htmlFor={`${id}-width`} className="label-text">Breite (mm)</label>
          <input
            id={`${id}-width`}
            type="number"
            className="input-field"
            placeholder="205"
            min={100} max={400} step={5}
            value={value.width}
            onChange={(e) => onChange({ ...value, width: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor={`${id}-aspect`} className="label-text">Querschnitt (%)</label>
          <input
            id={`${id}-aspect`}
            type="number"
            className="input-field"
            placeholder="55"
            min={20} max={100} step={5}
            value={value.aspect}
            onChange={(e) => onChange({ ...value, aspect: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor={`${id}-rim`} className="label-text">Felge (Zoll)</label>
          <input
            id={`${id}-rim`}
            type="number"
            className="input-field"
            placeholder="16"
            min={10} max={26} step={0.5}
            value={value.rim}
            onChange={(e) => onChange({ ...value, rim: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}

export function ReifenrechnerClient() {
  const [altTire, setAltTire] = useState<TireSize>({ width: '205', aspect: '55', rim: '16' });
  const [neuTire, setNeuTire] = useState<TireSize>({ width: '215', aspect: '55', rim: '16' });
  const altCalc = calcTire(altTire);
  const neuCalc = calcTire(neuTire);
  const bothValid = altCalc && neuCalc;
  const diffDiameter = bothValid ? neuCalc.diameter - altCalc.diameter : 0;
  const diffPct = bothValid ? (diffDiameter / altCalc.diameter) * 100 : 0;
  const diffRadius = diffDiameter / 2;

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2">
        <TireInputGroup label="Altgröße (Original)"     value={altTire} onChange={setAltTire} id="alt" />
        <TireInputGroup label="Neugröße (Alternative)" value={neuTire} onChange={setNeuTire} id="neu" accent />
      </div>

      {bothValid ? (
        <div className="mt-8 space-y-6">
          {/* Result cards row */}
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                label: 'Seitenwandhöhe',
                alt: `${fmt(altCalc.sidewall)} mm`,
                neu: `${fmt(neuCalc.sidewall)} mm`,
                diff: `${neuCalc.sidewall > altCalc.sidewall ? '+' : ''}${fmt(neuCalc.sidewall - altCalc.sidewall)} mm`,
              },
              {
                label: 'Gesamtdurchmesser',
                alt: `${fmt(altCalc.diameter)} mm`,
                neu: `${fmt(neuCalc.diameter)} mm`,
                diff: `${diffDiameter > 0 ? '+' : ''}${fmt(diffDiameter)} mm`,
              },
              {
                label: 'Umfang',
                alt: `${fmt(altCalc.circumference)} mm`,
                neu: `${fmt(neuCalc.circumference)} mm`,
                diff: `${neuCalc.circumference > altCalc.circumference ? '+' : ''}${fmt(neuCalc.circumference - altCalc.circumference)} mm`,
              },
            ].map((row) => (
              <div key={row.label} className="result-card">
                <p
                  className="text-xs font-bold uppercase tracking-wider mb-3"
                  style={{ color: 'var(--c-brand)', fontFamily: 'var(--font-display)', letterSpacing: '0.06em' }}
                >
                  {row.label}
                </p>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Alt:</span>
                    <span className="font-mono font-medium text-slate-700">{row.alt}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Neu:</span>
                    <span className="font-mono font-medium text-slate-700">{row.neu}</span>
                  </div>
                  <div className="flex justify-between text-sm border-t border-blue-100 pt-1.5 mt-1.5">
                    <span className="text-slate-500 font-semibold">Diff:</span>
                    <span className="font-mono font-bold" style={{ color: 'var(--c-brand)' }}>{row.diff}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Ground clearance */}
          <div
            className={`rounded-xl border-2 p-4 text-sm ${
              Math.abs(diffPct) > 3 ? 'dot-red' : Math.abs(diffPct) > 1.5 ? 'dot-yellow' : 'dot-green'
            }`}
          >
            <strong>Bodenfreiheit:</strong> Radius ändert sich um{' '}
            <span className="font-mono font-bold">{diffRadius > 0 ? '+' : ''}{fmt(diffRadius)} mm</span>{' '}
            ({diffPct > 0 ? '+' : ''}{fmt(diffPct)}% Durchmesser).
            {Math.abs(diffPct) > 3 && (
              <p className="mt-1 font-semibold">⚠️ Abweichung &gt; 3% – ABE/TÜV-Prüfung empfohlen!</p>
            )}
          </div>

          {/* Speedometer table */}
          <div>
            <h2
              className="text-xl font-black text-slate-900 mb-3"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Tachoabweichung
            </h2>
            <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-soft">
              <table className="min-w-full text-sm">
                <caption className="sr-only">Tachoabweichung bei verschiedenen Geschwindigkeiten</caption>
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left font-bold text-slate-700" style={{ fontFamily: 'var(--font-display)' }}>Tacho-Anzeige</th>
                    <th scope="col" className="px-4 py-3 text-right font-bold text-slate-700" style={{ fontFamily: 'var(--font-display)' }}>Real (neu)</th>
                    <th scope="col" className="px-4 py-3 text-right font-bold text-slate-700" style={{ fontFamily: 'var(--font-display)' }}>Differenz</th>
                    <th scope="col" className="px-4 py-3 text-right font-bold text-slate-700" style={{ fontFamily: 'var(--font-display)' }}>Bewertung</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {SPEEDS.map((speed) => {
                    const realSpeed = speed * (neuCalc.circumference / altCalc.circumference);
                    const diff = realSpeed - speed;
                    const pct = (diff / speed) * 100;
                    const cls = Math.abs(pct) > 3 ? 'text-red-600' : Math.abs(pct) > 1.5 ? 'text-yellow-600' : 'text-green-600';
                    return (
                      <tr key={speed} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 font-mono font-semibold">{speed} km/h</td>
                        <td className="px-4 py-3 text-right font-mono">{fmt(realSpeed)} km/h</td>
                        <td className="px-4 py-3 text-right font-mono">{diff >= 0 ? '+' : ''}{fmt(diff)} km/h</td>
                        <td className={`px-4 py-3 text-right font-bold text-xs ${cls}`}>
                          {Math.abs(pct) > 3 ? 'Kritisch' : Math.abs(pct) > 1.5 ? 'Prüfen' : 'OK'}{' '}
                          ({pct >= 0 ? '+' : ''}{fmt(pct)}%)
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-xs text-slate-400">
              Rechtslage (Typgenehmigung): Ein Tacho darf niemals weniger als die reale Geschwindigkeit anzeigen. Er darf darüber liegen – je nach Geschwindigkeit bis maximal <strong>10% + 4 km/h</strong> (UN/ECE R39).
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-6 rounded-xl border-2 border-dashed border-slate-200 py-12 text-center text-slate-400">
          <p className="text-3xl mb-3" aria-hidden="true">🔢</p>
          <p className="text-sm font-medium">Gib beide Reifengrößen ein, um die Berechnung zu starten.</p>
        </div>
      )}
    </div>
  );
}
