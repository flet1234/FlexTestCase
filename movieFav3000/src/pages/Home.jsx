import MovieCard from "../components/MovieCard";
import MovieFilter from "../components/MovieFilter";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataRequest } from "../redux/actions/actionCreators";

function Home() {
    console.log("Home");
    
    const [filter, setFilter] = useState("popular");

  const dispatch = useDispatch();
    const { movies, error, loading } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(fetchDataRequest(filter));
  }, [filter, dispatch]);

  return (
    <>
      <div>
        <MovieFilter filter={filter} setFilter={setFilter} />
      </div>
      {filter !== "favorites" && (
        <div>
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
      {filter === "favorites" && movies.length > 0 && (
        <div>
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
      {filter === "favorites" && movies.length === 0 && (
        <div>
          <p>No favorites yet!</p>
        </div>
      )}
    </>
  );
}

export default Home;
