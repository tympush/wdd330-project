import { renderColorBar, renderEmojiBar } from "./dynamic-elements.mjs";
import { saveInspiration } from "./data.mjs";

document.addEventListener("DOMContentLoaded", () => {
    const colorBar = document.querySelector('.colorBar');
    const emojiBar = document.querySelector('.emojiBar');
    const colorReloadButton = document.getElementById('colorReloadButton');
    const emojiReloadButton = document.getElementById('emojiReloadButton');
    const saveButton = document.querySelector('.saveButton');

    renderColorBar(colorBar);
    renderEmojiBar(emojiBar);

    colorReloadButton.addEventListener('click', () => {
        renderColorBar(colorBar);
    });

    emojiReloadButton.addEventListener('click', () => {
        renderEmojiBar(emojiBar);
    });

    saveButton.addEventListener('click', () => {
        // ask user for a name
        const saveName = prompt("Enter a name for your inspiration:");
        if (!saveName) {
            alert("Save cancelled. Please provide a name.");
            return;
        }

        // get current colors
        const colorDivs = colorBar.querySelectorAll('div');
        const colors = Array.from(colorDivs).map(div => {
            // extract rgb values from style
            const rgb = div.style.backgroundColor.match(/\d+/g);
            return rgb ? rgb.map(Number) : null;
        }).filter(Boolean);

        // get current emojis
        const emojiSpans = emojiBar.querySelectorAll('span');
        const emojis = Array.from(emojiSpans).map(span => ({
            htmlCode: [span.innerHTML],
            name: span.title
        }));

        saveInspiration(saveName, colors, emojis);
        alert(`Inspiration "${saveName}" saved!`);
    });
});