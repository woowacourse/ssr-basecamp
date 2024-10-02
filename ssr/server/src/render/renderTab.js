const isHomeTab = (currentTab) => {
  return (
    currentTab === "/" ||
    currentTab === "/detail" ||
    currentTab === "now-playing"
  );
};

export const renderTab = (currentTab) => {
  return /*html*/ `
          <ul class="tab">
            <li>
            <a href="/now-playing">
                <div class="${
                  isHomeTab(currentTab) ? "tab-item selected" : "tab-item"
                }">
                <h3>상영 중</h3>
                </div>
            </a>
            </li>
            <li>
            <a href="/popular">
                <div class="${
                  currentTab === "popular" ? "tab-item selected" : "tab-item"
                }">
                <h3>인기순</h3>
                </div>
            </a>
            </li>
            <li>
            <a href="/top-rated">
                <div class="${
                  currentTab === "top-rated" ? "tab-item selected" : "tab-item"
                }">
                <h3>평점순</h3>
                </div>
            </a>
            </li>
            <li>
            <a href="/upcoming">
                <div class="${
                  currentTab === "upcoming" ? "tab-item selected" : "tab-item"
                }">
                <h3>상영 예정</h3>
                </div>
            </a>
            </li>
        </ul>
        `;
};
