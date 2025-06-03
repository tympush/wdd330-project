import { renderColorBar, renderEmojiBar } from "./dynamic-elements.mjs";

const colorBar = document.querySelector('.colorBar');
const emojiBar = document.querySelector('.emojiBar');

document.addEventListener("DOMContentLoaded", () => {
    renderColorBar(colorBar);
    renderEmojiBar(emojiBar);
});