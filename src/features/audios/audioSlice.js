import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../Api/baseURL";

const initialState = {
    audios: [],
    audioCategory: [],
    audioCategoryId:[],
    publicAudio:[],
    
    isLoading: false,
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


            }}
            );
      export {
         getAudios,
        getAudioCategory,getAudioCategoryById,
        getAudioPublic
    };
      
      export default audioSlice.reducer;