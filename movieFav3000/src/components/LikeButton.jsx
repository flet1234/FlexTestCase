import { useDispatch } from "react-redux";
import { addFavoriteToStoreAndLocalStorage } from "../redux/actions/actionCreators";
import "../css/likeButton.css";
import { memo, useCallback } from "react";

const LikeButton = memo(({ movieId, isFavorite })=>{
  const dispatch = useDispatch();

  const handleLike = useCallback((e) => {
    e.preventDefault();
    // Add or remove favorite from store and localStorage
    dispatch(addFavoriteToStoreAndLocalStorage(movieId));
  }, [dispatch, movieId]);

  return (
    <form onSubmit={handleLike} className="likeContainer">
      <button type="submit" className="likeButton">
        {isFavorite ? "★" : "☆"}
      </button>
    </form>
  );
});

export default LikeButton;
