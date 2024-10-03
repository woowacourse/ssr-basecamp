import { TMDB_ORIGINAL_URL } from '../constants/movies.js';

const renderModal = (detail) => {
  const bannerUrl = TMDB_ORIGINAL_URL + detail.poster_path;
  const releaseYear = detail.release_date.split('-')[0];
  const genres = detail.genres.map((genre) => genre.name).join(', ');

  const CloseButtonImageSrc = '../assets/images/modal_button_close.png';
  const StarEmptyImageSrc = '../assets/images/star_empty.png';

  return /* html */ `
    <div class="modal-background active" id="modalBackground">
      <div class="modal">
        <button class="close-modal" id="closeModal">
          <img src='${CloseButtonImageSrc}' />
        </button>
        <div class="modal-container">
          <div class="modal-image">
            <img src='${bannerUrl}' />
          </div>
          <div class="modal-description">
            <h2>${detail.title}</h2>
            <p class="category">
              ${releaseYear} · ${genres}
            </p>
            <p class="rate">
              <img src='${StarEmptyImageSrc}' class="star" />
              <span>${detail.vote_average}</span>
            </p>
            <hr />
            <p class="detail">${detail.overview}</p>
          </div>
        </div>
      </div>
    </div>
  `;
};

export default renderModal;
