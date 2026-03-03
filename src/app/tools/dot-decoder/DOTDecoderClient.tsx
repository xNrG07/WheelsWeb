'use client';

import { useMemo, useState } from 'react';

type DotResult = {
  valid: boolean;
  week?: number;
  year?: number;
  date?: Date;
  ageMonths?: number;
  warning?: string;
};

const pad2 = (n: number) => String(n).padStart(2, '0');

function isoWeekMondayUTC(year: number, week: number): Date {
  const jan4 = new Date(Date.UTC(year, 0, 4));
  const jan4Dow = jan4.getUTCDay() || 7;
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

  if (m4) {
    const code = m4[1];
    const week = parseInt(code.slice(0, 2), 10);
    const y2 = parseInt(code.slice(2, 4), 10);
    if (!Number.isFinite(week) || week < 1 || week > 53)
      return { valid: false, warning: 'Ungültige Kalenderwoche (1–53).' };
    const year = (y2 <= nowYear2 ? 2000 : 1900) + y2;
    const date = isoWeekMondayUTC(year, week);
    const ageMonths = (now.getFullYear() - year) * 12 + (now.getMonth() - date.getUTCMonth());
    const warning = year < 2000
      ? 'Hinweis: DOT-Codes vor 2000 wurden oft anders kodiert (3-stellig). Das Ergebnis kann bei sehr alten Reifen falsch sein.'
      : undefined;
    return { valid: true, week, year, date, ageMonths, warning };
  }

  if (m6) {
    const code = m6[1];
    const week = parseInt(code.slice(0, 2), 10);
    const year = parseInt(code.slice(2, 6), 10);
    if (!Number.isFinite(week) || week < 1 || week > 53)
      return { valid: false, warning: 'Ungültige Kalenderwoche (1–53).' };
    if (!Number.isFinite(year) || year < 1980 || year > now.getFullYear() + 1)
      return { valid: false, warning: 'Jahr wirkt unplausibel.' };
    const date = isoWeekMondayUTC(year, week);
    const ageMonths = (now.getFullYear() - year) * 12 + (now.getMonth() - date.getUTCMonth());
    return { valid: true, week, year, date, ageMonths };
  }

  return {
    valid: false,
    warning: 'Kein DOT-Datum gefunden. Erwartet: letzte 4 Ziffern (WWYY) oder 6 Ziffern (WWYYYY).',
  };
}

function monthsToAgeString(months: number) {
  const y = Math.floor(months / 12);
  const m = months % 12;
  if (y <= 0) return `${m} Monat(e)`;
  if (m === 0) return `${y} Jahr(e)`;
  return `${y} Jahr(e), ${m} Monat(e)`;
}

function AgeIndicator({ months }: { months: number }) {
  const years = months / 12;
  const cls = years < 6 ? 'dot-green' : years < 10 ? 'dot-yellow' : 'dot-red';
  const icon = years < 6 ? '🟢' : years < 10 ? '🟡' : '🔴';
  const label = years < 6 ? 'OK – unter 6 Jahre' : years < 10 ? 'Alt – Prüfung empfohlen' : 'Sehr alt – Austausch empfohlen';
  const advice = years < 6
    ? 'Kein akuter Handlungsbedarf. Regelmäßige Sichtprüfung empfohlen.'
    : years < 10
    ? 'Fachliche Inspektion auf Risse, Porosität und Profiltiefe empfohlen.'
    : 'Austausch dringend empfohlen – erhöhtes Sicherheitsrisiko durch Materialalterung.';

  return (
    <div className={`rounded-2xl border-2 p-5 ${cls}`}>
      <div className="flex items-center gap-3 mb-3">
        <span className="text-3xl" aria-hidden="true">{icon}</span>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest opacity-60" style={{ fontFamily: 'var(--font-display)' }}>
            Status
          </p>
          <p className="text-lg font-black" style={{ fontFamily: 'var(--font-display)' }}>{label}</p>
        </div>
      </div>
      <p className="text-sm leading-relaxed opacity-80">{advice}</p>
    </div>
  );
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
    const dtEndDate = new Date(reminderDate);
    dtEndDate.setUTCDate(dtEndDate.getUTCDate() + 1);
    const dtEnd = `${dtEndDate.getUTCFullYear()}${pad2(dtEndDate.getUTCMonth() + 1)}${pad2(dtEndDate.getUTCDate())}`;
    const dtStamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
    const uid = `dot-${res.week}${String(res.year)}-${dtStart}@reifensetup`;
    const summary = `Reifen-Check: DOT ${pad2(res.week!)}/${res.year} ist jetzt ${remindAtYears} Jahre alt`;
    const ics = [
      'BEGIN:VCALENDAR', 'VERSION:2.0',
      'PRODID:-//ReifenSetup//DOT Reminder//DE', 'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT', `UID:${uid}`, `DTSTAMP:${dtStamp}`,
      `DTSTART;VALUE=DATE:${dtStart}`, `DTEND;VALUE=DATE:${dtEnd}`,
      `SUMMARY:${summary}`,
      'DESCRIPTION:Empfehlung: Reifenalter prüfen (Profil, Risse, DOT).',
      'END:VEVENT', 'END:VCALENDAR',
    ].join('\r\n');
    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `dot-reminder-${dtStart}.ics`;
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Input panel */}
      <div
        className="rounded-2xl bg-white p-5"
        style={{ border: '2px solid var(--c-border)', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
      >
        <h2 className="text-xl font-black text-slate-900 mb-1" style={{ fontFamily: 'var(--font-display)' }}>
          DOT eingeben
        </h2>
        <p className="text-sm text-slate-500 mb-4">
          Letzte 4 Ziffern des DOT-Codes (z.B. <code className="bg-slate-100 rounded px-1 font-mono text-xs">2325</code> für KW 23/2025),
          oder 6 Ziffern (<code className="bg-slate-100 rounded px-1 font-mono text-xs">232025</code>).
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="label-text" htmlFor="dot-input">DOT (letzte Ziffern)</label>
            <input
              id="dot-input"
              value={dot}
              onChange={(e) => setDot(e.target.value)}
              className="input-field"
              placeholder="z.B. 2325"
              maxLength={20}
              autoComplete="off"
              spellCheck={false}
            />
          </div>
          <div>
            <label className="label-text" htmlFor="remind-years">Erinnerung nach (Jahre)</label>
            <input
              id="remind-years"
              type="number"
              min={1}
              max={15}
              step={1}
              value={remindAtYears}
              onChange={(e) => setRemindAtYears(Math.max(1, Math.min(15, Number(e.target.value))))}
              className="input-field"
            />
          </div>
        </div>
      </div>

      {/* Result panel */}
      <div
        className="rounded-2xl bg-white p-5"
        style={{ border: '2px solid var(--c-border)', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
      >
        <h2 className="text-xl font-black text-slate-900 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
          Ergebnis
        </h2>

        {!res.valid ? (
          <div className="rounded-xl border-2 border-red-200 bg-red-50 p-4">
            <p className="text-sm text-red-800 font-semibold">{res.warning ?? 'Ungültiger DOT-Code.'}</p>
          </div>
        ) : (
          <>
            <div className="grid gap-3 md:grid-cols-3 mb-4">
              {[
                { label: 'Herstellungswoche', value: `KW ${pad2(res.week!)} / ${res.year}` },
                { label: 'Ungefähres Datum', value: res.date?.toLocaleDateString('de-DE') ?? '—' },
                { label: 'Alter', value: typeof res.ageMonths === 'number' ? monthsToAgeString(Math.max(0, res.ageMonths)) : '—' },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="rounded-xl p-4"
                  style={{ background: 'var(--c-bg)', border: '1px solid var(--c-border)' }}
                >
                  <div
                    className="text-xs font-bold uppercase tracking-widest mb-1"
                    style={{ color: 'var(--c-muted)', fontFamily: 'var(--font-display)' }}
                  >
                    {label}
                  </div>
                  <div className="text-sm font-mono font-semibold text-slate-800">{value}</div>
                </div>
              ))}
            </div>

            {typeof res.ageMonths === 'number' && (
              <AgeIndicator months={Math.max(0, res.ageMonths)} />
            )}

            {res.warning && (
              <div className="mt-3 warning-box">{res.warning}</div>
            )}
          </>
        )}

        {res.valid && reminderDate && (
          <div
            className="mt-4 rounded-xl p-4"
            style={{ background: 'var(--c-bg)', border: '1px solid var(--c-border)' }}
          >
            <p className="text-sm font-bold text-slate-800 mb-1" style={{ fontFamily: 'var(--font-display)' }}>
              Kalender-Erinnerung
            </p>
            <p className="text-sm text-slate-600 mb-3">
              Erinnerung am <strong>{reminderDate.toLocaleDateString('de-DE')}</strong> erzeugen
              ({remindAtYears} Jahre nach Herstellung).
            </p>
            <button onClick={downloadIcs} className="btn-primary">
              📅 .ics herunterladen
            </button>
            <p className="mt-2 text-xs text-slate-400">
              Wird clientseitig generiert – keine Daten verlassen deinen Browser.
            </p>
          </div>
        )}
      </div>

      {/* Info */}
      <section className="text-sm text-slate-600 leading-relaxed">
        <h3 className="text-base font-bold text-slate-900 mb-2" style={{ fontFamily: 'var(--font-display)' }}>
          Wichtig
        </h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>DOT sagt nur das Herstellungsdatum – nicht, ob der Reifen noch sicher ist.</li>
          <li>Prüfe Profil, Risse, Ausbeulungen und Alterung. Bei Unsicherheit: Reifenfachbetrieb.</li>
        </ul>
      </section>
    </div>
  );
}
