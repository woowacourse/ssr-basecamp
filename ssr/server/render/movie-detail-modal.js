import { HTML_PLACEHOLDERS } from "../../constants/placeholder.js";
import { TMDB_ORIGINAL_URL } from "../../constants/api.js";
import { MOVIE_PAGE_PATH } from "../../constants/path.js";

export const renderMovieDetailModal = (moviePageTemplate, movieDetail) => {
  const movieDetailHTML = getMovieDetailModalHTML(movieDetail);

  return moviePageTemplate.replace(
    HTML_PLACEHOLDERS.movieDetailModal,
    movieDetailHTML
  );
};

const getMovieDetailModalHTML = (movieDetail) => {
  const { poster_path, title, genres, overview, vote_average, description } =
    movieDetail;

  const genresNames = genres.map((g) => g.name);
  const posterImageUrl = `${TMDB_ORIGINAL_URL}${poster_path}`;
  const roundedRate = vote_average.toFixed(1);

  return /*html */ `
    <div class="modal-background active" id="modalBackground">
      <div class="modal">
        <button class="close-modal" id="closeModal"><img src="/assets/images/modal_button_close.png" /></button>
        <div class="modal-container">
          <div class="modal-image">
            <img src="${posterImageUrl}" />
          </div>
          <div class="modal-description">
            <h2>${title}</h2>
            <p class="category">2024 · ${genresNames.join(", ")}</p>
            <p class="rate"><img src="/assets/images/star_filled.png" class="star" />
              <span>${roundedRate}</span>
            </p>
            <hr />
            <p class="detail">
              ${overview}
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
        window.location.href = ${MOVIE_PAGE_PATH.nowPlaying}
      });
    });
    </script>
  `;
};
