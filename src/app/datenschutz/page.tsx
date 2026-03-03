import Link from "next/link"
import { siteConfig } from "@/lib/config"

export const metadata = {
  title: "Datenschutz",
  description: "Datenschutzerklärung gemäß DSGVO für reifencheck.org (DACH/EU).",
}

export default function DatenschutzPage() {
  return (
    <main className="container mx-auto max-w-3xl px-4 py-10">
      <article className="prose prose-zinc dark:prose-invert">
        <h1>Datenschutzerklärung</h1>

        <p>
          Diese Datenschutzerklärung informiert darüber, wie personenbezogene Daten beim Besuch von{" "}
          <a href={siteConfig.url}>{siteConfig.url}</a> verarbeitet werden. Zielgruppe der Website ist der
          deutschsprachige Raum (DACH). Es erfolgt keine Registrierung.
        </p>

        <section>
          <h2>1. Verantwortlicher</h2>
          <p>
            <strong>Peter Markelic</strong>
            <br />
            Richtstraße 13c, 9500 Villach, Österreich
            <br />
            E-Mail:{" "}
            <a href="mailto:peter.markelic1@gmail.com">peter.markelic1@gmail.com</a>
          </p>
        </section>

        <section>
          <h2>2. Hosting (Netlify)</h2>
          <p>
            Die Website wird bei Netlify, Inc. gehostet. Beim Aufruf der Website werden technisch notwendige Daten in
            Server-Logs verarbeitet (z. B. IP-Adresse, Datum/Uhrzeit, aufgerufene Seite, Referrer, Browser/OS), um die
            Auslieferung der Website sicherzustellen und Angriffe/Fehler zu erkennen.
          </p>
          <p>
            Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an sicherem, stabilem Betrieb).
            <br />
            Hinweis: Es erfolgt keine eigene, darüber hinausgehende Speicherung von Logs durch den Betreiber; die
            Verarbeitung erfolgt im Rahmen des Hostings.
          </p>
        </section>

        <section>
          <h2>3. DNS / Domainverwaltung (Cloudflare)</h2>
          <p>
            Für die Domainverwaltung wird Cloudflare (DNS) genutzt. Dabei werden DNS-Anfragen technisch verarbeitet (z.
            B. IP-Adresse des anfragenden Resolvers, angefragter Domainname, Zeitstempel). Die DNS-Einträge sind in der
            Regel auf <em>DNS only</em> gesetzt (kein Proxy/CDN durch Cloudflare).
          </p>
          <p>Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse am Betrieb der Domain).</p>
        </section>

        <section>
          <h2>4. Kontakt</h2>
          <p>
            Wenn du per E-Mail Kontakt aufnimmst, werden die von dir übermittelten Daten (z. B. E-Mail-Adresse, Inhalt
            der Nachricht) zur Bearbeitung deiner Anfrage verarbeitet.
          </p>
          <p>
            Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (Beantwortung von Anfragen). Die Daten werden gelöscht, sobald
            sie für den Zweck nicht mehr erforderlich sind, sofern keine gesetzlichen Aufbewahrungspflichten bestehen.
          </p>
        </section>

        <section>
          <h2>5. Einwilligungsverwaltung (Consent) / LocalStorage</h2>
          <p>
            Beim ersten Besuch wird ein Consent-Banner angezeigt. Deine Auswahl wird im lokalen Speicher deines Browsers
            (LocalStorage) gespeichert (Key: <code>rs_consent</code>), damit die Entscheidung bei weiteren Seitenaufrufen
            berücksichtigt wird. Dies ist technisch notwendig, um deine Einwilligung nachweisen bzw. umsetzen zu können.
          </p>
          <p>
            Du kannst deine Auswahl jederzeit ändern oder widerrufen, indem du im Footer auf{" "}
            <em>Cookie-Einstellungen</em> klickst oder den LocalStorage-Eintrag im Browser löschst.
          </p>
        </section>

        <section>
          <h2>6. Werbung (Google AdSense)</h2>
          <p>
            Auf dieser Website ist Google AdSense eingebunden, um Werbeanzeigen anzuzeigen. AdSense wird <strong>nur</strong>{" "}
            geladen, wenn du im Consent-Banner der Kategorie <em>Werbung</em> zustimmst. Ohne Einwilligung werden keine
            AdSense-Skripte geladen und es werden keine AdSense-Cookies gesetzt.
          </p>

          <h3>6.1 Anbieter</h3>
          <p>
            Google AdSense wird in Europa in der Regel durch <strong>Google Ireland Limited</strong> (Gordon House, Barrow
            Street, Dublin 4, Irland) bereitgestellt. Eine Verarbeitung kann auch durch verbundene Unternehmen (z. B.
            Google LLC, USA) erfolgen.
          </p>

          <h3>6.2 Verarbeitete Daten</h3>
          <ul>
            <li>IP-Adresse (gekürzt oder vollständig, abhängig von Konfiguration/Verarbeitung)</li>
            <li>Geräte- und Browserinformationen</li>
            <li>Informationen zu Anzeigeninteraktionen (Impressions, Klicks, Frequenzbegrenzung)</li>
            <li>Cookie-/Werbe-IDs und ähnliche Online-Kennungen (bei Zustimmung)</li>
            <li>ungefähre Standortinformationen (abgeleitet)</li>
          </ul>

          <h3>6.3 Zwecke und Rechtsgrundlage</h3>
          <p>
            Zwecke: Ausspielung von Werbung, Reichweitenmessung/Reporting, Betrugsprävention, Frequenzbegrenzung.
            <br />
            Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).
          </p>

          <h3>6.4 Drittlandtransfer</h3>
          <p>
            Es kann zu einer Übermittlung von Daten in Drittländer (insb. USA) kommen. Google verwendet hierfür
            Schutzmechanismen wie Standardvertragsklauseln bzw. andere geeignete Garantien.
          </p>

          <h3>6.5 Widerruf</h3>
          <p>
            Du kannst deine Einwilligung jederzeit über die <em>Cookie-Einstellungen</em> im Footer widerrufen. Nach
            Widerruf werden AdSense-Skripte nicht mehr geladen; bereits gesetzte Cookies müssen ggf. zusätzlich im Browser
            gelöscht werden.
          </p>
        </section>

        <section>
          <h2>7. Webanalyse</h2>
          <p>
            Aktuell wird <strong>keine</strong> zusätzliche Webanalyse wie Google Analytics oder Matomo eingesetzt.
            AdSense kann jedoch eigene Messmechanismen für Werbeauslieferung/Reporting verwenden (siehe Abschnitt 6).
          </p>
        </section>

        <section>
          <h2>8. Google Search Console</h2>
          <p>
            Zur technischen Such- und Sichtbarkeitsanalyse kann Google Search Console genutzt werden. Dabei werden keine
            zusätzlichen Tracking-Skripte auf der Website eingebunden; Google stellt dem Betreiber aggregierte
            Informationen zur Auffindbarkeit in der Google-Suche bereit.
          </p>
          <p>Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an technischer Optimierung).</p>
        </section>

        <section>
          <h2>9. Empfänger</h2>
          <p>
            Empfänger von Daten können je nach Nutzung sein: Netlify (Hosting), Cloudflare (DNS), Google (Werbung / ggf.
            Search Console). Eine Weitergabe an Dritte durch den Betreiber erfolgt ansonsten nicht.
          </p>
        </section>

        <section>
          <h2>10. Deine Rechte</h2>
          <p>
            Du hast nach der DSGVO insbesondere das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der
            Verarbeitung, Datenübertragbarkeit sowie Widerspruch. Wenn die Verarbeitung auf Einwilligung beruht, kannst du
            diese jederzeit widerrufen.
          </p>
          <p>
            Beschwerderecht: Du kannst dich bei einer Aufsichtsbehörde beschweren, z. B. bei der österreichischen
            Datenschutzbehörde.
          </p>
        </section>

        <section>
          <h2>11. Änderungen</h2>
          <p>
            Diese Datenschutzerklärung kann angepasst werden, wenn sich rechtliche Anforderungen oder Funktionen der
            Website ändern.
          </p>
          <p>Stand: 03.03.2026</p>
        </section>

        <section>
          <h2>Impressum</h2>
          <p>
            Das Impressum findest du hier: <Link href="/impressum">Impressum</Link>.
          </p>
        </section>
      </article>
    </main>
  )
}
