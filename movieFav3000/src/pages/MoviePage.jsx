import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite } from "../redux/actions/actionCreators";
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
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const favorites = useSelector((state) => state.data.favorites);

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
    dispatch(addFavorite(movie.id));
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (favorites.includes(movie.id)) {
      localStorage.setItem("favorites", JSON.stringify(favorites.filter((id) => id !== movie.id)));
    } else {
      localStorage.setItem("favorites", JSON.stringify([...favorites, movie.id]));
    }
  };
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        navigate("/");
      }

      if (e.key === "Enter") {
        e.preventDefault();
        handleLike(e);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate,handleLike]);


  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {movie.title && (
        <section className="moviePageContainer">
          <aside className="moviePageImgContainer">
            <img src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`} alt={`${movie.original_title} poster`} />
            <LikeButton movieId={movie.id} />
          </aside>
          <article className="moviePageArticle">
            <h2>{movie.title}</h2>
            <h3>{movie.tagline}</h3>
            <p>{movie.overview}</p>
            <p>Genre: {movie.genres.map((genre) => genre.name).join(", ")}.</p>
            <p>Release date: {dateFormatter(movie.release_date)}</p>
            <p>Rating: {movie.vote_average}</p>
            <p>Production companies: {movie.production_companies.map((company) => company.name).join(", ")}</p>
            <p>Budget: {movie.budget}$</p>
            <p>Revenue: {movie.revenue}$</p>
            <div className="moviePageButtons">
              <Link to="/">
                <button>Back</button>
              </Link>
              <button onClick={handleLike}>Add to favorites</button>
            </div>
          </article>
        </section>
      )}
    </>
  );
}

export default MoviePage;
