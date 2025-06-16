import { getRandomColorPalette, getRandomEmojis } from "./api.mjs";
import { renderColorBar, renderEmojiShowcase } from "./dynamic-elements.mjs";

function applyPaletteToSite(palette) {
    if (!palette || palette.length < 5) return;
    document.documentElement.style.setProperty('--headerColor', `rgb(${palette[0].join(",")})`);
    document.documentElement.style.setProperty('--footerColor', `rgb(${palette[1].join(",")})`);
    document.documentElement.style.setProperty('--accent1', `rgb(${palette[2].join(",")})`);
    document.documentElement.style.setProperty('--accent2', `rgb(${palette[3].join(",")})`);
    document.documentElement.style.setProperty('--accent3', `rgb(${palette[4].join(",")})`);
}

function createColorSchemeElement(palette) {
    const schemeDiv = document.createElement('div');
    schemeDiv.className = "colorScheme";

    // color scheme box
    const schemeBox = document.createElement('div');
    schemeBox.className = "colorSchemeBox";

    const colorBar = document.createElement('div');
    colorBar.className = "colorBar";
    renderColorBar(colorBar, palette);
    schemeBox.appendChild(colorBar);

    schemeDiv.appendChild(schemeBox);

    // try button (right of color scheme)
    const tryBtn = document.createElement('button');
    tryBtn.textContent = "Try";
    tryBtn.className = "tryBtn";
    tryBtn.addEventListener('click', () => applyPaletteToSite(palette));
    schemeDiv.appendChild(tryBtn);

    return schemeDiv;
}

async function showRandomColorSchemes() {
    const container = document.querySelector('.randomColorSchemes');
    if (!container) return;

    container.innerHTML = "";

    for (let i = 0; i < 3; i++) {
        const palette = await getRandomColorPalette(5);
        const schemeDiv = createColorSchemeElement(palette);
        container.appendChild(schemeDiv);
    }
}

async function showEmojiShowcases() {
    const emojiShowcases = document.querySelectorAll('.emojiShowcase');
    const emojis = await getRandomEmojis(10);
    emojiShowcases.forEach(container => renderEmojiShowcase(container, emojis));
}

document.addEventListener("DOMContentLoaded", () => {
    showRandomColorSchemes();
    showEmojiShowcases();
});