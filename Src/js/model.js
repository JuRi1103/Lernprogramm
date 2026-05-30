"use strict";

export default class Model {

    constructor() {
        this.data = {};
        this.questions = [];
        this.currentQuestion = null;
        this.score = 0;
        this.currentIndex = 0;
        this.category = null;
    }

    async loadAllData() {
        try {
            const response = await fetch("./data/questions.json");
            this.data = await response.json();
        } catch (err) {
            console.error("Fehler beim laden der Fragen: ", err);
        }

    }

    async loadCategory(category) {
        this.category = category;

        this.questions = this.data[category];

        this.questions = this.questions.sort(() => Math.random() - 0.5);

        this.currentIndex = 0;
        this.score = 0;
    }

    getNextQuestion() {
        if (this.currentIndex >= this.questions.length) {
            return null;
        }

        const raw = this.questions[this.currentIndex];

        const correct = raw.l[0];
        const answers = [...raw.l].sort(() => Math.random() - 0.5);

        this.currentQuestion = {
            question: raw.a,
            answers: answers,
            correct: correct
        };

        return this.currentQuestion;
    }

    checkAnswer(answer) {
        const correct = answer === this.currentQuestion.correct;

        if (correct) {
            this.score++;
        }

        this.currentIndex++;
        return correct;
    }

    getProgress() {
        return {
            current: this.currentIndex,
            total: this.questions.length,
            score: this.score
        };
    }

    resetQuiz() {
        this.currentIndex = 0;
        this.score = 0;
        this.currentQuestion = null;
    }
}