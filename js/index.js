const movieSearchInput = document.querySelector(".header__movie-search-input");

const moviePageForm = document.querySelector(".movies__pagination-form");
const moviePageInput = document.querySelector(".movies__pagination-input");

let maxPages = 1;
let movies = null;

window.addEventListener("DOMContentLoaded", () => {
  loadTrendingMovies();
});

async function loadTrendingMovies() {
  // renderLoading();
  try {
    const list = await getTrendingMoviesApi();
    renderMovies(list);
  } catch (err) {}
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

function renderMovies(list) {
  const moviesWrapper = document.querySelector(".carousel");

  moviesWrapper.innerHTML = "";
  list.forEach((movie) => {
    const containerElem = document.createElement("a");
    containerElem.classList.add("carousel-item", "relative");
    containerElem.style.backgroundImage = `url('https://image.tmdb.org/t/p/w500/${movie.backdrop_path}')`;
    containerElem.href = `movie.html?id=${movie.id}`;
    containerElem.innerHTML = `<h3 class="text-dark movie__title">${movie.title}</h3>`;
    moviesWrapper.appendChild(containerElem);
  });
}
