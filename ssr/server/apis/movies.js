import { FETCH_OPTIONS, TMDB_MOVIE_LISTS } from '../constants/movies.js';

const loadMovies = async (url) => {
  const response = await fetch(url, FETCH_OPTIONS);
  const data = await response.json();

  return data.results;
};

const loadPopularMovies = async () => await loadMovies(TMDB_MOVIE_LISTS.popular);
const loadNowPlayingMovies = async () => await loadMovies(TMDB_MOVIE_LISTS.nowPlaying);
const loadTopRatedMovies = async () => await loadMovies(TMDB_MOVIE_LISTS.topRated);
const loadUpcomingMovies = async () => await loadMovies(TMDB_MOVIE_LISTS.upcoming);

export { loadPopularMovies, loadNowPlayingMovies, loadTopRatedMovies, loadUpcomingMovies };
