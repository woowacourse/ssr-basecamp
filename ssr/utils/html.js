import { round } from "../../csr/src/utils.js";

export const renderTemplate = (template, bestMovie, tabsHTML, moviesHTML) => {
  return template
    .replace(
      "${background-container}",
      `https://image.tmdb.org/t/p/w500${bestMovie.backdrop_path}`
    )
    .replace("${bestMovie.title}", bestMovie.title)
    .replace("${bestMovie.rate}", round(bestMovie.vote_average, 1))
    .replace(
      '<button class="primary detail">자세히 보기</button>',
      `<button class="primary detail" onClick="window.location.href='/detail/${bestMovie.id}'">자세히 보기</button>`
    )
    .replace("<!--${TAB_ITEMS_PLACEHOLDER}-->", tabsHTML)
    .replace("<!--${MOVIE_ITEMS_PLACEHOLDER}-->", moviesHTML);
};

export const generateMoviesHTML = (movies) => {
  return movies
    .map((movie) => {
      const thumbnailUrl = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
      const roundedRate = round(movie.vote_average, 1);

      return `
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
    })
    .join("");
};

export const generateTabsHTML = (currentPath, tabs) => {
  const isDetailPage = currentPath.startsWith("/detail");

  const previousPath = isDetailPage ? "/now-playing" : currentPath;

  return tabs
    .map((tab) => {
      const isSelected =
        (previousPath === "/" && tab.path === "/") ||
        (previousPath === "/now-playing" && tab.path === "/") ||
        previousPath === tab.path;

      return `
            <li>
              <a href="${tab.path}">
                <div class="tab-item${isSelected ? " selected" : ""}">
                  <h3>${tab.label}</h3>
                </div>
              </a>
            </li>
          `;
    })
    .join("");
};

export const generateMovieDetailHTML = (movieDetail) => {
  const { poster_path, genres, overview, title, vote_average } = movieDetail;

  const genreList = genres.map((genre) => genre.name).join(", ");

  return `
      <div class="modal-background active" id="modalBackground">
        <div class="modal">
          <button class="close-modal" id="closeModal">
            <img src="/assets/images/modal_button_close.png" />
          </button>
          <div class="modal-container">
            <div class="modal-image">
              <img src="https://image.tmdb.org/t/p/original${poster_path}" />
            </div>
            <div class="modal-description">
              <h2>${title}</h2>
              <p class="category">2024 · ${genreList}</p>
              <p class="rate">
                <img src="/assets/images/star_filled.png" class="star" />
                <span>${round(vote_average, 1)}</span>
              </p>
              <hr />
              <p class="detail">${overview}</p>
            </div>
          </div>
        </div>
      </div>

      <script>
      document.addEventListener("DOMContentLoaded", () => {
        const closeModalButton = document.getElementById("closeModal");
        const modalBackground = document.getElementById("modalBackground");

        if (closeModalButton && modalBackground) {
          closeModalButton.addEventListener("click", () => {
            modalBackground.remove();
          });
        }
      });
    </script>
    `;
};
