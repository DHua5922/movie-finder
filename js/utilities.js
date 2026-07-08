const cartKey = "cart";

const themeLocalStorageKey = "theme";
const themeDataAttribute = "data-theme";
const themeToggleBtnElem = document.querySelectorAll(".nav__theme-toggle-btn");

window.addEventListener("DOMContentLoaded", () => {
  loadTheme();
  themeToggleBtnElem.forEach((button) => {
    button.addEventListener("click", toggleTheme);
  });

  document.querySelector(".back-link")?.addEventListener("click", () => {
    window.history.back();
  });
});

function getCartFromLocalStorage() {
  return JSON.parse(localStorage.getItem(cartKey)) || [];
}

function setCartToLocalStorage(cart) {
  localStorage.setItem(cartKey, JSON.stringify(cart));
}

function toggleTheme() {
  const currentTheme =
    document.documentElement.getAttribute(themeDataAttribute);
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  document.documentElement.setAttribute(themeDataAttribute, newTheme);
  localStorage.setItem(themeLocalStorageKey, newTheme);
  updateThemeToggleState(newTheme);
}

function loadTheme() {
  const savedTheme = localStorage.getItem(themeLocalStorageKey);
  if (savedTheme) {
    document.documentElement.setAttribute(themeDataAttribute, savedTheme);
  }

  updateThemeToggleState(savedTheme);
}

function updateThemeToggleState(theme) {
  const isDarkTheme = theme === "dark";

  themeToggleBtnElem.forEach((button) => {
    button.setAttribute("aria-pressed", String(isDarkTheme));
    button.setAttribute(
      "aria-label",
      isDarkTheme ? "Switch to light mode" : "Switch to dark mode",
    );
  });
}
