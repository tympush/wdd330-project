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

let currentActiveSchemeBox = null;

function createColorSchemeElement(palette, onTry) {
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
    tryBtn.addEventListener('click', () => {
        onTry(schemeBox, palette);
    });
    schemeDiv.appendChild(tryBtn);

    return schemeDiv;
}

async function showRandomColorSchemes() {
    const container = document.querySelector('.randomColorSchemes');
    if (!container) return;

    container.innerHTML = "";

    // Helper to handle "Try" button click
    function handleTry(schemeBox, palette) {
        applyPaletteToSite(palette);
        if (currentActiveSchemeBox) {
            currentActiveSchemeBox.classList.remove('active-scheme');
        }
        schemeBox.classList.add('active-scheme');
        currentActiveSchemeBox = schemeBox;
    }

    for (let i = 0; i < 3; i++) {
        const palette = await getRandomColorPalette(5);
        const schemeDiv = createColorSchemeElement(palette, handleTry);
        container.appendChild(schemeDiv);

        // Optionally, set the first as active on load:
        if (i === 0) {
            const schemeBox = schemeDiv.querySelector('.colorSchemeBox');
            handleTry(schemeBox, palette);
        }
    }
}

async function showEmojiShowcases() {
    const emojiShowcases = document.querySelectorAll('.emojiShowcase');
    for (let i = 0; i < emojiShowcases.length; i++) {
        const container = emojiShowcases[i];
        const emojis = await getRandomEmojis(10);
        renderEmojiShowcase(container, emojis);

        //remove any previous scroll direction classes
        container.classList.remove('scroll-up', 'scroll-down');
        //assign scroll direction
        if (i === 0) {
            container.classList.add('scroll-up');
        } else {
            container.classList.add('scroll-down');
        }
        //also update the wrapper's animation name
        const wrapper = container.querySelector('.emojiScrollWrapper');
        if (wrapper) {
            wrapper.style.animationName = (i === 0) ? 'emojiScrollUp' : 'emojiScrollDown';
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    showRandomColorSchemes();
    showEmojiShowcases();
});