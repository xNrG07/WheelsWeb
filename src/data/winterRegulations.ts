export type RuleType = 'mandatory' | 'recommended' | 'situational';

export interface WinterRegulation {
  slug: string;
  country: string;
  flag: string;
  rule_type: RuleType;
  rule_summary: string;
  when_applies: string;
  chain_rules: string;
  min_tread?: string;
  penalty?: string;
  last_updated: string;
  sources: { label: string; url: string }[];
}

export const winterRegulations: WinterRegulation[] = [
  {
    slug: 'deutschland',
    country: 'Deutschland',
    flag: '🇩🇪',
    rule_type: 'situational',
    rule_summary: 'Situative Winterreifenpflicht: Bei Schnee, Glatteis, Schneematsch, Eis- oder Reifglätte sind Winterreifen (M+S, 3PMSF) Pflicht.',
    when_applies: 'Bei winterlichen Fahrbedingungen (§ 2 Abs. 3a StVO). Kein festes Datum.',
    chain_rules: 'Schneeketten an bestimmten ausgeschilderten Strecken erlaubt/vorgeschrieben.',
    min_tread: '1,6 mm (gesetzlich); Experten empfehlen 4 mm',
    penalty: '60 € Bußgeld + 1 Punkt; bei Behinderung 80 €',
    last_updated: '2025-01-15',
    sources: [
      { label: 'ADAC Winterreifenpflicht', url: 'https://www.adac.de/verkehr/recht/verkehrsrecht/winterreifenpflicht/' },
      { label: 'StVO § 2 Abs. 3a', url: 'https://www.gesetze-im-internet.de/stvo_2013/__2.html' },
    ],
  },
  {
    slug: 'oesterreich',
    country: 'Österreich',
    flag: '🇦🇹',
    rule_type: 'mandatory',
    rule_summary: 'Winterreifenpflicht vom 1. November bis 15. April für alle Fahrzeuge bis 3,5 t bei winterlichen Fahrbedingungen.',
    when_applies: '1. November – 15. April bei Schnee, Schneematsch oder Eis.',
    chain_rules: 'Schneeketten bei entsprechender Beschilderung Pflicht, auch mit Winterreifen.',
    min_tread: '4 mm bei Winterreifen',
    penalty: 'Bis zu 5.000 € Strafe; Anhaltung durch Polizei möglich',
    last_updated: '2025-01-10',
    sources: [
      { label: 'ÖAMTC Winterreifen', url: 'https://www.oeamtc.at/thema/reifen/winterreifen/' },
      { label: 'Kraftfahrgesetz BGBL', url: 'https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10011384' },
    ],
  },
  {
    slug: 'schweiz',
    country: 'Schweiz',
    flag: '🇨🇭',
    rule_type: 'recommended',
    rule_summary: 'Keine gesetzliche Winterreifenpflicht, aber Empfehlung. Wer mit Sommerreifen in winterliche Verhältnisse gerät und anderen behindert, haftet.',
    when_applies: 'Keine feste Pflicht. Empfehlung Oktober – April.',
    chain_rules: 'Schneeketten bei beschilderten Strecken vorgeschrieben.',
    min_tread: '1,6 mm gesetzlich; TCS empfiehlt 4 mm',
    penalty: 'Kein direktes Bußgeld, aber Haftungsrisiko bei Unfällen',
    last_updated: '2025-01-10',
    sources: [
      { label: 'TCS Winterreifen', url: 'https://www.tcs.ch/de/auto-mobilitat/reifen/winterreifen.php' },
      { label: 'Astra Fahrzeugausrüstung', url: 'https://www.astra.admin.ch/astra/de/home/fachleute/fahrzeuge/typengenehmigung/strassenfahrzeuge/reifenvorschriften.html' },
    ],
  },
  {
    slug: 'frankreich',
    country: 'Frankreich',
    flag: '🇫🇷',
    rule_type: 'mandatory',
    rule_summary: 'Seit 2021: In bestimmten Gebirgsdepartements (Loi Montagne II) sind Winterreifen oder Schneeketten vom 1. November bis 31. März Pflicht.',
    when_applies: '1. November – 31. März in rund 48 Departments.',
    chain_rules: 'Schneeketten als Alternative zu Winterreifen zulässig.',
    min_tread: '3,5 mm empfohlen',
    penalty: '135 € Bußgeld',
    last_updated: '2025-01-12',
    sources: [
      { label: 'Service-Public.fr', url: 'https://www.service-public.fr/particuliers/vosdroits/F36704' },
    ],
  },
  {
    slug: 'italien',
    country: 'Italien',
    flag: '🇮🇹',
    rule_type: 'mandatory',
    rule_summary: 'Winterreifenpflicht gilt regional/kommunal verschieden; viele Regionen und Gemeinden schreiben Winterreifen oder Schneeketten im Fahrzeug vor.',
    when_applies: 'Je nach Region: meist 15. Oktober – 15. April.',
    chain_rules: 'Schneeketten müssen mitgeführt oder Winterreifen montiert sein.',
    min_tread: '4 mm empfohlen',
    penalty: '84–335 € je nach Region',
    last_updated: '2025-01-08',
    sources: [
      { label: 'ACI Pneumatici Invernali', url: 'https://www.aci.it/i-servizi/normative/codice-della-strada.html' },
    ],
  },
  {
    slug: 'spanien',
    country: 'Spanien',
    flag: '🇪🇸',
    rule_type: 'situational',
    rule_summary: 'Keine nationale Winterreifenpflicht. Schneeketten oder Winterreifen bei winterlichen Verhältnissen teils vorgeschrieben.',
    when_applies: 'Situationsbedingt; Beschilderung vor Ort beachten.',
    chain_rules: 'Schneeketten bei entsprechender Beschilderung Pflicht.',
    min_tread: '1,6 mm gesetzlich',
    penalty: 'Bis zu 200 € bei Nichtbefolgen von Beschilderung',
    last_updated: '2025-01-08',
    sources: [
      { label: 'DGT Reifenvorschriften', url: 'https://www.dgt.es/nuestros-servicios/vehiculos/revision-tecnica/neumaticos/' },
    ],
  },
  {
    slug: 'tschechien',
    country: 'Tschechien',
    flag: '🇨🇿',
    rule_type: 'mandatory',
    rule_summary: 'Winterreifenpflicht vom 1. November bis 31. März, wenn Schnee, Eis oder Reif vorhanden oder zu erwarten ist.',
    when_applies: '1. November – 31. März bei winterlichen Bedingungen.',
    chain_rules: 'Schneeketten bei Beschilderung vorgeschrieben.',
    min_tread: '4 mm bei Winterreifen',
    penalty: 'Bis zu 2.000 CZK (~80 €)',
    last_updated: '2025-01-10',
    sources: [
      { label: 'Autoklub Böhmen/Mähren', url: 'https://www.uamk.cz/provoz/zimni-pneumatiky' },
    ],
  },
  {
    slug: 'schweden',
    country: 'Schweden',
    flag: '🇸🇪',
    rule_type: 'mandatory',
    rule_summary: 'Winterreifenpflicht vom 1. Dezember bis 31. März. Spikesreifen in bestimmten Zeiträumen erlaubt.',
    when_applies: '1. Dezember – 31. März. Bei winterlichen Bedingungen auch außerhalb.',
    chain_rules: 'Schneeketten erlaubt, aber Winterreifen bevorzugt.',
    min_tread: '3 mm',
    penalty: 'Bußgeld ca. 1.200 SEK (~100 €)',
    last_updated: '2025-01-10',
    sources: [
      { label: 'Transportstyrelsen', url: 'https://www.transportstyrelsen.se/sv/vagtrafik/fordon/vinterdack/' },
    ],
  },
  {
    slug: 'norwegen',
    country: 'Norwegen',
    flag: '🇳🇴',
    rule_type: 'mandatory',
    rule_summary: 'Winterreifenpflicht in Nordnorwegen (16. Oktober – 30. April), Südnorwegen (1. November – 15. April). Spikesreifen erlaubt.',
    when_applies: 'Nord: 16. Okt – 30. Apr / Süd: 1. Nov – 15. Apr',
    chain_rules: 'Schneeketten erlaubt.',
    min_tread: '3 mm',
    penalty: 'Bußgeld ab ca. 1.500 NOK (~130 €)',
    last_updated: '2025-01-08',
    sources: [
      { label: 'Statens vegvesen', url: 'https://www.vegvesen.no/kjoretoy/kjoretoyregler/vinterdekk/' },
    ],
  },
  {
    slug: 'finnland',
    country: 'Finnland',
    flag: '🇫🇮',
    rule_type: 'mandatory',
    rule_summary: 'Winterreifenpflicht vom 1. Dezember bis 28. Februar (verlängerbar bei Bedarf). Spikesreifen vom 1. Oktober bis 30. April erlaubt.',
    when_applies: '1. Dezember – 28./29. Februar bei winterlichen Bedingungen.',
    chain_rules: 'Schneeketten selten nötig; Winterreifen ausreichend.',
    min_tread: '3 mm',
    penalty: 'Verwarnung bis Bußgeld',
    last_updated: '2025-01-08',
    sources: [
      { label: 'Traficom Finnland', url: 'https://www.traficom.fi/en/transport/road/winter-tyres' },
    ],
  },
  {
    slug: 'niederlande',
    country: 'Niederlande',
    flag: '🇳🇱',
    rule_type: 'recommended',
    rule_summary: 'Keine gesetzliche Winterreifenpflicht. Winterreifen werden empfohlen; Sommerreifen bei Schnee/Eis können als grob fahrlässig gewertet werden.',
    when_applies: 'Empfehlung November – März.',
    chain_rules: 'Schneeketten bei Beschilderung erlaubt.',
    min_tread: '1,6 mm gesetzlich',
    penalty: 'Kein direktes Bußgeld; Haftungsrisiko',
    last_updated: '2025-01-08',
    sources: [
      { label: 'ANWB Winterreifen', url: 'https://www.anwb.nl/auto/onderhoud-en-reparatie/banden/winterbanden' },
    ],
  },
  {
    slug: 'belgien',
    country: 'Belgien',
    flag: '🇧🇪',
    rule_type: 'recommended',
    rule_summary: 'Keine Winterreifenpflicht. Bei Schnee empfohlen. Schneeketten bei beschilderten Strecken Pflicht.',
    when_applies: 'Empfehlung November – März.',
    chain_rules: 'Schneeketten bei beschilderten Alpenpässen Pflicht.',
    min_tread: '1,6 mm gesetzlich',
    penalty: 'Kein direktes Bußgeld für fehlende Winterreifen',
    last_updated: '2025-01-08',
    sources: [
      { label: 'VAB Pneus Hiver', url: 'https://www.vab.be/nl/nieuws/pneus-hiver' },
    ],
  },
  {
    slug: 'polen',
    country: 'Polen',
    flag: '🇵🇱',
    rule_type: 'recommended',
    rule_summary: 'Keine gesetzliche Winterreifenpflicht. Empfohlen Oktober – März. Ganzjahresreifen zulässig.',
    when_applies: 'Empfehlung Oktober – März.',
    chain_rules: 'Schneeketten erlaubt.',
    min_tread: '1,6 mm gesetzlich; 4 mm empfohlen',
    penalty: 'Kein Bußgeld; jedoch Haftungsrisiko',
    last_updated: '2025-01-08',
    sources: [
      { label: 'PZM Polen', url: 'https://www.pzm.pl/przydatne-informacje/opony' },
    ],
  },
  {
    slug: 'slowenien',
    country: 'Slowenien',
    flag: '🇸🇮',
    rule_type: 'mandatory',
    rule_summary: 'Winterreifenpflicht vom 15. November bis 15. März. Bei winterlichen Bedingungen auch außerhalb dieser Zeit Pflicht.',
    when_applies: '15. November – 15. März; situationsbedingt auch außerhalb.',
    chain_rules: 'Schneeketten bei Beschilderung vorgeschrieben.',
    min_tread: '3 mm bei Winterreifen',
    penalty: 'Bis zu 250 €',
    last_updated: '2025-01-10',
    sources: [
      { label: 'AMZS Slowenien', url: 'https://www.amzs.si/storitve/nasveti/zimska-oprema' },
    ],
  },
  {
    slug: 'kroatien',
    country: 'Kroatien',
    flag: '🇭🇷',
    rule_type: 'mandatory',
    rule_summary: 'Winterreifenpflicht vom 15. November bis 15. März oder bei winterlichen Bedingungen. Schneeketten müssen mitgeführt werden.',
    when_applies: '15. November – 15. März.',
    chain_rules: 'Schneeketten müssen im Fahrzeug mitgeführt werden.',
    min_tread: '4 mm bei Winterreifen',
    penalty: 'Bis zu 1.000 HRK (~130 €)',
    last_updated: '2025-01-08',
    sources: [
      { label: 'HAK Kroatien', url: 'https://www.hak.hr/info/zimska-oprema/' },
    ],
  },
];

export function getCountryBySlug(slug: string): WinterRegulation | undefined {
  return winterRegulations.find((r) => r.slug === slug);
}

export const RULE_TYPE_LABELS: Record<RuleType, string> = {
  mandatory: 'Pflicht',
  recommended: 'Empfohlen',
  situational: 'Situationsabhängig',
};

export const RULE_TYPE_COLORS: Record<RuleType, string> = {
  mandatory: 'bg-red-100 text-red-800 border-red-200',
  recommended: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  situational: 'bg-blue-100 text-blue-800 border-blue-200',
};
