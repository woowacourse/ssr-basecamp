import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { loadNowPlaying, loadPopular, loadTopRated, loadUpcoming } from "../api/loadMovies.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();
const templatePath = path.join(__dirname, "../../views", "index.html");
const template = fs.readFileSync(templatePath, "utf-8");

const TAB_ROUTES = ["/now-playing", "/popular", "/top-rated", "/upcoming"];

const createMoviesHTML = (movies) => {
  return movies.map(
    ({ id, title, vote_average, poster_path }) => `
    <li>
      <a href="/detail/${id}">
        <div class="item">
          <img
            class="thumbnail"
            src="https://media.themoviedb.org/t/p/w440_and_h660_face/${poster_path}"
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
  );
};

router.get("/now-playing", async (_, res) => {
  const movies = await loadNowPlaying();
  const moviesParsed = createMoviesHTML(movies);
  console.log(movies[0]);
  const bestMovieItem = movies[0];
  const moviesHTML = moviesParsed.join("");
  const renderedHTML = template
    .replace("<!--${MOVIE_ITEMS_PLACEHOLDER}-->", moviesHTML)
    .replace(
      "${background-container}",
      "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/" + bestMovieItem.poster_path
    )
    .replace("${bestMovie.rate}", bestMovieItem.vote_average)
    .replace("${bestMovie.title}", bestMovieItem.title);

  res.send(renderedHTML);
});

router.get("/popular", async (_, res) => {
  const movies = await loadPopular();
  const moviesHTML = createMoviesHTML(movies);
  console.log(movies);
  const renderedHTML = template.replace("<!--${MOVIE_ITEMS_PLACEHOLDER}-->", moviesHTML);

  res.send(renderedHTML);
});

router.get("/top-rated", async (_, res) => {
  const movies = await loadTopRated();
  const moviesHTML = createMoviesHTML(movies);
  const renderedHTML = template.replace("<!--${MOVIE_ITEMS_PLACEHOLDER}-->", moviesHTML);

  res.send(renderedHTML);
});

router.get("/upcoming", async (_, res) => {
  const movies = await loadUpcoming();
  const moviesHTML = createMoviesHTML(movies);
  const renderedHTML = template.replace("<!--${MOVIE_ITEMS_PLACEHOLDER}-->", moviesHTML);

  res.send(renderedHTML);
});

export default router;
