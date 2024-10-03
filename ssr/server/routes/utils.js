import {
  TMDB_THUMBNAIL_URL,
  TMDB_ORIGINAL_URL,
  FETCH_OPTIONS,
} from '../src/constant.js';

const STAR_IMAGE = '/images/star_filled.png';
const CLOSE_MODAL_BUTTON_IMAGE = '/images/modal_button_close.png';

export const fetchMovies = async (url) => {
  const response = await fetch(url, FETCH_OPTIONS);

  return await response.json();
};

export const renderMovieItem = (movieItems = []) =>
  movieItems.map(
    ({ id, title, poster_path, vote_average }) => /*html*/ `
        <li>
        <a href="/detail/${id}">
          <div class="item">
            <img
              class="thumbnail"
              src="${TMDB_THUMBNAIL_URL}${poster_path}"
              alt="${title}"
            />
            <div class="item-desc">
              <p class="rate"><img src='${STAR_IMAGE}' alt='' class="star" /><span>${vote_average}</span></p>
              <strong>${title}</strong>
            </div>
          </div>
        </a>
      </li>
      `
  );

export const renderDetailModal = (movieDetail) => /*html*/ `
  <div class="modal-background active" id="modalBackground">
  <div class="modal">
  <button class="close-modal" id="closeModal"><img src="${CLOSE_MODAL_BUTTON_IMAGE}" alt=''/></button>
  <div class="modal-container">
    <div class="modal-image">
      <img src="${TMDB_ORIGINAL_URL}${movieDetail.poster_path}.jpg" />
    </div>
    <div class="modal-description">
    <h2>${movieDetail.title}</h2>
    <p class="category">
    ${new Date(movieDetail.release_date).getFullYear()} · ${movieDetail.genres
  .map((g) => g.name)
  .join(', ')}
  </p>
      <p class="rate"><img src='${STAR_IMAGE}' class="star"  alt="평점"/>
      <span>${Math.round(movieDetail.vote_average * 10) / 10}</span>
      </p>
      <hr />
      <p class="detail">${movieDetail.overview}</p>
    </div>
  </div>
  </div>
  </div>
  <!-- 모달 창 닫기 스크립트 -->
  <script>
  const modalBackground = document.getElementById("modalBackground");
  const closeModal = document.getElementById("closeModal");
  document.addEventListener("DOMContentLoaded", () => {
  closeModal.addEventListener("click", () => {
    modalBackground.classList.remove("active");
    window.location.href = '/'
  });
  });
  </script>
  `;
