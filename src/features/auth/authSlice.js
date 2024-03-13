import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../Api/baseURL";

const initialState = {
  userLogin:{},
  userDel:{},

  userRegister:{},
  isLoading: false,
  error: null,
}; 

 const createLoginUser = createAsyncThunk('auth/login', async (formData, thunkAPI) => {
  try {
    const response = await baseUrl.post(
      'Auth/Login',formData);
    console.log(response.data);
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
  
  const delAcc = createAsyncThunk('auth/del-acc', async (token, thunkAPI) => {
    try {
      const response = await baseUrl.get(
        'user/delete-account', {
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




const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder


      .addCase(createLoginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createLoginUser.fulfilled, (state, action) => {
        state.userLogin = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(createLoginUser.rejected, (state, action) => {
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

      .addCase(delAcc.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(delAcc.fulfilled, (state, action) => {
        state.delAcc = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(delAcc.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
	  
	  }}
      );
export { createLoginUser , register,delAcc};

export default authSlice.reducer;