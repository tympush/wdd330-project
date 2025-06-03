import { loadHeaderFooter, setActiveNavLink } from "./utils.mjs";

loadHeaderFooter().then(() => {
    setActiveNavLink();
});