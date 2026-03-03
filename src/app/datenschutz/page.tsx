import type { Metadata } from 'next';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung',
  description: 'Datenschutzerklärung für ReifenSetup – Informationen zu Datenverarbeitung, Cookies/LocalStorage und ggf. Werbung (Google AdSense).',
  alternates: { canonical: '/datenschutz' },
  robots: { index: false, follow: false },
};

export default function DatenschutzPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-slate-900">Datenschutzerklärung</h1>
        <p className="text-slate-600">
          Diese Seite ist ein Template. <strong>Du musst Betreiber- und Kontaktangaben</strong> (Firma/Name, Adresse, E-Mail)
          sowie ggf. Auftragsverarbeiter (Hosting) anpassen.
        </p>
      </header>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft space-y-4">
        <h2 className="text-base font-semibold text-slate-900">1. Verantwortlicher</h2>
        <p className="text-sm text-slate-700">
          <strong>[Dein Name/Firma]</strong><br />
          <strong>[Adresse]</strong><br />
          <strong>E-Mail:</strong> [kontakt@deinedomain.tld]
        </p>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft space-y-4">
        <h2 className="text-base font-semibold text-slate-900">2. Welche Daten werden verarbeitet?</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700">
          <li>
            <strong>Server-Logfiles (Hosting):</strong> Bei jedem Aufruf werden technisch notwendige Daten verarbeitet (IP-Adresse, Datum/Uhrzeit,
            User-Agent, Referrer, angeforderte URL, Statuscode). Das ist Standard beim Webhosting.
          </li>
          <li>
            <strong>Lokale Speicherung (LocalStorage):</strong> Diese Website speichert optional Einstellungen (z.B. Dark Mode oder Werbe-Einwilligung)
            im Browser über <code>localStorage</code>. Das ist kein Cookie, sondern lokale Browser-Speicherung.
          </li>
          <li>
            <strong>Kontaktformular:</strong> Wenn du das Formular nutzt, werden die von dir eingegebenen Daten verarbeitet.
            In diesem Projekt ist das Formular nur als UI vorhanden (ohne Backend-Versand) – falls du später E-Mail/CRM anbindest,
            musst du das hier ergänzen.
          </li>
        </ul>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft space-y-4">
        <h2 className="text-base font-semibold text-slate-900">3. Werbung (Google AdSense)</h2>
        <p className="text-sm text-slate-700">
          Wenn Werbung aktiviert ist, kann Google (Google Ireland Limited) Technologien einsetzen, um Anzeigen auszuliefern.
          Dabei können personenbezogene Daten verarbeitet werden (z.B. Online-IDs, IP-Adresse, Interaktionen).
        </p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700">
          <li>
            <strong>Einwilligung:</strong> Diese Website ist so gebaut, dass Anzeigen erst nach Einwilligung angezeigt werden (sofern konfiguriert).
          </li>
          <li>
            <strong>EEA/UK/CH:</strong> Für personalisierte Werbung verlangt Google für Traffic aus dem EWR/UK/CH eine <strong>Google-zertifizierte CMP</strong>
            (Consent Management Platform). Ein selbst gebautes Banner reicht dafür nicht.
          </li>
          <li>
            <strong>Google Funding Choices:</strong> Wenn du Google Privacy &amp; Messaging / Funding Choices nutzt, wird die Einwilligung dort verwaltet.
            Dann solltest du Einwilligungs- und Widerrufsfunktionen über dieses System anbieten.
          </li>
        </ul>
        <p className="text-xs text-slate-500">
          Domain/Betreiber müssen in Google AdSense korrekt hinterlegt sein. Außerdem brauchst du üblicherweise eine <code>ads.txt</code>.
        </p>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft space-y-4">
        <h2 className="text-base font-semibold text-slate-900">4. Rechtsgrundlagen (Kurzüberblick)</h2>
        <p className="text-sm text-slate-700">
          Typisch sind (je nach Setup): <strong>Art. 6 Abs. 1 lit. f DSGVO</strong> (berechtigtes Interesse – Betrieb/Sicherheit),
          <strong>Art. 6 Abs. 1 lit. b DSGVO</strong> (Vertrag/Vorvertrag – z.B. Anfrage), und <strong>Art. 6 Abs. 1 lit. a DSGVO</strong> (Einwilligung – z.B. Marketing/Ads).
          Das ist keine Rechtsberatung.
        </p>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft space-y-4">
        <h2 className="text-base font-semibold text-slate-900">5. Kontakt</h2>
        <p className="text-sm text-slate-700">
          Fragen zum Datenschutz: <strong>[datenschutz@deinedomain.tld]</strong>
        </p>
        <p className="text-xs text-slate-500">
          Website: {siteConfig.name} ({siteConfig.url})
        </p>
      </section>
    </div>
  );
}
