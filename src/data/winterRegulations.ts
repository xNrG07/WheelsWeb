export type RuleType = 'fixed' | 'situational' | 'none';

export const RULE_TYPE_LABELS: Record<RuleType, string> = {
  fixed: 'Pflicht (fixer Zeitraum)',
  situational: 'Situativ',
  none: 'Keine generelle Pflicht',
};

export const RULE_TYPE_COLORS: Record<RuleType, string> = {
  fixed: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  situational: 'border-amber-200 bg-amber-50 text-amber-800',
  none: 'border-slate-200 bg-slate-50 text-slate-700',
};

export type WinterRegulation = {
  code: string;          // ISO country code
  slug: string;          // URL slug
  country: string;       // Display name
  flag: string;          // Emoji flag
  rule_type: RuleType;

  rule_summary: string;  // Short description
  when_applies?: string; // Period / conditions
  min_tread_depth: string;
  chains: string;
  penalty: string;
  notes: string;

  last_updated: string;  // ISO date
  sources: { label: string; url: string }[];
};

// Stand: 2026-03-02
// Compact overview; local signage and regional rules can override the general summary.

export const winterRegulations: WinterRegulation[] = [
  {
    code: 'AT',
    slug: 'at',
    country: 'Österreich',
    flag: '🇦🇹',
    rule_type: 'situational',
    rule_summary: 'Bei winterlichen Fahrbahnverhältnissen sind Winterreifen oder Schneeketten vorgeschrieben.',
    when_applies: '1. Nov – 15. Apr (nur bei Schnee/Schneematsch/Eis)',
    min_tread_depth: 'Winterreifen: mind. 4 mm (radial) bzw. 5 mm (diagonal)',
    chains: 'Bei Beschilderung/Bedarf. Max. 50 km/h; nur auf Schnee/Eis.',
    penalty: 'Ab ca. 35 €; bei Gefährdung bis 5.000 € möglich.',
    notes: 'Besonders in Bergregionen ist Schneeketten-Pflicht per Schild üblich. Bei Unfall/Blockade drohen deutlich höhere Folgen.',
    last_updated: '2026-03-02',
    sources: [
      { label: 'oesterreich.gv.at: Winterausrüstungspflicht', url: 'https://www.oesterreich.gv.at/themen/mobilitaet/kfz/10/Seite.063700.html' },
      { label: 'ÖAMTC: Winterreifenpflicht in Österreich', url: 'https://www.oeamtc.at/thema/reifen/winterreifenpflicht-in-oesterreich-16179257' },
    ],
  },
  {
    code: 'DE',
    slug: 'de',
    country: 'Deutschland',
    flag: '🇩🇪',
    rule_type: 'situational',
    rule_summary: 'Situative Winterreifenpflicht bei Glatteis, Schneeglätte, Schneematsch, Eis- oder Reifglätte (Winterreifen mit 3PMSF).',
    when_applies: 'Wetterabhängig (keine fixen Kalenderdaten)',
    min_tread_depth: 'Gesetzlich mind. 1,6 mm (Empfehlung: Winterreifen ≥ 4 mm)',
    chains: 'Nur bei Beschilderung. Max. 50 km/h; auf schneebedeckter Fahrbahn.',
    penalty: 'Ab 60 € + 1 Punkt; mit Behinderung/Gefährdung/Unfall höher.',
    notes: 'Die Pflicht ist an die Witterung gekoppelt. Für bestimmte Fahrzeuge/Anhänger gelten zusätzliche Details – im Zweifel ADAC/Behörden checken.',
    last_updated: '2026-03-02',
    sources: [
      { label: 'ADAC: Winterreifenpflicht in Deutschland', url: 'https://www.adac.de/verkehr/recht/verkehrsvorschriften-deutschland/winterreifenpflicht/' },
      { label: 'Gesetze im Internet: StVO §2 (3a)', url: 'https://www.gesetze-im-internet.de/stvo_2013/__2.html' },
    ],
  },
  {
    code: 'CH',
    slug: 'ch',
    country: 'Schweiz',
    flag: '🇨🇭',
    rule_type: 'none',
    rule_summary: 'Keine generelle Winterreifenpflicht, aber das Fahrzeug muss jederzeit beherrschbar sein (sonst Haftungs-/Versicherungsfolgen).',
    when_applies: 'Keine gesetzliche Frist',
    min_tread_depth: 'Gesetzlich mind. 1,6 mm (Empfehlung: Winterreifen ≥ 4 mm)',
    chains: 'Bei Beschilderung bzw. in Bergregionen (Pflichtstrecken möglich).',
    penalty: 'Kein fixer Betrag; je nach Situation möglich (z.B. Behinderung/Unfall).',
    notes: 'Wenn du mit Sommerreifen im Schnee stecken bleibst oder einen Unfall verursachst, kann das rechtliche/versicherungsrechtliche Folgen haben.',
    last_updated: '2026-03-02',
    sources: [
      { label: 'TCS: Winterreifen – Pflicht & Empfehlung', url: 'https://www.tcs.ch/de/testberichte-ratgeber/ratgeber/fahrzeugtechnik/pneus/winterreifenpflicht.php' },
    ],
  },
  {
    code: 'IT',
    slug: 'it',
    country: 'Italien',
    flag: '🇮🇹',
    rule_type: 'situational',
    rule_summary: 'Je nach Region/Straße: Winterreifen oder Schneeketten vorgeschrieben (oft per Beschilderung).',
    when_applies: 'Regional – häufig 15. Nov – 15. Apr (vor Ort geregelt)',
    min_tread_depth: 'Gesetzlich mind. 1,6 mm',
    chains: 'Oft: Winterreifen ODER Schneeketten (mitzuführen/zu montieren je nach Schild).',
    penalty: 'Regional unterschiedlich; bei Kontrollen können Bußgelder und Weiterfahrverbote drohen.',
    notes: 'Italien ist stark regional geregelt. Für konkrete Routen (Autobahn/Pass) unbedingt lokale Schilder/Infos prüfen.',
    last_updated: '2026-03-02',
    sources: [
      { label: 'ÖAMTC: Winterreifenpflicht Italien (Überblick)', url: 'https://www.oeamtc.at/thema/reifen/winterreifenpflicht-italien-16183748' },
    ],
  },
  {
    code: 'FR',
    slug: 'fr',
    country: 'Frankreich',
    flag: '🇫🇷',
    rule_type: 'fixed',
    rule_summary: 'In ausgewiesenen Bergzonen („Loi Montagne“): Winterreifen (3PMSF) oder Schneeketten vorgeschrieben (Beschilderung).',
    when_applies: '1. Nov – 31. Mär (in betroffenen Zonen)',
    min_tread_depth: 'Gesetzlich mind. 1,6 mm',
    chains: 'In Bergzonen je nach Schild: Schneeketten erforderlich oder als Alternative zu Winterreifen.',
    penalty: 'Bußgeld möglich; Details/Umsetzung regional.',
    notes: 'Gilt nur in bestimmten Gemeinden/Departements (Bergzonen) und ist ausgeschildert. Außerhalb: keine generelle Pflicht.',
    last_updated: '2026-03-02',
    sources: [
      { label: 'service-public.fr: Équipements obligatoires en zones de montagne', url: 'https://www.service-public.fr/particuliers/vosdroits/F36083?lang=en' },
    ],
  },
  {
    code: 'CZ',
    slug: 'cz',
    country: 'Tschechien',
    flag: '🇨🇿',
    rule_type: 'situational',
    rule_summary: 'Im Winterzeitraum sind Winterreifen bei winterlichen Bedingungen (oder wenn zu erwarten) Pflicht; mit Schild „Winterausrüstung“ immer.',
    when_applies: '1. Nov – 31. Mär (wetter-/schildabhängig)',
    min_tread_depth: 'Winterreifen: mind. 4 mm (Pkw)',
    chains: 'Bei Beschilderung oder starkem Winterwetter (v.a. Berge).',
    penalty: 'Bis 2.000 CZK vor Ort; im Verfahren typ. 1.500–2.500 CZK; Weiterfahrt kann untersagt werden.',
    notes: 'Die Pflicht ist an Bedingungen gekoppelt. Bei Unfall können Versicherer Leistungen kürzen.',
    last_updated: '2026-03-02',
    sources: [
      { label: 'Policie ČR: Povinnost použít zimní pneumatiky (inkl. Strafen)', url: 'https://policie.gov.cz/clanek/or-mlada-boleslav-zpravodajstvi-povinnost-pouzit-zimni-pneumatiky.aspx' },
      { label: 'MD ČR: Winter tyres are compulsory (English)', url: 'https://md.gov.cz/Media/Media-a-tiskove-zpravy/Ridicum-zacala-povinnost-prezout-na-zimni-pneumati?lang=en-GB' },
    ],
  },
  {
    code: 'PL',
    slug: 'pl',
    country: 'Polen',
    flag: '🇵🇱',
    rule_type: 'none',
    rule_summary: 'Keine generelle gesetzliche Winterreifenpflicht.',
    when_applies: 'Keine gesetzliche Frist',
    min_tread_depth: 'Gesetzlich mind. 1,6 mm',
    chains: 'Nur wo vorgeschrieben (Beschilderung), in der Praxis selten.',
    penalty: 'Kein spezielles Winterreifen-Bußgeld; bei Unfall/Behinderung können Folgen entstehen.',
    notes: 'Auch ohne Pflicht: Winterreifen sind im Winter praktisch Standard. In den Bergen/bei Schnee ist Sommerbereifung riskant.',
    last_updated: '2026-03-02',
    sources: [
      { label: 'Europe Consommateurs (ECC): Winter tyres in Europe', url: 'https://www.europe-consommateurs.eu/en/travelling-motor-vehicles/motor-vehicles/winter-tyres-in-europe.html' },
    ],
  },
  {
    code: 'SI',
    slug: 'si',
    country: 'Slowenien',
    flag: '🇸🇮',
    rule_type: 'fixed',
    rule_summary: 'Winterausrüstung ist im Winterzeitraum vorgeschrieben (Winterreifen oder Sommerreifen + Schneeketten nach Vorgaben).',
    when_applies: '15. Nov – 15. Mär',
    min_tread_depth: 'Winterreifen: mind. 3 mm',
    chains: 'Alternative: Sommerreifen + Schneeketten (mitzuführen/zu montieren je nach Regel/Schild).',
    penalty: 'Bußgeld möglich; Polizei kann Weiterfahrt untersagen.',
    notes: 'Regeln gelten für alle Fahrzeuge. In der Praxis sind Winterreifen (≥3 mm) die sichere Wahl.',
    last_updated: '2026-03-02',
    sources: [
      { label: 'Policija.si: Winter equipment obligation (Slovenia)', url: 'https://www.policija.si/eng/useful-information/traffic-safety/65-winter-equipment-obligation' },
    ],
  },
  {
    code: 'HR',
    slug: 'hr',
    country: 'Kroatien',
    flag: '🇭🇷',
    rule_type: 'fixed',
    rule_summary: 'Auf ausgewiesenen Winterstrecken ist Winterausrüstung im Winterzeitraum verpflichtend (unabhängig vom Wetter).',
    when_applies: '15. Nov – 15. Apr (auf Winterstrecken)',
    min_tread_depth: 'Sommerreifen (wenn erlaubt): mind. 4 mm',
    chains: 'Je nach Regel: Winterreifen ODER Sommerreifen (≥4 mm) + Schneeketten für Antriebsräder.',
    penalty: 'Für Fahrer laut Polizei: 132,72 € bei Verstoß (höhere Strafen für Unternehmen möglich).',
    notes: 'Gilt auf definierten Winterstrecken. Küste teils weniger betroffen – Schilder beachten.',
    last_updated: '2026-03-02',
    sources: [
      { label: 'Policija Zagreb: Pflicht 15.11.2025–15.04.2026 + Strafe 132,72 €', url: 'https://zagrebacka-policija.gov.hr/vijesti/koristenje-zimske-opreme-na-vozilima-obvezno-od-15-studenoga-2025-do-15-travnja-2026-godine/102773' },
      { label: 'Revija HAK: Zimska oprema u Hrvatskoj (Überblick)', url: 'https://revijahak.hr/2025/11/14/dolaze-nova-pravila-pogledajte-zimsku-opremu-u-hrvatskoj-i-europi/' },
    ],
  },
  {
    code: 'HU',
    slug: 'hu',
    country: 'Ungarn',
    flag: '🇭🇺',
    rule_type: 'none',
    rule_summary: 'Keine generelle Winterreifenpflicht. Winterausrüstung wird aber empfohlen.',
    when_applies: 'Keine gesetzliche Frist',
    min_tread_depth: 'Gesetzlich mind. 1,6 mm',
    chains: 'Schneeketten können bei entsprechender Beschilderung vorgeschrieben sein.',
    penalty: 'Kein fixes Winterreifen-Bußgeld; bei Verstößen gegen Beschilderung/bei Unfall drohen Folgen.',
    notes: 'Wenn du in winterliche Regionen fährst: Winterreifen + ggf. Schneeketten einplanen.',
    last_updated: '2026-03-02',
    sources: [
      { label: 'Europe Consommateurs (ECC): Winter tyres in Europe', url: 'https://www.europe-consommateurs.eu/en/travelling-motor-vehicles/motor-vehicles/winter-tyres-in-europe.html' },
    ],
  },
  {
    code: 'SK',
    slug: 'sk',
    country: 'Slowakei',
    flag: '🇸🇰',
    rule_type: 'situational',
    rule_summary: 'Pkw: Winterreifen bei Schnee/Eis auf der Fahrbahn. Lkw/Busse >3,5 t: Winterreifen auf Antriebsachse(n) im Winterzeitraum.',
    when_applies: 'Pkw: wetterabhängig; Lkw/Bus >3,5 t: 15. Nov – 31. Mär',
    min_tread_depth: 'Winterreifen: mind. 3 mm (Pkw); schwere Fahrzeuge nach Vorgaben.',
    chains: 'Bei Bedarf/Schildern, v.a. in Bergregionen.',
    penalty: 'Laut Innenministerium: bis 60 € möglich; bei schweren Fahrzeugen ebenfalls Sanktionen möglich.',
    notes: 'Die Pkw-Pflicht ist an tatsächliche Bedingungen gekoppelt. Für Transitrouten im Winter praktisch: Winterreifen einplanen.',
    last_updated: '2026-03-02',
    sources: [
      { label: 'Ministry of Interior SR: Winter tires obligation (incl. trucks dates)', url: 'https://www.minv.sk/?tlacove-spravy&sprava=povinnost-pouzit-zimne-pneumatiky' },
    ],
  },
  {
    code: 'NL',
    slug: 'nl',
    country: 'Niederlande',
    flag: '🇳🇱',
    rule_type: 'none',
    rule_summary: 'Keine generelle Winterreifenpflicht.',
    when_applies: 'Keine gesetzliche Frist',
    min_tread_depth: 'Gesetzlich mind. 1,6 mm',
    chains: 'Keine typische Pflicht; relevant bei Reisen in Alpenländer (dortige Regeln gelten).',
    penalty: 'Keine Winterreifen-Strafe im Inland.',
    notes: 'Wenn du in Länder mit Pflicht fährst (DE/AT/FR-Bergzonen etc.), musst du deren Regeln erfüllen.',
    last_updated: '2026-03-02',
    sources: [
      { label: 'ANWB: Winterbanden in Nederland (nicht verplicht)', url: 'https://www.anwb.nl/auto/onderhoud-en-reparatie/banden/winterbanden' },
    ],
  },
  {
    code: 'BE',
    slug: 'be',
    country: 'Belgien',
    flag: '🇧🇪',
    rule_type: 'none',
    rule_summary: 'Keine generelle Winterreifenpflicht.',
    when_applies: 'Keine gesetzliche Frist',
    min_tread_depth: 'Gesetzlich mind. 1,6 mm',
    chains: 'Schneeketten nur bei Ausnahmebedingungen/Schildern (selten).',
    penalty: 'Keine Winterreifen-Strafe im Inland.',
    notes: 'Winterreifen sind optional, werden bei Winterwetter aber empfohlen.',
    last_updated: '2026-03-02',
    sources: [
      { label: 'VAB: Winterbanden in België (overzicht)', url: 'https://www.vab.be/nl/auto/veiligheid/winterbanden' },
    ],
  },
  {
    code: 'SE',
    slug: 'se',
    country: 'Schweden',
    flag: '🇸🇪',
    rule_type: 'situational',
    rule_summary: 'Winterreifen sind im Zeitraum vorgeschrieben, wenn winterliche Straßenverhältnisse herrschen.',
    when_applies: '1. Dez – 31. Mär (nur bei winterlichen Straßenverhältnissen)',
    min_tread_depth: 'Winterreifen: mind. 3 mm',
    chains: 'Schneeketten erlaubt; Spikes i.d.R. saisonal erlaubt (Details in Quelle).',
    penalty: 'Bußgeld möglich; Weiterfahrt kann untersagt werden.',
    notes: 'Spikes i.d.R. erlaubt 1. Okt – 15. Apr (oder länger bei Winterbedingungen). Lokale Abweichungen möglich.',
    last_updated: '2026-03-02',
    sources: [
      { label: 'Transportstyrelsen: Winter tyres (vinterdäck) rules', url: 'https://www.transportstyrelsen.se/en/road/vehicles/vehicle-rules/winter-tyres/' },
    ],
  },
  {
    code: 'NO',
    slug: 'no',
    country: 'Norwegen',
    flag: '🇳🇴',
    rule_type: 'situational',
    rule_summary: 'Keine fixen Kalenderdaten; entscheidend ist „geeignete Bereifung“ mit ausreichender Traktion (inkl. Profiltiefe/Spikes-Regeln).',
    when_applies: 'Wetterabhängig (Regeln zu Profiltiefe/Spikes je nach Zeitraum/Region)',
    min_tread_depth: 'Je nach Fahrzeug/Zeitraum; Details in Quelle',
    chains: 'Je nach Strecke/Region nötig; für schwere Fahrzeuge häufig Mitführpflichten.',
    penalty: 'Sanktionen möglich (Kontrolle/Weiterfahrt).',
    notes: 'In Norwegen wird stark auf „geeignete Bereifung“ abgestellt. In winterlichen Regionen sind Winterreifen (ggf. Spikes) praktisch Standard.',
    last_updated: '2026-03-02',
    sources: [
      { label: 'Statens vegvesen: Winter tyres & rules (Norway)', url: 'https://www.vegvesen.no/en/vehicles/own-and-maintain/tyres-and-wheels/winter-tyres/' },
    ],
  },
];
