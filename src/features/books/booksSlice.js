// booksSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../Api/baseURL";

const initialState = {
  booksData: [],

  isLoading: false,
  error: null,
};

 const getBooks = createAsyncThunk('get/books', async (_, thunkAPI) => {
  try {
    const response = await baseUrl.get(
      'Elders/Get');
      
    return response.data;
  } catch (error) {
    return error
  }
});




const booksSlice = createSlice({
  name: 'booksSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder


      .addCase(getBooks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.booksData = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
	  
	  
	  }}
      );
export { getBooks };

export default booksSlice.reducer;