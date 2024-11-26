import MovieCard from "../components/MovieCard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataRequest } from "../redux/actions/actionCreators";
import { useNavigate, useParams } from "react-router-dom";
import "../css/home.css";

function NowPlaying() {
  const [selectedMovie, setSelectedMovie] = useState(0); // Tracks the selected movie

  const dispatch = useDispatch();
  const { movies, error, loading } = useSelector((state) => state.data);

  const navigate = useNavigate();

  const { pageNum } = useParams();

  const page = parseInt(pageNum);

  useEffect(() => {
    // Validate the page number
    const validPage = !isNaN(page) && page > 0 && page < 501;
    if (!validPage) {
      navigate("/not-found");
      return;
    }
    // Fetch data
    dispatch(fetchDataRequest("now_playing", page));
  }, [page, error, dispatch]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        // Navigate to the next movie
        setSelectedMovie((prev) => (prev + 1) % movies.length);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        // Navigate to the previous movie
        setSelectedMovie((prev) => (prev - 1 + movies.length) % movies.length);
      }

      if (e.key === "Enter") {
        navigate(`/movie/${movies[selectedMovie].id}`);
      }

      if (e.key === "Escape") {
        setSelectedMovie(0);
      }

      if (e.key === "PageUp") {
        e.preventDefault();
        handlePageChange("previous");
      }

      if (e.key === "PageDown") {
        e.preventDefault();
        handlePageChange("next");
      }
    };

    // Add event listener
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [movies.length, selectedMovie, page, navigate]);

  // Handle pagination
  const handlePageChange = (operation) => {
    if (operation === "next") {
      if (page < 500) {
        navigate(`/now-playing/${page + 1}`);
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }
    }
    if (operation === "previous") {
      if (page > 1) navigate(`/now-playing/${page - 1}`);
      // Not sure if scrollTo is needed here
    }
  };

  return (
    <>
      <div className="movieCardContainer">
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {movies.length > 0 && movies.map((movie, index) => (
          <MovieCard key={movie.id} movie={movie} isSelected={selectedMovie === index} />
        ))}
        {movies.length === 0 && !loading && <h2>Sorry no more movies in this section</h2>}
      </div>
      <div className="homePagBTNContainer">
        {page > 1 && <button onClick={() => handlePageChange("previous")}>Previous</button>}
        {page < 500 && <button onClick={() => handlePageChange("next")}>Next</button>}
      </div>
    </>
  );
}

export default NowPlaying;
