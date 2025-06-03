import { getInspirations } from "./data.mjs";
import { renderColorBar, renderEmojiBar } from "./dynamic-elements.mjs";

export function displaySavedInspirations() {
    const container = document.querySelector('.savedInspirations');
    if (!container) return;

    container.innerHTML = "";

    const inspirations = getInspirations();

    inspirations.forEach(inspiration => {
        const inspirationDiv = document.createElement('div');
        inspirationDiv.classList.add('inspiration');

        // Title
        const title = document.createElement('h3');
        title.textContent = inspiration.name;
        inspirationDiv.appendChild(title);

        // Color bar
        const colorBar = document.createElement('div');
        colorBar.className = "colorBar";
        inspirationDiv.appendChild(colorBar);

        // Emoji bar
        const emojiBar = document.createElement('div');
        emojiBar.className = "emojiBar";
        inspirationDiv.appendChild(emojiBar);

        // Append to container first, then render
        container.appendChild(inspirationDiv);

        // Render colors and emojis
        renderColorBar(colorBar, inspiration.colors);
        renderEmojiBar(emojiBar, inspiration.emojis);
    });
}

document.addEventListener("DOMContentLoaded", displaySavedInspirations);