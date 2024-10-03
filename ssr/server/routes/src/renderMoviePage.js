import fs from 'fs';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { renderMovieItems } from './renderMovieItems.js';
import { parseMovieItems } from './utils/parseMovieItems.js';
import { fileURLToPath } from 'url';
import { round } from './utils/round.js';
import { renderTabs } from './renderTabs.js';

export const renderMoviePage = (moviesData, currentPath) => {
  const movieItems = parseMovieItems(moviesData);
  const bestMovieItem = movieItems[0];
  const moviesHTML = renderMovieItems(movieItems).join('');

  const templatePath = path.join(__dirname, '../../../views', 'index.html');
  let template = fs.readFileSync(templatePath, 'utf-8');

  // tabs
  template = renderTabs(template, currentPath);

  // movie list
  template = template.replace('<!--${MOVIE_ITEMS_PLACEHOLDER}-->', moviesHTML);

  // best movie
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

  return template;
};
