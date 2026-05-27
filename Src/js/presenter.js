"use strict";

export default class Presenter {

    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    async init() {

        await this.model.loadQuestions();

        this.loadNextQuestion();
    }

    loadNextQuestion() {

        // Neue Frage holen
        // In View anzeigen
    }

    handleAnswer(answer) {

        // Antwort auswerten
        // Fortschritt aktualisieren
        // nächste Frage laden
    }

    finishQuiz() {

        // Statistik anzeigen
    }

}