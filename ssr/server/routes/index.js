import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

import { renderHeader } from './renderHeader.js';
import { renderMovieItem } from './renderMovieItem.js';
import { getMovies, getMovieDetail } from '../apis/movie.js';
import {
  TMDB_MOVIE_LISTS,
  TMDB_MOVIE_DETAIL_URL,
  TMDB_THUMBNAIL_URL,
  TMDB_BANNER_URL,
} from '../constant.js';
import { renderMovieModal } from './renderMovieModal.js';

function createMoviePage(movies, activeTab) {
  const templatePath = path.join(__dirname, '../../views', 'index.html');
  const template = fs.readFileSync(templatePath, 'utf-8');

  const headerHTML = renderHeader(
    TMDB_BANNER_URL + movies[0].backdrop_path,
    movies[0].title,
    movies[0].vote_average
  );

  const moviesHTML = movies
    .map((movie) =>
      renderMovieItem(
        movie.id,
        movie.title,
        TMDB_THUMBNAIL_URL + movie.poster_path,
        movie.vote_average
      )
    )
    .join('');

  if (activeTab === '')
    return template
      .replace('<!--${HEADER}-->', headerHTML)
      .replace('<!--${MOVIE_ITEMS_PLACEHOLDER}-->', moviesHTML);

  return template
    .replace('<!--${HEADER}-->', headerHTML)
    .replace('<!--${MOVIE_ITEMS_PLACEHOLDER}-->', moviesHTML)
    .replace(activeTab, 'selected');
}

router.get('/', async (_, res) => {
  const movies = await getMovies(TMDB_MOVIE_LISTS.nowPlaying);
  const renderedHTML = createMoviePage(movies, '<!--${NOW_PLAYING_ACTIVE}-->');

  res.send(renderedHTML);
});

router.get('/now-playing', async (_, res) => {
  const movies = await getMovies(TMDB_MOVIE_LISTS.nowPlaying);
  const renderedHTML = createMoviePage(movies, '<!--${NOW_PLAYING_ACTIVE}-->');

  res.send(renderedHTML);
});

router.get('/popular', async (_, res) => {
  const movies = await getMovies(TMDB_MOVIE_LISTS.popular);
  const renderedHTML = createMoviePage(movies, '<!--${POPULAR_ACTIVE}-->');

  res.send(renderedHTML);
});

router.get('/top-rated', async (_, res) => {
  const movies = await getMovies(TMDB_MOVIE_LISTS.topRated);
  const renderedHTML = createMoviePage(movies, '<!--${TOP_RATED_ACTIVE}-->');

  res.send(renderedHTML);
});

router.get('/upcoming', async (_, res) => {
  const movies = await getMovies(TMDB_MOVIE_LISTS.upcoming);
  const renderedHTML = createMoviePage(movies, '<!--${UPCOMING_ACTIVE}-->');

  res.send(renderedHTML);
});

router.get('/detail/:movieId', async (req, res) => {
  const movies = await getMovies(TMDB_MOVIE_LISTS.nowPlaying);
  const movieDetail = await getMovieDetail(
    TMDB_MOVIE_DETAIL_URL + req.params.movieId + '?language=ko-KR'
  );

  const modalHTML = renderMovieModal(
    movieDetail.title,
    TMDB_THUMBNAIL_URL + movieDetail.poster_path,
    movieDetail.release_date.split('-')[0],
    movieDetail.genres.map((genre) => genre.name),
    movieDetail.vote_average,
    movieDetail.overview
  );

  const renderedHTML = createMoviePage(movies, '<!--${NOW_PLAYING_ACTIVE}-->').replace(
    '<!--${MODAL_AREA}-->',
    modalHTML
  );

  res.send(renderedHTML);
});

export default router;
