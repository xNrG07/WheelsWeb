import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { ConsentSettingsButton } from '@/components/consent/ConsentSettingsButton';

export function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <div className="text-sm font-semibold text-slate-900">{siteConfig.name}</div>
            <div className="text-sm text-slate-600">
              Reifen-Tools &amp; kompakte Infos. Regionale Beschilderung hat Vorrang.
            </div>
          </div>

          <nav className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            <Link href="/impressum" className="text-slate-500 hover:text-slate-900">Impressum</Link>
            <Link href="/datenschutz" className="text-slate-500 hover:text-slate-900">Datenschutz</Link>
            <Link href="/kontakt" className="text-slate-500 hover:text-slate-900">Kontakt</Link>
            <ConsentSettingsButton />
          </nav>
        </div>

        <div className="mt-6 text-xs text-slate-400">
          © {new Date().getFullYear()} {siteConfig.name}. Inhalte ohne Gewähr.
        </div>
      </div>
    </footer>
  );
}
