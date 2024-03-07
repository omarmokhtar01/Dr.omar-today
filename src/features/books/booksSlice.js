// booksSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../Api/baseURL";

const initialState = {
  booksData: [],
  booksMainCategory: [],
  booksMainSubCategory: [],
  allBooksCategory:[],
  isLoading: false,
  error: null,
};

 const getBooks = createAsyncThunk('get/books', async (_, thunkAPI) => {
  try {
    const response = await baseUrl.get(
      'Books/Get');
      
    return response.data;
  } catch (error) {
    return error
  }
});


const getBookMainCategory = createAsyncThunk('get/books/main', async (_, thunkAPI) => {
  try {
    const response = await baseUrl.get(
      'Main-Categories-Books/Get');
      
    return response.data;
  } catch (error) {
    return error
  }
});

const getBookSubCategory = createAsyncThunk('get/books/sub', async (id, thunkAPI) => {
  try {
    const response = await baseUrl.get(
      `Categories-Books/Get?category_id=${id}`);
      
    return response.data;
  } catch (error) {
    return error
  }
});



const getAllBooksCategory = createAsyncThunk('get/books/category', async (_, thunkAPI) => {
  try {
    const response = await baseUrl.get(
      `/Categories-Books/Get-Category`);
      
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


      .addCase(getBookMainCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getBookMainCategory.fulfilled, (state, action) => {
        state.booksMainCategory = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getBookMainCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })


      .addCase(getBookSubCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getBookSubCategory.fulfilled, (state, action) => {
        state.booksMainSubCategory = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getBookSubCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getAllBooksCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllBooksCategory.fulfilled, (state, action) => {
        state.allBooksCategory = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getAllBooksCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
	  
	  }}
      );
export { getBooks,getBookMainCategory,getBookSubCategory ,getAllBooksCategory};

export default booksSlice.reducer;