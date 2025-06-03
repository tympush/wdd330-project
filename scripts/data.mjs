export function saveInspiration(name, colors, emojis) {
    // get existing inspirations or start a new array
    let inspirations = JSON.parse(localStorage.getItem("inspirations")) || [];
    // remove any existing inspiration with the same name
    inspirations = inspirations.filter(item => item.name !== name);
    // add the new inspiration
    inspirations.push({ name, colors, emojis });
    // save back to localStorage
    localStorage.setItem("inspirations", JSON.stringify(inspirations));
}

export function getInspirations() {
    return JSON.parse(localStorage.getItem("inspirations")) || [];
}