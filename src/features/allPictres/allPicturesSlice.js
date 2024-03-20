import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../Api/baseURL";

const initialState = {
    allPicturesData: [],
    allPicturesDataPrivate: [],

    isLoading: false,
    isLoadingPrivate: false,

    error: null,
    favPic:{},
    isLoadingFavPic: false,

    downPic:{},
    isLoadingDownPic: false,
  };
  
  
   
  const getAllPicuture = createAsyncThunk('get/AllPic', async (token, thunkAPI) => {
      try {
        const response = await baseUrl.get(
          'Images/Get', {
            headers: {
                Authorization: `Bearer ${token}` // Include token in the request headers
            }
        });
          console.log(response.data);
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


          const downOnePic = createAsyncThunk('down/add-img', async ({ formData, token }, thunkAPI) => {
            try {
                const response = await baseUrl.post(
                    `download/Download-Image`,
                    formData, // Include formData in the request
                    {
                        headers: {
                            Authorization: `Bearer ${token}` ,
                            "X-Requested-With":'XMLHttpRequest',
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin':'*',
                            
                        }
                    }
                );
                console.log(response.data);
                return response.data;
            } catch (error) {
                return error;
            }
        });


        const getAllPicuturePrivate = createAsyncThunk('get/AllPicPrivate', async (_, thunkAPI) => {
          try {
            const response = await baseUrl.get(
              'Images/Get-Private');
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
  


            .addCase(downOnePic.pending, (state) => {
              state.isLoadingDownPic = true;
              state.error = null;
            })
            .addCase(downOnePic.fulfilled, (state, action) => {
              state.downPic = action.payload;
              state.isLoadingDownPic = false;
              state.error = null;
            })
            .addCase(downOnePic.rejected, (state, action) => {
              state.isLoadingDownPic = false;
              state.error = action.payload;
            })


            .addCase(getAllPicuturePrivate.pending, (state) => {
              state.isLoadingPrivate = true;
              state.error = null;
            })
            .addCase(getAllPicuturePrivate.fulfilled, (state, action) => {
              state.allPicturesDataPrivate = action.payload;
              state.isLoadingPrivate = false;
              state.error = null;
            })
            .addCase(getAllPicuturePrivate.rejected, (state, action) => {
              state.isLoadingPrivate = false;
              state.error = action.payload;
            })
  

            }}
            );
      export { getAllPicuture,favOnePic,downOnePic,getAllPicuturePrivate };
      
      export default PicturesSlice.reducer;