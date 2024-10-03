import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { fetchMoviesByCategory, fetchDetailMovie } from "../apis/movies.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

const CATEGORIES = {
  "now-playing": "상영 중",
  popular: "인기순",
  "top-rated": "평점순",
  upcoming: "상영 예정",
};

const renderMovieItems = (movies) => {
  return movies
    .map(
      (movie) => `
    <li>
      <a href="/detail/${movie.id}">
        <div class="item">
          <img
            class="thumbnail"
            src="https://media.themoviedb.org/t/p/w440_and_h660_face/${movie.poster_path}"
            alt="${movie.title}"
          />
          <div class="item-desc">
            <p class="rate"><img src="../assets/images/star_empty.png" class="star" /><span>${movie.vote_average.toFixed(
              1
            )}</span></p>
            <strong>${movie.title}</strong>
          </div>
        </div>
      </a>
    </li>
  `
    )
    .join("");
};

const renderPage = async ({ category, id }) => {
  const templatePath = path.join(__dirname, "../../views", "index.html");
  let template = fs.readFileSync(templatePath, "utf-8");

  const moviesData = await fetchMoviesByCategory(category);
  const movieItems = moviesData.results;
  const moviesHTML = renderMovieItems(movieItems);

  const bestMovie = movieItems[0];

  template = template.replace("<!--${MOVIE_ITEMS_PLACEHOLDER}-->", moviesHTML);

  template = template.replace(
    "${background-container}",
    `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${bestMovie.backdrop_path}`
  );
  template = template.replace("${bestMovie.rate}", bestMovie.vote_average.toFixed(1));
  template = template.replace("${bestMovie.title}", bestMovie.title);
  template = template.replace("<!--${TAB_ITEMS_PLACEHOLDER}-->", renderTabItems(category));
  if (id) {
    template = template.replace("<!--${MODAL_AREA}-->", await renderMovieItemModal(id));
  }

  return template;
};

const renderMovieItemModal = async (id) => {
  const movie = await fetchDetailMovie(id);
  const genres = movie.genres && movie.genres.map((genre) => genre.name).join(", ");

  return `
    <div class="modal-background active" id="modalBackground">
      <div class="modal">
        <button class="close-modal" id="closeModal"><img src="../assets/images/modal_button_close.png" /></button>
        <div class="modal-container">
          <div class="modal-image">
            <img src="https://image.tmdb.org/t/p/w440_and_h660_face/${movie.poster_path}" />
          </div>
          <div class="modal-description">
            <h2>${movie.title}</h2>
            <p class="category">
              ${movie.release_date} · ${genres}
            </p>
            <p class="rate">
              <img src="../assets/images/star_filled.png" class="star" />
              <span>${movie.vote_average}</span>
            </p>
            <hr />
            <p class="detail">${movie.overview}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 모달 창 닫기 스크립트 -->
    <script>
        const modalBackground = document.getElementById("modalBackground");
        const closeModal = document.getElementById("closeModal");
        const previousPath = new URL(document.referrer).pathname;

        document.addEventListener("DOMContentLoaded", () => {
          closeModal.addEventListener("click", () => {
            modalBackground.classList.remove("active");
            history.replaceState({}, '', previousPath);
          });
        });
      </script>
  `;
};

const renderTabItems = (currentCategory) => {
  return Object.entries(CATEGORIES)
    .map(
      ([key, value]) => `
    <li>
      <a href="/${key}" class="${
        currentCategory.toLowerCase().replace("_", "-") === key ? "selected" : ""
      }">
        <div class="tab-item">
          <h3>${value}</h3>
        </div>
      </a>
    </li>
  `
    )
    .join("");
};

router.get(["/", "/now-playing"], async (_, res) => {
  const renderedHTML = await renderPage({ category: "NOW_PLAYING", id: null });
  res.send(renderedHTML);
});

router.get("/popular", async (_, res) => {
  const renderedHTML = await renderPage({ category: "POPULAR", id: null });
  res.send(renderedHTML);
});

router.get("/top-rated", async (_, res) => {
  const renderedHTML = await renderPage({ category: "TOP_RATED", id: null });
  res.send(renderedHTML);
});

router.get("/upcoming", async (_, res) => {
  const renderedHTML = await renderPage({ category: "UPCOMING", id: null });
  res.send(renderedHTML);
});

router.get("/detail/:id", async (req, res) => {
  const previousPage = req.get("Referrer") || req.header("Referrer");
  const category = previousPage.split("/").at(-1).toUpperCase().replace("-", "_");
  const movieId = req.params.id;

  const renderedHTML = await renderPage({ category, id: movieId });
  res.send(renderedHTML);
});

export default router;
