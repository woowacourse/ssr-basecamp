import htmlCache from "./HTMLCache.js";
import generateMoviePageHTML from "./generateMoviePageHTML.js";
import { ERROR_MESSAGES } from "../constants/messages.js";

const initializeHTMLCache = async () => {
  try {
    const renderedHTML = await generateMoviePageHTML("/");

    htmlCache.setHTML(renderedHTML);
  } catch (error) {
    console.error(ERROR_MESSAGES.fail_save_cache_html, error);
  }
};

export default initializeHTMLCache;
