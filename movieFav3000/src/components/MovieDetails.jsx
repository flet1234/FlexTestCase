import { memo } from "react";
import { dateFormatter } from "../utilities/utils";

const MovieDetails = memo(({ movie }) => {
    return (
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
        {movie.budget != 0 && <p>Budget: {movie.budget} $</p>}
        {movie.revenue != 0 && <p>Revenue: {movie.revenue} $</p>}
      </article>
    );
})

export default MovieDetails;