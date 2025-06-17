import { loadHeaderFooter, setActiveNavLink, setDateInFooter, setupHamburgerMenu } from "./utils.mjs";

loadHeaderFooter().then(() => {
    setActiveNavLink();
    setDateInFooter();
    setupHamburgerMenu();
});