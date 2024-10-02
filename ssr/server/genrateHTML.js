import { TMDB_ORIGINAL_URL, TMDB_THUMBNAIL_URL } from "./constant.js";

export const generateMovieItemsHTML = (movies) => {
  return movies
    .map(
      (movie) => `
      <li>
        <div class="item" data-id=${movie.id}>
          <img
            class="thumbnail"
            src="${TMDB_THUMBNAIL_URL}${movie.poster_path}"
            alt="${movie.title}"
          />
          <div class="item-desc">
            <p class="rate"><img src="/assets/images/star_empty.png" class="star" /><span>${movie.vote_average.toFixed(1)}</span></p>
            <strong>${movie.title}</strong>
          </div>
        </div>
      </li>
      `
    )
    .join('');
};

export const generateTabHTML = (currentTab) => {
  const tabs = [
    { name: 'now-playing', label: '상영 중', href: '/now-playing' },
    { name: 'popular', label: '인기순', href: '/popular' },
    { name: 'top-rated', label: '평점순', href: '/top-rated' },
    { name: 'upcoming', label: '상영 예정', href: '/upcoming' }
  ];

  return tabs
    .map(
      (tab) => `
      <li>
        <a href="${tab.href}">
          <div class="tab-item ${tab.name === currentTab ? 'selected' : ''}">
            <h3>${tab.label}</h3>
          </div>
        </a>
      </li>
      `
    )
    .join('');
};

// 모달 HTML을 생성하는 함수
export const generateMovieModalHTML = (movie) => {
  const genres = movie.genres.map(genre => genre.name).join(', '); 
  return `
    <div class="modal-background active" id="modalBackground">
      <div class="modal">
        <button class="close-modal" id="closeModal">
          <img src="/assets/images/modal_button_close.png" />
        </button>
        <div class="modal-container">
          <div class="modal-image">
            <img src="${TMDB_ORIGINAL_URL}${movie.poster_path}" alt="${movie.title}" />
          </div>
          <div class="modal-description">
            <h2>${movie.title}</h2>
            <p class="category">${movie.release_date.split('-')[0]} · ${genres}</p>
            <p class="rate">
              <img src="/assets/images/star_filled.png" class="star" />
              <span>${movie.vote_average.toFixed(1)}</span>
            </p>
            <hr />
            <p class="detail">${movie.overview}</p>
          </div>
        </div>
      </div>
    </div>
  `;
};