export async function getRandomColorPalette() {
    const url = "http://colormind.io/api/";
    const data = {
        model: "default"
    };

    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error("Failed to fetch color palette from Colormind API");
    }

    const result = await response.json();
    return result.result;
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