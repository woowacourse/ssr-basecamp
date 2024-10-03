import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { fetchMovieDetail } from '../../api/fetchMovieDetail.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CLOSE_BUTTON = '/images/modal_button_close.png';
const STAR_EMPTY = '/images/star_empty.png';

const router = Router();

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const MOVIE_DETAIL_HTML = ({
    poster_path,
    title,
    release_date,
    genreNames,
    vote_average,
    overview,
  }) => /* html */ `
  <div class="modal-background active" id="modalBackground">
    <div class="modal">
      <button class="close-modal" id="closeModal">
        <img src="${CLOSE_BUTTON}" />
      </button>
      <div class="modal-container">
        <div class="modal-image">
          <img src="https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${poster_path}" />
        </div>
        <div class="modal-description">
          <h2>${title}</h2>
          <p class="category">
            ${release_date} · ${genreNames}
          </p>
          <p class="rate">
            <img src="${STAR_EMPTY}" class="star" />
            <span>${vote_average}</span>
          </p>
          <hr />
          <p class="detail">${overview}</p>
        </div>
      </div>
    </div>
  </div>
  `;

  const renderMovieDetail = async (movieId) => {
    const movieDetailData = await fetchMovieDetail(movieId);
    console.log(movieDetailData);
    const {
      title,
      poster_path,
      release_date,
      overview,
      genres = [],
      vote_average,
    } = movieDetailData;

    const genreNames =
      genres.length > 0
        ? genres.map((genre) => genre.name).join(', ')
        : 'No genres available';

    const templatePath = path.join(__dirname, '../../views', 'index.html');
    let template = fs.readFileSync(templatePath, 'utf-8');

    const movieDetailHTML = MOVIE_DETAIL_HTML({
      poster_path,
      title,
      release_date,
      genreNames,
      vote_average,
      overview,
    });

    template = template.replace('<!--${MODAL_AREA}-->', movieDetailHTML);

    return template;
  };

  try {
    const template = await renderMovieDetail(id);

    res.send(template);
  } catch (error) {
    console.error('영화 정보를 불러오는 중 오류 발생:', error);
    res.status(500).send('영화 정보를 불러오는 중 오류가 발생했습니다.');
  }
});

export default router;
