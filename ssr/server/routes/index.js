import { Router } from "express";
import { renderMoviePage } from "../src/render/renderMoviePage.js";
import {
  fetchMoviesNowPlaying,
  fetchMoviesPopular,
  fetchMoviesTopRated,
  fetchMoviesUpcoming,
} from "../src/apis/movie.js";

const router = Router();

router.get("/", async (_, res) => {
  const movies = await fetchMoviesNowPlaying();
  const renderedHTML = renderMoviePage(movies);

  res.send(renderedHTML);
});

router.get("/now-playing", async (_, res) => {
  const movies = await fetchMoviesNowPlaying();
  const renderedHTML = renderMoviePage(movies);

  res.send(renderedHTML);
});

router.get("/popular", async (_, res) => {
  const movies = await fetchMoviesPopular();
  const renderedHTML = renderMoviePage(movies);

  res.send(renderedHTML);
});

router.get("/top-rated", async (_, res) => {
  const movies = await fetchMoviesTopRated();
  const renderedHTML = renderMoviePage(movies);

  res.send(renderedHTML);
});

router.get("/upcoming", async (_, res) => {
  const movies = await fetchMoviesUpcoming();
  const renderedHTML = renderMoviePage(movies);

  res.send(renderedHTML);
});

export default router;
