import axios, { AxiosError, AxiosResponse } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { IGetNewsData } from "../../../types/news";
import {
  addNewArticleRequest,
  addNewsArticle,
  deleteArticleRequest,
  deleteNewsArticle,
  errorReducer,
  getNewsStart,
  newsSuccessGetting,
  searchArticles,
  searchArticlesRequest,
  updateArticleRequest,
  updateNewsArticle,
} from "./slice";
import { PayloadAction } from "@reduxjs/toolkit";

function* getNewsSaga() {
  try {
    const newsResponse: AxiosResponse<IGetNewsData[]> = yield call(
      axios.get,
      "http://localhost:5000/news"
    );
    yield put(newsSuccessGetting(newsResponse.data));
  } catch (error) {
    const err = error as AxiosError;
    yield put(errorReducer(err.message));
  }
}

function* addNewsArticleSaga(action: ReturnType<typeof addNewArticleRequest>) {
  try {
    const addNews: AxiosResponse<IGetNewsData> = yield call(
      axios.post,
      "http://localhost:5000/news",
      action.payload
    );
    yield put(addNewsArticle(addNews.data));
  } catch (error) {
    const err = error as AxiosError;
    yield put(errorReducer(err.message));
  }
}

function* updateNewsArticleSaga(action: PayloadAction<IGetNewsData>) {
  try {
    const updateNews: AxiosResponse<IGetNewsData> = yield call(
      axios.patch,
      `http://localhost:5000/news/${action.payload.id} `,
      action.payload
    );
    yield put(updateNewsArticle(updateNews.data));
  } catch (error) {
    const err = error as AxiosError;
    yield put(errorReducer(err.message));
  }
}
function* deleteNewsArticleSaga(action: PayloadAction<string>) {
  try {
    yield call(axios.delete, `http://localhost:5000/news/${action.payload} `);
    yield put(deleteNewsArticle(action.payload));
  } catch (error) {
    const err = error as AxiosError;
    yield put(errorReducer(err.message));
  }
}
function* searchArticlesSaga(action: PayloadAction<string>) {
  try {
    const response: AxiosResponse<IGetNewsData[]> = yield call(
      axios.get,
      "http://localhost:5000/news"
    );

    const searchQuery = action.payload.toLowerCase();

    const filteredArticles = response.data.filter(({ title }: IGetNewsData) =>
      title.toLowerCase().includes(searchQuery)
    );

    yield put(searchArticles(filteredArticles));
  } catch (error) {
    const err = error as AxiosError;
    yield put(errorReducer(err.message));
  }
}

export function* fetchSagaNews() {
  yield takeLatest(getNewsStart.type, getNewsSaga);
  yield takeLatest(addNewArticleRequest.type, addNewsArticleSaga);
  yield takeLatest(updateArticleRequest.type, updateNewsArticleSaga);
  yield takeLatest(deleteArticleRequest.type, deleteNewsArticleSaga);
  yield takeLatest(searchArticlesRequest.type, searchArticlesSaga);
}
