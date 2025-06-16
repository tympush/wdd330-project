import { getInspirations, removeInspiration } from "./data.mjs";
import { renderColorBar, renderEmojiBar } from "./dynamic-elements.mjs";

// create the DOM element for a saved inspiration
function createSavedInspirationElement(inspiration, searchTerm, refreshCallback) {
    const inspirationDiv = document.createElement("div");
    inspirationDiv.classList.add("inspiration");

    // X (delete) button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✖";
    deleteBtn.className = "deleteInspirationBtn";
    deleteBtn.title = "Delete this inspiration";
    deleteBtn.style.float = "right";
    deleteBtn.style.marginLeft = "8px";
    deleteBtn.addEventListener("click", () => {
        const confirmDelete = confirm(`Are you sure you want to delete "${inspiration.name}"?`);
        if (confirmDelete) {
            removeInspiration(inspiration.name);
            refreshCallback(searchTerm);
        }
    });
    inspirationDiv.appendChild(deleteBtn);

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

    // Render color and emoji bars
    renderColorBar(colorBar, inspiration.colors);
    renderEmojiBar(emojiBar, inspiration.emojis);

    return inspirationDiv;
}

// filter inspirations by search term
function filterInspirationsBySearch(inspirations, searchTerm) {
    if (!searchTerm) return inspirations;
    const lowerSearch = searchTerm.toLowerCase();
    return inspirations.filter(inspiration =>
        inspiration.name && inspiration.name.toLowerCase().includes(lowerSearch)
    );
}

// main function to display saved inspirations
export function displaySavedInspirations(searchTerm = "") {
    const container = document.querySelector(".savedInspirations");
    if (!container) return;

    container.innerHTML = "";

    let inspirations = getInspirations();
    inspirations = filterInspirationsBySearch(inspirations, searchTerm);

    inspirations.forEach(inspiration => {
        const inspirationDiv = createSavedInspirationElement(
            inspiration,
            searchTerm,
            displaySavedInspirations
        );
        container.appendChild(inspirationDiv);
    });
}

// set up search input event listener
function setupSearchInput() {
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.addEventListener("input", () => {
            displaySavedInspirations(searchInput.value.trim());
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    displaySavedInspirations();
    setupSearchInput();
});