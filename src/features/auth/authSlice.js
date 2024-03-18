import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../Api/baseURL";

const initialState = {
  userLogin:{},
  userDel:{},
  userData:{},
  userRegister:{},
  changeUserPassword:{},
  updateUserProfile:{},
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
              Authorization:` Bearer ${token}` // Include token in the request headers
          }
      });
        console.log(response.data);
      return response.data;
    } catch (error) {
      return error
    }
  });


  const getProfile = createAsyncThunk('auth/profile', async (token, thunkAPI) => {
    try {
      const response = await baseUrl.get(
        'user/Profile', {
          headers: {
              Authorization:` Bearer ${token}` // Include token in the request headers
          }
      });
      return response.data;
    } catch (error) {
      return error
    }
  });


 

  const changePasswordUser = createAsyncThunk(
    'change/password',
    async ({ formData, token }, thunkAPI) => {
      try {
        const response = await baseUrl.post(
          'Auth/change-password',
          formData,
          {
            params: {
              current_password: formData.current_password,
              new_password: formData.new_password,
              new_password_confirmation: formData.new_password_confirmation
            },
            headers: {
              Authorization:` Bearer ${token}` // Enclose the token interpolation in backticks
            }
          }
        );
        console.log(response);
        return response.data;
      } catch (error) {
        // You might want to handle errors more appropriately here
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );


  const updateProfileUser = createAsyncThunk(
    'update/profile',
    async ({ formData, token }, thunkAPI) => {
      try {
        const response = await baseUrl.post(
          'Auth/UpdateProfile',
          formData,
          {
            params: {
              name: formData.name,
              email: formData.email,
              phonenumber: formData.phonenumber
            },
            headers: {
              Authorization:` Bearer ${token}` // Enclose the token interpolation in backticks
            }
          }
        );
        console.log(response);
        return response;
      } catch (error) {
        // You might want to handle errors more appropriately here
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );



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



      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })



      .addCase(changePasswordUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(changePasswordUser.fulfilled, (state, action) => {
        state.changeUserPassword = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(changePasswordUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
	  

      .addCase(updateProfileUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProfileUser.fulfilled, (state, action) => {
        state.updateUserProfile = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateProfileUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
	  
	  }}
      );
export { createLoginUser , register,delAcc,getProfile , changePasswordUser , updateProfileUser};

export default authSlice.reducer;