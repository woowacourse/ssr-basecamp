import { Router } from "express";
import { loadMovieDetail, loadNowPlaying, loadPopular, loadTopRated, loadUpcoming } from "../api/loadMovies.js";
import { renderMovieDetailPage } from "../entities/movieDetail.js";
import { renderMoviePage } from "../entities/movies.js";

const router = Router();

const sendMoviePage = (movies) => async (_, res) => {
  const renderedHTML = renderMoviePage(movies);
  res.send(renderedHTML);
};

const sendMovieDetailPage = async (req, res) => {
  const id = req.params.id;
  const movies = await loadNowPlaying();
  const movieDetail = await loadMovieDetail(id);
  console.log(movieDetail);
  const renderedHTML = renderMovieDetailPage(movies, movieDetail);
  res.send(renderedHTML);
};

router.get("/now-playing", sendMoviePage(await loadNowPlaying()));
router.get("/popular", sendMoviePage(await loadPopular()));
router.get("/top-rated", sendMoviePage(await loadTopRated()));
router.get("/upcoming", sendMoviePage(await loadUpcoming()));
router.get("/detail/:id", sendMovieDetailPage);

export default router;
