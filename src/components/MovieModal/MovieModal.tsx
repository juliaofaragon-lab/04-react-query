import { useEffect, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import type { Movie } from "../../types/movie";
import css from "./MovieModal.module.css";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/original";

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>): void => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div
        className={css.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="movie-modal-title"
      >
        <button
          className={css.closeButton}
          type="button"
          onClick={onClose}
          aria-label="Закрити"
        >
          ×
        </button>
        {movie.backdrop_path && (
          <img
            className={css.image}
            src={`${BACKDROP_BASE_URL}${movie.backdrop_path}`}
            alt=""
          />
        )}
        <div className={css.content}>
          <h2 className={css.title} id="movie-modal-title">
            {movie.title}
          </h2>
          <p className={css.rating}>
            Рейтинг: {movie.vote_average.toFixed(1)} / 10
          </p>
          <p className={css.overview}>
            {movie.overview || "Опис цього фільму поки відсутній."}
          </p>
        </div>
      </div>
    </div>,
    document.body,
  );
}
