import { Router } from "express";

import {
  fetchNowPlayingMovies,
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
  generateRenderedHTML,
} from "../../src/movies.js";

const router = Router();

router.get("/", async (_, res) => {
  const movies = await fetchNowPlayingMovies();
  const renderedHTML = generateRenderedHTML(movies.results, "nowPlaying");

  res.send(renderedHTML);
});

router.get("/now-playing", async (_, res) => {
  const movies = await fetchNowPlayingMovies();
  const renderedHTML = generateRenderedHTML(movies.results, "nowPlaying");

  res.send(renderedHTML);
});

router.get("/popular", async (_, res) => {
  const movies = await fetchPopularMovies();
  const renderedHTML = generateRenderedHTML(movies.results, "popular");

  res.send(renderedHTML);
});

router.get("/top-rated", async (_, res) => {
  const movies = await fetchTopRatedMovies();
  const renderedHTML = generateRenderedHTML(movies.results, "topRated");

  res.send(renderedHTML);
});

router.get("/upcoming", async (_, res) => {
  const movies = await fetchUpcomingMovies();
  const renderedHTML = generateRenderedHTML(movies.results, "upcoming");

  res.send(renderedHTML);
});

export default router;
