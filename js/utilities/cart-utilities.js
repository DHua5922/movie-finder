const cartKey = "cart";

function getCartFromLocalStorage() {
  return JSON.parse(localStorage.getItem(cartKey)) || [];
}

function setCartToLocalStorage(cart) {
  localStorage.setItem(cartKey, JSON.stringify(cart));
}
