import { loadHeaderFooter, setActiveNavLink, setDateInFooter } from "./utils.mjs";

loadHeaderFooter().then(() => {
    setActiveNavLink();
    setDateInFooter();
});