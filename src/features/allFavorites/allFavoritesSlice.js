import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../Api/baseURL";

const initialState = {
    allEldersFavorite: [],
    allPicturesFavorite: [],
    allBooksFavorite: [],
    allAudiosFavorite: [],
    // allPicturesData: [],
    isLoading: false,
    error: null,
  };
  
  
  
  const getAllEldersFavorite = createAsyncThunk('get/AllEldersFavorite', async (_, thunkAPI) => {
      try {
        const response = await baseUrl.get(
          'Favorite/Get_Favorite_Elder');
        return response.data;
      } catch (error) {
        return error
      }
    });


  const getPicturesFavorite = createAsyncThunk('get/AllPicturesFavorite', async (_, thunkAPI) => {
      try {
        const response = await baseUrl.get(
          'Favorite/Get_Favorite_image');
        return response.data;
      } catch (error) {
        return error
      }
    });


  const getBooksFavorite = createAsyncThunk('get/AllBooksFavorite', async (_, thunkAPI) => {
      try {
        const response = await baseUrl.get(
          'Favorite/Get_Favorite_Books');
        return response.data;
      } catch (error) {
        return error
      }
    });


  const getAudiosFavorite = createAsyncThunk('get/AllAudiosFavorite', async (_, thunkAPI) => {
      try {
        const response = await baseUrl.get(
          'Favorite/Get_Favorite_Audios');
        return response.data;
      } catch (error) {
        return error
      }
    });




    const FavoriteSlice = createSlice({
        // name: 'getAllPicuture',
        name: 'getAllEldersDownload',
      
        initialState,
        reducers: {},
        extraReducers: (builder) => {
          builder
            .addCase(getAllEldersFavorite.pending, (state) => {
              state.isLoading = true;
              state.error = null;
            })
            .addCase(getAllEldersFavorite.fulfilled, (state, action) => {
              state.allEldersFavorite = action.payload;
              state.isLoading = false;
              state.error = null;
            })
            .addCase(getAllEldersFavorite.rejected, (state, action) => {
              state.isLoading = false;
              state.error = action.payload;
            })


            .addCase(getPicturesFavorite.pending, (state) => {
                state.isLoading = true;
                state.error = null;
              })
              .addCase(getPicturesFavorite.fulfilled, (state, action) => {
                state.allPicturesFavorite = action.payload;
                state.isLoading = false;
                state.error = null;
              })
              .addCase(getPicturesFavorite.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
              })
            
              
              .addCase(getBooksFavorite.pending, (state) => {
                state.isLoading = true;
                state.error = null;
              })
              .addCase(getBooksFavorite.fulfilled, (state, action) => {
                state.allBooksFavorite = action.payload;
                state.isLoading = false;
                state.error = null;
              })
              .addCase(getBooksFavorite.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
              })


              .addCase(getAudiosFavorite.pending, (state) => {
                state.isLoading = true;
                state.error = null;
              })
              .addCase(getAudiosFavorite.fulfilled, (state, action) => {
                state.allAudiosFavorite = action.payload;
                state.isLoading = false;
                state.error = null;
              })
              .addCase(getAudiosFavorite.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
              })
  

            }}
            );
      export { getAllEldersFavorite , getPicturesFavorite , getBooksFavorite ,getAudiosFavorite  };
      
      export default FavoriteSlice.reducer;