window.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".back-link")?.addEventListener("click", () => {
    window.history.back();
  });

  document
    .querySelector(".nav__expand-mobile-links-button")
    ?.addEventListener("click", () => {
      document
        .querySelector(".nav__links--mobile-wrapper")
        .classList.toggle("expanded");
    });
});
