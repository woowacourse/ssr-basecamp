import PropTypes from "prop-types";
import { CloseButton, StarEmpty } from "../../ImageResources";
import { round } from "../../utils";
import useModal from "../../hooks/useModal";
import { useEffect } from "react";

function Modal({ onCloseButtonClick }) {
  const { movieId, movieDetail, updateMovieDetail } = useModal();

  const { title, bannerUrl, releaseYear, description } = movieDetail;
  const genres = movieDetail?.genres?.join(", ");
  const rate = round(movieDetail?.rate, 1);

  useEffect(() => {
    updateMovieDetail(movieId);
  }, [movieId]);

  return (
    <div className="modal-background active" id="modalBackground">
      <div className="modal">
        <button className="close-modal" id="closeModal" onClick={onCloseButtonClick}>
          <img src={CloseButton} />
        </button>
        <div className="modal-container">
          <div className="modal-image">
            <img src={bannerUrl} />
          </div>
          <div className="modal-description">
            <h2>{title}</h2>
            <p className="category">
              {releaseYear} · {genres}
            </p>
            <p className="rate">
              <img src={StarEmpty} className="star" />
              <span>{round(rate, 1)}</span>
            </p>
            <hr />
            <p className="detail">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;

Modal.propTypes = {
  onCloseButtonClick: PropTypes.func,
};
