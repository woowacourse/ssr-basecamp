import { Router } from 'express';
import { fetchMovies } from './src/apis/apis.js';
import { renderMoviePage } from './src/renderMoviePage.js';
import { TMDB_MOVIE_LISTS } from './src/constants/constant.js';

const router = Router();

router.get('/', async (req, res) => {
  const movies = await fetchMovies(TMDB_MOVIE_LISTS.NOW_PLAYING);
  const moviesHTML = renderMoviePage(movies, req.path);

  res.send(moviesHTML);
});

router.get('/now-playing', async (req, res) => {
  const movies = await fetchMovies(TMDB_MOVIE_LISTS.NOW_PLAYING);
  const moviesHTML = renderMoviePage(movies, req.path);

  res.send(moviesHTML);
});

router.get('/popular', async (req, res) => {
  const movies = await fetchMovies(TMDB_MOVIE_LISTS.POPULAR);
  const moviesHTML = renderMoviePage(movies, req.path);

  res.send(moviesHTML);
});

router.get('/top-rated', async (req, res) => {
  const movies = await fetchMovies(TMDB_MOVIE_LISTS.TOP_RATED);
  const moviesHTML = renderMoviePage(movies, req.path);

  res.send(moviesHTML);
});

router.get('/upcoming', async (req, res) => {
  const movies = await fetchMovies(TMDB_MOVIE_LISTS.UPCOMING);
  const moviesHTML = renderMoviePage(movies, req.path);

  res.send(moviesHTML);
});

export default router;
