import { FETCH_OPTIONS, TMDB_MOVIE_LISTS } from "./Constant";

export async function fetchMovieItems() {
  const mockServer = "http://localhost:3660/popular";

  const response = await fetch(mockServer, FETCH_OPTIONS);
  // const response = await fetch(TMDB_MOVIE_LISTS.popular, FETCH_OPTIONS);
  const data = await response.json();
  const results = data?.results ?? [];

  return results;
}
