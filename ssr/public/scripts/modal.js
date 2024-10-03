document.addEventListener('DOMContentLoaded', () => {
  const modalBackground = document.querySelector('.modal-background');
  const modalCloseButton = document.querySelector('.close-modal');

  if (modalCloseButton) {
    modalCloseButton.addEventListener('click', () => {
      if (modalBackground) {
        modalBackground.remove();
      }
    });
  }

  if (modalBackground) {
    modalBackground.addEventListener('click', (event) => {
      if (event.target === modalBackground) {
        modalBackground.remove();
      }
    });
  }
});
