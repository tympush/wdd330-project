import { renderColorBar, renderEmojiBar } from "./dynamic-elements.mjs";
import { getRandomColorPalette, getRandomEmojis } from "./api.mjs";
import { saveInspiration } from "./data.mjs";

// Apply the palette to the site (updates CSS variables)
function applyPaletteToSite(palette) {
    if (!palette || palette.length < 5) return;
    document.documentElement.style.setProperty('--headerColor', `rgb(${palette[0].join(",")})`);
    document.documentElement.style.setProperty('--footerColor', `rgb(${palette[1].join(",")})`);
    document.documentElement.style.setProperty('--accent1', `rgb(${palette[2].join(",")})`);
    document.documentElement.style.setProperty('--accent2', `rgb(${palette[3].join(",")})`);
    document.documentElement.style.setProperty('--accent3', `rgb(${palette[4].join(",")})`);
}

// loads a random color palette and renders it
async function loadColors(colorBar) {
    const palette = await getRandomColorPalette();
    renderColorBar(colorBar, palette);
    applyPaletteToSite(palette); // <-- Update site colors
}

// loads random emoji palette and renders it
async function loadEmojis(emojiBar) {
    const emojis = await getRandomEmojis(5);
    renderEmojiBar(emojiBar, emojis);
}

// gets the current colors from the colorBar
function getCurrentColors(colorBar) {
    const colorDivs = colorBar.querySelectorAll("div");
    return Array.from(colorDivs).map(div => {
        const rgb = div.style.backgroundColor.match(/\d+/g);
        return rgb ? rgb.map(Number) : null;
    }).filter(Boolean);
}

// gets the current emojis from the emojiBar
function getCurrentEmojis(emojiBar) {
    const emojiSpans = emojiBar.querySelectorAll("span");
    return Array.from(emojiSpans).map(span => ({
        htmlCode: [span.innerHTML],
        name: span.title
    }));
}

// handles saving the current inspiration
function handleSave(colorBar, emojiBar) {
    const saveName = prompt("Enter a name for your inspiration:");
    if (!saveName) {
        alert("Save cancelled. Please provide a name.");
        return;
    }
    const colors = getCurrentColors(colorBar);
    const emojis = getCurrentEmojis(emojiBar);
    saveInspiration(saveName, colors, emojis, "Me", "public/images/profile-me.png");
    alert(`Inspiration "${saveName}" saved!`);
}

// main function that executes all the functions
document.addEventListener("DOMContentLoaded", () => {
    const colorBar = document.querySelector(".colorBar");
    const emojiBar = document.querySelector(".emojiBar");
    const colorReloadButton = document.getElementById("colorReloadButton");
    const emojiReloadButton = document.getElementById("emojiReloadButton");
    const saveButton = document.querySelector(".saveButton");

    // Initial Load
    loadColors(colorBar);
    loadEmojis(emojiBar);

    colorReloadButton.addEventListener("click", () => loadColors(colorBar));
    emojiReloadButton.addEventListener("click", () => loadEmojis(emojiBar));
    saveButton.addEventListener("click", () => handleSave(colorBar, emojiBar));
});

// adds text to reload buttons in mobile view 
function updateReloadButtonText() {
    const colorBtn = document.getElementById('colorReloadButton');
    const emojiBtn = document.getElementById('emojiReloadButton');
    if (window.innerWidth <= 960) {
        if (colorBtn) colorBtn.textContent = "↻ Color";
        if (emojiBtn) emojiBtn.textContent = "↻ Emoji";
    } else {
        if (colorBtn) colorBtn.textContent = "↻";
        if (emojiBtn) emojiBtn.textContent = "↻";
    }
}

window.addEventListener('resize', updateReloadButtonText);
window.addEventListener('DOMContentLoaded', updateReloadButtonText);