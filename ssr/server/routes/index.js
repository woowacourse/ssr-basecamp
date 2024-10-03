import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  FETCH_OPTIONS,
  PATH_LIST,
  TMDB_BANNER_URL,
  TMDB_MOVIE_DETAIL_URL,
  TMDB_MOVIE_LISTS,
  TMDB_THUMBNAIL_URL,
} from '../constant.js';
import { parseMovieDetail, parseMovieList } from '../parse.js';
import { convertToPath } from '../utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

const fetchMovies = async (type) => {
  const response = await fetch(TMDB_MOVIE_LISTS[type], FETCH_OPTIONS);
  const data = await response.json();

  return parseMovieList(data);
};

const renderMovieList = (movieList = []) => {
  return movieList.map(
    ({ id, title, background, rate }) => /*html*/ `
      <li>
      <a href="/detail/${id}">
        <div class="item">
          <img
            class="thumbnail"
            src="${TMDB_THUMBNAIL_URL}/${background}" 
            alt="${title}"
          />
          <div class="item-desc">
            <p class="rate"><img src="../assets/images/star_empty.png" class="star" /> 
            <!-- 이미지 경로는 index.html파일의 위치부터 상대경로임 -->
            <span>${rate}</span></p>
            <strong>${title}</strong>
          </div>
        </div>
      </a>
    </li>
    `,
  );
};

const getFile = (filePath, fileName) => {
  const compositedFilePate = path.join(__dirname, filePath, fileName);
  return fs.readFileSync(compositedFilePate, 'utf-8');
};

const renderTabList = (type) => {
  const curPath = convertToPath(type);
  const tabList = [
    { path: PATH_LIST.NOW_PLAYING, name: '상영중' },
    { path: PATH_LIST.POPULAR, name: '인기순' },
    { path: PATH_LIST.TOP_RATED, name: '평점순' },
    { path: PATH_LIST.UPCOMING, name: '상영 예정' },
  ];

  return tabList.map(
    ({ path, name }) => /*html*/ `
      <li>
        <a href='${path}'>
          <div class="tab-item ${curPath === path ? 'selected' : ''}">
            <h3>${name}</h3>
          </div>
        </a>
      </li>
    `,
  );
};

const renderMovieListPage = async (type) => {
  const movieList = await fetchMovies(type);
  const topRatedMovie = movieList[0];

  let HTMLTemplate = getFile('../../views', 'index.html');

  const movieListHTML = renderMovieList(movieList).join('');
  const tabListHTML = renderTabList(type).join('');

  HTMLTemplate = HTMLTemplate.replace('<!--${MOVIE_ITEMS_PLACEHOLDER}-->', movieListHTML);
  HTMLTemplate = HTMLTemplate.replace('<!--${TAB_ITEMS_PLACEHOLDER}-->', tabListHTML);
  HTMLTemplate = HTMLTemplate.replace('${background-container}', TMDB_BANNER_URL + topRatedMovie.background);
  HTMLTemplate = HTMLTemplate.replace('${bestMovie.rate}', topRatedMovie.rate);
  HTMLTemplate = HTMLTemplate.replace('${bestMovie.title}', topRatedMovie.title);

  return HTMLTemplate;
};

const fetchMovieDetail = async (movieId) => {
  const response = await fetch(TMDB_MOVIE_DETAIL_URL + movieId, FETCH_OPTIONS);
  const data = await response.json();

  return parseMovieDetail(data);
};

const renderMovieDetailModalHTML = ({ bannerUrl, title, releaseYear, description, genres, rate }) => {
  return /*html*/ `
  <div class='modal-background active' id='modalBackground'>
    <div class='modal'>
      <button class='close-modal' id='closeModal'>
        <img src='../assets/images/modal_button_close.png' />
      </button>
      <div class='modal-container'>
        <div class='modal-image'>
          <img src="${bannerUrl}" />
        </div>
        <div class='modal-description'>
          <h2>${title}</h2>
          <p class='category'>${releaseYear}, ${genres}</p>
          <p class='rate'>
            <img src='../assets/images/star_filled.png' class='star' />
            <span>${rate}</span>
          </p>
          <hr />
          <p class='detail'>${description}
          </p>
        </div>
      </div>
    </div>
  </div>
`;
};
const renderMovieDetailModal = async (movieId) => {
  const movieDetail = await fetchMovieDetail(movieId);

  let template = await renderMovieListPage('NOW_PLAYING');
  template = template.replace('<!--${MODAL_AREA}-->', renderMovieDetailModalHTML(movieDetail));

  return template;
};

router.get('/', async (_, res) => {
  try {
    res.send(await renderMovieListPage('NOW_PLAYING'));
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get(PATH_LIST.NOW_PLAYING, async (_, res) => {
  try {
    res.send(await renderMovieListPage('NOW_PLAYING'));
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get(PATH_LIST.TOP_RATED, async (_, res) => {
  try {
    res.send(await renderMovieListPage('TOP_RATED'));
  } catch (error) {
    console.error('Error fetching movies for TOP_RATED:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get(PATH_LIST.UPCOMING, async (_, res) => {
  try {
    res.send(await renderMovieListPage('UPCOMING'));
  } catch (error) {
    console.error('Error fetching movies for UPCOMING:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get(PATH_LIST.POPULAR, async (_, res) => {
  try {
    res.send(await renderMovieListPage('POPULAR'));
  } catch (error) {
    console.error('Error fetching movies for POPULAR:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/detail/:id', async (req, res) => {
  const { id } = req.params; // URL 파라미터에서 id 추출

  try {
    console.log(`Fetching details for movie with ID: ${id}`);
    // 예: 특정 영화의 상세 정보를 가져오는 함수를 호출할 수 있습니다.
    res.send(await renderMovieDetailModal(id)); // ID를 전달하는 경우
  } catch (error) {
    console.error('Error fetching movies for DETAIL:', error);
    res.status(500).send('Internal Server Error');
  }
});

export default router;
