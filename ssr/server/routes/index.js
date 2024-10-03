import { Router } from "express";

import { MOVIE_PAGE_PATH } from "../../constants/path.js";

import { fetchAndRenderMovieDetailModal } from "../handler/movie-detail-modal.js";
import { fetchAndRenderMoviePage } from "../handler/movie-page.js";

const router = Router();

router.get(MOVIE_PAGE_PATH.home, fetchAndRenderMoviePage);
router.get(MOVIE_PAGE_PATH.nowPlaying, fetchAndRenderMoviePage);
router.get(MOVIE_PAGE_PATH.popular, fetchAndRenderMoviePage);
router.get(MOVIE_PAGE_PATH.topRated, fetchAndRenderMoviePage);
router.get(MOVIE_PAGE_PATH.upcoming, fetchAndRenderMoviePage);

router.get(MOVIE_PAGE_PATH.detail, fetchAndRenderMovieDetailModal);

export default router;
