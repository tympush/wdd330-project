export function renderWithTemplate(template, parentElement, data, callback) {
    parentElement.innerHTML = template;
    if (callback) {
        callback(data);
    }
}

export async function loadTemplate(path) {
    const res = await fetch(path);
    const template = await res.text();
    return template;
}

export async function loadHeaderFooter() {
    const headerTemplate = await loadTemplate("../public/partials/header.html");
    const footerTemplate = await loadTemplate("../public/partials/footer.html");

    const headerElement = document.querySelector(".dynamicHeader");
    const footerElement = document.querySelector(".dynamicFooter");

    renderWithTemplate(headerTemplate, headerElement);
    renderWithTemplate(footerTemplate, footerElement);
}