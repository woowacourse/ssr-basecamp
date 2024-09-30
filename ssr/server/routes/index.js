import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import fetch from "node-fetch";

const TMDB_TOKEN = process.env.TMDB_TOKEN;
// const url = "https://api.themoviedb.org/3/authentication";

const url = (filter) => {
  return `https://api.themoviedb.org/3/movie/${filter}?language=ko-KR&page=1`;
};

// https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1
// https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1
// https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=1
// https://api.themoviedb.org/3/movie/upcoming?language=ko-KR&page=1

const options = {
  method: "GET",
  headers: {
    Authorization: `Bearer ${TMDB_TOKEN}`,
    accept: "application/json",
  },
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

// 상영 중
router.get(["/", "/now-playing"], async (_, res) => {
  const templatePath = path.join(__dirname, "../../views", "index.html");

  try {
    const response = await fetch(url("popular"), options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const movies = data.result;
    const moviesHTML = `
    ${movies.map((movie) => "hello")}
  
  `;

    const template = fs.readFileSync(templatePath, "utf-8");
    const renderedHTML = template.replace(
      "<!--${MOVIE_ITEMS_PLACEHOLDER}-->",
      moviesHTML
    );

    res.send(renderedHTML);
  } catch (error) {
    (error) => console.error("Error:", error);
  }
});

// 인기순
router.get("/popular", (_, res) => {
  const templatePath = path.join(__dirname, "../../views", "index.html");
  const moviesHTML = "<p>들어갈 본문 작성</p>";

  const template = fs.readFileSync(templatePath, "utf-8");
  const renderedHTML = template.replace(
    "<!--${MOVIE_ITEMS_PLACEHOLDER}-->",
    moviesHTML
  );

  res.send(renderedHTML);
});

// 평점순
router.get("/top-rated", (_, res) => {
  const templatePath = path.join(__dirname, "../../views", "index.html");
  const moviesHTML = "<p>들어갈 본문 작성</p>";

  const template = fs.readFileSync(templatePath, "utf-8");
  const renderedHTML = template.replace(
    "<!--${MOVIE_ITEMS_PLACEHOLDER}-->",
    moviesHTML
  );

  res.send(renderedHTML);
});

// 상영 예정
router.get("/upcoming", (_, res) => {
  const templatePath = path.join(__dirname, "../../views", "index.html");
  const moviesHTML = "<p>들어갈 본문 작성</p>";

  const template = fs.readFileSync(templatePath, "utf-8");
  const renderedHTML = template.replace(
    "<!--${MOVIE_ITEMS_PLACEHOLDER}-->",
    moviesHTML
  );

  res.send(renderedHTML);
});

export default router;
