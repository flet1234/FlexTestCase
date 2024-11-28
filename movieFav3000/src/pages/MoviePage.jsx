import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFavoriteToStoreAndLocalStorage } from "../redux/actions/actionCreators";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getFilmDetails } from "../services/movieService";
import LikeButton from "../components/LikeButton";
import { dateFormatter } from "../utilities/utils";
import "../css/moviePage.css";

function MoviePage() {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  // Convert id to number to match the type in the favorites array
  const idNum = parseInt(id);
  const favorites = useSelector((state) => state.data.favorites);

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

  const handleLike = () => {
    dispatch(addFavoriteToStoreAndLocalStorage(idNum));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Navigate back
      if (e.key === "Escape") {
        e.preventDefault();
        navigate(-1);
      }

      // Add to favorites
      if (e.key === "Enter") {
        handleLike(e);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate, handleLike]);

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {movie.id > 0 && (
        <section className="moviePageContainer">
          <aside className="moviePageImgContainer">
            <img src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`} alt={`${movie.original_title} poster`} />
            <LikeButton movieId={movie.id} />
          </aside>
          <article className="moviePageArticle">
            {movie.title && <h2>{movie.title}</h2>}
            {movie.tagline && <h3>{movie.tagline}</h3>}
            {movie.overview && <p>{movie.overview}</p>}
            {movie.genres && movie.genres.length > 0 && <p>Genre: {movie.genres.map((genre) => genre.name).join(", ")}.</p>}
            {movie.release_date && <p>Release date: {dateFormatter(movie.release_date)}</p>}
            {movie.vote_average && <p>Rating: {movie.vote_average}</p>}
            {movie.production_companies && movie.production_companies.length > 0 && (
              <p>Production companies: {movie.production_companies.map((company) => company.name).join(", ")}</p>
            )}
            {movie.budget && <p>Budget: {movie.budget}$</p>}
            {movie.revenue && <p>Revenue: {movie.revenue}$</p>}
            <div className="moviePageButtons">
              <Link to="/">
                <button>Back</button>
              </Link>
              <button onClick={handleLike}>{favorites.includes(idNum) ? "Remove from favorites" : "Add to favorites"}</button>
            </div>
          </article>
        </section>
      )}
    </>
  );
}

export default MoviePage;
