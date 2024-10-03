import { Router } from "express";

import {
  fetchNowPlayingMovies,
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
  generateRenderedMovieItemsHTML,
} from "../../src/movies.js";
import {
  fetchMovieItemDetail,
  generateRenderedModalHTML,
} from "../../src/modal.js";

const router = Router();

router.get("/", async (_, res) => {
  const movies = await fetchNowPlayingMovies();
  const renderedHTML = generateRenderedMovieItemsHTML(
    movies.results,
    "nowPlaying"
  );

  res.send(renderedHTML);
});

router.get("/now-playing", async (_, res) => {
  const movies = await fetchNowPlayingMovies();
  const renderedHTML = generateRenderedMovieItemsHTML(
    movies.results,
    "nowPlaying"
  );

  res.send(renderedHTML);
});

router.get("/popular", async (_, res) => {
  const movies = await fetchPopularMovies();
  const renderedHTML = generateRenderedMovieItemsHTML(
    movies.results,
    "popular"
  );

  res.send(renderedHTML);
});

router.get("/top-rated", async (_, res) => {
  const movies = await fetchTopRatedMovies();
  const renderedHTML = generateRenderedMovieItemsHTML(
    movies.results,
    "topRated"
  );

  res.send(renderedHTML);
});

router.get("/upcoming", async (_, res) => {
  const movies = await fetchUpcomingMovies();
  const renderedHTML = generateRenderedMovieItemsHTML(
    movies.results,
    "upcoming"
  );

  res.send(renderedHTML);
});

router.get("/detail/:id", async (req, res) => {
  const id = req.params.id;
  const movieItems = await fetchNowPlayingMovies();
  const movieDetail = await fetchMovieItemDetail(id);

  const renderedHTML = generateRenderedModalHTML(
    movieItems.results,
    movieDetail
  );

  res.send(renderedHTML);
});

export default router;
