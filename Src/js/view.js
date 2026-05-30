"use strict";

export default class View {

    constructor() {
        this.startBtn = document.getElementById("start-btn");
        this.categorySection = document.getElementById("category-section");
        this.quizSection = document.getElementById("quiz-section");
        this.questionContainer = document.getElementById("question-container");
        this.answersContainer = document.getElementById("answers-container");
        this.messageContainer = document.getElementById("message-container");
        this.progressText = document.getElementById("progress-text");
        this.progressBar = document.getElementById("progress-bar");
        this.statisticsSection = document.getElementById("statistics-section");
    }

    showCategories(categories) {
        const container = document.getElementById("category-container");
        container.innerHTML = "";

        categories.forEach(cat => {
            const btn = document.createElement("button");
            btn.className = "category-btn";
            btn.dataset.category = cat;
            btn.textContent = cat;
            container.appendChild(btn);
        });
    }

    bindCategorySelection(handler) {
        document.getElementById("category-container").addEventListener("click", e => {
           if (e.target.matches(".category-btn")) {
               handler(e.target.dataset.category);
           }
        });
    }

    bindAnswer(handler) {
        this.answersContainer.addEventListener("click", e => {
            if (e.target.matches("button.answer-btn")) {
                handler(e.target.dataset.answer);
            }
        });
    }

    showQuestion(question) {
        this.quizSection.hidden = false;

        this.questionContainer.textContent = question.question;

        this.answersContainer.innerHTML = "";
        question.answers.forEach(a => {
            const btn = document.createElement("button");
            btn.className = "answer-btn";
            btn.dataset.answer = a;
            btn.textContent = a;
            this.answersContainer.appendChild(btn);
        });

        this.messageContainer.textContent = "";
    }

    showMessage(text, correct) {
        this.messageContainer.textContent = text;
        this.messageContainer.style.color = correct ? "lightgreen" : "lightcoral";
    }

    updateProgress(progress) {
        this.progressText.textContent = `${progress.current}/${progress.total}`;
        this.progressBar.style.width = `${(progress.current/progress.total)*100}%`;
    }

    showStatistics(score, total) {
        this.statisticsSection.hidden = false;
        this.statisticsSection.innerHTML = `
            <h2>Ergebnis</h2>
            <p>${score} von {total} richtig</p>
        `;
    }
}