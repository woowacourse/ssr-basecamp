import { TMDB_THUMBNAIL_URL } from "./constant.js";

export const getMovieListHTML = (movieItems = []) => movieItems.map(
  ({ id, title, backdrop_path: thumbnail, vote_average: rate }) => /*html*/ `
    <li>
      <a href="/detail/${id}">
        <div class="item">
          <img
            class="thumbnail"
            src="https://media.themoviedb.org/t/p/w440_and_h660_face/${thumbnail}"
            alt="${title}"
          />
          <div class="item-desc">
            <p class="rate"><img src="/assets/images/star_empty.png" class="star" /><span>${rate}</span></p>
            <strong>${title}</strong>
          </div>
        </div>
      </a>
    </li>
    `
).join('');

export const getMovieDetailHTML = (movieDetail) => /*html*/ `
  <div class="modal-background active" id="modalBackground">
    <div class="modal">
      <button class="close-modal" id="closeModal"><img src="/assets/images/modal_button_close.png" /></button>
      <div class="modal-container">
        <div class="modal-image">
          <img src="${TMDB_THUMBNAIL_URL}${movieDetail.poster_path}.jpg" />
        </div>
        <div class="modal-description">
          <h2>${movieDetail.title}</h2>
          <p class="category">
            ${movieDetail.release_date.split("-")[0]} · ${movieDetail.genres.map((genre) => genre.name).join(", ")}
          </p>
          <p class="rate"><img src="/assets/images/star_filled.png" class="star" />
            <span>${movieDetail.vote_average}</span>
          </p>
          <hr />
          <p class="detail">
            ${movieDetail.overview}
          </p>
        </div>
      </div>
    </div>
  </div>
  <!-- 모달 창 닫기 스크립트 -->
  <script>
    const modalBackground = document.getElementById("modalBackground");
    const closeModal = document.getElementById("closeModal");
    const previousPath = new URL(document.referrer).pathname;
    
    const updateTabSelection = (path) => {
      const tabItems = document.querySelectorAll(".tab-item");
      tabItems.forEach((item) => {
        const link = item.closest("a");
        const isSelected = link.getAttribute("href") === path;
        const isRootPath = link.getAttribute("href") === "/now-playing" && path === "/";
        
        item.classList.remove("selected");
        if (isSelected || isRootPath) {
          item.classList.add("selected");
        }
      });
    }
    document.addEventListener("DOMContentLoaded", () => {
      closeModal.addEventListener("click", () => {
        modalBackground.classList.remove("active");
        history.replaceState({}, '', previousPath);
        updateTabSelection(previousPath);
      });
    });
  </script>
  `;