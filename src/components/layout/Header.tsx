'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navLinks = [
  { href: '/tools/reifenrechner', label: 'Reifenrechner' },
  { href: '/tools/felgen-et-check', label: 'ET-Check' },
  { href: '/tools/dot-decoder', label: 'DOT-Decoder' },
  { href: '/winterpflicht', label: 'Winterpflicht' },
  { href: '/guide/reifen-basiswissen', label: 'Ratgeber' },
];

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white shadow-sm">
      <div className="section-container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group"
          aria-label="ReifenSetup – Startseite"
        >
          <span
            className="flex h-9 w-9 items-center justify-center rounded-xl text-white text-lg font-black shadow-sm"
            style={{ background: 'var(--c-brand)', fontFamily: 'var(--font-display)' }}
            aria-hidden="true"
          >
            RS
          </span>
          <span
            className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-brand-700 transition-colors"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            ReifenSetup
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Hauptnavigation" className="hidden md:flex items-center gap-0.5">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-lg px-3.5 py-2 text-sm font-semibold tracking-wide transition-all duration-150 ${
                  active
                    ? 'text-brand-700 bg-brand-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
                style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.03em' }}
                aria-current={active ? 'page' : undefined}
              >
                {link.label}
                {active && (
                  <span
                    className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full"
                    style={{ background: 'var(--c-brand)' }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden rounded-lg p-2 text-slate-600 hover:bg-slate-100 transition-colors"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'}
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile Navigation"
          className="md:hidden border-t border-slate-100 bg-white divide-y divide-slate-50"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`block px-6 py-3 text-sm font-semibold transition-colors ${
                pathname === link.href
                  ? 'bg-brand-50 text-brand-700'
                  : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
              }`}
              style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.04em' }}
              aria-current={pathname === link.href ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
