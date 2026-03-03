import type { Metadata } from "next";
import Link from "next/link";
import { AdSlot } from "@/components/ads/AdSlot";

export const metadata: Metadata = {
  title: "Reifen-Basiswissen – Reifengrößen, DOT und Winterreifen",
  description: "Kompakter Überblick: Wie lese ich eine Reifengröße? Was bedeutet DOT? Wann sind Winterreifen Pflicht? Sachlich erklärt.",
  alternates: { canonical: "/guide/reifen-basiswissen" },
};

export default function ReifenBasiswissenPage() {
  return (
    <div className="section-container py-10 max-w-3xl">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-500">
        <ol className="flex items-center gap-1.5">
          <li><Link href="/" className="hover:text-brand-600">Startseite</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-slate-700 font-medium">Reifen-Basiswissen</li>
        </ol>
      </nav>
      <header className="mb-8">
        <h1 className="page-title">Reifen-Basiswissen</h1>
        <p className="page-subtitle">Sachlicher Überblick für Autofahrer in DACH.</p>
      </header>
      <AdSlot position="top" />
      <article className="space-y-8 text-slate-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">1. Die Reifenbezeichnung lesen</h2>
          <p>Auf der Flanke jedes Pkw-Reifens steht eine normierte Kombination wie <strong>205/55 R16 91V</strong>:</p>
          <ul className="mt-3 space-y-2 list-disc list-inside text-sm">
            <li><strong>205</strong> - Reifenbreite in mm</li>
            <li><strong>55</strong> - Querschnittsverhältnis (Seitenwandhöhe = 55% der Breite = 112,75 mm)</li>
            <li><strong>R</strong> - Radialreifen</li>
            <li><strong>16</strong> - Felgendurchmesser in Zoll</li>
            <li><strong>91</strong> - Tragfähigkeitsindex (615 kg/Reifen)</li>
            <li><strong>V</strong> - Geschwindigkeitsindex (bis 240 km/h)</li>
          </ul>
          <p className="mt-3 text-sm">Mit dem <Link href="/tools/reifenrechner" className="text-brand-600 hover:underline">Reifenrechner</Link> kannst du zwei Größen direkt vergleichen.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">2. Den DOT-Code verstehen</h2>
          <p>Die letzten vier Ziffern des DOT-Codes zeigen Produktionswoche und -jahr. <code className="bg-slate-100 rounded px-1 font-mono text-sm">2319</code> = Woche 23 des Jahres 2019 (Juni 2019). Reifen sollten nach 6 Jahren geprüft und nach 10 Jahren ausgetauscht werden.</p>
          <p className="mt-3 text-sm">Tipp: <Link href="/tools/dot-decoder" className="text-brand-600 hover:underline">DOT-Decoder</Link> ermittelt Alter automatisch und erstellt einen Kalender-Reminder.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">3. Winterreifen vs. Ganzjahresreifen</h2>
          <p>Nur Reifen mit dem <strong>3PMSF</strong>-Symbol (Schneeflocke auf Berg) erfüllen in Deutschland und Österreich die gesetzlichen Anforderungen. Das M+S-Symbol allein reicht seit 2024 nicht mehr aus. Ganzjahresreifen mit beiden Symbolen sind in DACH erlaubt - ein Kompromiss für gemäßigtes Klima.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">4. Profiltiefe: Gesetz vs. Praxis</h2>
          <p>Gesetzlich: 1,6 mm. Empfehlung ADAC: mindestens 4 mm für Winterreifen, 3 mm für Sommerreifen. Unter 4 mm nimmt die Wintereignung deutlich ab.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">5. Winterreifenpflicht in Europa</h2>
          <p>Deutschland: situative Pflicht (kein festes Datum). Österreich: 1. November bis 15. April. Schweiz: keine Pflicht, aber Haftungsrisiko. Details für 15 Länder in der <Link href="/winterpflicht" className="text-brand-600 hover:underline">Winterpflicht-Übersicht</Link>.</p>
        </section>
      </article>
      <AdSlot position="mid" />
      <aside className="mt-8 rounded-2xl bg-brand-50 border border-brand-100 p-5">
        <h2 className="font-semibold text-brand-900 mb-3">Direkt zu den Tools</h2>
        <ul className="space-y-2">
          <li><Link href="/tools/reifenrechner" className="text-sm text-brand-700 hover:underline">Reifenrechner</Link></li>
          <li><Link href="/tools/felgen-et-check" className="text-sm text-brand-700 hover:underline">Felgen ET-Check</Link></li>
          <li><Link href="/tools/dot-decoder" className="text-sm text-brand-700 hover:underline">DOT-Decoder</Link></li>
          <li><Link href="/winterpflicht" className="text-sm text-brand-700 hover:underline">Winterpflicht Europa</Link></li>
        </ul>
      </aside>
    </div>
  );
}
