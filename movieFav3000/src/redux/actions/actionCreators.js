import {
  FETCH_DATA_FAILURE,
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_NOW_PLAYING_REQUEST,
  FETCH_FAVORITES_REQUEST,
  ADD_FAVORITE,
  FILL_FAVORITES
} from "./actionTypes";

export const fetchDataRequest = (filter) => {
  if (filter === "popular") return { type: FETCH_DATA_REQUEST };
  if (filter === "now_playing") return { type: FETCH_NOW_PLAYING_REQUEST };
  if (filter === "favorites") return { type: FETCH_FAVORITES_REQUEST };
};

export const fetchDataSuccess = (data) => {
  return {
    type: FETCH_DATA_SUCCESS,
    payload: data
  };
};

export const fetchDataFailure = (error) => {
  return {
    type: FETCH_DATA_FAILURE,
    payload: error
  };
};

export const addFavorite = (movieId) => {
  return {
    type: ADD_FAVORITE,
    payload: movieId
  };
};

export const fillFavorites = (arrayOfFavoriteMovieIds) => {
  return {
    type: FILL_FAVORITES,
    payload: arrayOfFavoriteMovieIds
  };
};
