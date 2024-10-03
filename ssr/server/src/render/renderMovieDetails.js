import { TMDB_THUMBNAIL_URL } from "../constant.js";

export const renderMovieDetails = (movieDetail = {}) => {
  const {
    title,
    genres = [],
    vote_average = 0,
    poster_path,
    overview,
  } = movieDetail;

  return /*html*/ `
  <div class="modal-background active" id="modalBackground">
    <div class="modal">
      <button class="close-modal" id="closeModal" onClick="location.href='/'">
        <img src="/assets/images/modal_button_close.png">
      </button>
      <div class="modal-container">
        <div class="modal-image">
          <img src="${TMDB_THUMBNAIL_URL}${poster_path}" alt="${title}">
        </div>
        <div class="modal-description">
          <h2>${title}</h2>
          <p class="category">${genres.map(({ name }) => name).join(", ")}</p>
          <p class="rate">
            <img src="/assets/images/star_empty.png" class="star">
            <span>${vote_average.toFixed(1)}</span> 
          </p>
          <hr>
          <p class="detail">
            ${overview}
          </p>
        </div>
      </div>
    </div>
  </div>
`;
};
