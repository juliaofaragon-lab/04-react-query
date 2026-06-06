import type { Movie } from "../../types/movie";
import css from "./MovieGrid.module.css";

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
  return (
    <ul className={css.grid}>
      {movies.map((movie) => (
        <li className={css.card} key={movie.id}>
          <button
            className={css.cardButton}
            type="button"
            onClick={() => onSelect(movie)}
          >
            {movie.poster_path ? (
              <img
                className={css.poster}
                src={`${POSTER_BASE_URL}${movie.poster_path}`}
                alt={`Постер фільму «${movie.title}»`}
                loading="lazy"
              />
            ) : (
              <div className={css.placeholder}>Постер відсутній</div>
            )}
            <div className={css.info}>
              <h2 className={css.movieTitle}>{movie.title}</h2>
              <p className={css.meta}>
                {movie.release_date?.slice(0, 4) || "Рік невідомий"}
              </p>
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
}
