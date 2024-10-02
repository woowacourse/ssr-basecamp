import { Router } from "express";
import { generateMovieListTemplate } from "../templateGenerators.js";

const router = Router();

router.get("/", async (_, res) => {
  const renderedHTML = await generateMovieListTemplate();

  res.send(renderedHTML);
});
router.get("/now-playing", async (_, res) => {
  const renderedHTML = await generateMovieListTemplate("nowPlaying");

  res.send(renderedHTML);
});
router.get("/popular", async (_, res) => {
  const renderedHTML = await generateMovieListTemplate("popular");

  res.send(renderedHTML);
});
router.get("/top-rated", async (_, res) => {
  const renderedHTML = await generateMovieListTemplate("topRated");

  res.send(renderedHTML);
});

router.get("/upcoming", async (_, res) => {
  const renderedHTML = await generateMovieListTemplate("upcoming");

  res.send(renderedHTML);
});

export default router;
