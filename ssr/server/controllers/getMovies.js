import htmlCache from "../services/HTMLCache.js";
import generateMoviePageHTML from "../services/generateMoviePageHTML.js";
import { ERROR_MESSAGES } from "../constants/messages.js";

export const getMovies = async (req, res) => {
  const currentPath = req.path;

  try {
    const renderedHTML = await generateMoviePageHTML(currentPath);

    htmlCache.setHTML(renderedHTML);

    res.send(renderedHTML);
  } catch (error) {
    console.error(ERROR_MESSAGES.fail_load_movie_data, error);
    return res.status(500).send(errorHTML);
  }
};
