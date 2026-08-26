window.addEventListener("DOMContentLoaded", () => {
  loadMovie();
});

async function loadMovie() {
  renderSkeleton();

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const movieId = urlParams.get("id");

  const [movie, videos] = await Promise.all([
    getMovieDetailsApi(movieId),
    getMovieVideosApi(movieId),
  ]);
  renderMovie(movie);
  renderMovieTrailer(videos);
}

function renderSkeleton() {
  const movieDetailsElem = document.querySelector(".movie__details");
  movieDetailsElem.innerHTML = `
    <div class="skeleton movie-page__title-skeleton"></div>
    <div class="skeleton movie-page__languages-skeleton"></div>
    <div class="skeleton movie-page__info-skeleton"></div>
    <div class="skeleton movie-page__overview-skeleton"></div>
  `;

  movieImgWrapper.innerHTML = `<div class="skeleton movie-page__img-skeleton"></div>`;
  movieVideoWrapper.innerHTML = `<div class="skeleton movie-page__video-skeleton"></div>`;
}
