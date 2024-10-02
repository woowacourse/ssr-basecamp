import { Router } from "express";
import { handleMovieRequest } from "../controller/handleMovieRequest.js";

const router = Router();

const pageTypeMapping = {
  "now-playing": "NOW_PLAYING",
  popular: "POPULAR",
  "top-rated": "TOP_RATED",
  upcoming: "UPCOMING",
};

router.get("/:id", (req, res) => {
  const movieId = req.params.id;
  const previousPage = req.get("Referrer") || req.header("Referrer");

  const pagePathSegment = previousPage.split("/").at(-1);

  const movieListType = Object.keys(pageTypeMapping).includes(pagePathSegment)
    ? pageTypeMapping[pagePathSegment]
    : "NOW_PLAYING";

  handleMovieRequest(res, movieListType, movieId);
});

export default router;
