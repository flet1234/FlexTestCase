import {
  FETCH_DATA_FAILURE,
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_NOW_PLAYING_REQUEST,
  FETCH_FAVORITES_REQUEST,
  ADD_FAVORITE,
  FILL_FAVORITES,
  ADD_FAVORITE_TO_STORE,
  ADD_FAVORITE_FAILURE,
  SET_LOADER
} from "./actionTypes";

export const fetchDataRequest = (filter, pageNum) => {
  
  // Different types of requests and then saga based on the filter value
  if (filter === "popular") return { type: FETCH_DATA_REQUEST, payload: { pageNum:pageNum} };
  if (filter === "now_playing") return { type: FETCH_NOW_PLAYING_REQUEST, payload: { pageNum: pageNum } };
  if (filter === "favorites") return { type: FETCH_FAVORITES_REQUEST };
};

export const addFavoriteToStoreAndLocalStorage = (movieId) => {
  return {
    type: ADD_FAVORITE,
    payload: movieId
  };
}

export const addFavoriteFailure = (error) => {
  return {
    type: ADD_FAVORITE_FAILURE,
    payload: error
  };
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

export const addFavoriteToStore = (movieId) => {
  return {
    type: ADD_FAVORITE_TO_STORE,
    payload: movieId
  };
};

export const fillFavorites = (arrayOfFavoriteMovieIds) => {
  return {
    type: FILL_FAVORITES,
    payload: arrayOfFavoriteMovieIds
  };
};

export const setLoader = () => {
  return {
    type: SET_LOADER
  };
}
