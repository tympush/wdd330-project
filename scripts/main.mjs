import { loadHeaderFooter, setActiveNavLink, getDate } from "./utils.mjs";

loadHeaderFooter().then(() => {
    setActiveNavLink();
    getDate();
});