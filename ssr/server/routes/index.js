import { Router } from "express";
import { renderMovieDetail, renderMovieList } from "../../src/render.js";


const router = Router();

router.get("/", renderMovieList);
router.get("/now-playing", renderMovieList);
router.get("/popular", renderMovieList);
router.get("/top-rated", renderMovieList);
router.get("/upcoming", renderMovieList);
router.get("/detail/:id", renderMovieDetail);

export default router;
