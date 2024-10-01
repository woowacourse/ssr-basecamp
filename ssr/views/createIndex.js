import { MOVIE_TYPE_TAP_ITEM_KO, TMDB_BANNER_URL } from '../constants.js';

import createMovieThumbnail from './createMovieThumbnail.js';
import { fileURLToPath } from 'url';
import fs from 'fs';
import getMovies from '../apis/getMovies.js';
import getReplacedString from '../utils/getReplacedString.js';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const templatePath = path.join(__dirname, '../views', 'index.html');
const template = fs.readFileSync(templatePath, 'utf-8');

/**
 * @param {('popular' | 'nowPlaying' | 'topRated' | 'upcoming')} movieType - 요청할 영화 종류
 * @returns {Promise<MovieResponse>} 영화 응답 데이터를 기반으로 한 html형식의 string
 */
const createIndex = async (movieType = 'nowPlaying') => {
  const movies = await getMovies[movieType]();
  const mainMovie = movies[0];

  const renderedHTML = getReplacedString(template, [
    ['${background-container}', TMDB_BANNER_URL + mainMovie.backdrop_path],
    ['${bestMovie.rate}', mainMovie.vote_average.toFixed(1)],
    ['${bestMovie.title}', mainMovie.title],
    // 현재 선택 한 값 확인
    [
      new RegExp(
        `<div\\s+class="tab-item">\\s*<h3>\\${
          MOVIE_TYPE_TAP_ITEM_KO[[movieType]]
        }</h3>\\s*</div>`.replace(/\$/g, '\\$')
      ),
      `<div class="tab-item selected"><h3>${MOVIE_TYPE_TAP_ITEM_KO[movieType]}</h3></div>`,
    ],
    [
      '<!--${MOVIE_ITEMS_PLACEHOLDER}-->',
      movies.map(movie => createMovieThumbnail(movie)).join(''),
    ],
  ]);
  return renderedHTML;
};

export default createIndex;
