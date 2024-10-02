import { FETCH_OPTIONS, TMDB_MOVIE_LISTS } from "../Constant";

export const fetchMovies = async () => {
  const response = await fetch(TMDB_MOVIE_LISTS.popular, FETCH_OPTIONS);

  console.log("response", response);
  return await response.json();
};
