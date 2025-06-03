import { getInspirations, removeInspiration } from "./data.mjs";
import { renderColorBar, renderEmojiBar } from "./dynamic-elements.mjs";

export function displaySavedInspirations() {
    const container = document.querySelector(".savedInspirations");
    if (!container) return;

    container.innerHTML = "";

    const inspirations = getInspirations();

    inspirations.forEach(inspiration => {
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
                displaySavedInspirations();
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

        container.appendChild(inspirationDiv);

        renderColorBar(colorBar, inspiration.colors);
        renderEmojiBar(emojiBar, inspiration.emojis);
    });
}

document.addEventListener("DOMContentLoaded", displaySavedInspirations);