import { useEffect, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import ReactPaginate from "react-paginate";
import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import SearchBar from "../SearchBar/SearchBar";
import css from "./App.module.css";

export default function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: query.length > 0,
    placeholderData: keepPreviousData,
  });

  const handleSearch = (nextQuery: string): void => {
    setQuery(nextQuery);
    setPage(1);
    setSelectedMovie(null);
  };

  const movies = data?.results ?? [];
  const totalPages = data?.total_pages ?? 0;

  useEffect(() => {
    if (data && !isFetching && data.results.length === 0) {
      toast.error("За вашим запитом нічого не знайдено.", {
        id: "no-movies",
      });
    }
  }, [data, isFetching]);

  return (
    <main className={css.container}>
      <Toaster position="top-right" />
      <h1 className={css.title}>Пошук фільмів</h1>
      <SearchBar onSubmit={handleSearch} />

      {isLoading && <Loader />}
      {isError && (
        <ErrorMessage
          message={
            error instanceof Error
              ? error.message
              : "Не вдалося завантажити фільми."
          }
        />
      )}

      {movies.length > 0 && (
        <>
          {isFetching && !isLoading && (
            <p className={css.updating}>Оновлюємо результати...</p>
          )}
          <MovieGrid movies={movies} onSelect={setSelectedMovie} />
        </>
      )}

      {totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </main>
  );
}
