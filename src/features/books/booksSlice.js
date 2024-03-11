// booksSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../Api/baseURL";

const initialState = {
  booksData: [],
  lastVersionData: [],
  isLoadingLastVersion: false,

  booksMainCategory: [],
  booksMainSubCategory: [],
  allBooksCategory:[],
  searchBooks:[],

  showOne:{},
  isLoading: false,
  isLoadingSearchBooks: false,


  favBook:{},
  isLoadingBook: false,
  isLoadingFav: false,

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


const showBook = createAsyncThunk('show/book', async (id, thunkAPI) => {
  try {
    const response = await baseUrl.post(
      `Books/Find-Book-Public?id=${id}`);
      
    return response.data;
  } catch (error) {
    return error
  }
});


const lastVersion = createAsyncThunk('last/book', async (_, thunkAPI) => {
  try {
    const response = await baseUrl.get(
      `Books/LatestVersionBooks`);
      console.log(response.data);
    return response.data;
  } catch (error) {
    return error
  }
});


const searchBooks = createAsyncThunk('search/book', async (name, thunkAPI) => {
  try {
    const response = await baseUrl.post(
      `Search/search_Book?name=${name}`);
      console.log(response.data);
    return response.data;
  } catch (error) {
    return error
  }
});

const addToFavBook = createAsyncThunk('add-to-fav/book', async ({formData,token}, thunkAPI) => {
  try {
    const response = await baseUrl.post(
      `Favorite/Favorite-Book`,
      formData, // Include formData in the request
      {
          headers: {
              Authorization: `Bearer ${token}` // Include token in the request headers
          }
      });
      console.log(response.data);
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





      .addCase(showBook.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(showBook.fulfilled, (state, action) => {
        state.showOne = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(showBook.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })


      .addCase(lastVersion.pending, (state) => {
        state.isLoadingLastVersion = true;
        state.error = null;
      })
      .addCase(lastVersion.fulfilled, (state, action) => {
        state.lastVersionData = action.payload;
        state.isLoadingLastVersion = false;
        state.error = null;
      })
      .addCase(lastVersion.rejected, (state, action) => {
        state.isLoadingLastVersion = false;
        state.error = action.payload;
      })


      .addCase(searchBooks.pending, (state) => {
        state.isLoadingSearchBooks = true;
        state.error = null;
      })
      .addCase(searchBooks.fulfilled, (state, action) => {
        state.searchBooks = action.payload;
        state.isLoadingSearchBooks = false;
        state.error = null;
      })
      .addCase(searchBooks.rejected, (state, action) => {
        state.isLoadingSearchBooks = false;
        state.error = action.payload;
      })


      .addCase(addToFavBook.pending, (state) => {
        state.isLoadingFav = true;
        state.error = null;
      })
      .addCase(addToFavBook.fulfilled, (state, action) => {
        state.favBook = action.payload;
        state.isLoadingFav = false;
        state.error = null;
      })
      .addCase(addToFavBook.rejected, (state, action) => {
        state.isLoadingFav = false;
        state.error = action.payload;
      })
	  
	  }}
      );
export { getBooks,getBookMainCategory,getBookSubCategory ,getAllBooksCategory,showBook,lastVersion,searchBooks,addToFavBook};

export default booksSlice.reducer;