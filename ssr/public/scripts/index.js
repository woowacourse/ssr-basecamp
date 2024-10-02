document.addEventListener('DOMContentLoaded', function () {
  initializeMovieCardEventListeners();
});

function initializeMovieCardEventListeners() {
  const movieCards = document.querySelectorAll('.item');

  movieCards.forEach(card => {
    card.addEventListener('click', function (event) {
      event.preventDefault();

      const movieId = card.getAttribute('data-id');
      history.pushState(null, null, `/detail/${movieId}`);  

      fetch(`/detail/${movieId}`)
        .then(response => response.text())
        .then(newContentHTML => {
          document.body.innerHTML = newContentHTML;
          initializeMovieCardEventListeners(); 
          initializeNewPageEventListeners();
        })
        .catch(error => console.error('페이지 대체 실패:', error));
    });
  });
}

function initializeNewPageEventListeners() {
  const closeModalButton = document.getElementById('closeModal');
  if (closeModalButton) {
    closeModalButton.addEventListener('click', () => {
      document.getElementById('modalBackground').remove();
      history.pushState(null, null, '/'); 
    });
  }
}