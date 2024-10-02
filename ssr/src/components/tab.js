const tabs = [
  {
    id: "now-playing",
    href: "/now-playing",
    label: "상영 중",
  },
  {
    id: "popular",
    href: "/popular",
    label: "인기순",
  },
  {
    id: "top-rated",
    href: "/top-rated",
    label: "평점순",
  },
  {
    id: "upcoming",
    href: "/upcoming",
    label: "상영 예정",
  },
];

export const renderTab = (selected) =>
  tabs
    .map(
      ({ id, href, label }) => /*html*/ `
      <li>
        <a href="${href}">
          <div class="tab-item ${id === selected ? "selected" : ""}">
            <h3>${label}</h3>
          </div>
        </a>
      </li>
    `,
    )
    .join("");
