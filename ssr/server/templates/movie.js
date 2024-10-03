import {
  TMDB_BANNER_URL,
  TMDB_ORIGINAL_URL,
  TMDB_THUMBNAIL_URL,
} from '../constants.js';

export const getBannerHTML = async (movie) => {
  const { vote_average: rate, title, backdrop_path: backdropPath } = movie;

  return /*html*/ `
    <header>
      <div
      class="background-container"
      style="background-image: url('${TMDB_BANNER_URL + backdropPath}')"
    >
      <div class="overlay" aria-hidden="true"></div>
      <div class="top-rated-container">
        <h1 class="logo">
          <img src="../assets/images/logo.png" alt="MovieList" />
        </h1>
        <div class="top-rated-movie">
          <div class="rate">
            <img src="../assets/images/star_empty.png" class="star" />
            <span class="rate-value">${rate.toFixed(1)}</span>
          </div>
          <div class="title">${title}</div>
          <button class="primary detail">자세히 보기</button>
        </div>
      </div>
    </div>
    </header>
    `;
};

export const getMoviesHTML = async (movies) => {
  return /*html*/ `
    ${movies.results
      .map(
        ({
          id,
          title,
          vote_average: rate,
          poster_path: thumbnailPath,
        }) => /*html*/ `
        <li>
          <a href="/detail/${id}">
            <div class="item">
              <img class="thumbnail" src=${
                TMDB_THUMBNAIL_URL + '/' + thumbnailPath
              } alt=${title} />
              <div class="item-desc">
                <p class="rate">
                  <img src="../assets/images/star_empty.png" class="star" />
                  <span>${rate.toFixed(1)}</span>
                </p>
                <strong>${title}</strong>
              </div>
            </div>
          </a>
        </li>  
      `
      )
      .join('\n')}
  `;
};

export const getModalHTML = async (movieDetail) => {
  const {
    poster_path: posterPath,
    title,
    release_date: releaseDate,
    genres,
    vote_average: rate,
    overview: description,
  } = movieDetail;
  return `
      <div class="modal-background active" id="modalBackground">
        <div class="modal">
          <button class="close-modal" id="closeModal">
            <img src="../assets/images/modal_button_close.png" alt="Close button" />
          </button>
          <div class="modal-container">
            <div class="modal-image">
              <img src="${
                TMDB_ORIGINAL_URL + posterPath
              }" alt="${title} 포스터" />
            </div>
            <div class="modal-description">
              <h2>${title}</h2>
              <p class="category">
                ${releaseDate.substring(0, 4)} · ${genres
    .map(({ name }) => name)
    .join(', ')}
              </p>
              <p class="rate">
                <img src="../assets/images/star_empty.png" class="star" alt="Star icon" />
                <span>${rate.toFixed(1)}</span>
              </p>
              <hr />
              <p class="detail">${description}</p>
            </div>
          </div>
        </div>
      </div>

      <script src="../assets/scripts/modal.js"></script>
    `;
};
