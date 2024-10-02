import { TMDB_ORIGINAL_URL } from "../../utils/constants.js";

const round = (value, decimals = 0) => {
  const factor = 10 ** decimals;

  return Math.round(value * factor) / factor;
};

export default function getModal(movieDetail) {
  return `<div class="modal-background active" id="modalBackground">
      <div class="modal">
        <a class="close-modal" id="closeModal" href="/now-playing">
          <img src="/assets/images/modal_button_close.png" />
        </a>
        <div class="modal-container">
          <div class="modal-image">
            <img src="${TMDB_ORIGINAL_URL + movieDetail.poster_path}" />
          </div>
          <div class="modal-description">
            <h2>${movieDetail.title}</h2>
            <p class="category">
              ${movieDetail.release_date.split("-")[0]} · ${movieDetail.genres.map(({ name }) => name).join(", ")}
            </p>
            <p class="rate">
              <img src="/assets/images/star_empty.png" class="star" />
              <span>${round(movieDetail.vote_average, 1)}</span>
            </p>
            <hr />
            <p class="detail">${movieDetail.overview}</p>
          </div>
        </div>
      </div>
    </div>`;
}
