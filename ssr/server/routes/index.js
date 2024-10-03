import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { fetchMovies, renderMovieItem, renderDetailModal } from './utils.js';
import {
  TMDB_BANNER_URL,
  TMDB_MOVIE_LISTS,
  TMDB_MOVIE_DETAIL_URL,
} from '../src/constant.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

router.get('/', async (_, res) => {
  const templatePath = path.join(__dirname, '../../views', 'index.html');

  const responseFetchMovies = await fetchMovies(TMDB_MOVIE_LISTS.NOW_PLAYING);
  const movieList = responseFetchMovies.results;

  const moviesHTML = renderMovieItem(movieList).join('');

  const template = fs.readFileSync(templatePath, 'utf-8');

  const renderedHTML = template
    .replace('<!--${MOVIE_ITEMS_PLACEHOLDER}-->', moviesHTML)
    .replace(
      '${background-container}',
      `${TMDB_BANNER_URL}${movieList[0].backdrop_path}`
    )
    .replace('${bestMovie.rate}', movieList[0].vote_average)
    .replace('${bestMovie.title}', movieList[0].title)
    .replace('${TAB_NOW_PLAYING}', 'selected');

  res.send(renderedHTML);
});

// 상영 중
router.get('/now-playing', async (_, res) => {
  const templatePath = path.join(__dirname, '../../views', 'index.html');

  const responseFetchMovies = await fetchMovies(TMDB_MOVIE_LISTS.NOW_PLAYING);
  const movieList = responseFetchMovies.results;

  const moviesHTML = renderMovieItem(movieList).join('');

  const template = fs.readFileSync(templatePath, 'utf-8');

  const renderedHTML = template
    .replace('<!--${MOVIE_ITEMS_PLACEHOLDER}-->', moviesHTML)
    .replace(
      '${background-container}',
      `${TMDB_BANNER_URL}${movieList[0].backdrop_path}`
    )
    .replace('${bestMovie.rate}', movieList[0].vote_average)
    .replace('${bestMovie.title}', movieList[0].title)
    .replace('${TAB_NOW_PLAYING}', 'selected');

  res.send(renderedHTML);
});

//인기순
router.get('/popular', async (_, res) => {
  const templatePath = path.join(__dirname, '../../views', 'index.html');

  const responseFetchMovies = await fetchMovies(TMDB_MOVIE_LISTS.POPULAR);
  const movieList = responseFetchMovies.results;

  const moviesHTML = renderMovieItem(movieList).join('');

  const template = fs.readFileSync(templatePath, 'utf-8');

  const renderedHTML = template
    .replace('<!--${MOVIE_ITEMS_PLACEHOLDER}-->', moviesHTML)
    .replace(
      '${background-container}',
      `${TMDB_BANNER_URL}${movieList[0].backdrop_path}`
    )
    .replace('${bestMovie.rate}', movieList[0].vote_average)
    .replace('${bestMovie.title}', movieList[0].title)
    .replace('${TAB_POPULAR}', 'selected');

  res.send(renderedHTML);
});

// 평점순
router.get('/top-rated', async (_, res) => {
  const templatePath = path.join(__dirname, '../../views', 'index.html');

  const responseFetchMovies = await fetchMovies(TMDB_MOVIE_LISTS.TOP_RATED);
  const movieList = responseFetchMovies.results;

  const moviesHTML = renderMovieItem(movieList).join('');

  const template = fs.readFileSync(templatePath, 'utf-8');

  const renderedHTML = template
    .replace('<!--${MOVIE_ITEMS_PLACEHOLDER}-->', moviesHTML)
    .replace(
      '${background-container}',
      `${TMDB_BANNER_URL}${movieList[0].backdrop_path}`
    )
    .replace('${bestMovie.rate}', movieList[0].vote_average)
    .replace('${bestMovie.title}', movieList[0].title)
    .replace('${TAB_TOP_RATED}', 'selected');

  res.send(renderedHTML);
});

// 상영 예정
router.get('/upcoming', async (_, res) => {
  const templatePath = path.join(__dirname, '../../views', 'index.html');

  const responseFetchMovies = await fetchMovies(TMDB_MOVIE_LISTS.UPCOMING);
  const movieList = responseFetchMovies.results;

  const moviesHTML = renderMovieItem(movieList).join('');

  const template = fs.readFileSync(templatePath, 'utf-8');

  const renderedHTML = template
    .replace('<!--${MOVIE_ITEMS_PLACEHOLDER}-->', moviesHTML)
    .replace(
      '${background-container}',
      `${TMDB_BANNER_URL}${movieList[0].backdrop_path}`
    )
    .replace('${bestMovie.rate}', movieList[0].vote_average)
    .replace('${bestMovie.title}', movieList[0].title)
    .replace('${TAB_UPCOMING}', 'selected');

  res.send(renderedHTML);
});

router.get('/detail/:id', async (req, res) => {
  const templatePath = path.join(__dirname, '../../views', 'index.html');
  const movieId = req.params.id;

  const responseFetchMovies = await fetchMovies(TMDB_MOVIE_LISTS.NOW_PLAYING);
  const movieList = responseFetchMovies.results;

  const moviesHTML = renderMovieItem(movieList).join('');

  const movieDetail = await fetchMovies(
    `${TMDB_MOVIE_DETAIL_URL}/${movieId}?language=ko-KR`
  );

  const template = fs.readFileSync(templatePath, 'utf-8');

  const renderedHTML = template
    .replace('<!--${MOVIE_ITEMS_PLACEHOLDER}-->', moviesHTML)
    .replace(
      '${background-container}',
      `${TMDB_BANNER_URL}${movieList[0].backdrop_path}`
    )
    .replace('${bestMovie.rate}', movieList[0].vote_average)
    .replace('${bestMovie.title}', movieList[0].title)
    .replace('${TAB_NOW_PLAYING}', 'selected')
    .replace('<!--${MODAL_AREA}-->', renderDetailModal(movieDetail));

  res.send(renderedHTML);
});

export default router;
