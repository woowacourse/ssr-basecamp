import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

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

const fetchMovieList = async (url) => {
  const response = await fetch(TMDB_MOVIE_LISTS.nowPlaying, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
    },
  });

  return await response.json();
};

const generateMovieHTML = (movie) => `
  <div class="item">
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

router.get('/', async (_, res) => {
  const templatePath = path.join(__dirname, '../../views', 'index.html');

  const movies = await fetchMovieList();

  const moviesHTML = generateMoviesSection(movies.results);

  const template = fs.readFileSync(templatePath, 'utf-8');
  let renderedHTML = template.replace('<!--${MOVIE_ITEMS_PLACEHOLDER}-->', moviesHTML);

  renderedHTML = renderedHTML.replace('${bestMovie.title}', movies.results[0].title);
  renderedHTML = renderedHTML.replace(
    '${bestMovie.rate}',
    movies.results[0].vote_average.toFixed(1)
  );
  renderedHTML = renderedHTML.replace(
    '${background-container}',
    `${TMDB_BANNER_URL}/${movies.results[0].backdrop_path}`
  );

  res.send(renderedHTML);
});

export default router;
