import Link from "next/link"

export const metadata = {
  title: "Impressum",
  description: "Impressum gemäß österreichischem Recht (AT) für reifencheck.org.",
}

export default function ImpressumPage() {
  return (
    <main className="container mx-auto max-w-3xl px-4 py-10">
      <article className="prose prose-zinc dark:prose-invert">
        <h1>Impressum</h1>

        <section>
          <h2>Betreiber</h2>
          <p>
            <strong>Peter Markelic</strong>
            <br />
            Richtstraße 13c
            <br />
            9500 Villach
            <br />
            Österreich
            <br />
            E-Mail:{" "}
            <a href="mailto:peter.markelic1@gmail.com">peter.markelic1@gmail.com</a>
          </p>
          <p>Betreiberstatus: Privat (natürliche Person), Rechtsraum: Österreich (AT).</p>
        </section>

        <section>
          <h2>Zweck der Website</h2>
          <p>
            reifencheck.org stellt kostenlos nutzbare Rechner/Tools und Informationsinhalte rund um Reifen und Felgen
            bereit (z. B. Größen, Druck, ET/Offset, Winterpflicht-Infos). Die Inhalte dienen ausschließlich der
            allgemeinen Information.
          </p>
        </section>

        <section>
          <h2>Offenlegung gemäß § 25 MedienG (AT)</h2>
          <p>
            Medieninhaber und Herausgeber: Peter Markelic, Anschrift wie oben.
            <br />
            Grundlegende Richtung (&ldquo;Blattlinie&rdquo;): Information und Hilfestellung zu Reifenthemen für den
            deutschsprachigen Raum (DACH).
          </p>
        </section>

        <section>
          <h2>Haftung für Inhalte</h2>
          <p>
            Trotz sorgfältiger Erstellung kann keine Gewähr für Richtigkeit, Vollständigkeit und Aktualität der Inhalte
            übernommen werden. Die Nutzung der bereitgestellten Informationen erfolgt auf eigene Verantwortung.
          </p>
        </section>

        <section>
          <h2>Haftung für Links</h2>
          <p>
            Diese Website kann Links zu externen Websites enthalten. Für deren Inhalte wird keine Verantwortung
            übernommen, da auf die Gestaltung externer Seiten kein Einfluss besteht. Bei Bekanntwerden von
            Rechtsverletzungen werden entsprechende Links entfernt.
          </p>
        </section>

        <section>
          <h2>Urheberrecht</h2>
          <p>
            Inhalte dieser Website unterliegen dem Urheberrecht. Eine Verwendung außerhalb der Grenzen des Urheberrechts
            bedarf der vorherigen schriftlichen Zustimmung des Betreibers.
          </p>
        </section>

        <section>
          <h2>Datenschutz</h2>
          <p>
            Details zur Verarbeitung personenbezogener Daten findest du in der{" "}
            <Link href="/datenschutz">Datenschutzerklärung</Link>.
          </p>
        </section>
      </article>
    </main>
  )
}
