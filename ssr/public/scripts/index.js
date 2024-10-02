const modalCloseButton = document.getElementById("closeModal");
const modalBackground = document.getElementById("modalBackground");

modalCloseButton.addEventListener("click", () => {
  modalBackground.remove();
});
