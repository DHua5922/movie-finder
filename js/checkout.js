const cartContainer = document.querySelector(".cart-items");

window.addEventListener("DOMContentLoaded", () => {
  const dialog = document.querySelector("dialog");
  dialog.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
    }
  });

  loadCartItems();

  document
    .querySelector(".cart__checkout-btn")
    .addEventListener("click", () => checkOut(dialog));
});

function loadCartItems() {
  cartContainer.innerHTML = getCartFromLocalStorage()
    .map(cartItemHtml)
    .join("");
}

function cartItemHtml(item) {
  return `
      <li class="cart__item flex flex-column justify-content-center align-items-center">
          <figure class="cart__item-img--wrapper">
              <img src="https://image.tmdb.org/t/p/w500${item.image}" alt="${item.title}" />
              <figcaption class="text-center">${item.title}</figcaption>
          </figure>
          <p class="text-center">Qty: ${item.quantity}</p>
      </li>
  `;
}

function checkOut(dialog) {
  const nameErrorMessage = document.querySelector("#name-error-message");
  const emailErrorMessage = document.querySelector("#email-error-message");

  const isValidName = document.querySelector("#name-input").checkValidity();
  const isValidEmail = document.querySelector("#email-input").checkValidity();

  if (!isValidName) {
    nameErrorMessage.innerText = "Please enter your name.";
  } else {
    nameErrorMessage.innerText = "";
  }

  if (!isValidEmail) {
    emailErrorMessage.innerText = "Please enter a valid email address.";
  } else {
    emailErrorMessage.innerText = "";
  }

  if (isValidName && isValidEmail) {
    dialog.showModal();
    nameErrorMessage.innerText = "";
    emailErrorMessage.innerText = "";
    removeAllItemsFromCart();
  }
}

function removeAllItemsFromCart() {
  localStorage.removeItem("cart");
  loadCartItems();
}
