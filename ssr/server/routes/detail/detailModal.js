import fs from "fs";
import path from "path";

import { getMovieDetail, getMovies } from "../../services/movieService.js";
import { getDetailModalHTML } from "./detailModalComponents.js";
import { getBestMovieHTML, getMoviesHTML, getTabHTML } from "../moviePageComponents.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const renderDetailModal = async (req, res) => {
  const movieId = req.params.movieId;
  //TODO: (@Todari) 이전의 path를 이용해서 배경이 렌더되도록 변경 필요 (req.query.from)
  const movies = await getMovies("now_playing");
  const movieDetail = await getMovieDetail(movieId);
  
  const templatePath = path.join(__dirname, "../../../views", "index.html");
  const template = fs.readFileSync(templatePath, "utf-8");
  
  const moviesHTML = getMoviesHTML(movies)
  const bestMovieHTML = getBestMovieHTML(movies[0])
  const tabHTML = getTabHTML("/now-playing")
  const modalHTML = getDetailModalHTML(movieDetail);
  
  const renderedHTML = template
    .replace('<!--${BEST_MOVIE_PLACEHOLDER}-->', bestMovieHTML)
    .replace('<!--${MOVIE_ITEMS_PLACEHOLDER}-->', moviesHTML)
    .replace('<!--${TAB_PLACEHOLDER}-->', tabHTML)
    .replace('<!--${MODAL_AREA}-->', modalHTML);

  res.send(renderedHTML);
}