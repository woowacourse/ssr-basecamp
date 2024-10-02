import { Router } from "express";
import { handleMovieRequest } from "../controller/handleMovieRequest.js";

const router = Router();

router.get("/", (_, res) => handleMovieRequest(res, "NOW_PLAYING"));
router.get("/popular", (_, res) => handleMovieRequest(res, "POPULAR"));
router.get("/top-rated", (_, res) => handleMovieRequest(res, "TOP_RATED"));
router.get("/upcoming", (_, res) => handleMovieRequest(res, "UPCOMING"));

export default router;
