import path from "path";
import fs from "fs";
import { TMDB_BANNER_URL, TMDB_MOVIE_LISTS, TMDB_THUMBNAIL_URL } from "../constants.js";
import { getTMDBData } from "../utils/getTMDBData.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generateMovieList = async (sort = "nowPlaying") => {
  const url = TMDB_MOVIE_LISTS[sort];
  const { results: movies } = await getTMDBData(url);

  const movieList = drawMovieList(movies, sort);

  return movieList;
};

const drawMovieList = (movies, sort) => {
  const templatePath = path.join(__dirname, "../../views", "index.html");
  const baseTemplate = fs.readFileSync(templatePath, "utf-8");

  const moviesHTML = movies
    .map(
      ({ id, poster_path, vote_average, title }) =>
        `
    <a href="/detail/${id}">
      <li>
          <div class="item">
            <img
              class="thumbnail"
              src="${TMDB_THUMBNAIL_URL}/${poster_path}"
              alt=""
            />
            <div class="item-desc">
              <p class="rate">
                <img src="/assets/images/star_empty.png" class="star" />
                <span>${vote_average.toFixed(1)}</span>
              </p>
              <strong>${title}</strong>
            </div>
          </div>
      </li>
    </a>`
    )
    .join("");

  const bannerMovie = movies[0];
  const { backdrop_path, vote_average, title, id } = bannerMovie;

  const movieList = baseTemplate
    .replace("${background-container}", TMDB_BANNER_URL + backdrop_path)
    .replace("${bestMovie.rate}", vote_average.toFixed(1))
    .replace("${bestMovie.title}", title)
    .replace("${bestMovie.id}", id)
    .replace("<!--${MOVIE_ITEMS_PLACEHOLDER}-->", moviesHTML)
    .replace(`\${tabItemClassName.${sort}}`, "selected");

  return movieList;
};
