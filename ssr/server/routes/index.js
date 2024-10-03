import { Router } from "express";
import { fetchMovies } from "../api.js";
import { renderMovieItemPage } from "./render.js";
import { TMDB_MOVIE_LISTS } from "../constant.js";

const router = Router();

const handleMovieRoute = async (res, movieListUrl) => {
  const movies = await fetchMovies(movieListUrl);
  const renderedHTML = renderMovieItemPage(movies.results);
  res.send(renderedHTML);
};

// 라우팅
router.get("/", (req, res) => handleMovieRoute(res, TMDB_MOVIE_LISTS.NOW_PLAYING));
router.get("/popular", (req, res) => handleMovieRoute(res, TMDB_MOVIE_LISTS.POPULAR));
router.get("/now-playing", (req, res) => handleMovieRoute(res, TMDB_MOVIE_LISTS.NOW_PLAYING));
router.get("/top-rated", (req, res) => handleMovieRoute(res, TMDB_MOVIE_LISTS.TOP_RATED));
router.get("/upcoming", (req, res) => handleMovieRoute(res, TMDB_MOVIE_LISTS.UPCOMING));

export default router;
