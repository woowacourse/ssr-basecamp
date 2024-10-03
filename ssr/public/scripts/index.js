document.addEventListener("DOMContentLoaded", () => {
  const tabItems = document.querySelectorAll(".tab-item");

  tabItems.forEach((item) => {
    item.addEventListener("mouseover", () => {
      item.classList.add("hover");
    });

    item.addEventListener("mouseout", () => {
      item.classList.remove("hover");
    });
  });
});
