const movieVideoWrapper = document.querySelector(".movie__video--wrapper");
const movieImgWrapper = document.querySelector(".movie__image--wrapper");

window.addEventListener("DOMContentLoaded", () => {
  loadMovie();
});

async function loadMovie() {
  renderLoading();

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

function renderLoading() {
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

function renderMovie(movie) {
  const movieImageElem = document.createElement("img");
  movieImageElem.classList.add("movie__image");
  movieImageElem.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  movieImageElem.alt = movie.title;
  movieImgWrapper.innerHTML = "";
  movieImgWrapper.appendChild(movieImageElem);

  const movieDetailsElem = document.querySelector(".movie__details");

  const spokenLanguages = movie.spoken_languages;
  const infoItems = [
    movie.status,
    movie.release_date,
    movie.runtime ? `${movie.runtime} minutes` : null,
  ].filter(Boolean);

  const addToCartButton = document.createElement("button");
  addToCartButton.classList.add(
    "movie__add-to-cart-btn",
    "btn",
    "btn-dark",
    "focus-ring-dark",
  );
  addToCartButton.textContent = "Add to Cart";
  addToCartButton.addEventListener("click", () => {
    const cart = getCartFromLocalStorage();
    const existingMovieIndex = cart.findIndex((item) => item.id === movie.id);

    if (existingMovieIndex !== -1) {
      cart[existingMovieIndex].quantity += 1;
    } else {
      cart.push({
        id: movie.id,
        title: movie.title,
        quantity: 1,
        image: movie.poster_path,
      });
    }

    setCartToLocalStorage(cart);
    alert(`${movie.title} has been added to your cart!`);
  });

  movieDetailsElem.innerHTML = `
    <h1 class="text-center">${movie.title}</h1>

    ${
      spokenLanguages.length > 0
        ? `<div class="movie__languages flex flex-wrap justify-content-center">
            ${spokenLanguages
              .map(
                (language) =>
                  `<div class="movie__language">${language.english_name}</div>`,
              )
              .join("")}
          </div>`
        : ""
    }

    ${
      infoItems.length > 0
        ? `<div class="flex movie__info">
              ${infoItems
                .map((item) => `<span class="italic">${item}</span>`)
                .join("|")}
            </div>`
        : ""
    }
    
    <p>${movie.overview}</p>
  `;
  movieDetailsElem.appendChild(addToCartButton);
}

function renderMovieTrailer(videos) {
  const trailer = videos.find((video) => video.type === "Trailer");

  movieVideoWrapper.innerHTML = "";
  movieVideoWrapper.style.display = "none";
  if (trailer) {
    const iframeElem = document.createElement("iframe");
    iframeElem.classList.add("movie__video");
    iframeElem.setAttribute("allowfullscreen", "");
    iframeElem.setAttribute(
      "allow",
      `accelerometer;
              autoplay;
              clipboard-write;
              encrypted-media;
              gyroscope;
              picture-in-picture;
              web-share;`,
    );
    iframeElem.setAttribute("loading", "lazy");
    iframeElem.setAttribute("title", trailer.name);
    iframeElem.src =
      trailer.site === "YouTube"
        ? `https://www.youtube.com/embed/${trailer.key}`
        : `https://vimeo.com/embed/${trailer.key}`;

    movieVideoWrapper.appendChild(iframeElem);
    movieVideoWrapper.style.display = "block";
  }
}
