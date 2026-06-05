Autor: Justin Rietschel

# Lernprogramm

Beleg über webbasiertes Lernprogramm mit unterstützung für lokale Fragen, externe Quizdaten über eine REST-API 
sowie Offline-Nutzung als PWA
  
# Funktionen
- Auswahl verschiedener Kategorien
- Abruf eigener Fragen über eine .JSON
- Abruf externer Fragen über eine REST-API
- Unterstützung mathematischer Formeln über KaTeX
- Auswertung der Ergebnisse
- Offline-Unterstützung durch Service Worker
- Installierbar als PWA

Getestet in Firefox und Chrome

# Erfüllte Aufgaben
- Note 4: Programm funktioniert lt. Anforderung mit **einer** JS-Bibliothek
- Note 3: zzgl. funktionsfähige Nutzung des externen Aufgabenservers

# Mögliche Erweiterungen
- Highscore-System
- Zeitlimit pro Frage
- Auswahl der Anzahl an Fragen pro Quiz

# Einsatz von LLM
- bei der Entwicklung eines Grundgerüsts
- beim Debugging(insbesondere bei der REST-API)
- bei dieser README.md
- icon-192 und icon-512
- als Hilfe bei der Erstellung der style.css

# Projektstruktur
├── index.html  
├── style.css  
├── manifest.json  
├── service-worker.js  
├── data/  
│ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    └── questions.json  
├── assets/  
│ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    ├── icon-192.png  
│ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    └── icon-512.png  
└── js/   
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    ├── app.js   
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    ├── model.js   
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    ├── view.js   
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    └── presenter.js  

# Architektur

Model:
- Laden lokaler Fragen
- Abrufen externer Quizdaten
- Auswerten von Antworten
- Verwaltung des Quizzustands

View:
- Darstellung der Benutzeroberfläche
- Anzeige von Fragen und Antworten
- Fortschrittsanzeige
- Ergebnisdarstellung

Presenter:
- Reagiert auf Benutzeraktionen
- Steuert den Quizablauf
- Aktualisiert die Oberfläche

# Lokale Fragen

Lokale Fragen werden aus einer JSON-Datei geladen.

Beispiel:

{  
&nbsp;&nbsp;&nbsp;&nbsp;"mathe": [  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"a": "Wie viel ist 2 + 2?",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"l": ["4", "3", "5", "6"]  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}  
&nbsp;&nbsp;&nbsp;&nbsp;]  
}  

Dabei gilt:
- a = Frage
- l[0] = richtige Antwort
- weitere Einträge = falsche Antworten

# Externe Quizdaten

Zusätzlich können Fragen über eine externe REST-API geladen werden.

Verwendete Endpunkte:

GET /api/quizzes  
GET /api/quizzes/{id}  
POST /api/quizzes/{id}/solve  

Die Antworten werden serverseitig überprüft.

