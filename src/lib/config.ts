export const siteConfig = {
  name: 'ReifenCheck',
  tagline: 'Reifentools für DACH & Europa',
  description:
    'Kostenlose Reifen-Tools: Reifengrößen berechnen, Felgen-ET prüfen, DOT-Code auslesen und Winterreifenpflicht in Europa nachschlagen.',
  url: 'https://reifencheck.org',
  locale: 'de_DE',
  twitterHandle: '@reifencheck',
  keywords: [
    'Reifenrechner',
    'Felgen ET Check',
    'DOT Code Decoder',
    'Winterreifenpflicht Europa',
    'Reifengröße berechnen',
    'Tachoabweichung Reifen',
  ],
};

export const AD_CONFIG = {
  // NOTE:
  // - ENABLED must be true for ads to render.
  // - Replace PUBLISHER_ID + SLOTS with your real values from Google AdSense.
  //   If you keep the placeholders, the ad components stay hidden and nothing will show.
  ENABLED: true,
  PUBLISHER_ID: 'ca-pub-XXXXXXXXXXXXXXXX',
  SLOTS: {
    TOP: 'XXXXXXXXXX',
    MID: 'XXXXXXXXXX',
    BOTTOM: 'XXXXXXXXXX',
  },
};

export const tools = [
  {
    slug: 'reifenrechner',
    href: '/tools/reifenrechner',
    title: 'Reifenrechner',
    description: 'Vergleiche zwei Reifengrößen: Durchmesser, Umfang, Tachoabweichung und Bodenfreiheit auf einen Blick.',
    icon: '🔢',
    color: 'from-brand-600 to-brand-800',
  },
  {
    slug: 'felgen-et-check',
    href: '/tools/felgen-et-check',
    title: 'Felgen ET-Check',
    description: 'Berechne, wie sich ein Felgenwechsel auf Innen- und Außenkante sowie die Spurweite auswirkt.',
    icon: '⚙️',
    color: 'from-slate-600 to-slate-800',
  },
  {
    slug: 'dot-decoder',
    href: '/tools/dot-decoder',
    title: 'DOT-Decoder',
    description: 'Entschlüssle den DOT-Code deines Reifens und erfahre das genaue Produktionsdatum und Reifenalter.',
    icon: '📅',
    color: 'from-amber-500 to-orange-600',
  },
  {
    slug: 'winterpflicht',
    href: '/winterpflicht',
    title: 'Winterpflicht Europa',
    description: 'Übersicht: Winterreifenpflicht in 15 europäischen Ländern – mit Fristen, Bußgeldern und Quellen.',
    icon: '❄️',
    color: 'from-sky-500 to-blue-700',
  },
];
