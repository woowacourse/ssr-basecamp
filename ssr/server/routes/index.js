import { Router } from 'express';
import { fetchMovieDetail, fetchMovies } from './src/apis/apis.js';
import { renderMoviePage } from './src/renderMoviePage.js';
import { TMDB_MOVIE_LISTS } from './src/constants/constant.js';
import { renderMovieModal } from './src/renderMovieModal.js';

const router = Router();

router.get('/', async (req, res) => {
  const movies = await fetchMovies(TMDB_MOVIE_LISTS.NOW_PLAYING);
  const moviesHTML = renderMoviePage(movies, '/now-playing');

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

router.get('/detail/:movieId', async (req, res) => {
  const movies = await fetchMovies(TMDB_MOVIE_LISTS.NOW_PLAYING);
  const movieDetail = await fetchMovieDetail(req.params.movieId);
  const moviesHTML = renderMovieModal(movies, movieDetail);

  res.send(moviesHTML);
});

export default router;
