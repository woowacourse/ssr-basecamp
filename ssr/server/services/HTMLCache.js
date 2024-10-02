import { ERROR_MESSAGES } from "../constants/messages.js";

class HTMLCache {
  constructor() {
    this.cachedHTML = null;
  }

  setHTML(html) {
    this.cachedHTML = html;
  }

  getHTML() {
    return this.cachedHTML;
  }

  replaceModal(modalHTML) {
    if (!this.cachedHTML) {
      throw new Error(ERROR_MESSAGES.no_html);
    }
    return this.cachedHTML.replace("<!--${MODAL_AREA}-->", modalHTML);
  }
}

const htmlCache = new HTMLCache();

export default htmlCache;
