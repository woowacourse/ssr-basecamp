import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { fetchNowPlayingMovieItems } from "../src/api/movie.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

export const renderMovieItems = (movieItems = []) =>
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
              <p class="rate"><img src="../assets/images/star_empty.png" class="star" /><span>${vote_average}</span></p>
              <strong>${title}</strong>
            </div>
          </div>
        </a>
      </li>
    `
    )
    .join("");

router.get("/", async (_, res) => {
  try {
    const templatePath = path.join(__dirname, "../../views", "index.html");
    const movies = await fetchNowPlayingMovieItems();
    const moviesHTML = renderMovieItems(movies);

    const template = fs.readFileSync(templatePath, "utf-8");
    // now-playing
    const renderedHTML = template.replace(
      'class="movie-list now-playing"',
      moviesHTML
    );

    res.send(renderedHTML);
  } catch (error) {
    console.error(error.message);
  }
});

export default router;
