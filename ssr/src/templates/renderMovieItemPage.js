import fs from 'fs';
import path from 'path';
import { renderMovieItems } from './renderMovieItems.js'; // Function to render individual movie items
import { fileURLToPath } from 'url';

export const renderMovieItemPage = (moviesData) => {
  const movieItemsHTML = renderMovieItems(moviesData.results); // Assuming 'results' contains the array of movies
  const bestMovie = moviesData.results[0]; // First movie is used as the "best" movie

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const templatePath = path.join(__dirname, '../../views', 'index.html');
  let template = fs.readFileSync(templatePath, 'utf-8');

  template = template.replace(
    '<!--${MOVIE_ITEMS_PLACEHOLDER}-->',
    movieItemsHTML,
  );
  template = template.replace(
    '${background-container}',
    `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${bestMovie.backdrop_path}`,
  );
  template = template.replace('${bestMovie.rate}', bestMovie.vote_average);
  template = template.replace('${bestMovie.title}', bestMovie.title);

  return template;
};
