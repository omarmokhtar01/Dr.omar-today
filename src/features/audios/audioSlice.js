import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../Api/baseURL";

const initialState = {
    audios: [],
    audioCategory: [],
    audioCategoryId:[],
    publicAudio:[],
    mostListen:[],
    searchListen:[],
    isLoadingSearch: false,

    downAudio:{},
    favAudio:{},
    isLoading: false,
    isLoadingFav: false,
    isLoadingMostListen: false,
    isLoadingDown:false,
    error: null,
  };
  
  


  // to get all audios
    const getAudios = createAsyncThunk('get/audio', async (_, thunkAPI) => {
      try {
        const response = await baseUrl.get(
          `Audios/Get`);
          console.log(response.data);
        return response.data;
      } catch (error) {
        return error
      }
    });


    //to get all category audios name
    const getAudioCategory = createAsyncThunk('get/audio-category', async (_, thunkAPI) => {
      try {
        const response = await baseUrl.get(
          `Audios-Categories/Get`);
          console.log(response.data);
        return response.data;
      } catch (error) {
        return error
      }
    });


//to get all category audios data byid ==> اما ادوس علي كل كاتجري هتطلعلي الصوتيات الخاصه بيها
    const getAudioCategoryById = createAsyncThunk('get/audio-category-id', async (id, thunkAPI) => {
      try {
        const response = await baseUrl.post(
          `Audios-Categories/Get_audios_with_category?category_id=${id}`);
          console.log(response.data);
        return response.data;
      } catch (error) {
        return error
      }
    });



  // to get audio details
    const getAudioPublic = createAsyncThunk('get/audio-public', async (id, thunkAPI) => {
        try {
          const response = await baseUrl.post(
            `Audios/Audios_public_id?id=${id}`);
            console.log(response.data);
          return response.data;
        } catch (error) {
          return error
        }
      });


        // to get audio details
    const downloadOneAudio = createAsyncThunk('down/audio-public', async ({formData,token}, thunkAPI) => {
      try {
        const response = await baseUrl.post(
          `download/Donwload-Audio`, formData, // Include formData in the request
          {
              headers: {
                  Authorization: `Bearer ${token}` // Include token in the request headers
              }
          });
          console.log(response.status);
        return response.data;
      } catch (error) {
        return error
      }
    });

            // to get audio details
            const favOneAudio = createAsyncThunk('fav/audio-public', async ({ formData, token }, thunkAPI) => {
              try {
                  const response = await baseUrl.post(
                      `/Favorite/Favorite-Audio`,
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
          

          const mostListened = createAsyncThunk('most/listen', async (_, thunkAPI) => {
            try {
                const response = await baseUrl.get(
                    `Audios/MostListened`,
                   
                );
                console.log(response.data);
                return response.data;
            } catch (error) {
                return error;
            }
        });


        const searchListened = createAsyncThunk('search/listen', async (name, thunkAPI) => {
          try {
              const response = await baseUrl.post(
                  `Search/search_elder?name=${name}`,
                 
              );
              console.log(response.data);
              return response.data;
          } catch (error) {
              return error;
          }
      });

    const audioSlice = createSlice({
        name: 'audio',
      
        initialState,
        reducers: {},
        extraReducers: (builder) => {
          builder
            .addCase(getAudios.pending, (state) => {
              state.isLoading = true;
              state.error = null;
            })
            .addCase(getAudios.fulfilled, (state, action) => {
              state.audios = action.payload;
              state.isLoading = false;
              state.error = null;
            })
            .addCase(getAudios.rejected, (state, action) => {
              state.isLoading = false;
              state.error = action.payload;
            })
            
  
            .addCase(getAudioCategory.pending, (state) => {
              state.isLoading = true;
              state.error = null;
            })
            .addCase(getAudioCategory.fulfilled, (state, action) => {
              state.audioCategory = action.payload;
              state.isLoading = false;
              state.error = null;
            })
            .addCase(getAudioCategory.rejected, (state, action) => {
              state.isLoading = false;
              state.error = action.payload;
            })
            
  
            .addCase(getAudioCategoryById.pending, (state) => {
              state.isLoading = true;
              state.error = null;
            })
            .addCase(getAudioCategoryById.fulfilled, (state, action) => {
              state.audioCategoryId = action.payload;
              state.isLoading = false;
              state.error = null;
            })
            .addCase(getAudioCategoryById.rejected, (state, action) => {
              state.isLoading = false;
              state.error = action.payload;
            })
            






            .addCase(getAudioPublic.pending, (state) => {
              state.isLoading = true;
              state.error = null;
            })
            .addCase(getAudioPublic.fulfilled, (state, action) => {
              state.publicAudio = action.payload;
              state.isLoading = false;
              state.error = null;
            })
            .addCase(getAudioPublic.rejected, (state, action) => {
              state.isLoading = false;
              state.error = action.payload;
            })





            .addCase(downloadOneAudio.pending, (state) => {
              state.isLoadingDown = true;
              state.error = null;
            })
            .addCase(downloadOneAudio.fulfilled, (state, action) => {
              state.downAudio = action.payload;
              state.isLoadingDown = false;
              state.error = null;
            })
            .addCase(downloadOneAudio.rejected, (state, action) => {
              state.isLoadingDown = false;
              state.error = action.payload;
            })




            .addCase(favOneAudio.pending, (state) => {
              state.isLoadingFav = true;
              state.error = null;
            })
            .addCase(favOneAudio.fulfilled, (state, action) => {
              state.favAudio = action.payload;
              state.isLoadingFav = false;
              state.error = null;
            })
            .addCase(favOneAudio.rejected, (state, action) => {
              state.isLoadingFav = false;
              state.error = action.payload;
            })







            .addCase(mostListened.pending, (state) => {
              state.isLoadingMostListen = true;
              state.error = null;
            })
            .addCase(mostListened.fulfilled, (state, action) => {
              state.mostListen = action.payload;
              state.isLoadingMostListen = false;
              state.error = null;
            })
            .addCase(mostListened.rejected, (state, action) => {
              state.isLoadingMostListen = false;
              state.error = action.payload;
            })



            .addCase(searchListened.pending, (state) => {
              state.isLoadingSearch = true;
              state.error = null;
            })
            .addCase(searchListened.fulfilled, (state, action) => {
              state.searchListen = action.payload;
              state.isLoadingSearch = false;
              state.error = null;
            })
            .addCase(searchListened.rejected, (state, action) => {
              state.isLoadingSearch = false;
              state.error = action.payload;
            })


            }}
            );
      export {
         getAudios,
        getAudioCategory,getAudioCategoryById,
        getAudioPublic,downloadOneAudio,favOneAudio,mostListened,searchListened
    };
      
      export default audioSlice.reducer;