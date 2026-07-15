import SearchBar from "../SearchBar/SearchBar";
import css from "./App.module.css";
import MovieGrid from "../MovieGrid/MovieGrid";
import toast, { Toaster } from "react-hot-toast";
import fetchMovies from "../../services/movieService";
import { useState } from "react";
import type { Movie } from "../../types/movie";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [modalContent, setModalContent] = useState<Movie | null>(null);
  const setIsModalMenuClose = () => {
    setModalContent(null)
  }
  const handleMovieClick = (movie: Movie) => {
    setModalContent(movie)
  };
  const handleSearch = async (query: string) => {
    setMovies([]);
    setIsError(false);
    try {
      setIsLoading(true);
      const response = await fetchMovies({ query });
      if (!response.length) {
        toast.error("No movies found for your request.");
        return
      }
      setMovies(response);
      
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={css.app}>
      <Toaster />
      {modalContent !== null && (
        <MovieModal onClose={setIsModalMenuClose} movie={modalContent} />
      )}
      {isError && <ErrorMessage />}
      {isLoading && <Loader />}
      <SearchBar onSubmit={handleSearch}></SearchBar>
      {movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={handleMovieClick}/>
      )}
    </div>
  );
}

export default App;
