import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { fetchMovies } from "../apis/movie.js";
import { TMDB_RESOURCE, PATH } from "../constant.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

const renderMovieList = async () => {
  const fetchedMoviesData = await fetchMovies();

  const movieListHTML = fetchedMoviesData.results.map((movie) => {
    const movieDetailPath = PATH.MOVIE_DETAIL(movie.id);
    const thumbnailURL = TMDB_RESOURCE.IMAGE.THUMBNAIL_URL + movie.poster_path;
    const averageScore = movie.vote_average.toFixed(1);

    return /*html*/ `
      <li>
        <a href=${movieDetailPath}>
          <div class="item">
            <img
              class="thumbnail"
              src=${thumbnailURL}
              alt=${movie.title}
            />
            <div class="item-desc">
              <p class="rate"><img src="./images/star_empty.png" class="star" alt="별점" /><span>${averageScore}</span></p>
              <strong>${movie.title}</strong>
            </div>
          </div>
        </a>
      </li>
    `;
  });

  return movieListHTML.join("");
};

router.get("/", async (_, res) => {
  const templatePath = path.join(__dirname, "../../views", "index.html");
  const moviesHTML = await renderMovieList();

  const template = fs.readFileSync(templatePath, "utf-8");
  const renderedHTML = template.replace(
    "<!--${MOVIE_ITEMS_PLACEHOLDER}-->",
    moviesHTML
  );

  res.send(renderedHTML);
});

export default router;
