import { renderMoviePage } from './renderMoviePage.js';
import { parseMovieDetail } from './utils/parseMovieDetail.js';
import { round } from './utils/round.js';

export const renderMovieModal = (moviesData, movieDetailItem) => {
  const movieDetail = parseMovieDetail(movieDetailItem);

  const moviesPageTemplate = renderMoviePage(moviesData);
  return moviesPageTemplate.replace(
    '<!--${MODAL_AREA}-->',
    /*html*/ `
        <div class="modal-background active" id="modalBackground">
          <div class="modal">
          <button class="close-modal" id="closeModal"><img src="../assets/images/modal_button_close.png" /></button>
          <div class="modal-container">
            <div class="modal-image">
              <img src="https://image.tmdb.org/t/p/original/${
                movieDetail.bannerUrl
              }.jpg" />
            </div>
            <div class="modal-description">
              <h2>${movieDetail.title}</h2>
              <p class="category">${
                movieDetail.releaseYear
              } · ${movieDetail?.genres?.join(', ')}</p>
              <p class="rate"><img src="../assets/images/star_filled.png" class="star" /><span>${round(
                movieDetail.rate
              )}</span></p>
              <hr />
              <p class="detail">
                ${movieDetail.description}
              </p>
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
          });
        });
      </script>
    `
  );
};
