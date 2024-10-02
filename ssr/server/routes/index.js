import { Router } from "express";
import { loadMovieDetail, loadNowPlaying, loadPopular, loadTopRated, loadUpcoming } from "../api/loadMovies.js";
import { renderMovieDetailPage } from "../entities/movieDetail.js";
import { renderMoviePage } from "../entities/movies.js";

const router = Router();
const TAB_LIST = new Map([
  ["/now-playing", "상영 중"],
  ["/popular", "인기순"],
  ["/top-rated", "평점순"],
  ["/upcoming", "상영 예정"],
]);

const renderTabList = (tabList, curPath) => {
  return Array.from(tabList.entries())
    .map(
      ([path, name]) => `<li>
  <a href="${path}"
    ><div class="tab-item ${path === curPath ? "selected" : ""}">
      <h3>${name}</h3>
    </div></a
  >
</li>`
    )
    .join("");
};

const sendMoviePage = (movies) => async (req, res) => {
  const renderedHTML = renderMoviePage(movies).replace();
  const tabListHTML = renderTabList(TAB_LIST, req.path);

  const newRenderedHTML = renderedHTML.replace("<!--${TAB_LIST}-->", tabListHTML);

  res.send(newRenderedHTML);
};

const sendMovieDetailPage = async (req, res) => {
  const id = req.params.id;
  const movies = await loadNowPlaying();
  const movieDetail = await loadMovieDetail(id);
  const renderedHTML = renderMovieDetailPage(movies, movieDetail);
  const tabListHTML = renderTabList(TAB_LIST, "/now-playing");

  const newRenderedHTML = renderedHTML.replace("<!--${TAB_LIST}-->", tabListHTML);
  res.send(newRenderedHTML);
};

router.get("/", sendMoviePage(await loadNowPlaying()));
router.get("/now-playing", sendMoviePage(await loadNowPlaying()));
router.get("/popular", sendMoviePage(await loadPopular()));
router.get("/top-rated", sendMoviePage(await loadTopRated()));
router.get("/upcoming", sendMoviePage(await loadUpcoming()));
router.get("/detail/:id", sendMovieDetailPage);

export default router;
