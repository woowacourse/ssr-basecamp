import { Router } from "express";
import { renderMoviePage } from "./moviePage.js";
import { renderDetailModal } from "./detail/detailModal.js";

const router = Router();

router.get("/", (req, res) => renderMoviePage(req, res, "now_playing"));
router.get("/now-playing", (req, res) => renderMoviePage(req, res, "now_playing"));
router.get("/top-rated", (req, res) => renderMoviePage(req, res, "top_rated"));
router.get("/popular", (req, res) => renderMoviePage(req, res, "popular"));
router.get("/upcoming", (req, res) => renderMoviePage(req, res, "upcoming"));

router.get("/detail/:movieId", async (req, res) => renderDetailModal(req,res));

export default router;
