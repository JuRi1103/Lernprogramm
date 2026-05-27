"use strict";

import Model from "./model.js";
import View from "./view.js";
import Presenter from "./presenter.js";

document.addEventListener("DOMContentLoaded", () => {
    const model = new Model();
    const view = new View();
    const presenter = new Presenter(model, view);

    presenter.init();

    registerServiceWorker();
});

function registerServiceWorker() {

    if ("serviceWorker" in navigator) {

        navigator.serviceWorker
            .register("../service-worker.js")
            .then(() => {
                console.log("Service Worker registriert");
            })
            .catch(error => {
                console.error(error);
            })
    }
}
