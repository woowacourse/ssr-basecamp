import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import fetch from "node-fetch";

const TMDB_TOKEN = process.env.TMDB_TOKEN;
const url = "https://api.themoviedb.org/3/authentication";

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
router.get(["/", "/now-playing"], (_, res) => {
  const templatePath = path.join(__dirname, "../../views", "index.html");
  const moviesHTML = "<p>들어갈 본문 작성</p>";

  const template = fs.readFileSync(templatePath, "utf-8");
  const renderedHTML = template.replace(
    "<!--${MOVIE_ITEMS_PLACEHOLDER}-->",
    moviesHTML
  );

  fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));

  res.send(renderedHTML);
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
