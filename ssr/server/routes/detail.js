import { Router } from "express";
import { getMovieDetailModal } from "../controller/main.js";

const router = Router();

router.get("/:id", getMovieDetailModal);

export default router;
