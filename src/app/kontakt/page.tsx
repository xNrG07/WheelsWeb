import type { Metadata } from 'next';
import Link from 'next/link';
import { KontaktClient } from './KontaktClient';

export const metadata: Metadata = {
  title: 'Kontakt',
  description: 'Kontakt aufnehmen – Fragen und Feedback zu ReifenCheck.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/kontakt' },
};

export default function KontaktPage() {
  return (
    <div className="section-container py-10 max-w-xl">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-500">
        <ol className="flex items-center gap-1.5">
          <li><Link href="/" className="hover:text-brand-600">Startseite</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-slate-700 font-medium">Kontakt</li>
        </ol>
      </nav>

      <h1 className="page-title mb-4">Kontakt</h1>
      <p className="text-slate-600 mb-8 leading-relaxed">
        Fragen, Hinweise zu Fehlern oder Anregungen? Schreib mir eine E-Mail –
        wir antworten in der Regel innerhalb von 2–3 Werktagen. Für rechtliche
        Anfragen benutze bitte die im Impressum genannte Adresse.
      </p>

      <KontaktClient />


    </div>
  );
}
