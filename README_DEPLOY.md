# Voss & Dicke – Website-Übergabe

Diese ZIP ist als direkter Ersatz für den bisherigen Inhalt des GitHub-Repositories aufgebaut.

## Veröffentlichung

1. Inhalt des bisherigen Repositorys löschen oder durch den Inhalt dieser ZIP ersetzen.
2. Darauf achten, dass `index.html`, `CNAME`, `css`, `js` und `img` direkt im Veröffentlichungsordner liegen.
3. In GitHub unter **Settings → Pages** prüfen, dass die richtige Branch-Quelle ausgewählt ist.
4. Für die Domain `vossunddicke.de` bleibt die vorhandene `CNAME`-Datei bestehen.
5. **Enforce HTTPS** in den GitHub-Pages-Einstellungen aktivieren.

## Vor dem öffentlichen Start zwingend ergänzen

In `impressum.html` und `datenschutz.html` fehlt noch die vollständige ladungsfähige Geschäftsanschrift. In beiden Dateien nach folgendem Text suchen:

`[Straße, Hausnummer, PLZ und Ort ergänzen]`

Diesen Platzhalter vollständig ersetzen. Die gelben Hinweise können danach aus beiden Dateien entfernt werden.

## Kontaktdaten zentral verwendet

- Telefon / WhatsApp: `0151 44245033`
- E-Mail: `vossdickegbr@gmail.com`
- Instagram: `@vossunddicke_gbr`
- Domain: `vossunddicke.de`

Bei Änderungen sollten die Angaben in `index.html`, `impressum.html`, `datenschutz.html` und im strukturierten JSON-LD im Kopf der `index.html` gemeinsam angepasst werden.

## Technischer Aufbau

- Reines HTML, CSS und JavaScript
- Keine Build-Schritte notwendig
- Keine externen Schriftarten
- Keine Analyse- oder Trackingdienste
- Keine Cookies durch die Website selbst
- Responsive Navigation und mobile Kontaktleiste
- Interaktive Kontaktauswahl läuft ausschließlich lokal im Browser
