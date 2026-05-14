const publicApiKey = "e1dc213ccbcaa6eadb77075160fe39dd";

const apiBaseUrl = "https://api.themoviedb.org";
const imagePathBaseUrl = "https://image.tmdb.org/t/p";

const movieSearchInput = document.querySelector(".header__input");
const moviesWrapper = document.querySelector(".movies__list");

let movies = null;

async function getMoviesHtml(filter) {
  if (!movies) {
    const response = await fetch(
      `${apiBaseUrl}/3/search/movie?api_key=${publicApiKey}&language=en-US&query=${movieSearchInput.value}&page=1`,
    );
    const data = await response.json();
    movies = data.results.slice(0, 6);
  }

  if (filter === "alphabetical") {
    movies.sort((a, b) => a.title.localeCompare(b.title));
  } else if (filter === "reverse-alphabetical") {
    movies.sort((a, b) => b.title.localeCompare(a.title));
  } else if (filter === "newest") {
    movies.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
  } else if (filter === "oldest") {
    movies.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
  }

  moviesWrapper.innerHTML = movies
    .map(
      (movie) => `
        <div class="movie__wrapper">
            <div class="movie__container">
                <figure>
                    <img class="movie__img" src="${imagePathBaseUrl}/w500/${movie.poster_path}" alt="${movie.title} poster" />
                </figure>
                <h3 class="text-primary movie__title">${movie.title}</h3>
            </div>
        </div>
    `,
    )
    .join("");
}

function searchAndRenderMovies(event) {
  event.preventDefault();
  getMoviesHtml("");
}

function filterMovies(event) {
  getMoviesHtml(event.target.value);
}
