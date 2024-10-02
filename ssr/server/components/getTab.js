export default function getTab(href) {
  const tabTemplate = ({ href: curHref, name }) => `<li>
            <a href="${href}">
              <div class="tab-item ${curHref === href ? "selected" : ""}">
                <h3>${name}</h3>
              </div></a >
          </li>`;

  const tabList = [
    { href: "/now-playing", name: "상영중" },
    { href: "/popular", name: "인기순" },
    { href: "/top-rated", name: "평점순" },
    { href: "/upcoming", name: "상영 예정" },
  ];

  return tabList.map((tab) => tabTemplate(tab)).join("");
}
