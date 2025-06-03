import { renderColorBar, renderEmojiBar } from "./dynamic-elements.mjs";
import { getRandomColorPalette, getRandomEmojis } from "./api.mjs";
import { saveInspiration } from "./data.mjs";

document.addEventListener("DOMContentLoaded", () => {
    const colorBar = document.querySelector(".colorBar");
    const emojiBar = document.querySelector(".emojiBar");
    const colorReloadButton = document.getElementById("colorReloadButton");
    const emojiReloadButton = document.getElementById("emojiReloadButton");
    const saveButton = document.querySelector(".saveButton");

    async function loadColors() {
        const palette = await getRandomColorPalette();
        renderColorBar(colorBar, palette);
    }

    async function loadEmojis() {
        const emojis = await getRandomEmojis(5);
        renderEmojiBar(emojiBar, emojis);
    }

    loadColors();
    loadEmojis();

    colorReloadButton.addEventListener("click", loadColors);
    emojiReloadButton.addEventListener("click", loadEmojis);

    saveButton.addEventListener("click", () => {
        const saveName = prompt("Enter a name for your inspiration:");
        if (!saveName) {
            alert("Save cancelled. Please provide a name.");
            return;
        }

        // get current colors
        const colorDivs = colorBar.querySelectorAll("div");
        const colors = Array.from(colorDivs).map(div => {
            const rgb = div.style.backgroundColor.match(/\d+/g);
            return rgb ? rgb.map(Number) : null;
        }).filter(Boolean);

        // get current emojis
        const emojiSpans = emojiBar.querySelectorAll("span");
        const emojis = Array.from(emojiSpans).map(span => ({
            htmlCode: [span.innerHTML],
            name: span.title
        }));

        saveInspiration(saveName, colors, emojis, "Me", "/public/images/profile-me.png");
        alert(`Inspiration "${saveName}" saved!`);
    });
});