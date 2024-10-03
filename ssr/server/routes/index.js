import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

let currentMovieType = '';

export const BASE_URL = 'https://api.themoviedb.org/3/movie';

export const TMDB_THUMBNAIL_URL = 'https://media.themoviedb.org/t/p/w440_and_h660_face/';
export const TMDB_ORIGINAL_URL = 'https://image.tmdb.org/t/p/original/';
export const TMDB_BANNER_URL = 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/';
export const TMDB_MOVIE_LISTS = {
  popular: BASE_URL + '/popular?language=ko-KR&page=1',
  nowPlaying: BASE_URL + '/now_playing?language=ko-KR&page=1',
  topRated: BASE_URL + '/top_rated?language=ko-KR&page=1',
  upcoming: BASE_URL + '/upcoming?language=ko-KR&page=1',
};

const fetchMovieList = async (type) => {
  const response = await fetch(TMDB_MOVIE_LISTS[type || 'nowPlaying'], {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
    },
  });

  return await response.json();
};

const generateMovieHTML = (movie) => `
  <div class="item" data-movie-type="${currentMovieType}" data-movie-id="${movie.id}">
    <img class="thumbnail" src="${TMDB_THUMBNAIL_URL}${movie.poster_path}" alt="${movie.title}">
    <div class="item-desc">
      <p class="rate">
        <img class="star" src="/assets/images/star_empty.png"/>
        <span>${movie.vote_average.toFixed(1)}</span>
        <div>
          <span>${movie.title}</span>
        </div>
      </p>
    </div>
  </div>
`;

const generateMoviesSection = (movieList) => `
  <section class="movie-section">
    <ul class="thumbnail-list">
      ${movieList.map(generateMovieHTML).join('')}
    </ul>
  </section>
`;

const generateModal = (movie) => `
  <div class="modal-background active" id="modalBackground">
    <div class="modal">
      <button class="close-modal" id="closeModal">
        <img src="/assets/images/modal_button_close.png">
      </button>
      <div class="modal-container">
        <div class="modal-image">
          <img src="${TMDB_THUMBNAIL_URL}${movie.poster_path}" alt="${movie.title}">
        </div>
        <div class="modal-description">
          <h2>${movie.title}</h2>
          <p class="category">${movie.genres.map(({ name }) => name).join(', ')}</p>
          <p class="rate">
            <img src="/assets/images/star_empty.png" class="star">
            <span>8.7</span>
          </p>
          <hr>
          <p class="detail">
            ${movie.overview}
          </p>
        </div>
      </div>
    </div>
  </div>
`;
const renderHTML = (movies) => {
  const templatePath = path.join(__dirname, '../../views', 'index.html');

  const moviesHTML = generateMoviesSection(movies.results);

  const template = fs.readFileSync(templatePath, 'utf-8');

  return template
    .replace('<!--${MOVIE_ITEMS_PLACEHOLDER}-->', moviesHTML)
    .replace('${bestMovie.title}', movies.results[0].title)
    .replace('${bestMovie.rate}', movies.results[0].vote_average.toFixed(1))
    .replace('${background-container}', `${TMDB_BANNER_URL}/${movies.results[0].backdrop_path}`);
};

router.get('/', async (_, res) => {
  currentMovieType = 'nowPlaying';
  const movies = await fetchMovieList();

  res.send(renderHTML(movies));
});

router.get('/now-playing', async (_, res) => {
  currentMovieType = 'nowPlaying';
  const movies = await fetchMovieList('nowPlaying');

  res.send(renderHTML(movies));
});

router.get('/popular', async (_, res) => {
  currentMovieType = 'popular';
  const movies = await fetchMovieList('popular');

  res.send(renderHTML(movies));
});

router.get('/top-rated', async (_, res) => {
  currentMovieType = 'topRated';
  const movies = await fetchMovieList('topRated');

  res.send(renderHTML(movies));
});

router.get('/upcoming', async (_, res) => {
  currentMovieType = 'upcoming';
  const movies = await fetchMovieList('upcoming');

  res.send(renderHTML(movies));
});

const fetchMovieItem = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}?language=ko-KR`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
    },
  });

  return await response.json();
};

router.get('/detail/:id', async (req, res) => {
  const movieItem = await fetchMovieItem(req.params.id);

  const movies = await fetchMovieList(req.query.movieType);

  const html = renderHTML(movies).replace('<!--${MODAL_AREA}-->', generateModal(movieItem));

  res.send(html);
});

export default router;
