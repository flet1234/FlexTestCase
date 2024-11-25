import { call, put, takeEvery, select } from 'redux-saga/effects';
import { fetchDataFailure, fetchDataSuccess } from '../actions/actionCreators';
import { FETCH_DATA_REQUEST, FETCH_NOW_PLAYING_REQUEST, FETCH_FAVORITES_REQUEST } from '../actions/actionTypes';
import { getFavorites, getNowPlayingMovies, getPopularMovies } from "../../services/movieService";

function* fetchDataSaga() {
    try {
        const data = yield call(getPopularMovies);      
        yield put(fetchDataSuccess(data));
    } catch (error) {
        yield put(fetchDataFailure(error.message || 'An error occurred'));
    }
}
function* fetchNowPlayingSaga() {
    try {
        const data = yield call(getNowPlayingMovies);      
        yield put(fetchDataSuccess(data));
    } catch (error) {
        yield put(fetchDataFailure(error.message || 'An error occurred'));
    }
}

const selectFavorites = (state) => state.data.favorites;

function* fetchFavoritesSaga() {
    try {
        const favorites = yield select(selectFavorites);
        const data = yield call(getFavorites, favorites);      
        yield put(fetchDataSuccess(data));
    } catch (error) {
        yield put(fetchDataFailure(error.message || 'An error occurred'));
    }
}

export default function* dataSaga() {
    yield takeEvery(FETCH_DATA_REQUEST, fetchDataSaga);
    yield takeEvery(FETCH_NOW_PLAYING_REQUEST, fetchNowPlayingSaga);
    yield takeEvery(FETCH_FAVORITES_REQUEST, fetchFavoritesSaga);
}
