import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../Api/baseURL";

const initialState = {
    allPicturesData: [],
    isLoading: false,
    error: null,
    favPic:{},
    isLoadingFavPic: false,
  };
  
  
   
  const getAllPicuture = createAsyncThunk('get/AllPic', async (_, thunkAPI) => {
      try {
        const response = await baseUrl.get(
          'Images/Get');
        return response.data;
      } catch (error) {
        return error
      }
    });

    
            // to get audio details
            const favOnePic = createAsyncThunk('fav/add-img', async ({ formData, token }, thunkAPI) => {
              try {
                  const response = await baseUrl.post(
                      `Favorite/Favorite-image`,
                      formData, // Include formData in the request
                      {
                          headers: {
                              Authorization: `Bearer ${token}` // Include token in the request headers
                          }
                      }
                  );
                  console.log(response.data);
                  return response.data;
              } catch (error) {
                  return error;
              }
          });

    const PicturesSlice = createSlice({
        name: 'getAllPicuture',
      
        initialState,
        reducers: {},
        extraReducers: (builder) => {
          builder
            .addCase(getAllPicuture.pending, (state) => {
              state.isLoading = true;
              state.error = null;
            })
            .addCase(getAllPicuture.fulfilled, (state, action) => {
              state.allPicturesData = action.payload;
              state.isLoading = false;
              state.error = null;
            })
            .addCase(getAllPicuture.rejected, (state, action) => {
              state.isLoading = false;
              state.error = action.payload;
            })
            

            .addCase(favOnePic.pending, (state) => {
              state.isLoadingFavPic = true;
              state.error = null;
            })
            .addCase(favOnePic.fulfilled, (state, action) => {
              state.favPic = action.payload;
              state.isLoadingFavPic = false;
              state.error = null;
            })
            .addCase(favOnePic.rejected, (state, action) => {
              state.isLoadingFavPic = false;
              state.error = action.payload;
            })
  
  

            }}
            );
      export { getAllPicuture,favOnePic };
      
      export default PicturesSlice.reducer;