document.addEventListener("DOMContentLoaded", function () {
  const tabItems = document.querySelectorAll(".tab-item");
  const currentPath = window.location.pathname;

  tabItems.forEach((item) => {
    const link = item.closest("a");
    const isSelected = link.getAttribute("href") === currentPath;
    const isRootPath =
      link.getAttribute("href") === "/now-playing" && currentPath === "/";

    if (link && isSelected) {
      item.classList.add("selected");
    }
    if (link && isRootPath) {
      item.classList.add("selected");
    }

    link.addEventListener("click", function (e) {
      e.preventDefault();

      tabItems.forEach((tab) => tab.classList.remove("selected"));

      item.classList.add("selected");

      window.location.href = link.getAttribute("href");
    });
  });
});
