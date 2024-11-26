import MovieCard from "../components/MovieCard";
import MovieFilter from "../components/MovieFilter";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataRequest, fillFavorites } from "../redux/actions/actionCreators";
import "../css/home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const [filter, setFilter] = useState("popular");
  const [selectedMovie, setSelectedMovie] = useState(0); // Tracks the selected movie

  const dispatch = useDispatch();
  const { movies, error, loading, favorites } = useSelector((state) => state.data);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch movies
    dispatch(fetchDataRequest(filter));
  }, [filter, dispatch]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        e.preventDefault()
        // Navigate to the next movie
        setSelectedMovie((prev) => (prev + 1) % movies.length);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault()
        // Navigate to the previous movie
        setSelectedMovie((prev) => (prev - 1 + movies.length) % movies.length);
      }

      if (e.key === "Enter") {       
        navigate(`/movie/${movies[selectedMovie].id}`);
      }

      if (e.key === "Escape") {
        setSelectedMovie(0);
      }

      if (e.key === "PageDown") {
        e.preventDefault()
        if (filter === "popular") setFilter("now_playing");
        if (filter === "now_playing") setFilter("favorites");
        if (filter === "favorites") setFilter("popular");
      } else if (e.key === "PageUp") {
        e.preventDefault()
        if (filter === "popular") setFilter("favorites");
        if (filter === "now_playing") setFilter("popular");
        if (filter === "favorites") setFilter("now_playing");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [filter, movies.length, selectedMovie]);

  return (
    <>
      <div>
        <MovieFilter filter={filter} setFilter={setFilter} />
      </div>
      {filter !== "favorites" && (
        <div className="movieCardContainer">
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {movies.map((movie, index) => (
            <MovieCard key={movie.id} movie={movie} isSelected={selectedMovie === index} />
          ))}
        </div>
      )}
      {filter === "favorites" && movies.length > 0 && (
        <div className="movieCardContainer">
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {movies.map(
            (movie, index) =>
              favorites.includes(movie.id) && <MovieCard key={movie.id} movie={movie} isSelected={selectedMovie === index} />
          )}
        </div>
      )}
      {filter === "favorites" && favorites.length === 0 && (
        <div>
          <h3>Start adding your favorites!</h3>
        </div>
      )}
    </>
  );
}

export default Home;
