import SearchBar from "../SearchBar/SearchBar";
import css from "./App.module.css";
import MovieGrid from "../MovieGrid/MovieGrid";
import { Toaster } from "react-hot-toast";
import fetchMovies from "../../services/movieService";
import { useState } from "react";
import type { Movie } from "../../types/movie";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import Pagination from "../Pagination/Pagination";

function App() {
  const [modalContent, setModalContent] = useState<Movie | null>(null);
  const [topic, setTopic] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["movies", topic, currentPage],
    queryFn: () => fetchMovies({ query: topic, page: currentPage }),
    enabled: topic !== '',
    placeholderData: keepPreviousData
  });
  const setIsModalMenuClose = () => {
    setModalContent(null);
  };
  const handleSearch = async (topic: string) => {
    setTopic(topic);
    setCurrentPage(1);
  };
  const handleMovieClick = (movie: Movie) => {
    setModalContent(movie);
  };
  const totalPages = data?.total_pages ?? 0;
  return (
    <div className={css.app}>
      <Toaster />
      {modalContent !== null && (
        <MovieModal onClose={setIsModalMenuClose} movie={modalContent} />
      )}
      {isError && <ErrorMessage />}
      {isLoading && <Loader />}
      <SearchBar onSubmit={handleSearch}></SearchBar>
      { data! && data.results.length > 0 && (
        <MovieGrid movies={data.results} onSelect={handleMovieClick} />
      )}
      {isSuccess && totalPages > 1 && (<Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage}></Pagination>)}
    </div>
  );
}

export default App;
