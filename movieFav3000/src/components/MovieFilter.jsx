import { useNavigate } from "react-router-dom";
import "../css/movieFilter.css";

function MovieFilter({ filter, setFilter }) {
  const navigate = useNavigate();
  
  const handleSelect = (event) => {
    const selectedFilter = event.target.value;
    if (selectedFilter !== filter) {
      setFilter(selectedFilter);
      navigate("/1");
    }
  };

  return (
    <div className="movieFilterContainer">
      <h3>Filter: </h3>
      <select value={filter} onChange={handleSelect} className="movieFilter">
        <option value="popular">Most popular</option>
        <option value="now_playing">Now in theaters</option>
        <option value="favorites">Your favorites</option>
      </select>
    </div>
  );
}

export default MovieFilter;
