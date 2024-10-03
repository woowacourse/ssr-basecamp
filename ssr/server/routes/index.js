import { Router } from "express";
import { fetchMovies, fetchMovieDetails } from "../api/movies.js";
import { renderMoviePage } from "../services/renderMoviePage.js";
import { TMDB_MOVIE_LISTS } from "../api/url.js";
import { renderModal } from "../services/renderModal.js";

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

router.get("/detail/:movieId", async (req, res) => {
  const movieId = req.params.movieId;
  const moviesData = await fetchMovies(TMDB_MOVIE_LISTS.NOW_PLAYING);
  const movieDetailItem = await fetchMovieDetails(movieId);

  const renderedHTML = renderModal(moviesData, movieDetailItem);
  res.send(renderedHTML);
});

export default router;
