import { configureStore } from "@reduxjs/toolkit";

import eldersReducer from "../features/elders/eldersSlice";
import pictureReducer from "../features/allPictres/allPicturesSlice";
import imgReducer from "../features/imgCategory/imgCategorySlice";
import articleReducer from "../features/articles/articlesSlich";
import audioReducer from "../features/audios/audioSlice";
import downloadReducer from "../features/allDownload/allDownloadSlice";
import favoriteReducer from "../features/allFavorites/allFavoritesSlice";
import authReducer from "../features/auth/authSlice";
import contactReducer from "../features/contactUs/contactSlice";
import booksReducer from "../features/books/booksSlice";
import termsReducer from "../features/termCondition/termSlice";
import notifiReducer from "../features/notifiFeature/notifiSlice";

const store = configureStore({
  reducer: {
    
    elders: eldersReducer,
    pictures:pictureReducer,
    imgCategory:imgReducer,
    articles:articleReducer,
    audio:audioReducer,
    download:downloadReducer,
    favorite:favoriteReducer,
    auth:authReducer,
    contact:contactReducer,
    books:booksReducer,
    terms:termsReducer,
    notifi:notifiReducer,

  },
});

export default store;