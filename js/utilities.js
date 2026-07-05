const cartKey = "cart";

window.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".back-link").addEventListener("click", () => {
    window.history.back();
  });
});

function getCartFromLocalStorage() {
  return JSON.parse(localStorage.getItem(cartKey)) || [];
}

function setCartToLocalStorage(cart) {
  localStorage.setItem(cartKey, JSON.stringify(cart));
}
