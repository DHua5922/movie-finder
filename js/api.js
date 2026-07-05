const apiBaseUrl = "https://api.themoviedb.org";
const publicApiKey = "e1dc213ccbcaa6eadb77075160fe39dd";

async function getTrendingMoviesApi() {
  const response = await fetch(
    `${apiBaseUrl}/3/trending/movie/week?api_key=${publicApiKey}&language=en-US`,
  );
  const data = await response.json();
  return data.results;
}

async function searchMoviesApi(queryValue, page = 1) {
  const response = await fetch(
    `${apiBaseUrl}/3/search/movie?api_key=${publicApiKey}&language=en-US&query=${queryValue}&page=${page}`,
  );
  return response.json();
}

async function getMovieDetailsApi(movieId) {
  const response = await fetch(
    `${apiBaseUrl}/3/movie/${movieId}?api_key=${publicApiKey}&language=en-US`,
  );
  return response.json();
}

async function getMovieVideosApi(movieId) {
  const response = await fetch(
    `${apiBaseUrl}/3/movie/${movieId}/videos?api_key=${publicApiKey}`,
  );
  const data = await response.json();
  return data.results;
}
