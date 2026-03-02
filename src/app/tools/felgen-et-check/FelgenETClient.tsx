'use client';

import { useState } from 'react';

interface WheelSpec {
  widthInch: string;
  et: string;
  tireWidth?: string;
}

interface ETResult {
  innerChangeA: number;
  innerChangeB: number;
  outerChangeA: number;
  outerChangeB: number;
  trackChange: number;
}

function inchToMm(inch: number) {
  return inch * 25.4;
}

/**
 * Wheel geometry:
 *   rim_width_mm / 2 = half_rim
 *   inner_offset = ET (from hub face to inner rim lip)
 *   outer_offset = rim_width_mm - ET
 *
 * Tire protrusion beyond rim ≈ (tire_width_mm - rim_width_mm) / 2
 * Total outer = outer_offset + tire_protrusion
 * Total inner = ET + tire_protrusion
 */
function calcET(old: WheelSpec, newer: WheelSpec): ETResult | null {
  const owInch = parseFloat(old.widthInch);
  const oET = parseFloat(old.et);
  const nwInch = parseFloat(newer.widthInch);
  const nET = parseFloat(newer.et);
  if ([owInch, oET, nwInch, nET].some(isNaN)) return null;

  const owMm = inchToMm(owInch);
  const nwMm = inchToMm(nwInch);

  const otw = old.tireWidth ? parseFloat(old.tireWidth) : owMm;
  const ntw = newer.tireWidth ? parseFloat(newer.tireWidth) : nwMm;

  const oProt = Math.max(0, (otw - owMm) / 2);
  const nProt = Math.max(0, (ntw - nwMm) / 2);

  // Inner edge from hub (positive = towards brake calliper)
  const oldInner = oET + oProt;
  const newInner = nET + nProt;

  // Outer edge from hub
  const oldOuter = owMm - oET + oProt;
  const newOuter = nwMm - nET + nProt;

  // Track change per side (positive = wider)
  const trackChangePerSide = newOuter - oldOuter;

  return {
    innerChangeA: newInner - oldInner,
    innerChangeB: newInner,
    outerChangeA: newOuter - oldOuter,
    outerChangeB: newOuter,
    trackChange: trackChangePerSide * 2,
  };
}

function SignBadge({ value }: { value: number }) {
  const cls =
    value > 15
      ? 'bg-red-100 text-red-700 border-red-200'
      : value > 5
      ? 'bg-yellow-100 text-yellow-700 border-yellow-200'
      : 'bg-green-100 text-green-700 border-green-200';
  return (
    <span className={`inline-block rounded-full border px-2 py-0.5 text-xs font-semibold font-mono ${cls}`}>
      {value >= 0 ? '+' : ''}{value.toFixed(1)} mm
    </span>
  );
}

function WheelInputGroup({
  label,
  value,
  onChange,
  id,
  showTire,
}: {
  label: string;
  value: WheelSpec;
  onChange: (v: WheelSpec) => void;
  id: string;
  showTire: boolean;
}) {
  return (
    <fieldset className="rounded-2xl border border-slate-200 p-5 bg-white">
      <legend className="px-2 text-sm font-semibold text-slate-700 -mt-3 bg-white">{label}</legend>
      <div className={`grid gap-3 mt-2 ${showTire ? 'grid-cols-3' : 'grid-cols-2'}`}>
        <div>
          <label htmlFor={`${id}-w`} className="label-text">Breite (Zoll)</label>
          <input
            id={`${id}-w`}
            type="number"
            className="input-field"
            placeholder="7.0"
            min={4} max={14} step={0.5}
            value={value.widthInch}
            onChange={(e) => onChange({ ...value, widthInch: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor={`${id}-et`} className="label-text">ET (mm)</label>
          <input
            id={`${id}-et`}
            type="number"
            className="input-field"
            placeholder="35"
            min={-100} max={120} step={1}
            value={value.et}
            onChange={(e) => onChange({ ...value, et: e.target.value })}
          />
        </div>
        {showTire && (
          <div>
            <label htmlFor={`${id}-tw`} className="label-text">Reifen (mm, opt.)</label>
            <input
              id={`${id}-tw`}
              type="number"
              className="input-field"
              placeholder="205"
              min={100} max={400} step={5}
              value={value.tireWidth ?? ''}
              onChange={(e) => onChange({ ...value, tireWidth: e.target.value })}
            />
          </div>
        )}
      </div>
    </fieldset>
  );
}

export function FelgenETClient() {
  const [showTire, setShowTire] = useState(false);
  const [oldWheel, setOldWheel] = useState<WheelSpec>({ widthInch: '7', et: '35' });
  const [newWheel, setNewWheel] = useState<WheelSpec>({ widthInch: '8', et: '30' });

  const result = calcET(oldWheel, newWheel);

  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <input
          type="checkbox"
          id="show-tire"
          checked={showTire}
          onChange={(e) => setShowTire(e.target.checked)}
          className="h-4 w-4 rounded border-slate-300 text-brand-600"
        />
        <label htmlFor="show-tire" className="text-sm text-slate-600 cursor-pointer">
          Reifenbreite optional angeben (für exaktere Kantenberechnung)
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <WheelInputGroup label="Alt-Felge (Original)" value={oldWheel} onChange={setOldWheel} id="old" showTire={showTire} />
        <WheelInputGroup label="Neu-Felge (Alternative)" value={newWheel} onChange={setNewWheel} id="new" showTire={showTire} />
      </div>

      {result ? (
        <div className="mt-8 space-y-5">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="result-card">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 mb-3">Innenkante</p>
              <p className="text-sm text-slate-500 mb-1">Änderung:</p>
              <SignBadge value={result.innerChangeA} />
              <p className="mt-2 text-xs text-slate-400">
                {result.innerChangeA > 0
                  ? 'Innenkante rückt näher an Bremse/Federbein.'
                  : result.innerChangeA < 0
                  ? 'Innenkante rückt weiter weg von Bremse/Federbein.'
                  : 'Keine Änderung.'}
              </p>
            </div>

            <div className="result-card">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 mb-3">Außenkante</p>
              <p className="text-sm text-slate-500 mb-1">Änderung:</p>
              <SignBadge value={result.outerChangeA} />
              <p className="mt-2 text-xs text-slate-400">
                {result.outerChangeA > 0
                  ? 'Außenkante tritt weiter aus dem Radkasten hervor.'
                  : result.outerChangeA < 0
                  ? 'Außenkante zieht sich weiter in den Radkasten zurück.'
                  : 'Keine Änderung.'}
              </p>
            </div>

            <div className="result-card">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 mb-3">Spurweite (gesamt)</p>
              <p className="text-sm text-slate-500 mb-1">Gesamtänderung:</p>
              <SignBadge value={result.trackChange} />
              <p className="mt-2 text-xs text-slate-400">
                {result.trackChange > 0
                  ? 'Spurweite verbreitert sich (beide Seiten).'
                  : result.trackChange < 0
                  ? 'Spurweite verengt sich (beide Seiten).'
                  : 'Spurweite unverändert.'}
              </p>
            </div>
          </div>

          {/* Warning box – per spec */}
          <div className="warning-box flex gap-3">
            <span className="shrink-0 text-xl" aria-hidden="true">⚠️</span>
            <div>
              <p className="font-semibold mb-1">Nur zur Orientierung – kein Ersatz für Fachprüfung</p>
              <p>
                Diese Berechnung basiert ausschließlich auf geometrischen Formeln ohne Fahrzeugdaten.
                Freigängigkeit (Kotflügel, Bremssattel, Feder), ABE, Fahrzeugbrief-Eintragung und
                TÜV-Abnahme müssen separat geprüft werden. Fahren mit nicht abgenommenen Rädern ist
                in Deutschland ordnungswidrig (StVZO § 19).
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-6 rounded-xl border-2 border-dashed border-slate-200 py-10 text-center text-slate-400">
          <p className="text-2xl mb-2" aria-hidden="true">⚙️</p>
          <p className="text-sm">Gib Felgenbreite und ET für Alt- und Neu-Felge ein.</p>
        </div>
      )}
    </div>
  );
}
