import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getMovieDetailHTML, getMovieListHTML } from "../src/html.js";
import { fetchMovieDetail, fetchMovieList } from "../src/api.js";
import { URL_TO_MOVIE_LIST } from "./constant.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const renderMovieList = async (req, res) => {
  const templatePath = path.join(__dirname, "../views", "index.html");
  const movieListType = URL_TO_MOVIE_LIST[req.url];

  const movieList = (await fetchMovieList(movieListType)).results;
  const movieListHTML = getMovieListHTML(movieList);
  const template = fs.readFileSync(templatePath, "utf-8");
  const renderedHTML = template.replace("<!--${MOVIE_ITEMS_PLACEHOLDER}-->", movieListHTML);

  res.send(renderedHTML);
};

export const renderMovieDetail = async (req, res) => {
  const templatePath = path.join(__dirname, "../views", "index.html");
  const { id } = req.params;

  const movieDetail = await fetchMovieDetail(id);
  const movieDetailHTML = getMovieDetailHTML(movieDetail);
  const template = fs.readFileSync(templatePath, "utf-8");
  const renderedHTML = template.replace("<!--${MODAL_AREA}-->", movieDetailHTML);

  res.send(renderedHTML);
};