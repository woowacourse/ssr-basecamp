import { TMDB_MOVIE_DETAIL_URL } from "../constants.js";
import { generateMovieList } from "./generateMovieList.js";
import { getTMDBData } from "../utils/getTMDBData.js";

export const generateMovieListWithModal = async (movieId) => {
  const focusedMovieUrl = `${TMDB_MOVIE_DETAIL_URL}${movieId.toString()}?language=ko-KR`;
  const focusedMovie = await getTMDBData(focusedMovieUrl);

  const modalTemplate = drawMovieModal(focusedMovie);

  const movieListTemplate = await generateMovieList();

  const movieListWithModal = movieListTemplate.replace("<!--${MODAL_AREA}-->", modalTemplate);

  return movieListWithModal;
};

const drawMovieModal = (movie) => {
  const { poster_path, title, release_date, genres, vote_average, overview } = movie;

  const category = [release_date.substring(0, 4), ...genres.map(({ name }) => name)].join(", ");

  const movieModal = `
<div class="modal-background active" id="modalBackground">
  <div class="modal">
    <button class="close-modal" id="closeModal">
      <img src="/assets/images/modal_button_close.png" onClick="document.getElementById('modalBackground').style.display = 'none';" />
    </button>
    <div class="modal-container">
      <div class="modal-image">
        <img src="https://image.tmdb.org/t/p/original${poster_path}" />
      </div>
      <div class="modal-description">
        <h2>${title}</h2>
        <p class="category">${category}</p>
        <p class="rate">
          <img src="/assets/images/star_filled.png" class="star" />
          <span>${vote_average.toFixed(1)}</span>
        </p>
        <hr />
        <p class="detail">${overview || "줄거리 정보가 없습니다."}</p>
      </div>
    </div>
  </div>
</div>
  `;

  return movieModal;
};
