// ==UserScript==
// @name        gulper.io faster respawn
// @namespace   DX Scripts
// @match       https://gulper.io/*
// @grant       none
// @version     1.1
// @author      D35TR0Y3R
// @description This script will help you to respawn automatically and faster.
// @require     https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=gulper.io
// ==/UserScript==
(function () {
    'use strict';

    if (typeof $ === 'undefined') {
        console.error('jQuery not loaded. Aborting script.');
        return;
    }

    window.ADS_BLOCKED = false;
    try {
        Object.defineProperty(window, 'ADS_BLOCKED', {
            value: false,
            writable: false, // Prevent further modifications
            configurable: false // Prevent deletion or redefinition
        });
    } catch (error) {
        console.warn('Could not use Object.defineProperty to set ADS_BLOCKED:', error);
    }

    let retryCount = 0;
    const maxRetries = 10;


    function tryRespawn() {
        const restartButton = $("#restart-btn");
        if (restartButton.length > 0) {
            const delay = 1000;
            setTimeout(() => {
                restartButton.click();
                console.log("Respawned successfully!");
            }, delay);
        } else if (retryCount < maxRetries) {
            console.warn("Restart button not found. Retrying in 1 second...");
            retryCount++;
            setTimeout(tryRespawn, 1000);
        } else {
            console.error("Max retries reached. Stopping.");
        }
    }

    const observer = new MutationObserver(() => {
        const gameStats = document.getElementById('game-stats');
        if (gameStats && window.getComputedStyle(gameStats).getPropertyValue('visibility') === 'visible') {
            tryRespawn();
        }
    });

    observer.observe(document, { subtree: true, childList: true });

    tryRespawn();
})();
