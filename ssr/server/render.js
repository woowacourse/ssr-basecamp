import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getMovies, getMovie } from "./api.js";

const filterMapper = {
  "now-playing": "상영 중",
  popular: "인기순",
  "top-rated": "평점순",
  upcoming: "상영 예정",
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const renderMovies = (movies) => {
  return `
      ${movies
        .map(
          (movie) => `
        <li>
          <a href="/detail/${movie.id}">
            <div class="item">
              <img class="thumbnail" src="https://image.tmdb.org/t/p/w440_and_h660_face///${movie.poster_path}" alt="${movie.title}">
              <div class="item-desc">
                <p class="rate">
                  <img src="/assets/images/star_empty.png" class="star">
                  <span>${movie.vote_average}</span>
                </p>
                <strong>${movie.title}</strong>
              </div>
            </div>
          </a>
        </li>
        `
        )
        .join("")}
      `;
};

export const renderHTML = async (res, filter, modal = false, modalMovieId) => {
  try {
    const templatePath = path.join(__dirname, "../views", "index.html");
    const movies = await getMovies(filter);
    const moviesHTML = renderMovies(movies);
    const template = fs.readFileSync(templatePath, "utf-8");
    const bestMovie = movies[0];

    const filterLink = filter.replace("_", "-");
    const renderedHTML = template
      .replace("<!--${MOVIE_ITEMS_PLACEHOLDER}-->", moviesHTML)
      .replace("${bestMovie.rate}", `${bestMovie.vote_average.toFixed(2)}`)
      .replace("${bestMovie.title}", `${bestMovie.title}`)
      .replace("${bestMovie.modal}", `/detail/${bestMovie.id}`)
      .replace(
        "${background-container}",
        `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces//${bestMovie.backdrop_path}`
      )
      .replace(
        `            <a href="/${filterLink}">
                <div class="tab-item">
                  <h3>${filterMapper[filterLink]}</h3>
                </div></a
              >`,
        `            <a href="/${filterLink}">
                <div class="tab-item selected">
                  <h3>${filterMapper[filterLink]}</h3>
                </div></a
              >`
      );

    if (modal) {
      const modalMovie = await getMovie(modalMovieId);

      res.send(
        renderedHTML
          .replace("modal-background", `modal-background active`)
          .replaceAll("${title}", `${modalMovie.title}`)
          .replace("${poster_path}", `${modalMovie.poster_path}`)
          .replace("${vote_average}", `${modalMovie.vote_average}`)
          .replace("${overview}", `${modalMovie.overview}`)
      );
    } else {
      res.send(renderedHTML);
    }
  } catch (error) {
    (error) => console.error("Error:", error);
  }
};
