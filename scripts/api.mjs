/*Changed to using "The Color API" instead of "The Colormind API" because the latter was not a secure https link and would not work on GitHub Pages*/
export async function getRandomColorPalette(count = 5) {
    // generate a random seed color in hex
    const randomHex = () => {
        const hex = Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0");
        return hex;
    };
    const seed = randomHex();

    // MODES: (monochrome, analogic, complement, triad, quad)
    const url = `https://www.thecolorapi.com/scheme?hex=${seed}&mode=analogic&count=${count}`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Failed to fetch color palette from The Color API");
    }

    const result = await response.json();
    // convert hex to rgb
    const palette = result.colors.map(color => {
        const rgb = color.rgb;
        return [rgb.r, rgb.g, rgb.b];
    });
    return palette;
}



const emojiCategories = [
    "smileys-and-people",
    "animals-and-nature",
    "food-and-drink",
    "travel-and-places",
    "activities",
    "objects"
];

export async function getRandomEmojiFromCategory(category) {
    const url = `https://emojihub.yurace.pro/api/random/category/${category}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch emoji from ${category}`);
    }
    return await response.json();
}

// New function to get 5 random emojis from allowed categories
export async function getRandomEmojis(count = 5) {
    const selectedCategories = Array.from({length: count}, () => {
        const idx = Math.floor(Math.random() * emojiCategories.length);
        return emojiCategories[idx];
    });

    const emojiPromises = selectedCategories.map(cat => getRandomEmojiFromCategory(cat));
    return Promise.all(emojiPromises);
}