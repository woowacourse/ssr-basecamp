import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { loadNowPlaying } from "../api/loadMovies.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();
const templatePath = path.join(__dirname, "../../views", "index.html");
const template = fs.readFileSync(templatePath, "utf-8");

const renderMovieDetailPage = (moviesData, movieDetailItem) => {
  const moviesPageTemplate = renderMovieItemPage(moviesData);
  const movieDetail = parseMovieDetail(movieDetailItem);

  return moviesPageTemplate.replace(
    "<!--${MODAL_AREA}-->",
    /*html*/ `
        <div class="modal-background active" id="modalBackground">
          <div class="modal">
          <button class="close-modal" id="closeModal"><img src="../images/modal_button_close.png" /></button>
          <div class="modal-container">
            <div class="modal-image">
              <img src="https://image.tmdb.org/t/p/original/${movieDetail.thumbnail}.jpg" />
            </div>
            <div class="modal-description">
              <h2>${movieDetail.title}</h2>
              <p class="category">${movieDetail.releaseYear} · ${movieDetail.genres.join(", ")}</p>
              <p class="rate"><img src="../images/star_filled.png" class="star" /><span>7.7</span></p>
              <hr />
              <p class="detail">
                ${movieDetail.description}
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

router.get("/now-playing", renderMovieDetailPage(await loadNowPlaying()));

export default router;
