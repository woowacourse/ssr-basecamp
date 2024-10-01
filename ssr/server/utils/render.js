export const renderMovieItems = (movieItems = []) =>
  movieItems
    .map(
      ({ id, title, poster_path, vote_average }) => /*html*/ `
        <li>
        <a href="/detail/${id}">
          <div class="item">
            <img
              class="thumbnail"
              src="https://media.themoviedb.org/t/p/w440_and_h660_face/${poster_path}"
              alt="${title}"
            />
            <div class="item-desc">
              <p class="rate"><img src="/assets/images/star_empty.png" class="star" /><span>${vote_average}</span></p>
              <strong>${title}</strong>
            </div>
          </div>
        </a>
      </li>
      `
    )
    .join("");

export const renderHeader = (movieItem) => {
  return /*html*/ `
  <header>
  <div
    class="background-container"
    style="background-image: url('https://image.tmdb.org/t/p/original${movieItem.backdrop_path}')"
  >
    <div class="overlay" aria-hidden="true"></div>
    <div class="top-rated-container">
      <h1 class="logo">
        <img src="/assets/images/logo.png" alt="MovieList" />
      </h1>
      <div class="top-rated-movie">
        <div class="rate">
          <img src="/assets/images/star_empty.png" class="star" />
          <span class="rate-value">${movieItem.vote_average}</span>
        </div>
        <div class="title">${movieItem.title}</div>
        <button class="primary detail">자세히 보기</button>
      </div>
    </div>
  </div>
</header>
        `;
};

export const renderMovieDetailModal = (movieDetail) => {
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
              movieDetail.release_date.split("-")[0]
            } · ${movieDetail.genres.map((genre) => genre.name).join(", ")}</p>
            <p class="rate"><img src="/assets/images/star_filled.png" class="star" /><span>${
              movieDetail.vote_average
            }</span></p>
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
};
