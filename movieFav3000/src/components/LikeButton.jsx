import { useDispatch } from "react-redux";
import { addFavorite, fetchDataRequest } from "../redux/actions/actionCreators";

function LikeButton({ movieId }) {
  const dispatch = useDispatch();

  const handleLike = (e) => {
    e.preventDefault();
    dispatch(addFavorite(movieId));
  };

  return (
    <form onSubmit={handleLike}>
      <button type="submit" className="likeButton">
        Like
      </button>
    </form>
  );
}

export default LikeButton;
