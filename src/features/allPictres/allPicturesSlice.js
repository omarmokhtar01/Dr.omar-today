import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../Api/baseURL";

const initialState = {
    allPicturesData: [],
    isLoading: false,
    error: null,
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
            
  
  

            }}
            );
      export { getAllPicuture };
      
      export default PicturesSlice.reducer;