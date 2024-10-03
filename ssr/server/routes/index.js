import { Router } from "express";
import { fetchMovies } from "../api.js";
import { renderMovieItemPage } from "./render.js";
import { TMDB_MOVIE_LISTS } from "../constant.js";

const router = Router();

const handleMovieRoute = async (res, movieListUrl, currentTab) => {
  const movies = await fetchMovies(movieListUrl);
  const renderedHTML = renderMovieItemPage(movies.results, currentTab);
  res.send(renderedHTML);
};

router.get("/", (req, res) => handleMovieRoute(res, TMDB_MOVIE_LISTS.NOW_PLAYING, req.path));
router.get("/popular", (req, res) => handleMovieRoute(res, TMDB_MOVIE_LISTS.POPULAR, req.path));
router.get("/now-playing", (req, res) => handleMovieRoute(res, TMDB_MOVIE_LISTS.NOW_PLAYING, req.path));
router.get("/top-rated", (req, res) => handleMovieRoute(res, TMDB_MOVIE_LISTS.TOP_RATED, req.path));
router.get("/upcoming", (req, res) => handleMovieRoute(res, TMDB_MOVIE_LISTS.UPCOMING, req.path));

export default router;
