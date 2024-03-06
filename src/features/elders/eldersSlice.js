// eldersSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../../Api/baseURL";

const initialState = {
  eldersData: [],
 eldersOne:{},
 elderAudioOne:{},
  isLoading: false,
  error: null,
};

 const getElders = createAsyncThunk('get/elders', async (_, thunkAPI) => {
  try {
    const response = await baseUrl.get(
      'Elders/Get');
      
    return response.data;
  } catch (error) {
    return error
  }
});


const getEldersById = createAsyncThunk('post/elders/id', async (id, thunkAPI) => {
  try {

    const response = await baseUrl.post(
      `Elders/Get_Audio_Id_Elder?id=${id}`);
    return response.data;
  } catch (error) {
    return error
  }
});


const getEldersByIdAudios = createAsyncThunk('post/elders/id/audio', async (id, thunkAPI) => {
  try {

    const response = await baseUrl.post(
      `Elders/Get_Audio_Id_Elder?id=${id}`);
    return response.data;
  } catch (error) {
    return error
  }
});


const eldersSlice = createSlice({
  name: 'eldersData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getElders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getElders.fulfilled, (state, action) => {
        state.eldersData = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getElders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
	  
	  
      .addCase(getEldersById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getEldersById.fulfilled, (state, action) => {
        state.eldersOne = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getEldersById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })


      .addCase(getEldersByIdAudios.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getEldersByIdAudios.fulfilled, (state, action) => {
        state.elderAudioOne = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getEldersByIdAudios.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
	  
	  
	  }}
      );
export { getElders,getEldersById,getEldersByIdAudios };

export default eldersSlice.reducer;