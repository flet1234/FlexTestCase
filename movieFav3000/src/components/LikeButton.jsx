import { useDispatch, useSelector } from "react-redux";
import { addFavoriteToStoreAndLocalStorage } from "../redux/actions/actionCreators";
import "../css/likeButton.css";

function LikeButton({ movieId }) {
  const dispatch = useDispatch();

  // Get favorites from the store
  const favorites = useSelector((state) => state.data.favorites); 

  const handleLike = (e) => {
    e.preventDefault();
    // Add or remove favorite from store and localStorage
    dispatch(addFavoriteToStoreAndLocalStorage(movieId));
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
