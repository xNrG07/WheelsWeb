'use client';

import { useMemo, useState } from 'react';

// All code comments are in English as requested by the project convention.

type DotResult = {
  valid: boolean;
  week?: number;
  year?: number;
  date?: Date;
  ageMonths?: number;
  warning?: string;
};

const pad2 = (n: number) => String(n).padStart(2, '0');

// Convert ISO week number to the Monday date of that week (UTC-based to avoid TZ drift).
function isoWeekMondayUTC(year: number, week: number): Date {
  // ISO week 1 is the week that contains Jan 4.
  const jan4 = new Date(Date.UTC(year, 0, 4));
  const jan4Dow = jan4.getUTCDay() || 7; // 1..7 (Mon..Sun)
  const mondayWeek1 = new Date(jan4);
  mondayWeek1.setUTCDate(jan4.getUTCDate() - (jan4Dow - 1));

  const monday = new Date(mondayWeek1);
  monday.setUTCDate(mondayWeek1.getUTCDate() + (week - 1) * 7);
  return monday;
}

function parseDOT(input: string): DotResult {
  const raw = input.trim().toUpperCase();
  const m4 = raw.match(/(\d{4})\s*$/);
  const m6 = raw.match(/(\d{6})\s*$/);

  const now = new Date();
  const nowYear2 = now.getFullYear() % 100;

  // Prefer last 4 digits (standard since 2000): WWYY
  if (m4) {
    const code = m4[1];
    const week = parseInt(code.slice(0, 2), 10);
    const y2 = parseInt(code.slice(2, 4), 10);

    if (!Number.isFinite(week) || week < 1 || week > 53) {
      return { valid: false, warning: 'Ungültige Kalenderwoche (1–53).' };
    }

    // Heuristic: if YY <= current YY, assume 20YY, else 19YY.
    // DOT before 2000 used different formats (3 digits), which this tool does not decode reliably.
    const year = (y2 <= nowYear2 ? 2000 : 1900) + y2;
    const date = isoWeekMondayUTC(year, week);

    const ageMonths = (now.getFullYear() - year) * 12 + (now.getMonth() - date.getUTCMonth());

    const warning = year < 2000
      ? 'Hinweis: DOT-Codes vor 2000 wurden oft anders kodiert (3-stellig). Das Ergebnis kann bei sehr alten Reifen falsch sein.'
      : undefined;

    return { valid: true, week, year, date, ageMonths, warning };
  }

  // Some manufacturers include WWYYYY (6 digits)
  if (m6) {
    const code = m6[1];
    const week = parseInt(code.slice(0, 2), 10);
    const year = parseInt(code.slice(2, 6), 10);

    if (!Number.isFinite(week) || week < 1 || week > 53) {
      return { valid: false, warning: 'Ungültige Kalenderwoche (1–53).' };
    }
    if (!Number.isFinite(year) || year < 1980 || year > now.getFullYear() + 1) {
      return { valid: false, warning: 'Jahr wirkt unplausibel.' };
    }

    const date = isoWeekMondayUTC(year, week);
    const ageMonths = (now.getFullYear() - year) * 12 + (now.getMonth() - date.getUTCMonth());

    return { valid: true, week, year, date, ageMonths };
  }

  return {
    valid: false,
    warning: 'Kein DOT-Datum gefunden. Erwartet werden die letzten 4 Ziffern (WWYY) oder 6 Ziffern (WWYYYY).',
  };
}

function monthsToAgeString(months: number) {
  const y = Math.floor(months / 12);
  const m = months % 12;
  if (y <= 0) return `${m} Monat(e)`;
  if (m === 0) return `${y} Jahr(e)`;
  return `${y} Jahr(e), ${m} Monat(e)`;
}

export function DOTDecoderClient() {
  const [dot, setDot] = useState('2325');
  const [remindAtYears, setRemindAtYears] = useState(6);

  const res = useMemo(() => parseDOT(dot), [dot]);

  const reminderDate = useMemo(() => {
    if (!res.valid || !res.date) return null;
    const d = new Date(res.date);
    d.setUTCFullYear(d.getUTCFullYear() + remindAtYears);
    return d;
  }, [res, remindAtYears]);

  const downloadIcs = () => {
    if (!reminderDate || !res.valid || !res.week || !res.year) return;

    const dtStart = `${reminderDate.getUTCFullYear()}${pad2(reminderDate.getUTCMonth() + 1)}${pad2(reminderDate.getUTCDate())}`;

    // All-day events should have DTEND = next day (exclusive).
    const dtEndDate = new Date(reminderDate);
    dtEndDate.setUTCDate(dtEndDate.getUTCDate() + 1);
    const dtEnd = `${dtEndDate.getUTCFullYear()}${pad2(dtEndDate.getUTCMonth() + 1)}${pad2(dtEndDate.getUTCDate())}`;

    const dtStamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');

    const uid = `dot-${res.week}${String(res.year)}-${dtStart}@reifensetup`;
    const summary = `Reifen-Check: DOT ${pad2(res.week)}/${res.year} ist jetzt ${remindAtYears} Jahre alt`;

    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//ReifenSetup//DOT Reminder//DE',
      'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      `UID:${uid}`,
      `DTSTAMP:${dtStamp}`,
      `DTSTART;VALUE=DATE:${dtStart}`,
      `DTEND;VALUE=DATE:${dtEnd}`,
      `SUMMARY:${summary}`,
      'DESCRIPTION:Empfehlung: Reifenalter prüfen (Profil, Risse, DOT).',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `dot-reminder-${dtStart}.ics`;
    document.body.appendChild(a);
    a.click();
    a.remove();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
        <h2 className="text-base font-semibold text-slate-900">DOT eingeben</h2>
        <p className="mt-2 text-sm text-slate-600">
          Gib die letzten 4 Ziffern des DOT-Codes ein (Kalenderwoche + Jahr), z.B. <code>2325</code> für KW 23/2025.
          Manche Hersteller verwenden 6 Ziffern (<code>232025</code> für KW 23/2025).
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <label className="text-sm">
            <span className="block text-slate-600 mb-1">DOT (letzte Ziffern)</span>
            <input
              value={dot}
              onChange={(e) => setDot(e.target.value)}
              className="input"
              placeholder="z.B. 2325"
            />
          </label>

          <label className="text-sm">
            <span className="block text-slate-600 mb-1">Erinnerung nach (Jahre)</span>
            <input
              type="number"
              min={1}
              max={15}
              step={1}
              value={remindAtYears}
              onChange={(e) => setRemindAtYears(Math.max(1, Math.min(15, Number(e.target.value))))}
              className="input"
            />
          </label>
        </div>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
        <h2 className="text-base font-semibold text-slate-900">Ergebnis</h2>

        {!res.valid ? (
          <div className="mt-4 rounded-xl border border-red-100 bg-red-50 p-4">
            <p className="text-sm text-red-800 font-medium">{res.warning ?? 'Ungültiger DOT-Code.'}</p>
          </div>
        ) : (
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Herstellungswoche</div>
              <div className="mt-1 text-sm text-slate-800">KW {pad2(res.week!)} / {res.year}</div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Ungefähres Datum</div>
              <div className="mt-1 text-sm text-slate-800">{res.date?.toLocaleDateString('de-DE')}</div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Alter (grobe Näherung)</div>
              <div className="mt-1 text-sm text-slate-800">
                {typeof res.ageMonths === 'number' ? monthsToAgeString(Math.max(0, res.ageMonths)) : '—'}
              </div>
            </div>
          </div>
        )}

        {res.valid && res.warning && (
          <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm text-amber-900">{res.warning}</p>
          </div>
        )}

        {res.valid && reminderDate && (
          <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4">
            <div className="text-sm font-semibold text-slate-800">Kalender-Erinnerung</div>
            <p className="mt-2 text-sm text-slate-600">
              Erinnerung am <strong>{reminderDate.toLocaleDateString('de-DE')}</strong> erzeugen.
            </p>
            <button
              onClick={downloadIcs}
              className="mt-3 inline-flex items-center justify-center rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-soft hover:bg-brand-700"
            >
              .ics herunterladen
            </button>
            <p className="mt-2 text-xs text-slate-500">
              iCal-Hinweis: All-Day Event, DTEND ist der Folgetag (iCal-Standard).
            </p>
          </div>
        )}
      </section>

      <section className="text-sm text-slate-600 leading-relaxed">
        <h3 className="text-base font-semibold text-slate-900 mb-2">Wichtig</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>DOT sagt nur das Herstellungsdatum – nicht, ob der Reifen noch sicher ist.</li>
          <li>Prüfe Profil, Risse, Ausbeulungen und Alterung. Bei Unsicherheit: Reifenfachbetrieb.</li>
        </ul>
      </section>
    </div>
  );
}
