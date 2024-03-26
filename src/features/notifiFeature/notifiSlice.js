import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../Api/baseURL";

const initialState = {
  notifiData:  [],
     // Initialize headers to null


  notifiDelete: {},
   
    isLoading: false,
    error: null,
  };
  
  
   
  const getNotifi = createAsyncThunk('get/notifi', async (token, thunkAPI) => {
    try {
      const response = await baseUrl.get('user/Get-Notification', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
  
      return response.data; // Removed the comma at the end of the line
  
    } catch (error) {
      return thunkAPI.rejectWithValue(error); // Use rejectWithValue to handle failures
    }
  });
  


    const delNotifi = createAsyncThunk('delete/notifi', async ({token,id}, thunkAPI) => {
      try {
        const response = await baseUrl.delete(
          `user/Delete_Notification?id=${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
             
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


            .addCase(delNotifi.pending, (state) => {
              state.isLoading = true;
              state.error = null;
            })
            .addCase(delNotifi.fulfilled, (state, action) => {
              state.notifiDelete = action.payload;
              state.isLoading = false;
              state.error = null;

            })
            .addCase(delNotifi.rejected, (state, action) => {
              state.isLoading = false;
              state.error = action.payload;
            })
            
  
  
           

            }}
            );
      export { getNotifi,delNotifi };
      
      export default notifiSlice.reducer;