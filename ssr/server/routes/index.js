import { Router } from "express";

import { getMoviePage } from "../controller/main.js";

const router = Router();

router.get("/", getMoviePage);
router.get("/now-playing", getMoviePage);
router.get("/popular", getMoviePage);
router.get("/top-rated", getMoviePage);
router.get("/upcoming", getMoviePage);

export default router;
