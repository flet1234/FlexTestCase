import "../css/movieCard.css";
import { dateFormatter } from "../utilities/utils";
import LikeButton from "./LikeButton";
import { Link } from "react-router-dom";
import { memo, useEffect, useRef } from "react";

const MovieCard = memo(({ movie, isSelected, isFavorite }) => {
  if (!movie) return null;
  if (movie.id === undefined) return null;
  if (movie.title === undefined) return null;


  // Scroll to the selected movie by arrow keys
  const selectedElement = useRef(null);

  useEffect(() => {
    if (isSelected && selectedElement.current) {
      selectedElement.current.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  }, [isSelected]);

  return (
    <div  ref={isSelected ? selectedElement : null}  className={`cardContainer ${isSelected ? "selected" : ""}`}>
      <LikeButton movieId={movie.id} isFavorite={isFavorite} />
      <Link to={`/movie/${movie.id}`} className="movieCardLink">
        <img
          className="cardImage"
          src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "/assets/images/noPic.png"}
          alt={`${movie.title} poster picture`}
        />
       <h2>{movie.title}</h2>
      </Link>
      {movie.release_date && <p>{dateFormatter(movie.release_date)}</p>}
    </div>
  );
});

export default MovieCard;