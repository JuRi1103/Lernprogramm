"use strict";

export default class Model {

    constructor() {
        this.data = {};
        this.questions = [];
        this.currentQuestion = null;
        this.score = 0;
        this.currentIndex = 0;
        this.category = null;
        this.auth = "Basic " + btoa("test2@gmail.com:secret");//random Login
    }

        async fetchRandomQuiz() {
            const response = await fetch("https://idefix.informatik.htw-dresden.de:8888/api/quizzes", {
                headers: { "Authorization": this.auth}
            });

            if (!response.ok) {
                throw new Error("API Fehler: " + response.status);
            }

            const page = await response.json();
            const quizzes = page.content;

            if (!Array.isArray(quizzes) || quizzes.length === 0) {
                throw new Error("Keine Quizzes gefunden");
            }

            const random = quizzes[Math.floor(Math.random() * quizzes.length)];

            const quizResponse = await fetch(`https://idefix.informatik.htw-dresden.de:8888/api/quizzes/${random.id}`,
                { headers: { "Authorization": this.auth } }
            );
            return await quizResponse.json();
        }

        async solveQuiz(id, answers) {
            const response = await fetch(`https://idefix.informatik.htw-dresden.de:8888/api/quizzes/${id}/solve`,
                {
                    method: "POST",
                    headers: {
                        "Authorization": this.auth,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(answers)
                }
            );
            return await response.json();
        }

        async loadExternalData() {
            this.questions = [];

            const usedIds = new Set();

            while (this.questions.length < 10) {
                const quiz = await this.fetchRandomQuiz();

                if (!usedIds.has(quiz.id)) {
                    usedIds.add(quiz.id);
                    this.questions.push(quiz);
                    console.log("API Quiz: ", quiz);
                }
            }

            this.currentIndex = 0;
            this.score = 0;
            this.category = "Extern";
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
            this.questions = this.data[category].sort(() => Math.random() - 0.5);
            this.currentIndex = 0;
            this.score = 0;
        }

        getNextQuestion() {
            if (this.currentIndex >= this.questions.length) {
                return null;
            }

            const raw = this.questions[this.currentIndex];
            console.log("RAW QUIZ:", raw);

            //EXTERN
            if (raw.id !== undefined) {
                const shuffled = raw.options
                    .map((text, index) => ({text, index}))
                    .sort(() => Math.random() - 0.5);

                this.currentQuestion = {
                    id: raw.id,
                    question: raw.text,
                    answers: shuffled.map(a => a.text),
                    map: shuffled,
                    correct: null
                }

                return this.currentQuestion;
            }

            //INTERN
            const correct = raw.l[0];
            const answers = [...raw.l].sort(() => Math.random() - 0.5);

            this.currentQuestion = {
                question: raw.a,
                answers: answers,
                correct: correct
            };

            return this.currentQuestion;
        }

        async checkAnswer(answer) {
            const current = this.questions[this.currentIndex];

            // EXTERN
            if (current.id !== undefined) {
                const selected = this.currentQuestion.map.find(a => a.text === answer)
                const originalIndex = selected.index;

                console.log(current);
                console.log(this.currentQuestion);
                const result = await this.solveQuiz(current.id, [originalIndex]);

                console.log("Antwort der API:", result);
                console.log("Gesendete Antwort:", [originalIndex]);
                if (result.success) {
                    this.score++;
                    this.currentQuestion.correct = answer;
                    this.currentIndex++;
                    return true;
                }

                let correctIndex = null;
                for (let i = 0; i < current.options.length; i++) {
                    const r = await this.solveQuiz(current.id, [i]);
                    console.log(i, r);
                    if (r.success) {
                        correctIndex = i;
                        break;
                    }
                }

                this.currentQuestion.correct = current.options[correctIndex];
                this.currentIndex++;
                return false;
            }

            // INTERN
            const correct = answer=== this.currentQuestion.correct;

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
}