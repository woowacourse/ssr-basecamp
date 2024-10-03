import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { fetchTopRatedMovies } from '../../api/fetchTopRatedMovies.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const STAR_EMPTY = '/images/star_empty.png';

const router = Router();

router.get('/', async (_, res) => {
  const MOVIE_LIST_HTML = (movieItems = []) =>
    movieItems
      .map(
        ({ id, title, poster_path, vote_average }) => /*html*/ `
        <li>
          <a href="/detail/${id}">
            <div class="item">
              <img
                class="thumbnail"
                src="https://media.themoviedb.org/t/p/w440_and_h660_face/${poster_path}"
                alt="${title}"
              />
              <div class="item-desc">
                <p class="rate"><img src="${STAR_EMPTY}" class="star" /><span>${vote_average}</span></p>
                <strong>${title}</strong>
              </div>
            </div>
          </a>
        </li>
      `
      )
      .join('');

  try {
    const renderMovieList = async () => {
      const moviesData = await fetchTopRatedMovies();

      const movieListHTML = MOVIE_LIST_HTML(moviesData);

      const bestMovieItem = moviesData[0];
      const templatePath = path.join(__dirname, '../../views', 'index.html');
      let template = fs.readFileSync(templatePath, 'utf-8');

      template = template.replace(
        '<!--${MOVIE_ITEMS_PLACEHOLDER}-->',
        movieListHTML
      );
      template = template.replace(
        '${background-container}',
        'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/' +
          bestMovieItem.background
      );
      template = template.replace(
        '${bestMovie.rate}',
        bestMovieItem.vote_average
      );
      template = template.replace('${bestMovie.title}', bestMovieItem.title);

      template = template.replace(
        'class="tab-item top-rated"',
        'class="tab-item selected top-rated"'
      );
      return template;
    };

    const template = await renderMovieList();

    res.send(template);
  } catch (error) {
    console.error('영화 목록을 불러오는 중 오류 발생:', error);
    res.status(500).send('영화 목록을 불러오는 중 오류가 발생했습니다.');
  }
});

export default router;
