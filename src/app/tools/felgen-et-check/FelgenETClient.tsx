'use client';

import { useMemo, useState } from 'react';

type ETResult = {
  innerEdgeChange: number;
  outerEdgeChange: number;
  centerShift: number;
  trackChange: number;
  oldInner: number;
  oldOuter: number;
  newInner: number;
  newOuter: number;
  oldProt: number;
  newProt: number;
};

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

const protrusionMm = (tireWidthMm: number, rimWidthMm: number) => {
  const p = (tireWidthMm - rimWidthMm) / 2;
  return Math.max(0, p);
};

function InputPanel({
  title,
  accent,
  widthIn,
  et,
  tireWidth,
  onWidthIn,
  onET,
  onTireWidth,
  hint,
}: {
  title: string;
  accent?: boolean;
  widthIn: number;
  et: number;
  tireWidth: number;
  onWidthIn: (v: number) => void;
  onET: (v: number) => void;
  onTireWidth: (v: number) => void;
  hint: string;
}) {
  return (
    <div
      className="rounded-2xl bg-white p-5"
      style={{
        border: `2px solid ${accent ? 'var(--c-brand)' : 'var(--c-border)'}`,
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
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
        {title}
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="label-text" htmlFor={`${title}-w`}>Breite (J)</label>
          <input
            id={`${title}-w`}
            type="number"
            step="0.5"
            value={widthIn}
            onChange={(e) => onWidthIn(clamp(Number(e.target.value), 4, 13))}
            className="input-field"
          />
        </div>
        <div>
          <label className="label-text" htmlFor={`${title}-et`}>ET (mm)</label>
          <input
            id={`${title}-et`}
            type="number"
            step="1"
            value={et}
            onChange={(e) => onET(clamp(Number(e.target.value), -20, 80))}
            className="input-field"
          />
        </div>
        <div>
          <label className="label-text" htmlFor={`${title}-tw`}>Reifen (mm)</label>
          <input
            id={`${title}-tw`}
            type="number"
            step="5"
            value={tireWidth}
            onChange={(e) => onTireWidth(clamp(Number(e.target.value), 135, 355))}
            className="input-field"
          />
        </div>
      </div>
      <p className="mt-3 text-xs text-slate-500 leading-relaxed">{hint}</p>
    </div>
  );
}

function DeltaBadge({ value }: { value: number }) {
  const abs = Math.abs(value);
  const bg = abs > 15 ? '#fef2f2' : abs > 5 ? '#fefce8' : '#f0fdf4';
  const border = abs > 15 ? '#fca5a5' : abs > 5 ? '#fde047' : '#86efac';
  const color = abs > 15 ? '#991b1b' : abs > 5 ? '#78350f' : '#14532d';
  return (
    <span
      className="inline-block rounded-full border-2 px-3 py-0.5 text-sm font-bold font-mono"
      style={{ background: bg, borderColor: border, color }}
    >
      {value >= 0 ? '+' : ''}{value.toFixed(1)} mm
    </span>
  );
}

export function FelgenETClient() {
  const [oldWidthIn, setOldWidthIn] = useState(7.5);
  const [oldET, setOldET] = useState(45);
  const [oldTireWidth, setOldTireWidth] = useState(225);

  const [newWidthIn, setNewWidthIn] = useState(8);
  const [newET, setNewET] = useState(35);
  const [newTireWidth, setNewTireWidth] = useState(235);

  const result = useMemo<ETResult>(() => {
    const oW = oldWidthIn * 25.4;
    const nW = newWidthIn * 25.4;
    const oProt = protrusionMm(oldTireWidth, oW);
    const nProt = protrusionMm(newTireWidth, nW);
    const oldInner = oW / 2 + oldET + oProt;
    const oldOuter = oW / 2 - oldET + oProt;
    const newInner = nW / 2 + newET + nProt;
    const newOuter = nW / 2 - newET + nProt;
    const innerEdgeChange = newInner - oldInner;
    const outerEdgeChange = newOuter - oldOuter;
    const centerShift = oldET - newET;
    const trackChange = 2 * centerShift;
    return { innerEdgeChange, outerEdgeChange, centerShift, trackChange, oldInner, oldOuter, newInner, newOuter, oldProt: oProt, newProt: nProt };
  }, [oldWidthIn, oldET, oldTireWidth, newWidthIn, newET, newTireWidth]);

  const innerText = result.innerEdgeChange >= 0
    ? `Rückt um ${result.innerEdgeChange.toFixed(1)} mm näher an Federbein/Innenradhaus.`
    : `Gewinnt ${Math.abs(result.innerEdgeChange).toFixed(1)} mm mehr Platz.`;

  const outerText = result.outerEdgeChange >= 0
    ? `Steht um ${result.outerEdgeChange.toFixed(1)} mm weiter Richtung Kotflügel.`
    : `Sitzt um ${Math.abs(result.outerEdgeChange).toFixed(1)} mm weiter innen.`;

  const trackText = result.trackChange === 0
    ? 'Spurweite bleibt gleich.'
    : result.trackChange > 0
      ? `Wird um ca. ${result.trackChange.toFixed(1)} mm breiter (${result.centerShift.toFixed(1)} mm pro Seite).`
      : `Wird um ca. ${Math.abs(result.trackChange).toFixed(1)} mm schmaler.`;

  const riskScore = Math.abs(result.innerEdgeChange) + Math.abs(result.outerEdgeChange);
  const riskLabel = riskScore < 10 ? 'Niedrig' : riskScore < 25 ? 'Mittel' : 'Hoch';
  const riskColor = riskScore < 10 ? '#14532d' : riskScore < 25 ? '#78350f' : '#7f1d1d';
  const riskBg = riskScore < 10 ? '#f0fdf4' : riskScore < 25 ? '#fefce8' : '#fef2f2';

  return (
    <div className="space-y-6">
      {/* Input panels */}
      <div className="grid gap-4 md:grid-cols-2">
        <InputPanel
          title="Aktuelle Felge"
          widthIn={oldWidthIn}
          et={oldET}
          tireWidth={oldTireWidth}
          onWidthIn={setOldWidthIn}
          onET={setOldET}
          onTireWidth={setOldTireWidth}
          hint="Hinweis: Reifen stehen i. d. R. etwas über die Felge über. Das wird hier grob geschätzt."
        />
        <InputPanel
          title="Neue Felge"
          accent
          widthIn={newWidthIn}
          et={newET}
          tireWidth={newTireWidth}
          onWidthIn={setNewWidthIn}
          onET={setNewET}
          onTireWidth={setNewTireWidth}
          hint="Typische Werte: ET 30–55 (PKW). Extreme Werte können ohne Karosseriearbeiten schnell problematisch werden."
        />
      </div>

      {/* Results */}
      <div
        className="rounded-2xl bg-white p-5"
        style={{ border: '2px solid var(--c-border)', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
      >
        <h2
          className="text-xl font-black text-slate-900 mb-4"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Ergebnis
        </h2>

        <div className="grid gap-3 md:grid-cols-3 mb-4">
          {[
            { label: 'Innenkante', text: innerText, value: result.innerEdgeChange },
            { label: 'Außenkante', text: outerText, value: result.outerEdgeChange },
            { label: 'Spurweite', text: trackText, value: result.trackChange },
          ].map(({ label, text, value }) => (
            <div
              key={label}
              className="rounded-xl p-4"
              style={{ background: 'var(--c-bg)', border: '1px solid var(--c-border)' }}
            >
              <div
                className="text-xs font-bold uppercase tracking-widest mb-2"
                style={{ color: 'var(--c-muted)', fontFamily: 'var(--font-display)' }}
              >
                {label}
              </div>
              <DeltaBadge value={value} />
              <p className="mt-2 text-sm text-slate-700 leading-snug">{text}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {/* Detail table */}
          <div
            className="rounded-xl p-4"
            style={{ background: 'var(--c-bg)', border: '1px solid var(--c-border)' }}
          >
            <div
              className="text-sm font-bold text-slate-800 mb-3"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Detailwerte (mm ab Nabenauflage)
            </div>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <dt className="text-slate-500">Alt innen / außen</dt>
              <dd className="font-mono text-slate-800">{result.oldInner.toFixed(1)} / {result.oldOuter.toFixed(1)}</dd>
              <dt className="text-slate-500">Neu innen / außen</dt>
              <dd className="font-mono text-slate-800">{result.newInner.toFixed(1)} / {result.newOuter.toFixed(1)}</dd>
              <dt className="text-slate-500">Schätz-Bulge alt / neu</dt>
              <dd className="font-mono text-slate-800">{result.oldProt.toFixed(1)} / {result.newProt.toFixed(1)}</dd>
            </dl>
          </div>

          {/* Risk */}
          <div
            className="rounded-xl p-4"
            style={{ background: riskBg, border: `1.5px solid ${riskColor}30`, color: riskColor }}
          >
            <div
              className="text-sm font-bold mb-2"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Risiko-Einschätzung (grob)
            </div>
            <p className="text-sm">
              Gesamtänderung: <strong className="font-mono">{riskScore.toFixed(1)} mm</strong>{' '}
              → Risiko: <strong>{riskLabel}</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Warning */}
      <div className="warning-box flex gap-3">
        <span className="shrink-0 text-lg" aria-hidden="true">⚠️</span>
        <div>
          <p className="font-bold mb-1">Nur zur Orientierung – kein Ersatz für Fachprüfung</p>
          <p>
            Diese Berechnung basiert ausschließlich auf geometrischen Formeln ohne Fahrzeugdaten.
            Freigängigkeit (Kotflügel, Bremssattel, Feder), ABE, Fahrzeugbrief-Eintragung und
            TÜV-Abnahme müssen separat geprüft werden.
          </p>
        </div>
      </div>

      {/* Formula explanation */}
      <section className="text-sm text-slate-600 leading-relaxed">
        <h3 className="text-base font-bold text-slate-900 mb-2" style={{ fontFamily: 'var(--font-display)' }}>
          Wie werden die Werte berechnet?
        </h3>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>ET (Einpresstiefe)</strong> ist der Abstand zwischen Felgenmitte und Nabenauflagefläche.</li>
          <li>Innenkante ≈ <code className="bg-slate-100 rounded px-1 font-mono text-xs">Felgenbreite/2 + ET</code>, Außenkante ≈ <code className="bg-slate-100 rounded px-1 font-mono text-xs">Felgenbreite/2 − ET</code>.</li>
          <li><strong>Spurweite</strong> basiert auf der Verschiebung der Radmitte: <code className="bg-slate-100 rounded px-1 font-mono text-xs">2 × (ET_alt − ET_neu)</code>.</li>
        </ul>
      </section>
    </div>
  );
}
