import { renderColorBar, renderEmojiBar } from "./dynamic-elements.mjs";

async function displayFeaturedInspirations() {
    const container = document.querySelector(".featuredInspirations");
    if (!container) return;

    container.innerHTML = "";

    // featured themes are saved in the featured.json file.
    // it has pre-made example users. managing real accounts is beyond the scope of this project.
    const response = await fetch("public/data/featured.json");
    if (!response.ok) {
        container.textContent = "Failed to load featured inspirations.";
        return;
    }
    const allInspirations = await response.json();

    // 5 random inspirations (no repeats)
    const inspirations = [];
    const usedIndexes = new Set();
    while (inspirations.length < 5 && usedIndexes.size < allInspirations.length) {
        const idx = Math.floor(Math.random() * allInspirations.length);
        if (!usedIndexes.has(idx)) {
            inspirations.push(allInspirations[idx]);
            usedIndexes.add(idx);
        }
    }

    inspirations.forEach(inspiration => {
        const inspirationDiv = document.createElement("div");
        inspirationDiv.classList.add("inspiration");

        // Title
        const title = document.createElement("h3");
        title.textContent = inspiration.name;
        inspirationDiv.appendChild(title);

        // Color bar
        const colorBar = document.createElement("div");
        colorBar.className = "colorBar";
        inspirationDiv.appendChild(colorBar);

        // Emoji bar
        const emojiBar = document.createElement("div");
        emojiBar.className = "emojiBar";
        inspirationDiv.appendChild(emojiBar);

        // Author and Picture section
        const authorDiv = document.createElement("div");
        authorDiv.className = "inspiration-author";
        authorDiv.style.display = "flex";
        authorDiv.style.alignItems = "center";
        authorDiv.style.marginTop = "8px";

        const authorText = document.createElement("span");
        authorText.textContent = `Made by: ${inspiration.author || "Unknown"}`;
        authorText.style.marginRight = "8px";
        authorDiv.appendChild(authorText);

        const img = document.createElement("img");
        img.src = inspiration.picture || "";
        img.alt = "Author";
        img.style.width = "32px";
        img.style.height = "32px";
        img.style.borderRadius = "50%";
        authorDiv.appendChild(img);

        inspirationDiv.appendChild(authorDiv);

        container.appendChild(inspirationDiv);

        renderColorBar(colorBar, inspiration.colors);
        renderEmojiBar(emojiBar, inspiration.emojis);
    });
}

document.addEventListener("DOMContentLoaded", displayFeaturedInspirations);