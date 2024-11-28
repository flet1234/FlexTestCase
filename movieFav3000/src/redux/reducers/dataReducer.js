import { FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE, FILL_FAVORITES, ADD_FAVORITE_TO_STORE } from "../actions/actionTypes";

const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

const initialState = {
  movies: [],
  favorites: favorites,
  loading: true,
  error: null,
  maxPage: 500, // Maximum number of pages for popular movies
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        movies: action.payload.results,
        loading: false,
        error: null,
        maxPage: action.payload.total_pages
      };
    case FETCH_DATA_FAILURE:
      return {
        ...state,
        movies: [],
        loading: false,
        error: action.payload
      };
    case ADD_FAVORITE_TO_STORE:
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
