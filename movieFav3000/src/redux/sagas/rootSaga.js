import { all } from "redux-saga/effects";
import dataSaga from "./dataSaga";

// Combine all sagas, there is no need, but it is a good practice
export default function* rootSaga() {
  yield all([dataSaga()]);
}
