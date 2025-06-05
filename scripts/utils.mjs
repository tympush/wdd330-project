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

    return Promise.resolve();
}

export function setActiveNavLink() {
    const navLinks = document.querySelectorAll("nav ul li a");
    const currentPath = window.location.pathname.toLowerCase();
    navLinks.forEach(link => {
        if (link.getAttribute("href").toLowerCase() === currentPath) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}

export function getDate(){
    const year = document.querySelector("#currentyear");
    const today = new Date();
    year.innerHTML = `${today.getFullYear()}`;

    const modified = document.querySelector("#lastModified");
    const lastModifiedDate = new Date(document.lastModified);

    const yearModified = lastModifiedDate.getFullYear();
    const monthModified = String(lastModifiedDate.getMonth() + 1).padStart(2, "0");
    const dayModified = String(lastModifiedDate.getDate()).padStart(2, "0");

    modified.innerHTML = `Last Update: ${yearModified}/${monthModified}/${dayModified}`;
}