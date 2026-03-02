'use client';

import { useMemo, useState } from 'react';

// All code comments are in English as requested by the project convention.

type ETResult = {
  // Positive => closer to suspension (less inner clearance)
  innerEdgeChange: number;
  // Positive => further out towards fender
  outerEdgeChange: number;
  // Positive => wheel/tire centerline moves outward (track increases)
  centerShift: number;
  // Positive => track width increases (both sides)
  trackChange: number;

  // Absolute reference distances (mm) from hub mounting face
  oldInner: number;
  oldOuter: number;
  newInner: number;
  newOuter: number;

  oldProt: number;
  newProt: number;
};

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

// Tire protrusion beyond the rim per side (very rough). Real bulge depends on tire model and rim design.
const protrusionMm = (tireWidthMm: number, rimWidthMm: number) => {
  const p = (tireWidthMm - rimWidthMm) / 2;
  return Math.max(0, p);
};

export function FelgenETClient() {
  const [oldWidthIn, setOldWidthIn] = useState(7.5);
  const [oldET, setOldET] = useState(45);
  const [oldTireWidth, setOldTireWidth] = useState(225);

  const [newWidthIn, setNewWidthIn] = useState(8);
  const [newET, setNewET] = useState(35);
  const [newTireWidth, setNewTireWidth] = useState(235);

  const result = useMemo<ETResult>(() => {
    // Convert rim width from inches to mm
    const oW = oldWidthIn * 25.4;
    const nW = newWidthIn * 25.4;

    const oHalf = oW / 2;
    const nHalf = nW / 2;

    const oProt = protrusionMm(oldTireWidth, oW);
    const nProt = protrusionMm(newTireWidth, nW);

    // Geometry (mm) relative to hub mounting face:
    // inner edge distance = half width + ET
    // outer edge distance = half width - ET
    // Then we add a very rough tire protrusion estimate on both sides.
    const oldInner = oHalf + oldET + oProt;
    const oldOuter = oHalf - oldET + oProt;
    const newInner = nHalf + newET + nProt;
    const newOuter = nHalf - newET + nProt;

    const innerEdgeChange = newInner - oldInner;
    const outerEdgeChange = newOuter - oldOuter;

    // Centerline shift depends only on offset (ET): smaller ET pushes the wheel outward.
    const centerShift = oldET - newET;
    const trackChange = 2 * centerShift;

    return {
      innerEdgeChange,
      outerEdgeChange,
      centerShift,
      trackChange,
      oldInner,
      oldOuter,
      newInner,
      newOuter,
      oldProt: oProt,
      newProt: nProt,
    };
  }, [oldWidthIn, oldET, oldTireWidth, newWidthIn, newET, newTireWidth]);

  const innerText = result.innerEdgeChange >= 0
    ? `Innenkante rückt um ${result.innerEdgeChange.toFixed(1)} mm näher an Federbein/Innenradhaus (weniger Platz).`
    : `Innenkante gewinnt ${Math.abs(result.innerEdgeChange).toFixed(1)} mm mehr Platz (mehr Freigängigkeit).`;

  const outerText = result.outerEdgeChange >= 0
    ? `Außenkante steht um ${result.outerEdgeChange.toFixed(1)} mm weiter raus Richtung Kotflügel.`
    : `Außenkante sitzt um ${Math.abs(result.outerEdgeChange).toFixed(1)} mm weiter drin.`;

  const trackText = result.trackChange === 0
    ? 'Spurweite bleibt (rechnerisch) gleich.'
    : (result.trackChange > 0
      ? `Spurweite wird um ca. ${result.trackChange.toFixed(1)} mm breiter (≈ ${result.centerShift.toFixed(1)} mm pro Seite).`
      : `Spurweite wird um ca. ${Math.abs(result.trackChange).toFixed(1)} mm schmaler (≈ ${Math.abs(result.centerShift).toFixed(1)} mm pro Seite).`);

  // Quick risk hint (very rough). Anything beyond ~10–15 mm change can easily create clearance issues.
  const riskScore = Math.abs(result.innerEdgeChange) + Math.abs(result.outerEdgeChange);
  const riskLabel = riskScore < 10 ? 'niedrig' : riskScore < 25 ? 'mittel' : 'hoch';

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
          <h2 className="text-base font-semibold text-slate-900">Aktuelle Felge</h2>
          <div className="mt-4 grid grid-cols-3 gap-3">
            <label className="text-sm">
              <span className="block text-slate-600 mb-1">Breite (J)</span>
              <input
                type="number"
                step="0.5"
                value={oldWidthIn}
                onChange={(e) => setOldWidthIn(clamp(Number(e.target.value), 4, 13))}
                className="input"
              />
            </label>
            <label className="text-sm">
              <span className="block text-slate-600 mb-1">ET (mm)</span>
              <input
                type="number"
                step="1"
                value={oldET}
                onChange={(e) => setOldET(clamp(Number(e.target.value), -20, 80))}
                className="input"
              />
            </label>
            <label className="text-sm">
              <span className="block text-slate-600 mb-1">Reifenbreite (mm)</span>
              <input
                type="number"
                step="5"
                value={oldTireWidth}
                onChange={(e) => setOldTireWidth(clamp(Number(e.target.value), 135, 355))}
                className="input"
              />
            </label>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Hinweis: Reifen stehen i.d.R. etwas über die Felge über ("Bulge"). Das wird hier grob geschätzt.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
          <h2 className="text-base font-semibold text-slate-900">Neue Felge</h2>
          <div className="mt-4 grid grid-cols-3 gap-3">
            <label className="text-sm">
              <span className="block text-slate-600 mb-1">Breite (J)</span>
              <input
                type="number"
                step="0.5"
                value={newWidthIn}
                onChange={(e) => setNewWidthIn(clamp(Number(e.target.value), 4, 13))}
                className="input"
              />
            </label>
            <label className="text-sm">
              <span className="block text-slate-600 mb-1">ET (mm)</span>
              <input
                type="number"
                step="1"
                value={newET}
                onChange={(e) => setNewET(clamp(Number(e.target.value), -20, 80))}
                className="input"
              />
            </label>
            <label className="text-sm">
              <span className="block text-slate-600 mb-1">Reifenbreite (mm)</span>
              <input
                type="number"
                step="5"
                value={newTireWidth}
                onChange={(e) => setNewTireWidth(clamp(Number(e.target.value), 135, 355))}
                className="input"
              />
            </label>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Typische Werte: ET 30–55 (PKW). Extreme Werte können ohne Karosseriearbeiten schnell problematisch werden.
          </p>
        </div>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
        <h2 className="text-base font-semibold text-slate-900">Ergebnis</h2>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Innen</div>
            <div className="mt-1 text-sm text-slate-800">{innerText}</div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Außen</div>
            <div className="mt-1 text-sm text-slate-800">{outerText}</div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Spurweite</div>
            <div className="mt-1 text-sm text-slate-800">{trackText}</div>
          </div>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="text-sm font-semibold text-slate-800">Detailwerte (mm ab Nabenauflage)</div>
            <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <dt className="text-slate-500">Alt innen / außen</dt>
              <dd className="text-slate-800">{result.oldInner.toFixed(1)} / {result.oldOuter.toFixed(1)}</dd>
              <dt className="text-slate-500">Neu innen / außen</dt>
              <dd className="text-slate-800">{result.newInner.toFixed(1)} / {result.newOuter.toFixed(1)}</dd>
              <dt className="text-slate-500">Schätz-Bulge alt / neu</dt>
              <dd className="text-slate-800">{result.oldProt.toFixed(1)} / {result.newProt.toFixed(1)}</dd>
            </dl>
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <div className="text-sm font-semibold text-amber-900">Risiko-Einschätzung (grob)</div>
            <p className="mt-2 text-sm text-amber-900">
              Gesamtänderung (Innen+Außen): <strong>{riskScore.toFixed(1)} mm</strong> → Risiko: <strong>{riskLabel}</strong>
            </p>
            <p className="mt-2 text-xs text-amber-800">
              Das ist keine Freigabe. Entscheidend sind: Fahrzeug/Lenkeinschlag, Sturz, Fahrwerk, ET/Toleranzen, Reifenmodell, Felgenhorn.
              Wenn Innenkante deutlich näher kommt oder Außenkante deutlich weiter raussteht: unbedingt am Auto prüfen.
            </p>
          </div>
        </div>
      </section>

      <section className="text-sm text-slate-600 leading-relaxed">
        <h3 className="text-base font-semibold text-slate-900 mb-2">Wie werden die Werte berechnet?</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>ET (Einpresstiefe)</strong> ist der Abstand zwischen Felgenmitte und Nabenauflagefläche.</li>
          <li>Innenkante ≈ <code>Felgenbreite/2 + ET</code>, Außenkante ≈ <code>Felgenbreite/2 − ET</code>.</li>
          <li>Reifen stehen oft über die Felge. Wir schätzen das als <code>(Reifenbreite − Felgenbreite)/2</code> pro Seite.</li>
          <li><strong>Spurweite</strong> basiert hier auf der Verschiebung der Radmitte (nur ET): <code>2 × (ET_alt − ET_neu)</code>.</li>
        </ul>
      </section>
    </div>
  );
}
