import { Router } from "express";
import { fetchMovies, fetchMovieDetails } from "../api/movies.js";
import { renderMoviePage } from "../services/renderMoviePage.js";
import { TMDB_MOVIE_LISTS } from "../api/url.js";

const router = Router();

export const renderMovieListPage = async (listType, res) => {
  const moviesData = await fetchMovies(listType);
  const movieListHTML = renderMoviePage(moviesData);

  res.send(movieListHTML);
};

router.get("/", async (req, res) => {
  renderMovieListPage(TMDB_MOVIE_LISTS.POPULAR, res);
});

router.get("/now-playing", (req, res) => {
  renderMovieListPage(TMDB_MOVIE_LISTS.NOW_PLAYING, res);
});

router.get("/popular", (req, res) => {
  renderMovieListPage(TMDB_MOVIE_LISTS.POPULAR, res);
});

router.get("/top-rated", (req, res) => {
  renderMovieListPage(TMDB_MOVIE_LISTS.TOP_RATED, res);
});

router.get("/upcoming", (req, res) => {
  renderMovieListPage(TMDB_MOVIE_LISTS.UPCOMING, res);
});

export default router;
