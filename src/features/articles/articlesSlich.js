import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../Api/baseURL";

const initialState = {
    articles: [],
    articleCategory: [],
    articleCategoryId:[],
    oneArticale:{},
    
    isLoading: false,
    error: null,
  };
  
   


  
    const getArticles = createAsyncThunk('get/articles', async (_, thunkAPI) => {
      try {
        const response = await baseUrl.get(
          `Articles/Get`);
          console.log(response.data);
        return response.data;
      } catch (error) {
        return error
      }
    });


    const getArticleCategory = createAsyncThunk('get/artical-category', async (_, thunkAPI) => {
      try {
        const response = await baseUrl.get(
          `Articles-Categories/Get`);
        return response.data;
      } catch (error) {
        return error
      }
    });


    const getArticleCategoryById = createAsyncThunk('get/category-id', async (id, thunkAPI) => {
      try {
        const response = await baseUrl.post(
          `Articles-Categories/Get-Articles-From-Category?id=${id}`);
          console.log(response.data);
        return response.data;
      } catch (error) {
        return error
      }
    });



    const getArticleCategoryOne = createAsyncThunk('get/category-one-id', async (id, thunkAPI) => {
      try {
        const response = await baseUrl.post(
          `Articles/Get-id?id=${id}`);
          console.log(response.data);
        return response.data;
      } catch (error) {
        return error
      }
    });

    const articlesSlich = createSlice({
        name: 'articles',
      
        initialState,
        reducers: {},
        extraReducers: (builder) => {
          builder
            .addCase(getArticles.pending, (state) => {
              state.isLoading = true;
              state.error = null;
            })
            .addCase(getArticles.fulfilled, (state, action) => {
              state.articles = action.payload;
              state.isLoading = false;
              state.error = null;
            })
            .addCase(getArticles.rejected, (state, action) => {
              state.isLoading = false;
              state.error = action.payload;
            })
            
  
            .addCase(getArticleCategory.pending, (state) => {
              state.isLoading = true;
              state.error = null;
            })
            .addCase(getArticleCategory.fulfilled, (state, action) => {
              state.articleCategory = action.payload;
              state.isLoading = false;
              state.error = null;
            })
            .addCase(getArticleCategory.rejected, (state, action) => {
              state.isLoading = false;
              state.error = action.payload;
            })
            
  
            .addCase(getArticleCategoryById.pending, (state) => {
              state.isLoading = true;
              state.error = null;
            })
            .addCase(getArticleCategoryById.fulfilled, (state, action) => {
              state.articleCategoryId = action.payload;
              state.isLoading = false;
              state.error = null;
            })
            .addCase(getArticleCategoryById.rejected, (state, action) => {
              state.isLoading = false;
              state.error = action.payload;
            })
            






            .addCase(getArticleCategoryOne.pending, (state) => {
              state.isLoading = true;
              state.error = null;
            })
            .addCase(getArticleCategoryOne.fulfilled, (state, action) => {
              state.oneArticale = action.payload;
              state.isLoading = false;
              state.error = null;
            })
            .addCase(getArticleCategoryOne.rejected, (state, action) => {
              state.isLoading = false;
              state.error = action.payload;
            })


            }}
            );
      export { getArticles,getArticleCategory,getArticleCategoryById ,getArticleCategoryOne};
      
      export default articlesSlich.reducer;