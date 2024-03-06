import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../Api/baseURL";

const initialState = {
    allEldersDownload: [],
    allPicturesDownload: [],
    allBooksDownload: [],
    allAudiossDownload: [],
    // allPicturesData: [],
    isLoading: false,
    error: null,
  };
  
  
  
  const getAllEldersDownload = createAsyncThunk('get/AllEldersDownload', async (_, thunkAPI) => {
      try {
        const response = await baseUrl.get(
          'download/getElder');
        return response.data;
      } catch (error) {
        return error
      }
    });


  const getPicturesDownload = createAsyncThunk('get/AllPicturesDownload', async (_, thunkAPI) => {
      try {
        const response = await baseUrl.get(
          'download/getImage');
        return response.data;
      } catch (error) {
        return error
      }
    });


  const getBooksDownload = createAsyncThunk('get/AllBooksDownload', async (_, thunkAPI) => {
      try {
        const response = await baseUrl.get(
          'download/getBook');
        return response.data;
      } catch (error) {
        return error
      }
    });


  const getAudiosDownload = createAsyncThunk('get/AllAudiosDownload', async (_, thunkAPI) => {
      try {
        const response = await baseUrl.get(
          'download/getAudioData');
        return response.data;
      } catch (error) {
        return error
      }
    });




    const DownloadSlice = createSlice({
        // name: 'getAllPicuture',
        name: 'getAllEldersDownload',
      
        initialState,
        reducers: {},
        extraReducers: (builder) => {
          builder
            .addCase(getAllEldersDownload.pending, (state) => {
              state.isLoading = true;
              state.error = null;
            })
            .addCase(getAllEldersDownload.fulfilled, (state, action) => {
              state.allEldersDownload = action.payload;
              state.isLoading = false;
              state.error = null;
            })
            .addCase(getAllEldersDownload.rejected, (state, action) => {
              state.isLoading = false;
              state.error = action.payload;
            })


            .addCase(getPicturesDownload.pending, (state) => {
                state.isLoading = true;
                state.error = null;
              })
              .addCase(getPicturesDownload.fulfilled, (state, action) => {
                state.allPicturesDownload = action.payload;
                state.isLoading = false;
                state.error = null;
              })
              .addCase(getPicturesDownload.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
              })
            
              
              .addCase(getBooksDownload.pending, (state) => {
                state.isLoading = true;
                state.error = null;
              })
              .addCase(getBooksDownload.fulfilled, (state, action) => {
                state.allBooksDownload = action.payload;
                state.isLoading = false;
                state.error = null;
              })
              .addCase(getBooksDownload.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
              })


              .addCase(getAudiosDownload.pending, (state) => {
                state.isLoading = true;
                state.error = null;
              })
              .addCase(getAudiosDownload.fulfilled, (state, action) => {
                state.allAudiossDownload = action.payload;
                state.isLoading = false;
                state.error = null;
              })
              .addCase(getAudiosDownload.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
              })
  

            }}
            );
      export { getAllEldersDownload , getPicturesDownload , getBooksDownload ,getAudiosDownload  };
      
      export default DownloadSlice.reducer;