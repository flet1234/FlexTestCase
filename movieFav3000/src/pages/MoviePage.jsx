import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFavoriteToStoreAndLocalStorage } from "../redux/actions/actionCreators";
import { useParams, useNavigate } from "react-router-dom";
import { getFilmDetails } from "../services/movieService";
import LikeButton from "../components/LikeButton";
import "../css/moviePage.css";
import MovieDetails from "../components/MovieDetails";

function MoviePage() {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  // Convert id to number to match the type in the favorites array
  const idNum = parseInt(id);
  const favorites = useSelector((state) => state.data.favorites);

  // Check if the movie is in the favorites array
  const isFavorite = favorites.includes(idNum)

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    const movieData = async (id) => {
      try {
        const movieData = await getFilmDetails(id);
        setMovie(movieData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.message || "Something went wrong");
      }
    };
    movieData(id);
  }, [id]);

  const handleLike = useCallback(() => {
    dispatch(addFavoriteToStoreAndLocalStorage(idNum));
  }, [dispatch, idNum]);

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Navigate back
      if (e.key === "Escape") {
        e.preventDefault();
        handleBack();
      }

      // Add to favorites
      if (e.key === "Enter") {
        handleLike();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleLike, handleBack]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!movie) return <p>Movie not found</p>;

  return (
    <section className="moviePageContainer">
      <aside className="moviePageImgContainer">
        <img src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`} alt={`${movie.original_title} poster`} />
        <LikeButton movieId={movie.id} isFavorite={isFavorite} />
      </aside>
      <div className="detailsAndButtonsContainer">
        <MovieDetails movie={movie} />
        <div className="moviePageButtons">
          <button onClick={handleBack}>Back</button>
          <button onClick={handleLike}>{isFavorite ? "Remove from favorites" : "Add to favorites"}</button>
        </div>
      </div>
    </section>
  );
}

export default MoviePage;
