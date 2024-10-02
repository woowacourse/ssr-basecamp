import { Router } from "express";
import { generateMovieList } from "../templates/generateMovieList.js";
import { generateMovieListWithModal } from "../templates/generateMovieListWithModal.js";

const router = Router();

router.get("/", async (_, res) => {
  const renderedHTML = await generateMovieList();

  res.send(renderedHTML);
});
router.get("/now-playing", async (_, res) => {
  const renderedHTML = await generateMovieList("nowPlaying");

  res.send(renderedHTML);
});
router.get("/popular", async (_, res) => {
  const renderedHTML = await generateMovieList("popular");

  res.send(renderedHTML);
});
router.get("/top-rated", async (_, res) => {
  const renderedHTML = await generateMovieList("topRated");

  res.send(renderedHTML);
});

router.get("/upcoming", async (_, res) => {
  const renderedHTML = await generateMovieList("upcoming");

  res.send(renderedHTML);
});

router.get("/detail/:id", async (req, res) => {
  const movieId = req.params.id;

  const renderedHTML = await generateMovieListWithModal(movieId);

  res.send(renderedHTML);
});

export default router;
