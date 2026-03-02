import Link from 'next/link';
import { tools } from '@/lib/config';

export default function NotFound() {
  return (
    <div className="section-container py-24 text-center">
      <p className="text-6xl font-bold text-slate-200 mb-4" aria-hidden="true">404</p>
      <h1 className="text-2xl font-bold text-slate-900 mb-2" style={{ fontFamily: 'var(--font-display)' }}>
        Seite nicht gefunden
      </h1>
      <p className="text-slate-500 mb-8">
        Die gesuchte Seite existiert nicht oder wurde verschoben.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-primary">Zur Startseite</Link>
        {tools.map((t) => (
          <Link key={t.slug} href={t.href} className="btn-secondary text-sm">
            {t.icon} {t.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
