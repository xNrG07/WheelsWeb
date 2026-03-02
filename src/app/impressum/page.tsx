import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Impressum',
  description: 'Impressum für ReifenSetup (Template – Betreiberangaben anpassen).',
  alternates: { canonical: '/impressum' },
  robots: { index: false, follow: false },
};

export default function ImpressumPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-slate-900">Impressum</h1>
        <p className="text-slate-600">
          Diese Seite ist ein Template. Du musst Betreiber- und Kontaktangaben korrekt eintragen.
          (Österreich: §5 ECG / MedienG; Deutschland: §5 DDG).
        </p>
      </header>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft space-y-4">
        <h2 className="text-base font-semibold text-slate-900">Angaben zum Betreiber</h2>
        <p className="text-sm text-slate-700">
          <strong>[Dein Name/Firma]</strong><br />
          [Straße, Hausnummer]<br />
          [PLZ Ort]<br />
          [Land]
        </p>
        <p className="text-sm text-slate-700">
          <strong>E-Mail:</strong> [kontakt@deinedomain.tld]<br />
          <strong>Telefon:</strong> [optional]
        </p>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft space-y-4">
        <h2 className="text-base font-semibold text-slate-900">Haftungsausschluss</h2>
        <p className="text-sm text-slate-700">
          Inhalte dieser Website wurden mit Sorgfalt erstellt, sind aber ohne Gewähr. Rechtliche Regeln (z.B. Winterausrüstung)
          können sich ändern; maßgeblich sind immer lokale Vorschriften und Beschilderung.
        </p>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft space-y-4">
        <h2 className="text-base font-semibold text-slate-900">Streitbeilegung</h2>
        <p className="text-sm text-slate-700">
          Wenn du verpflichtende Informationen zur Verbraucherstreitbeilegung angeben musst (je nach Land/Angebot), ergänze sie hier.
          Hinweis: Die EU-Online-Streitbeilegungsplattform (ODR) wurde 2025 eingestellt.
        </p>
      </section>
    </div>
  );
}
