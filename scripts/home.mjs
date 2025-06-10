import { getRandomColorPalette } from "./api.mjs";
import { renderColorBar } from "./dynamic-elements.mjs";

async function showRandomColorSchemes() {
    const container = document.querySelector('.randomColorSchemes');
    if (!container) return;

    container.innerHTML = "";

    for (let i = 0; i < 3; i++) {
        const palette = await getRandomColorPalette(5);

        const schemeDiv = document.createElement('div');
        schemeDiv.className = "colorScheme";

        const colorBar = document.createElement('div');
        colorBar.className = "colorBar";
        renderColorBar(colorBar, palette);
        schemeDiv.appendChild(colorBar);

        //try button
        const tryBtn = document.createElement('button');
        tryBtn.textContent = "Try";
        tryBtn.style.marginLeft = "12px";
        tryBtn.addEventListener('click', () => {
            document.documentElement.style.setProperty('--headerColor', `rgb(${palette[0].join(",")})`);
            document.documentElement.style.setProperty('--footerColor', `rgb(${palette[1].join(",")})`);
            document.documentElement.style.setProperty('--accent1', `rgb(${palette[2].join(",")})`);
            document.documentElement.style.setProperty('--accent2', `rgb(${palette[3].join(",")})`);
            document.documentElement.style.setProperty('--accent3', `rgb(${palette[4].join(",")})`);
        });
        schemeDiv.appendChild(tryBtn);

        container.appendChild(schemeDiv);
    }
}

document.addEventListener("DOMContentLoaded", showRandomColorSchemes);