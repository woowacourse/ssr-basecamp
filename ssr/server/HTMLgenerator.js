import { TMDB_THUMBNAIL_URL } from "./constants.js";

export const generateMovieItems = (movies = []) => {
  return movies
    .map(({ id, title, vote_average, poster_path }) => {
      /*html*/
      return `
          <li key="${id}">
            <a href="/detail/${id}">
              <div class="item">
                <img class="thumbnail" src="${TMDB_THUMBNAIL_URL}/${poster_path}" alt="${title}" />
                <div class="item-desc">
                  <p class="rate">
                    <img src="./assets/images/star_filled.png" class="star" />
                    <span>${vote_average.toFixed(1)}</span>
                  </p>
                  <strong>${title}</strong>
                </div>
              </div>
            </a>
          </li>
        `;
    })
    .join("");
};

export const generateMovieModal = (movieInfo = {}) => {
  const {
    title,
    poster_path,
    genres = [],
    vote_average = 0,
    overview,
  } = movieInfo;

  /*html*/
  return `
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
