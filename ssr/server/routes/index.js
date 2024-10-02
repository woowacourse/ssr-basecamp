import { Router } from "express";
import { getMovies } from "../controllers/getMovies.js";
import { getDetailMovie } from "../controllers/getDetailMovie.js";

const router = Router();

router.get("/", getMovies);
router.get("/now-playing", getMovies);
router.get("/popular", getMovies);
router.get("/top-rated", getMovies);
router.get("/upcoming", getMovies);
router.get("/detail/:id", getDetailMovie);

export default router;
