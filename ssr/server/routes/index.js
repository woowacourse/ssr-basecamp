import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import fetchMovies from '../api/movies.js';
import {
  getBannerHTML,
  getModalHTML,
  getMoviesHTML,
  getTabsHTML,
} from '../templates/movie.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

const placeholders = {
  banner: '<!-- ${BANNER_PLACEHOLDER} -->',
  movies: '<!-- ${MOVIE_ITEMS_PLACEHOLDER} -->',
  modal: '<!-- ${MODAL_AREA} -->',
  tabs: '<!-- ${TABS_PLACEHOLDER} -->',
};

const renderMoviePage = async ({
  res,
  category = 'nowPlaying',
  movieId = null,
}) => {
  const templatePath = path.join(__dirname, '../../views', 'index.html');

  const movies = await fetchMovies[category]();
  const movieDetail = movieId ? await fetchMovies.detail(movieId) : null;

  const bannerHTML = await getBannerHTML(movies.results[0]);
  const tabsHTML = getTabsHTML(category);
  const moviesHTML = await getMoviesHTML(movies);
  const modalHTML = movieDetail ? await getModalHTML(movieDetail) : '';

  const template = fs.readFileSync(templatePath, 'utf-8');

  const renderedHTML = template
    .replace(placeholders.banner, bannerHTML)
    .replace(placeholders.tabs, tabsHTML)
    .replace(placeholders.movies, moviesHTML)
    .replace(placeholders.modal, modalHTML);

  res.send(renderedHTML);
};

router.get('/', async (_, res) => {
  await renderMoviePage({ res });
});

router.get('/now-playing', async (_, res) => {
  await renderMoviePage({ category: 'nowPlaying', res });
});

router.get('/popular', async (_, res) => {
  await renderMoviePage({ category: 'popular', res });
});

router.get('/upcoming', async (_, res) => {
  await renderMoviePage({ category: 'upcoming', res });
});

router.get('/top-rated', async (_, res) => {
  await renderMoviePage({ category: 'topRated', res });
});

router.get('/detail/:id', async (req, res) => {
  const { id } = req.params;
  await renderMoviePage({ res, movieId: id });
});

export default router;
