import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../Api/baseURL";

const initialState = {
    allImgsData: [],
    OneImgsData: [],

    
    isLoading: false,
    error: null,
  };
  
  
  
  const getAllImgCategory = createAsyncThunk('get/AllImgCategory', async (_, thunkAPI) => {
      try {
        const response = await baseUrl.get(
          'ImagesCategories/Get');
        return response.data;
      } catch (error) {
        return error
      }
    });



  
    const getOneImgCategory = createAsyncThunk('get/OneImgCategory', async (id, thunkAPI) => {
      try {
        const response = await baseUrl.post(
          `ImagesCategories/Get-images-from-category?id=${id}`);
          console.log(response.data);
        return response.data;
      } catch (error) {
        return error
      }
    });



    const imgCategorySlice = createSlice({
        name: 'imgCategory',
      
        initialState,
        reducers: {},
        extraReducers: (builder) => {
          builder
            .addCase(getAllImgCategory.pending, (state) => {
              state.isLoading = true;
              state.error = null;
            })
            .addCase(getAllImgCategory.fulfilled, (state, action) => {
              state.allImgsData = action.payload;
              state.isLoading = false;
              state.error = null;
            })
            .addCase(getAllImgCategory.rejected, (state, action) => {
              state.isLoading = false;
              state.error = action.payload;
            })
            
  
  
            .addCase(getOneImgCategory.pending, (state) => {
              state.isLoading = true;
              state.error = null;
            })
            .addCase(getOneImgCategory.fulfilled, (state, action) => {
              state.OneImgsData = action.payload;
              state.isLoading = false;
              state.error = null;
            })
            .addCase(getOneImgCategory.rejected, (state, action) => {
              state.isLoading = false;
              state.error = action.payload;
            })

            }}
            );
      export { getAllImgCategory,getOneImgCategory };
      
      export default imgCategorySlice.reducer;