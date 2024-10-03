import { FETCH_OPTIONS, TMDB_MOVIE_LISTS } from "./constant.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const fetchNowPlayingMovies = async () => {
  const response = await fetch(TMDB_MOVIE_LISTS.NOW_PLAYING, FETCH_OPTIONS);

  return await response.json();
};

export const fetchPopularMovies = async () => {
  const response = await fetch(TMDB_MOVIE_LISTS.POPULAR, FETCH_OPTIONS);

  return await response.json();
};

export const fetchTopRatedMovies = async () => {
  const response = await fetch(TMDB_MOVIE_LISTS.TOP_RATED, FETCH_OPTIONS);

  return await response.json();
};

export const fetchUpcomingMovies = async () => {
  const response = await fetch(TMDB_MOVIE_LISTS.UPCOMING, FETCH_OPTIONS);

  return await response.json();
};

export const generateMovies = (movieItems = []) =>
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
    .join("\n");

export const generateRenderedHTML = (movieItems, tabItem) => {
  const bestMovieItem = movieItems[0];
  const moviesHTML = generateMovies(movieItems);

  const templatePath = path.join(__dirname, "../views", "index.html");
  let template = fs.readFileSync(templatePath, "utf-8");

  template = template.replace("<!--${MOVIE_ITEMS_PLACEHOLDER}-->", moviesHTML);
  template = template.replace(
    "${background-container}",
    "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/" +
      bestMovieItem.poster_path
  );
  template = template.replace("${bestMovie.rate}", bestMovieItem.vote_average);
  template = template.replace("${bestMovie.title}", bestMovieItem.title);
  template = template.replace(
    "${nowPlayingTabItem}",
    tabItem === "nowPlaying" ? "selected" : ""
  );
  template = template.replace(
    "${popularTabItem}",
    tabItem === "popular" ? "selected" : ""
  );
  template = template.replace(
    "${topRatedTabItem}",
    tabItem === "topRated" ? "selected" : ""
  );
  template = template.replace(
    "${upcomingTabItem}",
    tabItem === "upcoming" ? "selected" : ""
  );

  return template;
};
