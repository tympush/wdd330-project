import { renderColorBar, renderEmojiBar } from "./dynamic-elements.mjs";
import { saveInspiration } from "./data.mjs";

// fetch all featured inspirations from JSON
async function fetchFeaturedInspirations() {
    const response = await fetch("public/data/featured.json");
    if (!response.ok) {
        throw new Error("Failed to load featured inspirations.");
    }
    return await response.json();
}

// get # random unique inspirations
function getRandomInspirations(allInspirations, count = 5) {
    const inspirationsSet = new Set();
    while (inspirationsSet.size < count && inspirationsSet.size < allInspirations.length) {
        const idx = Math.floor(Math.random() * allInspirations.length);
        inspirationsSet.add(allInspirations[idx]);
    }
    return Array.from(inspirationsSet);
}

// create the DOM element for an inspiration
function createInspirationElement(inspiration) {
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

    // Try button
    const tryBtn = document.createElement("button");
    tryBtn.textContent = "Try";
    tryBtn.style.margin = "12px 8px 0 0";
    tryBtn.addEventListener("click", () => {
        if (inspiration.colors && inspiration.colors.length >= 3) {
            document.documentElement.style.setProperty('--headerColor', `rgb(${inspiration.colors[0].join(",")})`);
            document.documentElement.style.setProperty('--footerColor', `rgb(${inspiration.colors[1].join(",")})`);
            document.documentElement.style.setProperty('--accent1', `rgb(${inspiration.colors[2].join(",")})`);
            if (inspiration.colors[3]) document.documentElement.style.setProperty('--accent2', `rgb(${inspiration.colors[3].join(",")})`);
            if (inspiration.colors[4]) document.documentElement.style.setProperty('--accent3', `rgb(${inspiration.colors[4].join(",")})`);
        }
    });
    inspirationDiv.appendChild(tryBtn);

    // Save button
    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";
    saveBtn.style.margin = "12px 0 0 0";
    saveBtn.addEventListener("click", () => {
        saveInspiration(
            inspiration.name,
            inspiration.colors,
            inspiration.emojis,
            inspiration.author,
            inspiration.picture
        );
        alert(`Inspiration "${inspiration.name}" saved!`);
    });
    inspirationDiv.appendChild(saveBtn);

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

    // Render color and emoji bars
    renderColorBar(colorBar, inspiration.colors);
    renderEmojiBar(emojiBar, inspiration.emojis);

    return inspirationDiv;
}

// main function to display featured inspirations
async function displayFeaturedInspirations() {
    const container = document.querySelector(".featuredInspirations");
    if (!container) return;

    container.innerHTML = "";

    try {
        const allInspirations = await fetchFeaturedInspirations();
        const inspirations = getRandomInspirations(allInspirations, 5);

        inspirations.forEach(inspiration => {
            const inspirationDiv = createInspirationElement(inspiration);
            container.appendChild(inspirationDiv);
        });
    } catch (error) {
        container.textContent = error.message;
    }
}

document.addEventListener("DOMContentLoaded", displayFeaturedInspirations);