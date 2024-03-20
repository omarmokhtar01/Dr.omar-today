import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../Api/baseURL";

const initialState = {
   notifiData:[],
    isLoading: false,
    error: null,
  };
  
  
   
  const getNotifi = createAsyncThunk('get/notifi', async (token, thunkAPI) => {
      try {
        const response = await baseUrl.get(
          'user/Get-Notification', {
            headers: {
                Authorization:` Bearer ${token}` // Include token in the request headers
            }
        });
          console.log(response);
        return response;
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