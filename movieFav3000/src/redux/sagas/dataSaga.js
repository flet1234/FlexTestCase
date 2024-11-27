import { call, put, takeEvery, select } from "redux-saga/effects";
import { addFavoriteToStore, fetchDataFailure, fetchDataSuccess, addFavoriteFailure } from "../actions/actionCreators";
import { FETCH_DATA_REQUEST, FETCH_NOW_PLAYING_REQUEST, FETCH_FAVORITES_REQUEST, ADD_FAVORITE } from "../actions/actionTypes";
import { getFavorites, getNowPlayingMovies, getPopularMovies } from "../../services/movieService";

// saga for popular movies
function* fetchDataSaga(action) {
  try {
    const { pageNum } = action.payload;
    const data = yield call(getPopularMovies, pageNum);
    yield put(fetchDataSuccess(data));
  } catch (error) {
    yield put(fetchDataFailure(error.message || "An error occurred"));
  }
}
// saga for now playing movies
function* fetchNowPlayingSaga(action) {
  try {
    const { pageNum } = action.payload;
    const data = yield call(getNowPlayingMovies, pageNum);
    yield put(fetchDataSuccess(data));
  } catch (error) {
    yield put(fetchDataFailure(error.message || "An error occurred"));
  }
}

// Selector for favorites, to pass all id's to getFavorites function
const selectFavorites = (state) => state.data.favorites;

// saga for favorites
function* fetchFavoritesSaga() {
  try {
    const favorites = yield select(selectFavorites);
    const data = yield call(getFavorites, favorites);
    yield put(fetchDataSuccess(data));
  } catch (error) {
    yield put(fetchDataFailure(error.message || "An error occurred"));
  }
}

// middleware for adding favorite movies and syncing with local storage
function* addFavoriteSaga(action) {
  try {
    const movieId  = action.payload;
    yield put(addFavoriteToStore(movieId));
    const favorites = yield select(selectFavorites);
    localStorage.setItem("favorites", JSON.stringify(favorites))
  } catch (error) {
    yield put(addFavoriteFailure(error.message || "An error occurred"));
  }
}

export default function* dataSaga() {
  yield takeEvery(FETCH_DATA_REQUEST, fetchDataSaga);
  yield takeEvery(FETCH_NOW_PLAYING_REQUEST, fetchNowPlayingSaga);
  yield takeEvery(FETCH_FAVORITES_REQUEST, fetchFavoritesSaga);
  yield takeEvery(ADD_FAVORITE, addFavoriteSaga);
}
