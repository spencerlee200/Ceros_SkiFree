import '../css/game.css';
import { Game } from './Core/Game.js';

//Add favicon
(function() {
    var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = '../img/favicon.ico';
    document.getElementsByTagName('head')[0].appendChild(link);
})();

document.addEventListener("DOMContentLoaded",() => {
    const skiGame = new Game();
    skiGame.load().then(() => {
        skiGame.init();
        skiGame.run();
    });
});

//Adding new event listener for the restart button
document.addEventListener("Restart",() => {
    window.location.reload(false); 
});