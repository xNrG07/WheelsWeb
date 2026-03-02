import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Impressum',
  description: 'Angaben gemäß § 5 TMG – Impressum von ReifenSetup.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/impressum' },
};

export default function ImpressumPage() {
  return (
    <div className="section-container py-10 max-w-2xl">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-500">
        <ol className="flex items-center gap-1.5">
          <li><Link href="/" className="hover:text-brand-600">Startseite</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-slate-700 font-medium">Impressum</li>
        </ol>
      </nav>

      <h1 className="page-title mb-8">Impressum</h1>

      <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
        <section>
          <h2 className="font-semibold text-slate-900 mb-2">Angaben gemäß § 5 TMG</h2>
          <address className="not-italic">
            <p>[Vorname Nachname / Firma]</p>
            <p>[Straße Hausnummer]</p>
            <p>[PLZ Ort]</p>
            <p>[Land]</p>
          </address>
        </section>

        <section>
          <h2 className="font-semibold text-slate-900 mb-2">Kontakt</h2>
          <p>E-Mail: <a href="mailto:kontakt@reifensetup.de" className="text-brand-600 hover:underline">kontakt@reifensetup.de</a></p>
        </section>

        <section>
          <h2 className="font-semibold text-slate-900 mb-2">Umsatzsteuer-ID</h2>
          <p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: [DE XXXXXXXXX]</p>
        </section>

        <section>
          <h2 className="font-semibold text-slate-900 mb-2">Redaktionell Verantwortlicher</h2>
          <address className="not-italic">
            <p>[Vorname Nachname]</p>
            <p>[Adresse wie oben]</p>
          </address>
        </section>

        <section>
          <h2 className="font-semibold text-slate-900 mb-2">EU-Streitschlichtung</h2>
          <p>
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
            <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">
              https://ec.europa.eu/consumers/odr/
            </a>.
            Unsere E-Mail-Adresse finden Sie oben im Impressum. Wir sind nicht bereit oder verpflichtet,
            an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-slate-900 mb-2">Haftungsausschluss</h2>
          <p>
            Die Berechnungen und Informationen auf ReifenSetup dienen ausschließlich der Orientierung
            und ersetzen keine Fachberatung. Für die Richtigkeit, Vollständigkeit und Aktualität der
            Inhalte übernehmen wir keine Gewähr. Die Nutzung der Tools erfolgt auf eigene Verantwortung.
          </p>
        </section>
      </div>
    </div>
  );
}
