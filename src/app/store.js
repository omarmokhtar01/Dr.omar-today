import { configureStore } from "@reduxjs/toolkit";

import eldersReducer from "../features/elders/eldersSlice";
import pictureReducer from "../features/allPictres/allPicturesSlice";
import imgReducer from "../features/imgCategory/imgCategorySlice";
import articleReducer from "../features/articles/articlesSlich";
import audioReducer from "../features/audios/audioSlice";
import downloadReducer from "../features/allDownload/allDownloadSlice";
import favoriteReducer from "../features/allFavorites/allFavoritesSlice";

const store = configureStore({
  reducer: {
    
    elders: eldersReducer,
    pictures:pictureReducer,
    imgCategory:imgReducer,
    articles:articleReducer,
    audio:audioReducer,
    download:downloadReducer,
    favorite:favoriteReducer,

  },
});

export default store;