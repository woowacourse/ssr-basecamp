import { loadNowPlayingMovies, loadPopularMovies, loadTopRatedMovies, loadUpcomingMovies } from '../apis/movies.js';
import { TAB_LIST } from '../constants/tabList.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import renderMovieItem from './renderMovieItem.js';
import renderTabMenu from './renderTabMenu.js';
import { TMDB_BANNER_URL } from '../constants/movies.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generateMovieList = async (selectedTab = 'now-playing') => {
  const templatePath = path.join(__dirname, '../../views', 'index.html');

  const template = fs.readFileSync(templatePath, 'utf-8');

  const movieLists = await Promise.all([
    loadNowPlayingMovies(),
    loadPopularMovies(),
    loadTopRatedMovies(),
    loadUpcomingMovies(),
  ]);

  const FocusedIndex = TAB_LIST.findIndex((tab) => tab.name === selectedTab);

  const bestMovie = movieLists[FocusedIndex][0];
  const bestMovieRate = bestMovie.vote_average.toFixed(1);
  const bestMovieTitle = bestMovie.title;
  const bestMovieBackgroundImageSrc = TMDB_BANNER_URL + bestMovie.backdrop_path;

  const moviesHTML = movieLists[FocusedIndex].map((movie) => {
    return renderMovieItem(movie);
  }).join('');

  const tabHTML = renderTabMenu(`${selectedTab}`).join('');

  const movieListHTML = template
    .replace('${bestMovie.rate}', bestMovieRate)
    .replace('${bestMovie.title}', bestMovieTitle)
    .replace('${background-container}', bestMovieBackgroundImageSrc)
    .replace('<!--${MOVIE_ITEMS_PLACEHOLDER}-->', moviesHTML)
    .replace('<!--${TAB_PLACEHOLDER}-->', tabHTML);

  return movieListHTML;
};

export default generateMovieList;
