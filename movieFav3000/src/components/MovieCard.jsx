import "../css/movieCard.css";
import { dateFormatter } from "../utilities/utils";
import LikeButton from "./LikeButton";
import { Link } from "react-router-dom";

function MovieCard({ movie, isSelected }) {
  return (
    <div className={`cardContainer ${isSelected ? "selected" : ""}`}>
      <LikeButton movieId={movie.id} />
      <Link to={`/movie/${movie.id}`} className="movieCardLink">
        <img
          className="cardImage"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={`${movie.title} poster picture`}
        />
        <h2>{movie.title}</h2>
      </Link>
      <p>{dateFormatter(movie.release_date)}</p>
    </div>
  );
}

export default MovieCard;