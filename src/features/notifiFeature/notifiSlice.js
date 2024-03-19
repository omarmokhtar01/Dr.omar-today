import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../Api/baseURL";

const initialState = {
   notifiData:[],
    isLoading: false,
    error: null,
  };
  
  
  
  const getNotifi = createAsyncThunk('get/notifi', async (_, thunkAPI) => {
      try {
        const response = await baseUrl.get(
          '');
        return response.data;
      } catch (error) {
        return error
      }
    });



  
  



    const notifiSlice = createSlice({
        name: 'notifi',
      
        initialState,
        reducers: {},
        extraReducers: (builder) => {
          builder
            .addCase(getNotifi.pending, (state) => {
              state.isLoading = true;
              state.error = null;
            })
            .addCase(getNotifi.fulfilled, (state, action) => {
              state.notifiData = action.payload;
              state.isLoading = false;
              state.error = null;
            })
            .addCase(getNotifi.rejected, (state, action) => {
              state.isLoading = false;
              state.error = action.payload;
            })
            
  
  
           

            }}
            );
      export { getNotifi };
      
      export default notifiSlice.reducer;