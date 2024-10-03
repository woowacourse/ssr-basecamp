import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { fetchMovieDetail, fetchMovies } from '../api/movies.js';
import { getMovieDetailModalHTML, getMovieItemsHTML } from './getTemplates.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const renderMovieList = async (req, res) => {
  const endpoint = req.path;
  const movieItems = await fetchMovies(endpoint).then((data) => data.results);
  const bestMovieItem = movieItems[0];
  const moviesHTML = getMovieItemsHTML(movieItems).join('');

  const templatePath = path.join(__dirname, './', 'index.html');
  let template = fs.readFileSync(templatePath, 'utf-8');

  template = template.replace('<!--${MOVIE_ITEMS_PLACEHOLDER}-->', moviesHTML);
  template = template.replace(
    '${background-container}',
    'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/' +
      bestMovieItem.background
  );
  template = template.replace('${bestMovie.rate}', bestMovieItem.rate);
  template = template.replace('${bestMovie.title}', bestMovieItem.title);

  res.send(template);
};

export const renderMovieDetail = async (req, res) => {
  const { id: movieId } = req.params;
  const movieDetailItem = await fetchMovieDetail(movieId).then((data) => data);
  console.log('movieDetailItem', movieDetailItem);
  const templatePath = path.join(__dirname, './', 'index.html');
  let template = fs.readFileSync(templatePath, 'utf-8');

  const movieDetailModalHTML = getMovieDetailModalHTML(
    template,
    movieDetailItem
  );

  res.send(movieDetailModalHTML);
};
