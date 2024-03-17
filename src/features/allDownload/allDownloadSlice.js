import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../Api/baseURL";

const initialState = {
    allEldersDownload: [],
    allPicturesDownload: [],
    allBooksDownload: [],
    allAudiossDownload: [],
    // allPicturesData: [],

    delAudio:{},
    delBook:{},
    delElder:{},
    delImg:{},
    isLoading: false,
    error: null,
  };
  
  
  
  const getAllEldersDownload = createAsyncThunk('get/AllEldersDownload', async (token, thunkAPI) => {
    try {
      const response = await baseUrl.get(
        'download/getElder',
        { headers: { Authorization: `Bearer ${token}` } } // Sending token in request headers
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  });

  const getPicturesDownload = createAsyncThunk('get/AllPicturesDownload', async (token, thunkAPI) => {
      try {
        const response = await baseUrl.get(
          'download/getImage',
          { headers: { Authorization: `Bearer ${token}` } } // Sending token in request headers

          );
        return response.data;
      } catch (error) {
        return error
      }
    });


  const getBooksDownload = createAsyncThunk('get/AllBooksDownload', async (token, thunkAPI) => {
      try {
        const response = await baseUrl.get(
          'download/getBook',
          { headers: { Authorization: `Bearer ${token}` } } // Sending token in request headers
          );
        return response.data;
      } catch (error) {
        return error
      }
    });


  const getAudiosDownload = createAsyncThunk('get/AllAudiosDownload', async (token, thunkAPI) => {
      try {
        const response = await baseUrl.get(
          'download/getAudioData',        { headers: { Authorization: `Bearer ${token}` } } // Sending token in request headers
          );
        return response.data;
      } catch (error) {
        return error
      }
    });

    const removeOneAudiosDownload = createAsyncThunk('del/OneAudiosDownload', async ({token,id}, thunkAPI) => {
      try {
        const response = await baseUrl.get(
          `remove/getAudioData?id=${id}`,        { headers: { Authorization: `Bearer ${token}` } } // Sending token in request headers
          );
          console.log(response.data);
        return response.data;
      } catch (error) {
        return error
      }
    });


    const removeOneElderDownload = createAsyncThunk('del/OneElderDownload', async ({token,id}, thunkAPI) => {
      try {
        const response = await baseUrl.get(
          `remove/getAudioData?id=${id}`,        { headers: { Authorization: `Bearer ${token}` } } // Sending token in request headers
          );
          console.log(response.data);
        return response.data;
      } catch (error) {
        return error
      }
    });

    const removeOneBookDownload = createAsyncThunk('del/OneBookDownload', async ({token,id}, thunkAPI) => {
      try {
        const response = await baseUrl.get(
          `remove/getAudioData?id=${id}`,        { headers: { Authorization: `Bearer ${token}` } } // Sending token in request headers
          );
          console.log(response.data);
        return response.data;
      } catch (error) {
        return error
      }
    });

    const removeOneImgDownload = createAsyncThunk('del/OneImgDownload', async ({token,id}, thunkAPI) => {
      try {
        const response = await baseUrl.get(
          `remove/getAudioData?id=${id}`,        { headers: { Authorization: `Bearer ${token}` } } // Sending token in request headers
          );
          console.log(response.data);
        return response.data;
      } catch (error) {
        return error
      }
    });





    const DownloadSlice = createSlice({
        // name: 'getAllPicuture',
        name: 'getDownloads',
      
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









              .addCase(removeOneAudiosDownload.pending, (state) => {
                state.isLoading = true;
                state.error = null;
              })
              .addCase(removeOneAudiosDownload.fulfilled, (state, action) => {
                state.delAudio = action.payload;
                state.isLoading = false;
                state.error = null;
              })
              .addCase(removeOneAudiosDownload.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
              })


              .addCase(removeOneBookDownload.pending, (state) => {
                state.isLoading = true;
                state.error = null;
              })
              .addCase(removeOneBookDownload.fulfilled, (state, action) => {
                state.delBook = action.payload;
                state.isLoading = false;
                state.error = null;
              })
              .addCase(removeOneBookDownload.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
              })



              .addCase(removeOneElderDownload.pending, (state) => {
                state.isLoading = true;
                state.error = null;
              })
              .addCase(removeOneElderDownload.fulfilled, (state, action) => {
                state.delElder = action.payload;
                state.isLoading = false;
                state.error = null;
              })
              .addCase(removeOneElderDownload.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
              })


              .addCase(removeOneImgDownload.pending, (state) => {
                state.isLoading = true;
                state.error = null;
              })
              .addCase(removeOneImgDownload.fulfilled, (state, action) => {
                state.delImg = action.payload;
                state.isLoading = false;
                state.error = null;
              })
              .addCase(removeOneImgDownload.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
              })
  

            }}
            );
      export { getAllEldersDownload , getPicturesDownload , getBooksDownload ,getAudiosDownload 
      ,removeOneAudiosDownload,removeOneBookDownload,removeOneElderDownload,removeOneImgDownload
      };
      
      export default DownloadSlice.reducer;