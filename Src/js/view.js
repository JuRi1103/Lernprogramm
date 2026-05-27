"use strict";

export default class View {

    constructor() {

        this.questionContainer =
            document.querySelector("#question-container");

        this.answersContainer =
            document.querySelector("#answers-container");

        this.progressBar =
            document.querySelector("#progress-bar");

        this.statisticsSelection =
            document.querySelector("#statistics-section");
    }

    showQuestion(question) {
        // Frage anzeigen
    }

    showAnswers(answers) {
        // Buttons erzeugen
    }

    updateProgress(percent) {
        // Progressbar aktualisieren
    }

    showStatistics(statistics) {
        // Statistik anzeigen
    }

    clearAnswers() {
        // Alte Antworten entfernen
    }
}