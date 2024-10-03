import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { fetchMovies } from "../../src/fetchMovies.js";
import { TMDB_MOVIE_LISTS } from "../../src/constant.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

export const getFormattedMovies = async (endpoint) => {
  const movieData = await fetchMovies(endpoint);
  const formattedMovieData = movieData.results.map((movie) => ({
    id: movie.id,
    title: movie.title,
    thumbnail: movie.poster_path,
    rate: movie.vote_average,
    background: movie.backdrop_path,
  }));

  return formattedMovieData;
};

const rendermoviesTemplate = (moviesData, endpoint) => {
  const bestMovieItem = moviesData[0];
  const moviesHTML = getMoviesHTMLTemplate(moviesData).join("");
  const tabsHTML = getTabsHTMLTemplate(endpoint).join("");

  console.log("tabsHTML", tabsHTML);

  const templatePath = path.join(__dirname, "../../views", "index.html");
  let template = fs.readFileSync(templatePath, "utf-8");

  template = template.replace("<!--${MOVIE_ITEMS_PLACEHOLDER}-->", moviesHTML);
  template = template.replace(" <!--${TABS_PLACEHOLDER}-->", tabsHTML);
  template = template.replace(
    "${background-container}",
    "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/" +
      bestMovieItem.background
  );
  template = template.replace("${bestMovie.rate}", bestMovieItem.rate);
  template = template.replace("${bestMovie.title}", bestMovieItem.title);

  return template;
};

export const getMoviesHTMLTemplate = (movieItems = []) =>
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

const handleMovieRoute = async (res, category) => {
  const endpoint = TMDB_MOVIE_LISTS[category];
  try {
    const movieData = await getFormattedMovies(endpoint);
    const moviesHTML = rendermoviesTemplate(movieData, category);

    res.send(moviesHTML);
  } catch (error) {
    console.error("Error rendering page:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getTabsHTMLTemplate = (selectedCategory) => {
  const categories = {
    NOW_PLAYING: "상영 중",
    POPULAR: "인기순",
    TOP_RATED: "평점순",
    UPCOMING: "상영 예정",
  };

  return Object.entries(categories).map((category) => {
    const isSelected = selectedCategory === category[0] ? "selected" : "";
    const href = `/${category[0].toLowerCase().replace("_", "-")}`;

    return (
      /*html*/
      `<li>
 <a href="${href}">
   <div class="tab-item ${isSelected}"><h3>${category[1]}</h3></div>
 </a>
</li>`
    );
  });
};

router.get("/", async (_, res) => handleMovieRoute(res, "NOW_PLAYING"));
router.get("/now-playing", async (_, res) =>
  handleMovieRoute(res, "NOW_PLAYING")
);
router.get("/popular", async (_, res) => handleMovieRoute(res, "POPULAR"));
router.get("/top-rated", async (_, res) => handleMovieRoute(res, "TOP_RATED"));
router.get("/upcoming", async (_, res) => handleMovieRoute(res, "UPCOMING"));

export default router;
