import { FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE, ADD_FAVORITE, FILL_FAVORITES } from "../actions/actionTypes";

const initialState = {
  movies: [],
  favorites: [],
  loading: true,
  error: null
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        movies: action.payload,
        loading: false,
        error: null
      };
    case FETCH_DATA_FAILURE:
      return {
        ...state,
        movies: [],
        loading: false,
        error: action.payload
      };
    case ADD_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.includes(action.payload)
          ? state.favorites.filter((movieId) => movieId !== action.payload) // Remove if already a favorite
          : [...state.favorites, action.payload] // Add if not a favorite
      };
    case FILL_FAVORITES:
      return {
        ...state,
        favorites: action.payload
      };
    default:
      return state;
  }
};

export default dataReducer;
