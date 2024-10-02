import { Router } from "express";
import { renderMoviePage } from "../src/render/renderMoviePage.js";
import { fetchMovies } from "../src/apis/movie.js";

const router = Router();

router.get("/", async (_, res) => {
  const movies = await fetchMovies();
  const renderedHTML = renderMoviePage(movies);

  res.send(renderedHTML);
});

export default router;
