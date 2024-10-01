import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { fetchMovie } from "../utils/tmdb.js";
import { renderMovieDetailModal } from "../utils/render.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

const handleMovieDetailRequest = async (req, res) => {
  try {
    const movieId = req.params.id;
    const movieDetail = await fetchMovie(movieId);

    const templatePath = path.join(__dirname, "../../views", "index.html");

    const detailHTML = renderMovieDetailModal(movieDetail);

    const template = fs.readFileSync(templatePath, "utf-8");
    const renderedHTML = template.replace("<!--${MODAL_AREA}-->", detailHTML);

    res.send(renderedHTML);
  } catch (error) {
    console.error(`Error fetching movie detail:`, error);
    res.status(500).send(`Error fetching movie detail`);
  }
};

router.get("/:id", handleMovieDetailRequest);

export default router;
