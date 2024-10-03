import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { fetchMovieDetail, fetchMovies } from '../api/movies.js';
import { getMovieDetailModalHTML, getMovieItemsHTML } from './getTemplates.js';
import { round } from '../utils/round.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const renderMovieList = async (endpoint, res) => {
  const movieItems = await fetchMovies(endpoint).then((data) => data.results);
  const bestMovieItem = movieItems[0];
  const moviesHTML = getMovieItemsHTML(movieItems).join('');

  const templatePath = path.join(__dirname, './', 'index.html');
  let template = fs.readFileSync(templatePath, 'utf-8');

  template = template.replace('<!--${MOVIE_ITEMS_PLACEHOLDER}-->', moviesHTML);
  template = template.replace(
    '${background-container}',
    'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/' +
      bestMovieItem.backdrop_path
  );
  template = template.replace(
    '${bestMovie.rate}',
    round(bestMovieItem.vote_average)
  );
  template = template.replace('${bestMovie.title}', bestMovieItem.title);

  template = renderTabs(template, endpoint);

  return template;
  ㅡ;
};

export const renderMovieDetailModal = async (req, res) => {
  const { id: movieId } = req.params;
  const movieDetailItem = await fetchMovieDetail(movieId).then((data) => data);

  const movieDetailModalHTML = getMovieDetailModalHTML(movieDetailItem);

  return movieDetailModalHTML;
};

export const renderTabs = (template, currentPath) => {
  template = template.replace(
    new RegExp(
      `<a\\s+href="${currentPath}">\\s*<div\\s+class="tab-item">`,
      'g'
    ),
    `<a href="${currentPath}"><div class="tab-item selected">`
  );

  return template;
};
