import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { loadNowPlaying, loadPopular, loadTopRated, loadUpcoming } from "../api/loadMovies.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

router.get("/", async (_, res) => {
  const templatePath = path.join(__dirname, "../../views", "index.html");

  const movies = await Promise.all([loadNowPlaying(), loadPopular(), loadTopRated(), loadUpcoming()]);
  const moviesHTML = movies[focusedIndex].map(
    ({ id, title, vote_average, poster_path }) => `
    <li key={id}>
      <a href=/detail/${id}}>
        <MovieItem rate=${vote_average} title=${title} thumbnailUrl=${poster_path} />
      </a>
    </li>
    `
  );
  // const moviesHTML = "";

  const template = fs.readFileSync(templatePath, "utf-8");
  const renderedHTML = template.replace("<!--${MOVIE_ITEMS_PLACEHOLDER}-->", moviesHTML);

  res.send(renderedHTML);
});

export default router;
