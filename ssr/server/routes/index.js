import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import fetchMovies from '../movies.js';
import { TMDB_BANNER_URL, TMDB_THUMBNAIL_URL } from '../constants.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

const getBannerHTML = async () => {
  const topRatedMovies = await fetchMovies.topRated();
  const {
    vote_average: rate,
    title,
    backdrop_path: backdropPath,
  } = topRatedMovies.results[0];

  return /*html*/ `
    <header>
      <div
      class="background-container"
      style="background-image: url('${TMDB_BANNER_URL + backdropPath}')"
    >
      <div class="overlay" aria-hidden="true"></div>
      <div class="top-rated-container">
        <h1 class="logo">
          <img src="../assets/images/logo.png" alt="MovieList" />
        </h1>
        <div class="top-rated-movie">
          <div class="rate">
            <img src="../assets/images/star_empty.png" class="star" />
            <span class="rate-value">${rate.toFixed(1)}</span>
          </div>
          <div class="title">${title}</div>
          <button class="primary detail">자세히 보기</button>
        </div>
      </div>
    </div>
    </header>
    `;
};

const getMoviesHTML = async (category) => {
  const movies = await fetchMovies[category]();
  return /*html*/ `
    ${movies.results
      .map(
        ({
          id,
          title,
          vote_average: rate,
          poster_path: thumbnailPath,
        }) => /*html*/ `
        <li>
          <a href="/detail/${id}">
            <div class="item">
              <img class="thumbnail" src=${
                TMDB_THUMBNAIL_URL + '/' + thumbnailPath
              } alt=${title} />
              <div class="item-desc">
                <p class="rate">
                  <img src="../assets/images/star_empty.png" class="star" />
                  <span>${rate.toFixed(1)}</span>
                </p>
                <strong>${title}</strong>
              </div>
            </div>
          </a>
        </li>  
      `
      )
      .join('\n')}
  `;
};

const placeholders = {
  banner: '<!-- ${BANNER_PLACEHOLDER} -->',
  movies: '<!-- ${MOVIE_ITEMS_PLACEHOLDER} -->',
};

router.get('/', async (_, res) => {
  const templatePath = path.join(__dirname, '../../views', 'index.html');
  const bannerHTML = await getBannerHTML();
  const moviesHTML = await getMoviesHTML('popular');

  const template = fs.readFileSync(templatePath, 'utf-8');
  const renderedHTML = template
    .replace(placeholders.banner, bannerHTML)
    .replace(placeholders.movies, moviesHTML);

  res.send(renderedHTML);
});

export default router;
