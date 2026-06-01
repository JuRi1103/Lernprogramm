"use strict";

export default class Presenter {

    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    async init() {
        await this.model.loadAllData();

        const categories = Object.keys(this.model.data);

        this.view.showCategories(categories);
        this.view.bindCategorySelection(cat => this.startCategory(cat));
        this.view.bindAnswer(answer => this.handleAnswer(answer));
    }

    startCategory(category) {
        this.model.loadCategory(category);
        this.loadNextQuestion();
    }

    loadNextQuestion() {
        const question = this.model.getNextQuestion();

        if(!question) {
            this.finishQuiz();
            return;
        }

        this.view.showQuestion(question, this.model.category);
        this.view.updateProgress(this.model.getProgress());
    }

    handleAnswer(answer) {
        const correct = this.model.checkAnswer(answer);

        this.view.highlightAnswers(answer, this.model.currentQuestion.correct);

        this.view.showMessage(
            correct ? "Richtig!" : "Falsch!",
            correct
        );

        setTimeout(() => this.loadNextQuestion(), 800);
    }

    finishQuiz() {
        const progress = this.model.getProgress();

        this.view.updateProgress(progress);
        this.view.hideQuiz();
        this.view.showStatistics(progress.score, progress.total);
    }

}