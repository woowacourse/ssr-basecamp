import { fetchMovieDetail } from "../apis/movieAPI.js";
import { generateMovieDetailHTML } from "../../utils/html.js";
import htmlCache from "../services/HTMLCache.js";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import { ERROR_MESSAGES } from "../constants/messages.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const templatePath = path.join(__dirname, "../../views", "error.html");
const errorHTML = fs.readFileSync(templatePath, "utf-8");

export const getDetailMovie = async (req, res) => {
  const { id } = req.params;

  try {
    const movieDetail = await fetchMovieDetail(id);
    const movieDetailHTML = generateMovieDetailHTML(movieDetail);
    const updatedHTML = htmlCache.replaceModal(movieDetailHTML);

    return res.send(updatedHTML);
  } catch (err) {
    console.error(ERROR_MESSAGES.fail_load_movie_info, err);

    return res.status(500).send(errorHTML);
  }
};
