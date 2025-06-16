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

    // Content box
    const box = document.createElement("div");
    box.className = "inspirationBox";

    // Title
    const title = document.createElement("h3");
    title.textContent = inspiration.name;
    box.appendChild(title);

    // Color bar
    const colorBar = document.createElement("div");
    colorBar.className = "colorBar";
    box.appendChild(colorBar);

    // Emoji bar
    const emojiBar = document.createElement("div");
    emojiBar.className = "emojiBar";
    box.appendChild(emojiBar);

    // Author and Picture section
    const authorDiv = document.createElement("div");
    authorDiv.className = "inspiration-author";
    const authorText = document.createElement("span");
    authorText.textContent = `Made by: ${inspiration.author || "Unknown"}`;
    authorDiv.appendChild(authorText);
    const img = document.createElement("img");
    img.src = inspiration.picture || "";
    img.alt = "Author";
    authorDiv.appendChild(img);
    box.appendChild(authorDiv);

    inspirationDiv.appendChild(box);

    // Button group
    const buttonGroup = document.createElement("div");
    buttonGroup.className = "button-group";

    // Try button
    const tryBtn = document.createElement("button");
    tryBtn.textContent = "Try";
    tryBtn.addEventListener("click", () => {
        if (inspiration.colors && inspiration.colors.length >= 3) {
            document.documentElement.style.setProperty('--headerColor', `rgb(${inspiration.colors[0].join(",")})`);
            document.documentElement.style.setProperty('--footerColor', `rgb(${inspiration.colors[1].join(",")})`);
            document.documentElement.style.setProperty('--accent1', `rgb(${inspiration.colors[2].join(",")})`);
            if (inspiration.colors[3]) document.documentElement.style.setProperty('--accent2', `rgb(${inspiration.colors[3].join(",")})`);
            if (inspiration.colors[4]) document.documentElement.style.setProperty('--accent3', `rgb(${inspiration.colors[4].join(",")})`);
        }
        // Optionally, add logic to highlight the active box
        document.querySelectorAll('.inspirationBox.active-scheme').forEach(el => el.classList.remove('active-scheme'));
        box.classList.add('active-scheme');
    });
    buttonGroup.appendChild(tryBtn);

    // Save button
    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";
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
    buttonGroup.appendChild(saveBtn);

    inspirationDiv.appendChild(buttonGroup);

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

        let firstBox = null;
        let firstInspiration = null;

        inspirations.forEach((inspiration, idx) => {
            const inspirationDiv = createInspirationElement(inspiration);
            container.appendChild(inspirationDiv);

            //save the first inspiration's box and data
            if (idx === 0) {
                firstBox = inspirationDiv.querySelector('.inspirationBox');
                firstInspiration = inspiration;
            }
        });

        //select and apply the first inspiration by default
        if (firstBox && firstInspiration && firstInspiration.colors && firstInspiration.colors.length >= 3) {
            firstBox.classList.add('active-scheme');
            document.documentElement.style.setProperty('--headerColor', `rgb(${firstInspiration.colors[0].join(",")})`);
            document.documentElement.style.setProperty('--footerColor', `rgb(${firstInspiration.colors[1].join(",")})`);
            document.documentElement.style.setProperty('--accent1', `rgb(${firstInspiration.colors[2].join(",")})`);
            if (firstInspiration.colors[3]) document.documentElement.style.setProperty('--accent2', `rgb(${firstInspiration.colors[3].join(",")})`);
            if (firstInspiration.colors[4]) document.documentElement.style.setProperty('--accent3', `rgb(${firstInspiration.colors[4].join(",")})`);
        }
    } catch (error) {
        container.textContent = error.message;
    }
}

document.addEventListener("DOMContentLoaded", displayFeaturedInspirations);