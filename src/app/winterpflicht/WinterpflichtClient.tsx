'use client';

import { useState } from 'react';
import Link from 'next/link';
import { type WinterRegulation, RULE_TYPE_LABELS, RULE_TYPE_COLORS, type RuleType } from '@/data/winterRegulations';

export function WinterpflichtClient({ regulations }: { regulations: WinterRegulation[] }) {
  const [filter, setFilter] = useState<RuleType | 'all'>('all');

  const filtered = filter === 'all' ? regulations : regulations.filter((r) => r.rule_type === filter);

  return (
    <div>
      {/* Filter buttons */}
      <div className="mb-5 flex flex-wrap gap-2" role="group" aria-label="Filter nach Regelungstyp">
        <button
          onClick={() => setFilter('all')}
          className={`rounded-full px-4 py-1.5 text-sm font-semibold border transition ${filter === 'all' ? 'bg-brand-600 text-white border-brand-600' : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'}`}
          aria-pressed={filter === 'all'}
        >
          Alle ({regulations.length})
        </button>
        {(Object.entries(RULE_TYPE_LABELS) as [RuleType, string][]).map(([type, label]) => {
          const count = regulations.filter((r) => r.rule_type === type).length;
          return (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold border transition ${filter === type ? 'bg-brand-600 text-white border-brand-600' : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'}`}
              aria-pressed={filter === type}
            >
              {label} ({count})
            </button>
          );
        })}
      </div>

      {/* Country grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((reg) => (
          <Link
            key={reg.slug}
            href={`/winterpflicht/${reg.slug}`}
            className="tool-card group flex flex-col hover:border-brand-200"
            aria-label={`Winterreifenpflicht ${reg.country}: ${RULE_TYPE_LABELS[reg.rule_type]}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl" aria-hidden="true">{reg.flag}</span>
                <span className="font-semibold text-slate-900 group-hover:text-brand-700 transition-colors">
                  {reg.country}
                </span>
              </div>
              <span className={`shrink-0 rounded-full border px-2 py-0.5 text-xs font-semibold ${RULE_TYPE_COLORS[reg.rule_type]}`}>
                {RULE_TYPE_LABELS[reg.rule_type]}
              </span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed flex-1">{reg.rule_summary.slice(0, 120)}...</p>
            {reg.when_applies && (
              <p className="mt-2 text-xs text-slate-400">
                <strong className="text-slate-500">Zeitraum:</strong> {reg.when_applies}
              </p>
            )}
            <span className="mt-3 text-xs font-medium text-brand-600 group-hover:text-brand-700">
              Details ansehen →
            </span>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-slate-500 py-10">Keine Länder für diesen Filter gefunden.</p>
      )}
    </div>
  );
}
