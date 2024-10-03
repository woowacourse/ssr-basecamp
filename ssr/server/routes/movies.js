import express from "express";
import { renderMoviesPage } from "../controllers/moviesController.js";

// 각각의 경로에서 영화 데이터를 가져와 렌더링하는 라우트
const router = express.Router();

router.get("/", (req, res) => {
  renderMoviesPage(req, res, "POPULAR");
});

router.get("/now-playing", (req, res) =>
  renderMoviesPage(req, res, "NOW_PLAYING")
);

router.get("/popular", (req, res) => renderMoviesPage(req, res, "POPULAR"));
router.get("/top-rated", (req, res) => renderMoviesPage(req, res, "TOP_RATED"));
router.get("/upcoming", (req, res) => renderMoviesPage(req, res, "UPCOMING"));
router.get("/detail/:id", (req, res) => {
  const movieId = req.params.id;
  renderMoviesPage(req, res, "POPULAR", movieId); // 영화 목록과 모달 함께 렌더링
});

export default router;
