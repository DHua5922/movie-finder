const apiBaseUrl = "https://api.themoviedb.org";
const publicApiKey = "e1dc213ccbcaa6eadb77075160fe39dd";

async function searchMoviesApi(queryValue, page = 1) {
  const response = await fetch(
    `${apiBaseUrl}/3/search/movie?api_key=${publicApiKey}&language=en-US&query=${queryValue}&page=${page}`,
  );
  return response.json();
}
