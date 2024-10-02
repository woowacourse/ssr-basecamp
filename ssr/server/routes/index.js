import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { fetchMovies } from "../../src/fetchMovies.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

export const getFormattedMovies = async () => {
  const movieData = await fetchMovies();

  const formattedMovieData = movieData.results.map((movie) => ({
    id: movie.id,
    title: movie.title,
    thumbnail: movie.poster_path,
    rate: movie.vote_average,
  }));

  return formattedMovieData;
};

const getMovieListHTML = (moviesData) => {
  const bestMovieItem = moviesData[0];
  const moviesHTML = rendermoviesData(moviesData).join("");

  const templatePath = path.join(__dirname, "../../views", "index.html");
  let template = fs.readFileSync(templatePath, "utf-8");

  template = template.replace("<!--${MOVIE_ITEMS_PLACEHOLDER}-->", moviesHTML);
  template = template.replace(
    "${background-container}",
    "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/" +
      bestMovieItem.background
  );
  template = template.replace("${bestMovie.rate}", bestMovieItem.rate);
  template = template.replace("${bestMovie.title}", bestMovieItem.title);

  return template;
};

export const rendermoviesData = (movieItems = []) =>
  movieItems.map(
    ({ id, title, thumbnail, rate }) => /*html*/ `
      <li>
      <a href="/detail/${id}">
        <div class="item">
          <img
            class="thumbnail"
            src="https://media.themoviedb.org/t/p/w440_and_h660_face/${thumbnail}"
            alt="${title}"
          />
          <div class="item-desc">
            <p class="rate"><img src="../images/star_empty.png" class="star" /><span>${rate}</span></p>
            <strong>${title}</strong>
          </div>
        </div>
      </a>
    </li>
    `
  );

router.get("/", async (_, res) => {
  try {
    const templatePath = path.join(__dirname, "../../views", "index.html");
    const movieData = await getFormattedMovies();
    const moviesHTML = getMovieListHTML(movieData);

    const template = fs.readFileSync(templatePath, "utf-8");
    const renderedHTML = template.replace(
      "<!--${MOVIE_ITEMS_PLACEHOLDER}-->",
      moviesHTML
    );

    res.send(renderedHTML);
  } catch (error) {
    console.error("Error rendering page:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
