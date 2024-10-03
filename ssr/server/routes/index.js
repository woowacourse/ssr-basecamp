import { Router } from "express";
import { fetchMovieDetail, fetchMovies } from "../api.js";
import { renderMovieItemModal, renderMovieItemPage } from "./render.js";
import { TMDB_MOVIE_LISTS } from "../constant.js";

const router = Router();

const handleMovieRoute = async (res, movieListUrl, currentTab) => {
  const movies = await fetchMovies(movieListUrl);
  const renderedHTML = renderMovieItemPage(movies.results, currentTab);
  res.send(renderedHTML);
};

const handleDetailMovieRoute = async (req, res) => {
  const movieId = req.params.id;
  const movies = await fetchMovies(TMDB_MOVIE_LISTS.NOW_PLAYING);
  const movieDetail = await fetchMovieDetail(movieId);
  const renderedHTML = renderMovieItemModal(movies.results, movieDetail);
  res.send(renderedHTML);
};

router.get("/", (req, res) => handleMovieRoute(res, TMDB_MOVIE_LISTS.NOW_PLAYING, req.path));
router.get("/popular", (req, res) => handleMovieRoute(res, TMDB_MOVIE_LISTS.POPULAR, req.path));
router.get("/now-playing", (req, res) => handleMovieRoute(res, TMDB_MOVIE_LISTS.NOW_PLAYING, req.path));
router.get("/top-rated", (req, res) => handleMovieRoute(res, TMDB_MOVIE_LISTS.TOP_RATED, req.path));
router.get("/upcoming", (req, res) => handleMovieRoute(res, TMDB_MOVIE_LISTS.UPCOMING, req.path));
router.get("/detail/:id", handleDetailMovieRoute);

export default router;
