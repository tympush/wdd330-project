import { renderColorBar, renderEmojiBar } from "./dynamic-elements.mjs";

document.addEventListener("DOMContentLoaded", () => {
    const colorBar = document.querySelector('.colorBar');
    const emojiBar = document.querySelector('.emojiBar');
    const colorReloadButton = document.getElementById('colorReloadButton');
    const emojiReloadButton = document.getElementById('emojiReloadButton');

    renderColorBar(colorBar);
    renderEmojiBar(emojiBar);

    colorReloadButton.addEventListener('click', () => {
        renderColorBar(colorBar);
    });

    emojiReloadButton.addEventListener('click', () => {
        renderEmojiBar(emojiBar);
    });
});