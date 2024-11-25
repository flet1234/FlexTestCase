import "../css/movieCard.css"
import LikeButton from "./LikeButton";

function MovieCard({ movie }) {
  const baseURL = import.meta.env.VITE_BASE_URL;

  return (
    <div className="cardContainer">
      <LikeButton movieId={movie.id} />
      <img className="cardImage" src={`${baseURL}w500${movie.poster_path}`} alt={`${movie.original_title} poster picture`} />
      <h2>{movie.original_title}</h2>
      <p>{movie.release_date}</p>
    </div>
  );
}

export default MovieCard;
