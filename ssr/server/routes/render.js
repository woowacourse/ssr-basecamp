import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 탭 섹션 렌더링
export const renderTabSection = (currentTab) => {
  const tabs = [
    { label: "상영 중", href: "/now-playing" },
    { label: "인기순", href: "/popular" },
    { label: "평점순", href: "/top-rated" },
    { label: "상영 예정", href: "/upcoming" },
  ];

  return tabs
    .map(
      (tab) => `
      <li>
        <a href="${tab.href}">
          <div class="tab-item ${tab.href === currentTab ? "selected" : ""}">
            <h3>${tab.label}</h3>
          </div>
        </a>
      </li>
      `
    )
    .join("");
};

// 영화 목록 렌더링
export const renderMovieItems = (movieItems = []) =>
  movieItems
    .map(
      ({ id, title, backdrop_path, vote_average }) => /*html*/ `
      <li>
      <a href="/detail/${id}">
        <div class="item">
          <img
            class="thumbnail"
            src="https://media.themoviedb.org/t/p/w440_and_h660_face/${backdrop_path}"
            alt="${title}"
          />
          <div class="item-desc">
            <p class="rate"><img src="../assets/images/star_empty.png" class="star" /><span>${vote_average}</span></p>
            <strong>${title}</strong>
          </div>
        </div>
      </a>
    </li>
    `
    )
    .join("");

// 영화 페이지 렌더링
export const renderMovieItemPage = (moviesData, currentTab) => {
  const bestMovieItem = moviesData[0];
  const moviesHTML = renderMovieItems(moviesData);

  const templatePath = path.join(__dirname, "../../views", "index.html");
  let template = fs.readFileSync(templatePath, "utf-8");

  template = template.replace("<!--${TAB_ITEMS}-->", renderTabSection(currentTab));
  template = template.replace("${background-container}", "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/" + bestMovieItem.backdrop_path);
  template = template.replace("${bestMovie.rate}", bestMovieItem.vote_average);
  template = template.replace("${bestMovie.title}", bestMovieItem.title);
  template = template.replace("<!--${MOVIE_ITEMS_PLACEHOLDER}-->", moviesHTML);

  return template;
};

// 모달 렌더링
export const renderMovieItemModal = (moviesData, movieDetailItem) => {
  const moviesPageTemplate = renderMovieItemPage(moviesData);
  return moviesPageTemplate.replace(
    "<!--${MODAL_AREA}-->",
    /*html*/ `
      <div class="modal-background active" id="modalBackground">
        <div class="modal">
        <button class="close-modal" id="closeModal"><img src="../images/modal_button_close.png" /></button>
        <div class="modal-container">
          <div class="modal-image">
            <img src="https://image.tmdb.org/t/p/original/${movieDetailItem.backdrop_path}.jpg" />
          </div>
          <div class="modal-description">
            <h2>${movieDetailItem.title}</h2>
            <p class="category">${movieDetailItem.releaseDate.substring(0, 4)} · ${movieDetailItem.genres.join(", ")}</p>
            <p class="rate"><img src="../assets/images/star_filled.png" class="star" /><span>${movieDetailItem.vote_average}</span></p>
            <hr />
            <p class="detail">
              ${movieDetailItem.overview}
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
