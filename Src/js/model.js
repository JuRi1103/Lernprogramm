"use strict";

export default class Model {

    constructor() {

        this.questions = [];
        this.currentQuestion = null;

        this.score = 0;
        this.currentIndex = 0;
    }

    async loadQuestions() {
        // JSON laden
    }

    getRandomQuestion() {
        // Zufallsfrage liefern
    }

    checkAnswer(answer) {
        // Antwort prüfen
    }

    saveScore() {
        // Punktestand speichern
    }

    resetQuiz() {
        // Werte zurücksetzen
    }
}