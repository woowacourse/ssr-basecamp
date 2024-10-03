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
const placeholders = {
  banner: '<!-- ${BANNER_PLACEHOLDER} -->',
};
router.get('/', async (_, res) => {
  const templatePath = path.join(__dirname, '../../views', 'index.html');
  const bannerHTML = await getBannerHTML();

  const template = fs.readFileSync(templatePath, 'utf-8');
  const renderedHTML = template
    .replace(placeholders.banner, bannerHTML)

  res.send(renderedHTML);
});

export default router;
