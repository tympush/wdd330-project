export function renderColorBar(colorBar, palette) {
    if (!colorBar) return;

    colorBar.innerHTML = "";

    try {
        palette.forEach(color => {
            const colorDiv = document.createElement("div");
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

export function renderEmojiBar(emojiBar, emojis) {
    if (!emojiBar) return;

    emojiBar.innerHTML = "";

    try {
        emojis.forEach(emojiObj => {
            const span = document.createElement("span");
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

export function renderEmojiShowcase(container, emojis) {
    if (!container) return;
    container.innerHTML = "";

    // Create a wrapper for animation
    const wrapper = document.createElement("div");
    wrapper.className = "emojiScrollWrapper";

    // Add emojis twice for seamless looping
    for (let i = 0; i < 2; i++) {
        emojis.forEach(emojiObj => {
            const span = document.createElement("span");
            span.innerHTML = emojiObj.htmlCode[0];
            span.style.fontSize = "2.5rem";
            span.style.display = "block";
            span.style.margin = "8px 0";
            span.title = emojiObj.name;
            wrapper.appendChild(span);
        });
    }

    container.appendChild(wrapper);

    // Wait for DOM to update, then measure and set scroll distance
    requestAnimationFrame(() => {
        // Height of one set of emojis (half the wrapper)
        const scrollDistance = wrapper.scrollHeight / 2;
        wrapper.style.setProperty('--scroll-distance', `-${scrollDistance}px`);
    });
}