import { Router } from "express";
import { renderHTML } from "../render.js";

const router = Router();

// 상영 중
router.get(["/", "/now-playing"], async (_, res) => {
  renderHTML(res, "now_playing");
});

// 인기순
router.get("/popular", (_, res) => {
  renderHTML(res, "popular");
});

// 평점순
router.get("/top-rated", (_, res) => {
  renderHTML(res, "top_rated");
});

// 상영 예정
router.get("/upcoming", (_, res) => {
  renderHTML(res, "upcoming");
});

router.get("/detail/:movieId", (req, res) => {
  const referer = req.get("Referer");
  const movieId = req.params.movieId;
  const filter = referer?.split("/").at(-1);

  if (filter && ["popular", "top-rated", "upcoming"].includes(filter)) {
    renderHTML(res, filter, true, movieId);
  } else {
    renderHTML(res, "now_playing", true, movieId);
  }
});

export default router;
