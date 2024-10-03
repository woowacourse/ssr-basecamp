import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { fetchMovieDetail, fetchMovies } from '../../src/api/movie.js';
import { renderMovieItemPage } from '../../src/templates/renderMovieItemPage.js';
import { TMDB_MOVIE_LISTS } from '../../src/constants/constant.js';
import { renderModal } from '../../src/templates/renderModal.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

router.get('/', async (_, res) => {
  try {
    const movies = await fetchMovies(TMDB_MOVIE_LISTS.POPULAR); // Fetch movie data from API

    const templatePath = path.join(__dirname, '../../views', 'index.html');
    const template = fs.readFileSync(templatePath, 'utf-8');

    const renderedHTML = renderMovieItemPage(movies);

    res.send(renderedHTML);
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).send('Error rendering the page');
  }
});

router.get('/now-playing', async (_, res) => {
  try {
    const movies = await fetchMovies(TMDB_MOVIE_LISTS.NOW_PLAYING);

    const templatePath = path.join(__dirname, '../../views', 'index.html');
    const template = fs.readFileSync(templatePath, 'utf-8');

    const renderedHTML = renderMovieItemPage(movies);

    res.send(renderedHTML);
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).send('Error rendering the page');
  }
});

router.get('/popular', async (_, res) => {
  try {
    const movies = await fetchMovies(TMDB_MOVIE_LISTS.POPULAR);

    const templatePath = path.join(__dirname, '../../views', 'index.html');
    const template = fs.readFileSync(templatePath, 'utf-8');

    const renderedHTML = renderMovieItemPage(movies);

    res.send(renderedHTML);
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).send('Error rendering the page');
  }
});

router.get('/top-rated', async (_, res) => {
  try {
    const movies = await fetchMovies(TMDB_MOVIE_LISTS.TOP_RATED);

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const templatePath = path.join(__dirname, '../../views', 'index.html');
    const template = fs.readFileSync(templatePath, 'utf-8');

    const renderedHTML = renderMovieItemPage(movies);

    res.send(renderedHTML);
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).send('Error rendering the page');
  }
});

router.get('/upcoming', async (_, res) => {
  try {
    const movies = await fetchMovies(TMDB_MOVIE_LISTS.UPCOMING);

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const templatePath = path.join(__dirname, '../../views', 'index.html');
    const template = fs.readFileSync(templatePath, 'utf-8');

    const renderedHTML = renderMovieItemPage(movies);

    res.send(renderedHTML);
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).send('Error rendering the page');
  }
});

router.get('/detail/:id', async (req, res) => {
  try {
    const movieId = req.params.id;
    const moviesData = await fetchMovies(TMDB_MOVIE_LISTS.NOW_PLAYING);
    const movieDetail = await fetchMovieDetail(movieId);
    const modalHTML = renderModal(movieDetail, moviesData);

    res.send(modalHTML);
  } catch (error) {
    console.error('Error fetching movie details:', error);
    res.status(500).send('Error fetching movie details');
  }
});

export default router;
