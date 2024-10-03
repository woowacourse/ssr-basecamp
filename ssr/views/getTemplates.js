import { round } from '../utils/round.js';

export const getMovieItemsHTML = (movieItems) => {
  return movieItems.map((movie) => {
    const thumbnailUrl = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
    const roundedRate = round(movie.vote_average, 1);

    return /*html*/ `
          <li class="movie-item">
            <a href="/detail/${movie.id}" class="item">
              <img class="thumbnail" src="${thumbnailUrl}" alt="${movie.title}" />
              <div class="movie-info">
                <p class="rate">
                  <img src="../assets/images/star_empty.png" class="star" />
                  <span>${roundedRate}</span>
                </p>
                <strong>${movie.title}</strong>
              </div>
            </a>
          </li>
        `;
  });
};

export const getMovieDetailModalHTML = (movieDetail) => {
  return /*html*/ `
      <div class="modal-background active" id="modalBackground">
        <div class="modal">
        <button class="close-modal" id="closeModal"><img src="/assets/images/modal_button_close.png" /></button>
        <div class="modal-container">
          <div class="modal-image">
            <img src="https://image.tmdb.org/t/p/original/${
              movieDetail.poster_path
            }.jpg" />
          </div>
          <div class="modal-description">
            <h2>${movieDetail.title}</h2>
            <p class="category">${
              movieDetail.release_date
            } · ${movieDetail.genres.map((genre) => genre.name).join(', ')}</p>
            <p class="rate"><img src="/assets/images/star_filled.png" class="star" /><span>7.7</span></p>
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
      document.addEventListener("DOMContentLoaded", () => {
        closeModal.addEventListener("click", () => {
          modalBackground.classList.remove("active");
        });
      });
    </script>
  `;
};
