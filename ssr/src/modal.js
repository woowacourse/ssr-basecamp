import { FETCH_OPTIONS, TMDB_MOVIE_DETAIL_URL } from "./constant.js";
import { generateRenderedMovieItemsHTML } from "./movies.js";

export const fetchMovieItemDetail = async (id) => {
  const url = TMDB_MOVIE_DETAIL_URL + id;
  const params = new URLSearchParams({
    language: "ko-KR",
  });
  const response = await fetch(url + "?" + params, FETCH_OPTIONS);

  return await response.json();
};

export const generateRenderedModalHTML = (movieItems, movieDetail) => {
  const moviesPageTemplate = generateRenderedMovieItemsHTML(
    movieItems,
    "nowPlaying"
  );

  return moviesPageTemplate.replace(
    "<!--${MODAL_AREA}-->",
    /*html*/ `
        <div class="modal-background active" id="modalBackground">
          <div class="modal">
          <button class="close-modal" id="closeModal"><img src="../assets/images/modal_button_close.png" /></button>
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
              } · ${movieDetail.genres
      .map((genre) => genre.name)
      .join(", ")}</p>
              <p class="rate"><img src="../assets/images/star_filled.png" class="star" /><span>${movieDetail.vote_average.toFixed(
                1
              )}</span></p>
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
    `
  );
};
