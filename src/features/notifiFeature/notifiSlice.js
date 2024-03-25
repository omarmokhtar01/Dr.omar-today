import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../Api/baseURL";

const initialState = {
  notifiData: {
    data: [],
    headers: null, // Initialize headers to null
  },

  notifiDelete: {
    data: {},
    headers: null, // Initialize headers to null
  },
    isLoading: false,
    error: null,
  };
  
  
   
  const getNotifi = createAsyncThunk('get/notifi', async (token, thunkAPI) => {
      try {
        const response = await baseUrl.get(
          'user/Get-Notification', {
            headers: {
              Authorization: `Bearer ${token}`,
              "X-Requested-With": 'XMLHttpRequest',
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Cache-Control': 'no-cache, private'
            }
        });
        const extractedHeaders = {
          cacheControl: response.headers['cache-control'],
          contentType: response.headers['content-type'],
          // Add more headers as needed
        };
        return {
          data: response.data, // Example: Assuming response.data contains the data you need
          headers: extractedHeaders,
        };
      } catch (error) {
        return thunkAPI.rejectWithValue(error); // Use rejectWithValue to handle failures
      }
    });


    const delNotifi = createAsyncThunk('delete/notifi', async (token, thunkAPI) => {
      try {
        const response = await baseUrl.get(
          'user/Delete_Notification', {
            headers: {
              Authorization: `Bearer ${token}`,
              "X-Requested-With": 'XMLHttpRequest',
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Cache-Control': 'no-cache, private'
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
              state.notifiData = action.payload.data;
              state.isLoading = false;
              state.error = null;
              state.notifiData.headers = action.payload.headers; // Store extracted headers

            })
            .addCase(getNotifi.rejected, (state, action) => {
              state.isLoading = false;
              state.error = action.payload;
            })


            .addCase(delNotifi.pending, (state) => {
              state.isLoading = true;
              state.error = null;
            })
            .addCase(delNotifi.fulfilled, (state, action) => {
              state.notifiDelete = action.payload.data;
              state.isLoading = false;
              state.error = null;
              state.notifiData.headers = action.payload.headers; // Store extracted headers

            })
            .addCase(delNotifi.rejected, (state, action) => {
              state.isLoading = false;
              state.error = action.payload;
            })
            
  
  
           

            }}
            );
      export { getNotifi };
      
      export default notifiSlice.reducer;