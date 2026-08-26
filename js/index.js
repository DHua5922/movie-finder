const movieSearchInput = document.querySelector(".header__movie-search-input");
const moviesWrapper = document.querySelector(".carousel");

const moviePageForm = document.querySelector(".movies__pagination-form");
const moviePageInput = document.querySelector(".movies__pagination-input");

let maxPages = 1;
let movies = null;

window.addEventListener("DOMContentLoaded", () => {
  loadTrendingMovies();
});

async function loadTrendingMovies() {
  renderLoading();
  try {
    const list = await getTrendingMoviesApi();
    renderMovies(list);
  } catch (err) {}
}

function renderLoading() {
  const movieSkeletons = Array.from({ length: 8 }, () => {
    const skeleton = document.createElement("li");
    skeleton.classList.add("movie-card");
    skeleton.innerHTML = `
      <div class="skeleton movie-card__skeleton"></div>
    `;
    return skeleton;
  });

  moviesWrapper.innerHTML = movieSkeletons
    .map((skeleton) => skeleton.outerHTML)
    .join("");
}

function renderMovies(list) {
  moviesWrapper.innerHTML = "";
  list.forEach((movie) => {
    const containerElem = document.createElement("li");
    containerElem.classList.add("carousel-item", "movie-card", "relative");

    const linkElem = document.createElement("a");
    linkElem.classList.add("movie-card__link", "focus-ring-light");
    linkElem.href = `movie.html?id=${movie.id}`;
    linkElem.style.backgroundImage = `url('https://image.tmdb.org/t/p/w500/${movie.backdrop_path}')`;
    linkElem.innerHTML = `<h3 class="text-dark movie-card__title movie-card__title--light">${movie.title}</h3>`;

    containerElem.appendChild(linkElem);
    moviesWrapper.appendChild(containerElem);
  });
}
