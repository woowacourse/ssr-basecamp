import { TMDB_MOVIE_LISTS } from "../src/constant.js";
import { fetchMovies } from "../src/fetchMovies.js";
import { fileURLToPath } from "url";
import fs from "fs";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const insertMovieContent = (movies, currentURL) => {
  const templatePath = path.join(__dirname, "../../views", "index.html");
  const firstMovie = movies.results[0];

  const movieLists = movies.results
    .map(
      ({ id, title, poster_path, vote_average }) => `
      <li>
      <a href="/detail/${id}">
        <div class="item">
          <img
            class="thumbnail"
            src="https://media.themoviedb.org/t/p/w440_and_h660_face/${poster_path}"
            alt="${title}"
          />
          <div class="item-desc">
            <p class="rate"><img src="../assets/images/star_empty.png" class="star" /><span>${vote_average.toFixed(
              1
            )}</span></p>
            <strong>${title}</strong>
          </div>
        </div>
      </a>
    </li>
    `
    )
    .join("");

  const nowPlayingSelected = currentURL === "/" || currentURL === "/now-playing" ? "selected" : "";
  const popularSelected = currentURL === "/popular" ? "selected" : "";
  const topRatedSelected = currentURL === "/top-rated" ? "selected" : "";
  const upcomingSelected = currentURL === "/upcoming" ? "selected" : "";

  const template = fs.readFileSync(templatePath, "utf-8");
  const mainHTML = template
    .replace(
      "${background-container}",
      `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces//${firstMovie.backdrop_path}`
    )
    .replace("${bestMovie.rate}", firstMovie.vote_average.toFixed(1))
    .replace("${bestMovie.title}", firstMovie.title)
    .replace('class="tab-item now-playing"', `class="tab-item now-playing ${nowPlayingSelected}"`)
    .replace('class="tab-item popular"', `class="tab-item popular ${popularSelected}"`)
    .replace('class="tab-item top-rated"', `class="tab-item top-rated ${topRatedSelected}"`)
    .replace('class="tab-item upcoming"', `class="tab-item upcoming ${upcomingSelected}"`)
    .replace("<!--${MOVIE_ITEMS_PLACEHOLDER}-->", movieLists);

  return mainHTML;
};

const getMovieURL = (path) => {
  switch (path) {
    case "/":
    case "/now-playing":
      return TMDB_MOVIE_LISTS.NOW_PLAYING;
    case "/popular":
      return TMDB_MOVIE_LISTS.POPULAR;
    case "/top-rated":
      return TMDB_MOVIE_LISTS.TOP_RATED;
    case "/upcoming":
      return TMDB_MOVIE_LISTS.UPCOMING;
  }
};

export const getMoviePage = async (req, res) => {
  const movieURL = getMovieURL(req.url);
  const movies = await fetchMovies(movieURL);
  const moviePageHTML = insertMovieContent(movies, req.url);

  res.send(moviePageHTML);
};
