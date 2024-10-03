import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { fetchMoviesByCategory } from "../apis/movies.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

const CATEGORIES = {
  "now-playing": "상영 중",
  popular: "인기순",
  "top-rated": "평점순",
  upcoming: "상영 예정",
};

const renderMovieItems = (movies) => {
  return movies
    .map(
      (movie) => `
    <li>
      <a href="/detail/${movie.id}">
        <div class="item">
          <img
            class="thumbnail"
            src="https://media.themoviedb.org/t/p/w440_and_h660_face/${movie.poster_path}"
            alt="${movie.title}"
          />
          <div class="item-desc">
            <p class="rate"><img src="../assets/images/star_empty.png" class="star" /><span>${movie.vote_average.toFixed(
              1
            )}</span></p>
            <strong>${movie.title}</strong>
          </div>
        </div>
      </a>
    </li>
  `
    )
    .join("");
};

const renderPage = async (category) => {
  const templatePath = path.join(__dirname, "../../views", "index.html");
  let template = fs.readFileSync(templatePath, "utf-8");

  const moviesData = await fetchMoviesByCategory(category);
  const movieItems = moviesData.results;
  const moviesHTML = renderMovieItems(movieItems);

  const bestMovie = movieItems[0];

  template = template.replace("<!--${MOVIE_ITEMS_PLACEHOLDER}-->", moviesHTML);
  template = template.replace(
    "${background-container}",
    `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${bestMovie.backdrop_path}`
  );
  template = template.replace("${bestMovie.rate}", bestMovie.vote_average.toFixed(1));
  template = template.replace("${bestMovie.title}", bestMovie.title);
  template = template.replace("<!--${TAB_ITEMS_PLACEHOLDER}-->", renderTabItems(category));

  return template;
};

const renderTabItems = (currentCategory) => {
  return Object.entries(CATEGORIES)
    .map(
      ([key, value]) => `
    <li>
      <a href="/${key}" class="${
        currentCategory.toLowerCase().replace("_", "-") === key ? "selected" : ""
      }">
        <div class="tab-item">
          <h3>${value}</h3>
        </div>
      </a>
    </li>
  `
    )
    .join("");
};

router.get(["/", "/now-playing"], async (_, res) => {
  const renderedHTML = await renderPage("NOW_PLAYING");
  res.send(renderedHTML);
});

router.get("/popular", async (_, res) => {
  const renderedHTML = await renderPage("POPULAR");
  res.send(renderedHTML);
});

router.get("/top-rated", async (_, res) => {
  const renderedHTML = await renderPage("TOP_RATED");
  res.send(renderedHTML);
});

router.get("/upcoming", async (_, res) => {
  const renderedHTML = await renderPage("UPCOMING");
  res.send(renderedHTML);
});

export default router;
