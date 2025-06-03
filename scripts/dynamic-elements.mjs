import { getRandomColorPalette, getRandomEmojis } from "./api.mjs";



export async function renderColorBar(colorBar) {
    if (!colorBar) return;

    colorBar.innerHTML = "";

    try {
        const palette = await getRandomColorPalette();
        palette.forEach(color => {
            const colorDiv = document.createElement('div');
            colorDiv.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
            colorDiv.style.width = "50px";
            colorDiv.style.height = "50px";
            colorDiv.style.display = "inline-block";
            colorDiv.style.marginRight = "8px";
            colorDiv.style.borderRadius = "8px";
            colorDiv.title = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
            colorBar.appendChild(colorDiv);
        });
    } catch (error) {
        colorBar.textContent = "Failed to load colors.";
    }
}



export async function renderEmojiBar(emojiBar) {
    if (!emojiBar) return;

    emojiBar.innerHTML = "";

    try {
        const emojis = await getRandomEmojis(5);
        emojis.forEach(emojiObj => {
            const span = document.createElement('span');
            span.innerHTML = emojiObj.htmlCode[0];
            span.style.fontSize = "2.5rem";
            span.style.marginRight = "12px";
            span.title = emojiObj.name;
            emojiBar.appendChild(span);
        });
    } catch (error) {
        emojiBar.textContent = "Failed to load emojis.";
    }
}