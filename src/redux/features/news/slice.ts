import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGetNewsData, NewsState } from "../../../types/news";

const initialState: NewsState = {
  articles: [],
  loading: false,
  error: null,
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    errorReducer(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    getNewsStart(state) {
      state.loading = true;
      state.error = null;
    },
    newsSuccessGetting(state, action) {
      state.loading = false;
      state.articles = action.payload;
    },

    addNewArticleRequest(state, _) {
      state.loading = true;
    },
    addNewsArticle(state, action: PayloadAction<IGetNewsData>) {
      state.loading = false;
      state.articles.push(action.payload);
    },

    updateArticleRequest(state, _) {
      state.loading = true;
    },
    updateNewsArticle(state, action: PayloadAction<IGetNewsData>) {
      state.loading = false;
      const index = state.articles.findIndex(
        (article) => article.id === action.payload.id
      );
      if (index !== -1) {
        state.articles[index] = action.payload;
      }
    },

    deleteArticleRequest(state, _: PayloadAction<string>) {
      state.loading = true;
    },
    deleteNewsArticle(state, action: PayloadAction<string>) {
      state.loading = false;
      state.articles = state.articles.filter(
        (article) => article.id !== action.payload
      );
    },

    searchArticlesRequest(state, _: PayloadAction<string>) {
      state.loading = true;
      state.error = null;
    },
    searchArticles(state, action: PayloadAction<IGetNewsData[]>) {
      state.loading = false;
      state.articles = action.payload;
    },
  },
});

export const {
  errorReducer,
  getNewsStart,
  newsSuccessGetting,
  addNewArticleRequest,
  addNewsArticle,
  updateArticleRequest,
  updateNewsArticle,
  deleteArticleRequest,
  deleteNewsArticle,
  searchArticlesRequest,
  searchArticles,
} = newsSlice.actions;

export default newsSlice.reducer;
