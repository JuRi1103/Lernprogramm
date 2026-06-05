"use strict";

import Model from "./model.js";
import View from "./view.js";
import Presenter from "./presenter.js";

document.addEventListener("DOMContentLoaded", () => {
    const model = new Model();
    const view = new View();
    const presenter = new Presenter(model, view);

    presenter.init();

    setupInstallPrompt();
    registerServiceWorker();
});

function setupInstallPrompt() {
    let deferredPrompt;

    window.addEventListener("beforeinstallprompt", (e) => {
       e.preventDefault();
       deferredPrompt = e;
       document.getElementById("install-btn").hidden = false;
    });

    document.getElementById("install-btn").addEventListener("click", async () => {
        document.getElementById("install-btn").hidden = true;
        deferredPrompt.prompt();
        await deferredPrompt.userChoice;
        deferredPrompt = null;
    });
}

function registerServiceWorker() {

    if ("serviceWorker" in navigator) {

        navigator.serviceWorker
            .register("./service-worker.js")
            .then(() => {
                console.log("Service Worker registriert");
            })
            .catch(error => {
                console.error(error);
            })
    }
}
