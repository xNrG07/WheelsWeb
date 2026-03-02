'use client';

import { useState } from 'react';

type AgeStatus = 'ok' | 'alt' | 'sehr_alt';

interface DOTResult {
  week: number;
  year: number;
  productionDate: Date;
  ageMonths: number;
  status: AgeStatus;
}

const STATUS_MAP: Record<AgeStatus, { label: string; color: string; icon: string; advice: string }> = {
  ok: {
    label: 'OK',
    color: 'dot-green border',
    icon: '🟢',
    advice: 'Reifen ist weniger als 6 Jahre alt. Kein akuter Handlungsbedarf – regelmäßige Sichtprüfung empfohlen.',
  },
  alt: {
    label: 'Alt – prüfen',
    color: 'dot-yellow border',
    icon: '🟡',
    advice: 'Reifen ist 6–10 Jahre alt. Fachliche Inspektion auf Risse, Porösität und Profiltiefe empfohlen.',
  },
  sehr_alt: {
    label: 'Sehr alt – ersetzen',
    color: 'dot-red border',
    icon: '🔴',
    advice: 'Reifen ist über 10 Jahre alt. Austausch dringend empfohlen – Sicherheitsrisiko durch Materialalterung.',
  },
};

function parseDOT(raw: string): DOTResult | null {
  const cleaned = raw.replace(/\s+/g, '').toUpperCase();
  // Extract last 4 digits (WWYY) or last 3 (pre-2000: WWY not supported well → try 4-digit at end)
  const match4 = cleaned.match(/(\d{2})(\d{2})(?:\D|$)/);
  // Try known patterns: "DOT ...WWYY" or just "WWYY" or "WWWYY" 6-char
  let week = 0, year = 0;

  // Pattern: last 4 digits at end of string
  const tail4 = cleaned.match(/(\d{2})(\d{2})$/);
  const tail6 = cleaned.match(/(\d{2})(\d{2})(\d{2})$/);

  if (tail6) {
    // 6-char DOT: first 2 = week, last 4 = year (e.g. 232019 = week 23, 2019)
    const w = parseInt(tail6[1]);
    const y = parseInt(tail6[2] + tail6[3]);
    if (w >= 1 && w <= 53 && y >= 1990 && y <= 2099) {
      week = w; year = y;
    }
  }

  if ((!week || !year) && tail4) {
    const w = parseInt(tail4[1]);
    const y2 = parseInt(tail4[2]);
    const y = y2 >= 0 && y2 <= 25 ? 2000 + y2 : 1900 + y2;
    if (w >= 1 && w <= 53 && y >= 1990 && y <= 2099) {
      week = w; year = y;
    }
  }

  if (!week || !year) return null;

  // Jan 1 of year + (week-1)*7 days
  const jan1 = new Date(year, 0, 1);
  const productionDate = new Date(jan1.getTime() + (week - 1) * 7 * 24 * 3600 * 1000);
  const now = new Date();
  const ageMonths = (now.getFullYear() - productionDate.getFullYear()) * 12 +
    (now.getMonth() - productionDate.getMonth());

  let status: AgeStatus;
  if (ageMonths < 72) status = 'ok';
  else if (ageMonths < 120) status = 'alt';
  else status = 'sehr_alt';

  return { week, year, productionDate, ageMonths, status };
}

function generateICal(result: DOTResult): void {
  const reminderDate = new Date(result.productionDate);
  reminderDate.setFullYear(reminderDate.getFullYear() + 6);

  const pad = (n: number) => String(n).padStart(2, '0');
  const fmtDate = (d: Date) =>
    `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;

  const uid = `reifen-${result.week}-${result.year}@reifensetup.de`;
  const now = new Date();
  const stamp = `${fmtDate(now)}T${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}Z`;

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//ReifenSetup//DOT-Decoder//DE',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${stamp}`,
    `DTSTART;VALUE=DATE:${fmtDate(reminderDate)}`,
    `DTEND;VALUE=DATE:${fmtDate(reminderDate)}`,
    `SUMMARY:Reifen-Check: Reifen aus KW ${result.week}/${result.year} prüfen`,
    `DESCRIPTION:Dein Reifen (DOT KW ${result.week}/${result.year}) ist 6 Jahre alt. Lass ihn von einem Fachbetrieb prüfen.\\nquelle: reifensetup.de`,
    'BEGIN:VALARM',
    'TRIGGER:-P7D',
    'ACTION:DISPLAY',
    'DESCRIPTION:Reifen-Check Erinnerung',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `reifen-check-${result.year}-kw${result.week}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}

export function DOTDecoderClient() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<DOTResult | null>(null);
  const [error, setError] = useState('');

  function handleDecode() {
    if (!input.trim()) return;
    const r = parseDOT(input);
    if (r) {
      setResult(r);
      setError('');
    } else {
      setResult(null);
      setError(
        'Kein gültiges DOT-Format erkannt. Bitte gib die letzten 4 Ziffern ein (z. B. "2319") oder den vollständigen DOT-Code.'
      );
    }
  }

  const statusInfo = result ? STATUS_MAP[result.status] : null;

  return (
    <div>
      <div className="max-w-md">
        <label htmlFor="dot-input" className="label-text text-base">
          DOT-Code eingeben
        </label>
        <p className="text-xs text-slate-500 mb-2">
          Beispiele: <code className="font-mono bg-slate-100 rounded px-1">2319</code>{' '}
          oder <code className="font-mono bg-slate-100 rounded px-1">232019</code>{' '}
          oder <code className="font-mono bg-slate-100 rounded px-1">DOT U2LL LMLR 2319</code>
        </p>
        <div className="flex gap-2">
          <input
            id="dot-input"
            type="text"
            className="input-field flex-1"
            placeholder="z. B. 2319"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleDecode()}
            aria-describedby="dot-hint"
            maxLength={50}
            autoComplete="off"
          />
          <button
            onClick={handleDecode}
            className="btn-primary shrink-0"
            aria-label="DOT-Code dekodieren"
          >
            Dekodieren
          </button>
        </div>
        <p id="dot-hint" className="mt-1.5 text-xs text-slate-400">
          Die letzten 4–6 Ziffern der Seitenwand-Prägung eingeben.
        </p>
      </div>

      {error && (
        <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {error}
        </p>
      )}

      {result && statusInfo && (
        <div className="mt-8 space-y-5 max-w-lg">
          {/* Main result card */}
          <div className={`rounded-2xl border-2 p-6 ${statusInfo.color}`}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl" aria-hidden="true">{statusInfo.icon}</span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider opacity-70">Status</p>
                <p className="text-xl font-bold">{statusInfo.label}</p>
              </div>
            </div>

            <dl className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="opacity-70">Produktion</dt>
                <dd className="font-mono font-bold text-base">
                  KW {result.week}/{result.year}
                </dd>
              </div>
              <div>
                <dt className="opacity-70">Alter</dt>
                <dd className="font-mono font-bold text-base">
                  {result.ageMonths >= 12
                    ? `${Math.floor(result.ageMonths / 12)} J. ${result.ageMonths % 12} Mo.`
                    : `${result.ageMonths} Monate`}
                </dd>
              </div>
              <div>
                <dt className="opacity-70">Produktionsdatum (ca.)</dt>
                <dd className="font-mono font-medium">
                  {result.productionDate.toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })}
                </dd>
              </div>
              <div>
                <dt className="opacity-70">Empfehlung</dt>
                <dd className="font-medium text-xs leading-snug">{statusInfo.advice}</dd>
              </div>
            </dl>
          </div>

          {/* iCal button – clearly separated from result */}
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-sm text-slate-700 mb-3">
              Erinnerung für die nächste Reifen-Inspektion in deinen Kalender eintragen:
            </p>
            <button
              onClick={() => generateICal(result)}
              className="btn-secondary text-sm"
            >
              📅 Reminder-Datei (.ics) herunterladen
            </button>
            <p className="mt-2 text-xs text-slate-400">
              Wird clientseitig generiert – keine Daten verlassen deinen Browser.
              Erinnerung wird auf KW {result.week}/{result.year + 6} gesetzt (6 Jahre nach Produktion).
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
