import MovieCard from "../components/MovieCard";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataRequest } from "../redux/actions/actionCreators";
import { useNavigate, useParams } from "react-router-dom";
import "../css/home.css";

function NowPlaying() {
  const [selectedMovie, setSelectedMovie] = useState(0); // Tracks the selected movie

  const dispatch = useDispatch();
  const { movies, error, loading, maxPage, favorites } = useSelector((state) => state.data);

  const navigate = useNavigate();

  const { pageNum } = useParams();

  const page = parseInt(pageNum);

  useEffect(() => {
    // Validate the page number
    const validPage = !isNaN(page) && page > 0;
    if (!validPage) {
      navigate("/not-found");
      return;
    }
    // Fetch data
    dispatch(fetchDataRequest("now_playing", page));
  }, [page, dispatch]);

  // Redirect to the last page if the page number is greater than the max page
  useEffect(() => {
    if (page > maxPage) {
      navigate(`/now-playing/${maxPage}`);
      return;
    }
  }, [page, maxPage, navigate]);

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
  const handlePageChange = useCallback(
    (operation) => {
      if (operation === "next") {
        if (page < maxPage) {
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
    },
    [page, maxPage, navigate]
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="movieCardContainer">
        {movies.length > 0 ? (
          movies.map((movie, index) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isSelected={selectedMovie === index}
              isFavorite={favorites.includes(movie.id) ? true : false}
            />
          ))
        ) : (
          <h2>Sorry no more movies in this section</h2>
        )}
      </div>
      <div className="homePagBTNContainer">
        {page > 1 && <button onClick={() => handlePageChange("previous")}>Previous</button>}
        {page < maxPage && <button onClick={() => handlePageChange("next")}>Next</button>}
      </div>
    </>
  );
}

export default NowPlaying;
