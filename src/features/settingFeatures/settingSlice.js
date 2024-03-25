import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../Api/baseURL";

const initialState = {
    settingData: {},
    isLoading: false,
    error: null,
  };
  
  
  
  const getSetting = createAsyncThunk('get/setting', async (_, thunkAPI) => {
      try {
        const response = await baseUrl.get(
          'Settings/Get-all');
          console.log(response.data);
        return response.data;
      } catch (error) {
        return error
      }
    });



  
  



    const settingSlice = createSlice({
        name: 'setting',
      
        initialState,
        reducers: {},
        extraReducers: (builder) => {
          builder
            .addCase(getSetting.pending, (state) => {
              state.isLoading = true;
              state.error = null;
            })
            .addCase(getSetting.fulfilled, (state, action) => {
              state.settingData = action.payload;
              state.isLoading = false;
              state.error = null;
            })
            .addCase(getSetting.rejected, (state, action) => {
              state.isLoading = false;
              state.error = action.payload;
            })


            }}
            );
      export { getSetting };
      
      export default settingSlice.reducer;