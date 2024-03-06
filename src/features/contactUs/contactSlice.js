import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../Api/baseURL";

const initialState = {
  data:{},
  
  isLoading: false,
  error: null,
}; 

 const createContactUs = createAsyncThunk('contact/post', async ({ subject, first_name, phone, email }, thunkAPI) => {
  try {
    const response = await baseUrl.post('Message/create-message', {
      subject,
      first_name,
      phone,
      email
    });
    return response.data;
  } catch (error) {
    return error
  }
});



const contactSlice = createSlice({
  name: 'contactSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder


      .addCase(createContactUs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createContactUs.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(createContactUs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
	  

	  }}
      );
export { createContactUs };

export default contactSlice.reducer;