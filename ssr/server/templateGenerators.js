import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import fetch from "node-fetch";
import {
  FETCH_OPTIONS,
  TMDB_BANNER_URL,
  TMDB_MOVIE_LISTS,
  TMDB_THUMBNAIL_URL,
} from "./constants.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generateMovieListTemplate = async (sort = "nowPlaying") => {
  const url = TMDB_MOVIE_LISTS[sort];

  const response = await fetch(url, FETCH_OPTIONS);
  const data = await response.json();
  const movies = data.results;

  const bannerMovie = movies[0];

  const templatePath = path.join(__dirname, "../views", "index.html");

  const template = fs.readFileSync(templatePath, "utf-8");

  const moviesHTML = movies
    .map(
      (movie) =>
        `<li>
          <div class="item">
            <img
              class="thumbnail"
              src="${TMDB_THUMBNAIL_URL}/${movie.poster_path}"
              alt=""
            />
            <div class="item-desc">
              <p class="rate"><img src="/assets/images/star_empty.png" class="star" /><span>${movie.vote_average}</span></p>
              <strong>${movie.title}</strong>
            </div>
          </div>
      </li>`
    )
    .join("");

  const page = template
    .replace("${background-container}", TMDB_BANNER_URL + bannerMovie.backdrop_path)
    .replace("${bestMovie.rate}", bannerMovie.vote_average.toFixed(1))
    .replace("${bestMovie.title}", bannerMovie.title)
    .replace("${bestMovie.id}", bannerMovie.id)
    .replace("<!--${MOVIE_ITEMS_PLACEHOLDER}-->", moviesHTML)
    .replace(`\${tabItemClassName.${sort}}`, "selected");

  return page;
};
