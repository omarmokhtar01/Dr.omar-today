// booksSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../Api/baseURL";

const initialState = {
  userLogin:{},
  userRegister:{},
  isLoading: false,
  error: null,
};

 const login = createAsyncThunk('auth/login', async (formData, thunkAPI) => {
  try {
    const response = await baseUrl.post(
      'Auth/Login',formData);
      
    return response.data;
  } catch (error) {
    return error
  }
});

const register = createAsyncThunk('auth/register', async (formData, thunkAPI) => {
    try {
      const response = await baseUrl.post(
        'Auth/Register',formData);
        console.log(response.data);
      return response.data;
    } catch (error) {
      return error
    }
  });
  


const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder


      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.userLogin = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
	  
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.userRegister = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
	  
	  }}
      );
export { login,register };

export default authSlice.reducer;