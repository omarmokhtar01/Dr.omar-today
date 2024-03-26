import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../Api/baseURL";

const initialState = {
    allEldersFavorite: [],
    allPicturesFavorite: [],
    allBooksFavorite: [],
    allAudiosFavorite: [],
    // allPicturesData: [],

    delAudio:{},
    delBook:{},
    delElder:{},
    delImg:{},


    isLoading: false,
    error: null,
  };
  
  
  
  const getAllEldersFavorite = createAsyncThunk('get/AllEldersFavorite', async (token, thunkAPI) => {
      try {
        const response = await baseUrl.get(
          'Favorite/Get_Favorite_Elder', { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
      } catch (error) {
        return error
      }
    });


  const getPicturesFavorite = createAsyncThunk('get/AllPicturesFavorite', async (token, thunkAPI) => {
      try {
        const response = await baseUrl.get(
          'Favorite/Get_Favorite_image', { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
      } catch (error) {
        return error
      }
    });


  const getBooksFavorite = createAsyncThunk('get/AllBooksFavorite', async (token, thunkAPI) => {
      try {
        const response = await baseUrl.get(
          'Favorite/Get_Favorite_Books', { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
      } catch (error) {
        return error
      }
    });


  const getAudiosFavorite = createAsyncThunk('get/AllAudiosFavorite', async (token, thunkAPI) => {
      try {
        const response = await baseUrl.get(
          'Favorite/Get_Favorite_Audios', { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
      } catch (error) {
        return error
      }
    });





    const removeOneAudiosFav = createAsyncThunk('del/OneAudiosFav', async ({token,id}, thunkAPI) => {
      try {
        const response = await baseUrl.get(
          `Favorite/deleteFavoriteSong?audio_id=${id}`,        { headers: { Authorization: `Bearer ${token}` } } // Sending token in request headers
          );
          console.log(response.data);
        return response.data;
      } catch (error) {
        return error
      }
    });


    const removeOneElderFav = createAsyncThunk('del/OneElderFav', async ({token,id}, thunkAPI) => {
      try {
        const response = await baseUrl.get(
          `Favorite/deleteFavoriteElder?elder_id=${id}`,        { headers: { Authorization: `Bearer ${token}` } } // Sending token in request headers
          );
          console.log(response.data);
        return response.data;
      } catch (error) {
        return error
      }
    });

    const removeOneBookFav = createAsyncThunk('del/OneBookFav', async ({token,id}, thunkAPI) => {
      try {
        const response = await baseUrl.get(
          `Favorite/deleteFavoriteBook?book_id=${id}`,        { headers: { Authorization: `Bearer ${token}` } } // Sending token in request headers
          );
          console.log(response.data);
        return response.data;
      } catch (error) {
        return error
      }
    });

    const removeOneImgFav = createAsyncThunk('del/OneImgFav', async ({token,id}, thunkAPI) => {
      try {
        const response = await baseUrl.get(
          `Favorite/deleteFavoriteImage?image_id=${id}`,        { headers: { Authorization: `Bearer ${token}` } } // Sending token in request headers
          );
          console.log(response.data);
        return response.data;
      } catch (error) {
        return error
      }
    });










    const FavoriteSlice = createSlice({
        // name: 'getAllPicuture',
        name: 'getFav',
      
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


              .addCase(removeOneAudiosFav.pending, (state) => {
                state.isLoading = true;
                state.error = null;
              })
              .addCase(removeOneAudiosFav.fulfilled, (state, action) => {
                state.delAudio = action.payload;
                state.isLoading = false;
                state.error = null;
              })
              .addCase(removeOneAudiosFav.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
              })


              .addCase(removeOneBookFav.pending, (state) => {
                state.isLoading = true;
                state.error = null;
              })
              .addCase(removeOneBookFav.fulfilled, (state, action) => {
                state.delBook = action.payload;
                state.isLoading = false;
                state.error = null;
              })
              .addCase(removeOneBookFav.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
              })



              .addCase(removeOneElderFav.pending, (state) => {
                state.isLoading = true;
                state.error = null;
              })
              .addCase(removeOneElderFav.fulfilled, (state, action) => {
                state.delElder = action.payload;
                state.isLoading = false;
                state.error = null;
              })
              .addCase(removeOneElderFav.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
              })


              .addCase(removeOneImgFav.pending, (state) => {
                state.isLoading = true;
                state.error = null;
              })
              .addCase(removeOneImgFav.fulfilled, (state, action) => {
                state.delImg = action.payload;
                state.isLoading = false;
                state.error = null;
              })
              .addCase(removeOneImgFav.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
              })
            }}
            );
      export { getAllEldersFavorite , getPicturesFavorite , getBooksFavorite ,getAudiosFavorite  
        ,removeOneAudiosFav,removeOneBookFav,removeOneElderFav,removeOneImgFav
      };
      
      export default FavoriteSlice.reducer;