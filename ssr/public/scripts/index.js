const modalCloseButton = document.getElementById("closeModal");

modalCloseButton.addEventListener("click", () => {
  const modalBackground = document.getElementById("modalBackground");
  modalBackground.remove();
});
