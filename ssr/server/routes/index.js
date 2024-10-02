import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getPopularMovies } from "../../src/api/index.js";
import { renderMovieList } from "../../src/components/movieList.js";
import { renderHeader } from "../../src/components/header.js";
import { renderTab } from "../../src/components/tab.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

router.get("/popular", async (_, res) => {
  const templatePath = path.join(__dirname, "../../views", "index.html");
  const popularMovies = await getPopularMovies();
  const movieList = popularMovies.results.map(({ id, title, poster_path, vote_average }) => ({
    id,
    title,
    thumbnail: poster_path,
    rate: vote_average.toFixed(1),
  }));

  const bestMovie = {
    title: popularMovies.results[0].title,
    background: popularMovies.results[0].backdrop_path,
    rate: popularMovies.results[0].vote_average.toFixed(1),
  };

  const headerHTML = renderHeader(bestMovie);
  const tabHTML = renderTab("popular");
  const moviesHTML = renderMovieList(movieList);

  const template = fs.readFileSync(templatePath, "utf-8");
  const renderedHTML = template
    .replace("<!--${HEADER_PLACEHOLDER}-->", headerHTML)
    .replace("<!--${TAB_PLACEHOLDER}-->", tabHTML)
    .replace("<!--${MOVIE_ITEMS_PLACEHOLDER}-->", moviesHTML);

  res.send(renderedHTML);
});

export default router;
