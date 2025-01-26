import { all, fork } from "redux-saga/effects";
import { fetchSagaNews } from "./features/news/saga";

export default function* rootSaga() {
  yield all([fork(fetchSagaNews)]);
}
