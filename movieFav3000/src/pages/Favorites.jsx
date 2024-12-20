import MovieCard from "../components/MovieCard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataRequest } from "../redux/actions/actionCreators";
import { useNavigate } from "react-router-dom";

import "../css/home.css";
import Loader from "../components/Loader";

function Favorites() {
  const [selectedMovie, setSelectedMovie] = useState(0); // Tracks the selected movie

  const dispatch = useDispatch();

  const { movies, error, loading, favorites } = useSelector((state) => state.data);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data
    dispatch(fetchDataRequest("favorites"));
  }, [dispatch]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        document.activeElement?.blur();
        // Navigate to the next movie
        setSelectedMovie((prev) => (prev + 1) % movies.length);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        document.activeElement?.blur();
        // Navigate to the previous movie
        setSelectedMovie((prev) => (prev - 1 + movies.length) % movies.length);
      }

      if (e.key === "Enter") {
        navigate(`/movie/${movies[selectedMovie].id}`);
      }

      if (e.key === "Escape") {
        setSelectedMovie(0);
      }
    };
    // Add event listener
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [movies, selectedMovie]);

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>
  
  const favoriteMovies = movies.filter((movie) => favorites.includes(movie.id));

  return (
    <div className="movieCardContainer">
      {favoriteMovies.length > 0 ? (
        favoriteMovies.map((movie, index) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isSelected={selectedMovie === index}
            isFavorite={true}
          />
        ))
      ) : (
        <h3>Start adding your favorites!</h3>
      )}
    </div>
  );
}

export default Favorites;
