import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addFavorite, fillFavorites } from "../redux/actions/actionCreators";
import "../css/likeButton.css";

function LikeButton({ movieId }) {
  const dispatch = useDispatch();
  
  const userFavorites = JSON.parse(localStorage.getItem("favorites"));
  
  const favorites = useSelector((state) => state.data.favorites);

  useEffect(() => {
    // Fill favorites from localStorage
    if (userFavorites) {
      dispatch(fillFavorites(userFavorites));
    }
  }, []);

  const handleLike = (e) => {
    e.preventDefault();
    dispatch(addFavorite(movieId));
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (favorites.includes(movieId)) {
      localStorage.setItem("favorites", JSON.stringify(favorites.filter((id) => id !== movieId)));
      return;
    } else {
      localStorage.setItem("favorites", JSON.stringify([...favorites, movieId]));
    }
  };

  return (
    <form onSubmit={handleLike} className="likeContainer">
      <button type="submit" className="likeButton">
        {favorites.includes(movieId) ? "★" : "☆"}
      </button>
    </form>
  );
}

export default LikeButton;
