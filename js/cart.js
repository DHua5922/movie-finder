const cartContainer = document.querySelector(".cart");

window.addEventListener("DOMContentLoaded", () => {
  loadCartItems();

  const removeAllButton = document.querySelector(".cart__header button");
  removeAllButton.addEventListener("click", removeAllItemsFromCart);

  const quantityInput = document.querySelector(
    ".cart__item input[name='quantity']",
  );
  quantityInput.addEventListener("change", changeQuantity);

  cartContainer.addEventListener("click", removeItem);
});

function changeQuantity(event) {
  const newQuantity = parseInt(event.target.value);
  const cartItems = getCartFromLocalStorage();
  const itemId = event.target
    .closest(".cart__item")
    .querySelector("button[data-remove-item-id]").dataset.removeItemId;
  const itemIndex = cartItems.findIndex((item) => `${item.id}` === itemId);

  if (itemIndex !== -1) {
    cartItems[itemIndex].quantity = newQuantity;
    setCartToLocalStorage(cartItems);
  }
}

function showEmptyCartMessage() {
  cartContainer.innerHTML =
    "<h2 class='text-dark text-center cart__empty-message'>Your cart is empty.</h2>";
}

function loadCartItems() {
  const items = getCartFromLocalStorage();

  if (items.length === 0) {
    const proceedToCheckoutLink = document.querySelector(
      ".cart__checkout-btn--wrapper a",
    );

    showEmptyCartMessage();
    proceedToCheckoutLink.classList.add("disabled");
  } else {
    cartContainer.innerHTML = items.map(cartItemHtml).join("");
  }
}

function cartItemHtml(item) {
  const inputId = `quantity-input-${item.id}`;
  return `
    <div class="cart__item flex flex-column justify-content-center align-items-center">
        <a class="btn-link focus-ring-dark" href="movie.html?id=${item.id}">    
            <figure class="cart__item-img--wrapper">
                <img src="https://image.tmdb.org/t/p/w500${item.image}" alt="image of ${item.title}" />
                <figcaption class="text-dark">${item.title}</figcaption>
            </figure>
        </a>

        <label for="${inputId}" class="visually-hidden">Quantity for ${item.title}</label>
        <input id="${inputId}" class="focus-ring-dark" name="quantity" type="number" value="${item.quantity}" min="1" />

        <button class="btn btn-transparent" data-remove-item-id="${item.id}">Remove</button>
    </div>
`;
}

function removeAllItemsFromCart() {
  localStorage.removeItem("cart");
  showEmptyCartMessage();
  loadCartItems();
}

function removeItem(event) {
  const removeButton = event.target.closest("[data-remove-item-id]");
  if (removeButton) {
    let items = getCartFromLocalStorage();
    items = items.filter(
      (item) => `${item.id}` !== removeButton.dataset.removeItemId,
    );
    setCartToLocalStorage(items);
    loadCartItems();
  }
}
