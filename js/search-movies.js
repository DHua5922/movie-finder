const moviesWrapper = document.querySelector(".movies__list");
const movieSearchInput = document.querySelector(".header__movie-search-input");

const moviePageForm = document.querySelector(".movies__pagination-form");
const moviePageInput = document.querySelector(".movies__pagination-input");

let maxPages = 1;
let movies = null;

window.addEventListener("DOMContentLoaded", () => {
  const filterSelect = document.querySelector(".movies__select");
  filterSelect.addEventListener("change", filterMovies);

  const form = document.querySelector(".header__movie-search-form");
  form.addEventListener("submit", searchForMovies);

  moviePageForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const page = Number(moviePageInput.value);

    renderLoading();
    const data = await searchMoviesApi(movieSearchInput.value, page);
    movies = data.results;
    renderMovies();
  });
  moviePageInput.addEventListener("input", (event) => {
    const newPageNum = Number(event.target.value);
    event.target.value = Math.max(1, Math.min(maxPages, newPageNum));
  });
});

async function searchForMovies(event) {
  event.preventDefault();

  renderLoading();
  const data = await searchMoviesApi(movieSearchInput.value);
  movies = data.results;
  maxPages = data.total_pages;
  renderMovies();

  document.querySelector(".movies__results--label").innerText =
    `Search Results: ${data.total_results} movies found`;

  moviePageForm.style.display = "flex";
  moviePageInput.value = 1;
  document.querySelector(".movies__total-pages").textContent = maxPages;
}

function filterMovies(event) {
  const filter = event.target.value;

  if (filter === "alphabetical") {
    movies.sort((a, b) => a.title.localeCompare(b.title));
  } else if (filter === "reverse-alphabetical") {
    movies.sort((a, b) => b.title.localeCompare(a.title));
  } else if (filter === "newest") {
    movies.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
  } else if (filter === "oldest") {
    movies.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
  }

  renderMovies();
}

function renderLoading() {
  const movieSkeletons = Array.from({ length: 8 }, () => {
    const skeleton = document.createElement("div");
    skeleton.classList.add("movie__wrapper");
    skeleton.innerHTML = `
      <div class="skeleton movie-image-skeleton"></div>
    `;
    return skeleton;
  });

  moviesWrapper.innerHTML = movieSkeletons
    .map((skeleton) => skeleton.outerHTML)
    .join("");
}

function renderMovies() {
  moviesWrapper.innerHTML = "";
  movies.forEach((movie) => {
    const containerElem = document.createElement("li");
    containerElem.classList.add("movie__wrapper");

    const linkElem = document.createElement("a");
    linkElem.classList.add("movie__img-link", "focus-ring-dark");
    linkElem.style.backgroundImage = `url('https://image.tmdb.org/t/p/w500/${movie.backdrop_path}')`;
    linkElem.innerHTML = `<h3 class="text-dark movie__title">${movie.title}</h3>`;
    linkElem.href = `movie.html?id=${movie.id}`;

    containerElem.appendChild(linkElem);
    moviesWrapper.appendChild(containerElem);
  });
}
