import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung',
  description: 'Datenschutzerklärung von ReifenSetup – Informationen zu Datenverarbeitung, Cookies und Google AdSense.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/datenschutz' },
};

export default function DatenschutzPage() {
  return (
    <div className="section-container py-10 max-w-2xl">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-500">
        <ol className="flex items-center gap-1.5">
          <li><Link href="/" className="hover:text-brand-600">Startseite</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-slate-700 font-medium">Datenschutz</li>
        </ol>
      </nav>

      <h1 className="page-title mb-8">Datenschutzerklärung</h1>

      <div className="space-y-8 text-sm text-slate-700 leading-relaxed">
        <section>
          <h2 className="font-semibold text-slate-900 text-base mb-2">1. Verantwortlicher</h2>
          <address className="not-italic">
            <p>[Vorname Nachname / Firma]</p>
            <p>[Straße Hausnummer, PLZ Ort]</p>
            <p>E-Mail: <a href="mailto:kontakt@reifensetup.de" className="text-brand-600">kontakt@reifensetup.de</a></p>
          </address>
        </section>

        <section>
          <h2 className="font-semibold text-slate-900 text-base mb-2">2. Grundsätzliches zur Datenverarbeitung</h2>
          <p>
            Die Tools auf ReifenSetup (Reifenrechner, Felgen ET-Check, DOT-Decoder) werden ausschließlich
            clientseitig im Browser berechnet. Es werden keine Eingaben an unsere Server übermittelt.
          </p>
          <p className="mt-2">
            Beim Besuch der Website werden automatisch technische Daten (IP-Adresse, Browser, Betriebssystem,
            Referrer, Datum/Uhrzeit) im Rahmen des Hostings verarbeitet. Rechtsgrundlage: Art. 6 Abs. 1
            lit. f DSGVO (berechtigtes Interesse am Betrieb des Dienstes).
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-slate-900 text-base mb-2">3. Cookies</h2>
          <p>
            Wir setzen zwei Kategorien von Cookies ein:
          </p>
          <ul className="mt-2 space-y-2 list-disc list-inside">
            <li>
              <strong>Notwendige Cookies:</strong> Das Cookie <code className="font-mono bg-slate-100 rounded px-1">rs_consent_v1</code> speichert
              Ihre Cookie-Einwilligung im <code className="font-mono bg-slate-100 rounded px-1">localStorage</code>. Keine Übermittlung an Dritte.
              Rechtsgrundlage: Art. 6 Abs. 1 lit. c DSGVO.
            </li>
            <li>
              <strong>Marketing-Cookies (optional):</strong> Wenn Sie der Nutzung von Marketing-Cookies
              zustimmen, wird Google AdSense geladen (siehe Abschnitt 4).
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-semibold text-slate-900 text-base mb-2">4. Google AdSense</h2>
          <p>
            Mit Ihrer Einwilligung in Marketing-Cookies binden wir Google AdSense ein.
            Betreiber: Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland.
          </p>
          <p className="mt-2">
            Google AdSense verwendet Cookies und Web-Beacons, um personalisierte Werbung
            auszuspielen. Google kann dabei Ihre IP-Adresse und weitere Browserinformationen
            verarbeiten und in Länder außerhalb der EU übermitteln. Rechtsgrundlage:
            Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).
          </p>
          <p className="mt-2">
            Datenschutzerklärung Google:{' '}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">
              https://policies.google.com/privacy
            </a>
          </p>
          <p className="mt-2">
            Sie können Ihre Einwilligung jederzeit widerrufen, indem Sie den Cookie-Consent-Banner
            über die Schaltfläche in der Fußzeile neu aufrufen und nur notwendige Cookies auswählen.
            Alternativ können Sie personalisierte Werbung unter{' '}
            <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">
              adssettings.google.com
            </a>{' '}
            deaktivieren.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-slate-900 text-base mb-2">5. Ihre Rechte (DSGVO)</h2>
          <p>Sie haben das Recht auf:</p>
          <ul className="mt-2 space-y-1 list-disc list-inside">
            <li>Auskunft über gespeicherte Daten (Art. 15 DSGVO)</li>
            <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
            <li>Löschung (Art. 17 DSGVO)</li>
            <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
            <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
            <li>Widerspruch (Art. 21 DSGVO)</li>
            <li>Beschwerde bei einer Aufsichtsbehörde (Art. 77 DSGVO)</li>
          </ul>
          <p className="mt-2">
            Kontakt für Datenschutzanfragen: <a href="mailto:kontakt@reifensetup.de" className="text-brand-600 hover:underline">kontakt@reifensetup.de</a>
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-slate-900 text-base mb-2">6. Änderungen</h2>
          <p>Stand: Januar 2025. Wir behalten uns vor, diese Erklärung bei Änderungen der Rechtslage oder
          unseres Angebots zu aktualisieren.</p>
        </section>
      </div>
    </div>
  );
}
